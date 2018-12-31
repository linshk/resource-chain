<template>
  <el-container direction="vertical">
    <el-header>
      <el-button type="primary" @click="refreshResourceList">刷新</el-button>
    </el-header>
    <el-main>
      <el-table
        ref="filterTable"
        :data="tableData"
        style="width: 90%">
        <el-table-column
          prop="name"
          label="资源"
          width="150">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          sortable
          column-key="date">
        </el-table-column>
        <el-table-column
          prop="filesize"
          label="大小"
          :formatter="formatter">
        </el-table-column>
        <el-table-column
          prop="price"
          label="定价"
          :formatter="priceFormatter">
        </el-table-column>
        <el-table-column
          prop="count"
          label="下载次数">
        </el-table-column>
        <el-table-column
          label="标签">
          <template slot-scope="scope">
            <el-tag
              :key="tag"
              v-for="tag in scope.row.tags"
              disable-transitions>{{tag}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="requestResource(scope.$index, scope.row)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script type="text/javascript">
import utils from '../service/utils'
export default {
  name: 'resouce-center',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    async newAgent () {
      if (this.$store.state.main.agent === '') {
        let tx = await this.$http({
          url: '/api/contracts/Agent/newAgent',
          method: 'post',
          data: {
            sender: this.$store.state.main.address
          }
        })
        console.log(tx)
        this.$store.commit('setAgent', {agent: tx.data.data.address})
      }
    },
    async newManager () {
      if (this.$store.state.main.manager === '') {
        let txManager = await this.$http({
          url: '/api/contracts/ResourceManager/newResourceManager',
          method: 'post',
          data: {
            sender: this.$store.state.main.address
          }
        })
        console.log(txManager)
        console.log('manager addr', txManager.data.data.address)
        this.$store.commit('setManager', {manager: txManager.data.data.address})
      }
    },
    async registerAgent () {
      this.$http({
        url: '/api/contracts/ResourceManager/registerAgent',
        method: 'POST',
        data: {
          sender: this.$store.state.main.address,
          address: this.$store.state.main.manager,
          agent: this.$store.state.main.agent
        }
      }).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    },
    async refreshResourceList () {
      let isErr = false
      let res = await this.$http({
        url: '/api/contracts/ResourceManager/getResourcesCount',
        method: 'GET',
        params: {
          sender: this.$store.state.main.address,
          address: this.$store.state.main.manager
        }
      }).catch((err) => {
        console.log(err)
        isErr = true
      })
      if (isErr) {
        return
      }

      console.log('get resources count res:', res)
      this.$store.commit('setResourcesCount', {total: res.data.data.total})
      console.log('total:', this.$store.state.main.resourcesCount)

      let resOfResource
      let info
      for (let i = 0; i < this.$store.state.main.resourcesCount; i++) {
        info = {}
        resOfResource = await this.$http({
          url: '/api/contracts/ResourceManager/getResourceInfoById',
          method: 'GET',
          params: {
            sender: this.$store.state.main.address,
            address: this.$store.state.main.manager,
            id: i
          }
        }).catch((err) => {
          console.log(err)
          isErr = true
        })
        if (isErr) {
          isErr = false
          continue
        }

        console.log('resource info res:', resOfResource)
        let mainInfo = resOfResource.data.data.resourceInfo
        info.publicId = i
        info.agent = mainInfo.agent
        info.owner = mainInfo.owner
        info.name = mainInfo.name
        info.description = mainInfo.description
        info.filesize = Number('0x' + mainInfo.size)
        // s -> ms
        info.timestamp = Number('0x' + mainInfo.timestamp) * 1000
        let uploadDate = new Date(info.timestamp)
        info.date = utils.dateToString(uploadDate)
        info.tags = mainInfo.tags.split('-')
        info.hash = '0x' + mainInfo.hash

        resOfResource = await this.$http({
          url: '/api/contracts/Agent/getResourceState',
          method: 'GET',
          params: {
            sender: this.$store.state.main.address,
            address: info.agent,
            hash: mainInfo.hash
          }
        }).catch((err) => {
          console.log(err)
          isErr = true
        })
        if (isErr) {
          isErr = false
          continue
        }

        console.log('resource state res:', resOfResource)
        let state = resOfResource.data.data.state
        info.price = Number('0x' + state.price)
        info.count = Number('0x' + state.count)
        info.available = state.available
        info.lastTimestamp = Number('0x' + state.lastModified) * 1000
        let lastDate = new Date(info.lastTimestamp)
        info.lastMofified = utils.dateToString(lastDate)
        info.privateId = Number('0x' + state.id)
        console.log('resource info:', info)

        if (i < this.tableData.length) {
          if (this.tableData[i].lastTimestamp !== info.lastTimestamp) {
            this.tableData[i] = info
          }
        } else {
          this.tableData.push(info)
        }
      }
    },
    requestResource (index, row) {
      console.log(row)
    },
    resetDateFilter () {
      this.$refs.filterTable.clearFilter('date')
    },
    clearFilter () {
      this.$refs.filterTable.clearFilter()
    },
    formatter (row, column) {
      console.log('formatter column', column)
      return String(row.filesize) + ' B'
    },
    priceFormatter (row, column) {
      return row.price === 0 ? '免费' : String(row.price) + ' ether'
    },
    filterTag (value, row) {
      return row.tag === value
    },
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    }
  }
}
</script>

<style type="text/css">

</style>
