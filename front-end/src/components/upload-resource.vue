<template>
  <el-container>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="资源名称">
        <el-input v-model="form.name" name="name"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-tag
          :key="tag"
          v-for="tag in form.tags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="form.inputVisible"
          v-model="form.inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </el-form-item>
      <el-form-item label="定价(ETH)" label-suffix="ETH">
        <el-input-number v-model="form.price" :step="1" :min="0" ></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="upload-demo"
          drag
          ref="upload"
          accept="*"
          :multiple="false"
          :data="formdata"
          name="resource"
          action="/api/contracts/ResourceManager/uploadResourceInfo"
          :file-list="form.resource"
          :before-upload="beforeUpload"
          :on-success="uploadSuccess"
          :on-change="onPickResource"
          :auto-upload="false">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="margin-right: 30px">上传资源</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script type="text/javascript">
import sha1 from 'sha1'
export default {
  name: 'upload-resouce',
  data () {
    return {
      form: {
        name: '',
        description: '',
        tags: [],
        inputVisible: false,
        inputValue: '',
        price: 0,
        resource: [],
        hash: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入资源名称', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        description: [
          { max: 25, message: '长度在 25 个字符以内', trigger: 'change' }
        ],
        price: [
          {}
        ]
      }
    }
  },
  computed: {
    formdata: function () {
      let data = {
        sender: this.$store.state.main.address,
        address: this.$store.state.main.manager,
        name: this.form.name,
        description: this.form.description,
        tags: this.form.tags.join('-'),
        hash: this.form.hash
      }
      return data
    }
  },
  methods: {
    async beforeUpload (file) {
      let reader
      if (file) {
        reader = new FileReader()
        reader.onload = (event) => {
          this.form.hash = sha1(event.target.result)
          console.log('file hash:', this.form.hash)
        }
      }
      await reader.readAsArrayBuffer(file)
    },
    async onSubmit () {
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
      this.$refs.upload.submit()
      // console.log(res)
    },
    async uploadSuccess (response, file, filelist) {
      console.log('upload response', response)
      let filehash = response.data.hash
      this.$message({
        showClose: true,
        message: '文件上传成功',
        type: 'success'
      })
      this.$message({
        showClose: true,
        message: '文件哈希：' + filehash
      })
      console.log('file', file)
      console.log('files', filelist)
      this.$http({
        url: '/api/contracts/Agent/initResourceState',
        method: 'post',
        data: this.$qs.stringify({
          sender: this.$store.state.main.address,
          address: this.$store.state.main.agent,
          // hash: this.form.hash,
          hash: filehash,
          price: this.form.price
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        console.log('init resource state:', res)
        if (res.data.status) {
          this.$message({
            showClose: true,
            message: '资源信息已提交',
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: '资源信息提交失败：' + res.data.msg,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.log('error:', err)
        // this.$message()
      })
    },
    handleClose (tag) {
      this.form.tags.splice(this.form.tags.indexOf(tag), 1)
    },
    showInput () {
      this.form.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.form.inputValue
      if (inputValue) {
        this.form.tags.push(inputValue)
      }
      this.form.inputVisible = false
      this.form.inputValue = ''
    },
    onPickResource (file, filelist) {
      console.log('change')
      console.log(file)
      console.log(filelist)
    }
  }
}
</script>

<style type="text/css">
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
