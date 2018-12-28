<template>
  <el-container>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="资源名称">
        <el-input v-model="form.name"></el-input>
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
        <el-input-number v-model="form.price" :precision="2" :step="0.1" :min="0" ></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          :file-list="form.resource"
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
        resource: []
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
  methods: {
    onSubmit () {
      console.log('submit!')
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
