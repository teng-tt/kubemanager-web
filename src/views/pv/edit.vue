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
      <el-form-item label="capacity">
        <el-input-number v-model="form.capacity"></el-input-number>
      </el-form-item>
      <el-form-item label="accessModes">
        <el-select style="width: 50%" v-model="form.accessModes" multiple>
          <el-option label="ReadWriteOnce--允许单个节点读写" value="ReadWriteOnce"/>
          <el-option label="ReadOnlyMany--允许多个节点只读" value="ReadOnlyMany"/>
          <el-option label="ReadWriteMany--允许多个节点可读可写" value="ReadWriteMany"/>
        </el-select>
      </el-form-item>
      <el-form-item label="reClaimPolicy">
        <el-select style="width: 50%" v-model="form.reClaimPolicy">
          <el-option label="Delete--删除PVC时删除PV" value="Delete"/>
          <el-option label="Retain--删除PVC时保留PV" value="Retain"/>
          <el-option label="Recycle--保留PV清除数据" value="Recycle"/>
        </el-select>
      </el-form-item>
      <el-form-item label="volumeSource">
        <el-select style="width: 50%;" v-model="form.volumeSource.volumeSourceType">
          <el-option value="nfs" label="nfs"></el-option>
        </el-select>
        <el-form-item v-if="form.volumeSource.volumeSourceType==='nfs'" label="nfsVolume">
          <el-form-item class="el-inner-item" label="nfsServer" prop="nfsServer">
            <el-input v-model="form.volumeSource.nfsVolumeSource.nfsServer"></el-input>
          </el-form-item>
          <el-form-item class="el-inner-item" label="nfsPath" prop="nfsPath">
            <el-input v-model="form.volumeSource.nfsVolumeSource.nfsPath"></el-input>
          </el-form-item>
          <el-form-item class="el-inner-item" label="nfsReadOnly">
            <el-switch v-model="form.volumeSource.nfsVolumeSource.nfsReadyOnly"></el-switch>
          </el-form-item>
        </el-form-item>
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
    const nfsServerValidate = (rule, _, callback) => {
      //校验容器定义是否为空
      let newValue = this.form.volumeSource.nfsVolumeSource.nfsServer
      if (newValue === "" || newValue === undefined) {
        // alert(this.form.volumeSource.volumeSourceType)
        callback(new Error("value is empty"))
      } else {
        callback()
      }
    }
    const nfsPathValidate = (rule, _, callback) => {
      //校验容器定义是否为空
      let newValue = this.form.volumeSource.nfsVolumeSource.nfsPath
      if (newValue === "" || newValue === undefined) {
        callback(new Error("value is empty"))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: "",
        labels: [],
        capacity: 500,
        accessModes: ["ReadWriteOnce"],
        reClaimPolicy: "Delete",
        volumeSource: {
          volumeSourceType: "nfs",
          nfsVolumeSource: {
            nfsPath: "",
            nfsServer: "",
            nfsReadyOnly: false
          }
        }
      },
      rules: {
        name: [
          {required: true, message: '请输入PV名称', trigger: 'blur'}
        ],
        nfsServer: [
          {
            type: 'string',
            required: true,
            validator: nfsServerValidate,
            trigger: ['blur'],
            message: "请填写nfs服务访问地址"
          }
        ],
        nfsPath: [
          {
            type: 'string',
            required: true,
            validator: nfsPathValidate,
            trigger: ['blur'],
            message: "请填写nfs保存路径"
          }
        ]
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
        this.$store.dispatch("pv/createPV", this.form).then(res => {
          Message.success(res.msg)
          this.$router.push(
            {
              path: "/volume/pvs"
            }
          )
        })
      })
    },
  }
}
</script>

<style scoped>

</style>
