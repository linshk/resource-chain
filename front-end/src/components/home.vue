<template>
  <el-container style="padding-top: 5px;">
    <el-tabs style="width: 100%">
      <el-tab-pane label="我的" name="" style="justify-content: center;">
        <personal></personal>
      </el-tab-pane>
      <el-tab-pane label="资源中心" name="" style="justify-content: center;">
        <resource-center></resource-center>
      </el-tab-pane>
      <el-tab-pane label="上传资源" name="" style="justify-content: center;">
        <upload-resource></upload-resource>
      </el-tab-pane>
    </el-tabs>
  </el-container>
</template>

<script type="text/javascript">
import resourceCenter from './resource-center'
import uploadResource from './upload-resource'
import personal from './personal'
export default {
  name: 'home',
  data () {
    return {
      currentIndex: '/resource-center'
    }
  },
  components: {
    resourceCenter,
    uploadResource,
    personal
  }
}
</script>

<style type="text/css">
</style>
