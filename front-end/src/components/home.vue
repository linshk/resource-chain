<template>
  <el-container style="padding-top: 5px;">
    <el-tabs style="width: 100%">
      <el-tab-pane label="资源中心" name="" style="justify-content: center;">
        <resource-center></resource-center>
      </el-tab-pane>
      <el-tab-pane label="上传资源" name="" style="justify-content: center;">
        <upload-resource></upload-resource>
      </el-tab-pane>
      <el-tab-pane label="下载列表" name="" style="justify-content: center;">下载列表</el-tab-pane>
    </el-tabs>
  </el-container>
</template>

<script type="text/javascript">
import resourceCenter from './resource-center'
import uploadResource from './upload-resource'
export default {
  name: 'home',
  data () {
    return {
      currentIndex: '/resource-center'
    }
  },
  components: {
    resourceCenter,
    uploadResource
  }
}
</script>

<style type="text/css">
</style>
