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
      <el-form-item label="selector">
        <el-row v-for="(item,index) in form.selector" class="for-item">
          <el-col :span="10" style="padding-right: 5px">
            <el-input v-model="item.key" placeholder="label key"></el-input>
          </el-col>
          <el-col :span="1" style="text-align: center">-</el-col>
          <el-col :span="10">
            <el-input v-model="item.value" placeholder="label value"></el-input>
          </el-col>
          <el-col :span="3" style="text-align: center">
            <el-button @click="form.selector.splice(index,1)"
                       size="small"
                       type="danger">
              delete
              <i class="el-icon-delete"></i>
            </el-button>
          </el-col>
        </el-row>
        <el-button @click="form.selector.push({})"
                   size="small"
                   type="primary">
          add label
          <i class="el-icon-circle-plus"></i>
        </el-button>
      </el-form-item>
      <el-form-item label="capacity">
        <el-input-number v-model="form.capacity"></el-input-number>
      </el-form-item>
      <el-form-item label="storageClassName">
        <el-select style="width: 50%" v-model="form.storageClassName">
          <el-option v-for="item in scOpts" :value="item.name" :label="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="accessModes">
        <el-select style="width: 50%" v-model="form.accessModes" multiple>
          <el-option label="ReadWriteOnce--允许单个节点读写" value="ReadWriteOnce"/>
          <el-option label="ReadOnlyMany--允许多个节点只读" value="ReadOnlyMany"/>
          <el-option label="ReadWriteMany--允许多个节点可读可写" value="ReadWriteMany"/>
        </el-select>
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
        name: "",
        storageClassName: "",
        labels: [],
        selector: [],
        accessModes: [
          "ReadWriteOnce"
        ],
        capacity: 500
      },
      scOpts:[],
      rules: {
        name: [
          {required: true, message: '请输入PVC名称', trigger: 'blur'}
        ],
      },
    }
  },
  created() {
    this.intScOpts()
  },
  methods: {
    intScOpts() {
      let params = {
        namespace: this.$store.state.ns.nsName
      }
      this.$store.dispatch("sc/getScList", params).then(res => {
        this.scOpts = res.data
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          //校验容器子表单
          // Message.error("提交失败，请检查必填型！")
          return false
        }
        //提交数据
        this.form.namespace = this.$store.state.ns.nsName
        this.$store.dispatch("pvc/createPCV", this.form).then(res => {
          Message.success(res.msg)
          this.$router.push(
            {
              path: "/volume/pvcs"
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
