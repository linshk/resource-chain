<template>
  <el-container direction="vertical">
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
        label="定价">
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
  </el-container>
</template>

<script type="text/javascript">
export default {
  name: 'resouce-center',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        filesize: 2000123,
        price: 2,
        count: 100,
        tags: ['movie', 'book']
      }, {
        date: '2016-05-04',
        name: '王小虎',
        filesize: 2000123,
        price: 2,
        count: 100,
        tags: ['movie', 'book']
      }, {
        date: '2016-05-01',
        name: '王小虎',
        filesize: 2000123,
        price: 2,
        count: 100,
        tags: ['movie', 'book']
      }, {
        date: '2016-05-03',
        name: '王小虎',
        filesize: 2000123,
        price: 2,
        count: 100,
        tags: ['movie', 'book']
      }]
    }
  },
  methods: {
    requestResource (index, row) {

    },
    resetDateFilter () {
      this.$refs.filterTable.clearFilter('date')
    },
    clearFilter () {
      this.$refs.filterTable.clearFilter()
    },
    formatter (row, column) {
      return String(row.filesize) + ' B'
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
