<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="150px">
      <el-form-item label="name" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="labels">
        <el-row v-for="(item,index) in form.labels" class="for-item">
          <el-col :span="10" style="padding-right: 5px">
            <el-input v-model="item.key" placeholder="label key"></el-input>
          </el-col>
          <el-col :span="1" style="text-align: center">-</el-col>
          <el-col :span="10">
            <el-input v-model="item.value" placeholder="label value"></el-input>
          </el-col>
          <el-col :span="3" style="text-align: center">
            <el-button @click="form.labels.splice(index,1)"
                       size="small"
                       type="danger">
              delete
              <i class="el-icon-delete"></i>
            </el-button>
          </el-col>
        </el-row>
        <el-button @click="form.labels.push({})"
                   size="small"
                   type="primary">
          add label
          <i class="el-icon-circle-plus"></i>
        </el-button>
      </el-form-item>
      <el-form-item label="provisioner">
        <el-select style="width: 50%" v-model="form.provisioner">
          <el-option label="cluster.local/nfs-subdir-external-provisioner"
                     value="cluster.local/nfs-subdir-external-provisioner"/>
        </el-select>
      </el-form-item>
      <el-form-item label="volumeBindingMode">
        <el-select style="width: 50%" v-model="form.volumeBindingMode">
          <el-option value="Immediate" label="Immediate"/>
          <el-option value="WaitForFirstConsumer" label="WaitForFirstConsumer"/>
        </el-select>
      </el-form-item>
      <el-form-item label="reClaimPolicy">
        <el-select style="width: 50%" v-model="form.reClaimPolicy">
          <el-option label="Delete--删除PVC时删除PV" value="Delete"/>
          <el-option label="Retain--删除PVC时保留PV" value="Retain"/>
          <el-option label="Recycle--保留PV清除数据" value="Recycle"/>
        </el-select>
      </el-form-item>
      <el-form-item label="mountOptions">
        <el-row v-for="(item,index) in form.mountOptions" class="for-item">
          <el-col :span="10" style="padding-right: 5px">
            <el-input v-model="form.mountOptions[index]" placeholder="mount option"></el-input>
          </el-col>
          <el-col :span="3" style="text-align: center">
            <el-button @click="form.mountOptions.splice(index,1)"
                       size="small"
                       type="danger">
              delete
              <i class="el-icon-delete"></i>
            </el-button>
          </el-col>
        </el-row>
        <el-button @click="form.mountOptions.push('')"
                   size="small"
                   type="primary">
          add mountOption
          <i class="el-icon-circle-plus"></i>
        </el-button>
      </el-form-item>
      <el-form-item class="el-inner-item" label="allowVolumeExpansion">
        <el-switch v-model="form.allowVolumeExpansion"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit('form')" type="primary">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {Message} from "element-ui";

export default {
  name: "edit",
  data() {
    return {
      form: {
        "name": "",
        "labels": [],
        "provisioner": "cluster.local/nfs-subdir-external-provisioner",
        "mountOptions": [],
        "volumeBindingMode": "Immediate",
        "reClaimPolicy": "Delete",
        "allowVolumeExpansion": false
      },
      rules: {
        name: [
          {required: true, message: '请输入StorageClass名称', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          //校验容器子表单
          // Message.error("提交失败，请检查必填型！")
          return false
        }
        //提交数据
        this.form.namespace = this.$store.state.ns.nsName
        this.$store.dispatch("sc/createSc", this.form).then(res => {
          Message.success(res.msg)
          this.$router.push(
            {
              path: "/volume/scs"
            }
          )
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
