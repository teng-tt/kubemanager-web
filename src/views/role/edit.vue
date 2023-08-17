<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="150px">
      <el-form-item label="isCluster" prop="isCluster">
        <el-switch v-model="form.isCluster"></el-switch>
      </el-form-item>
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
      <el-form-item label="rules">
        <div v-for="(item,index) in form.rules" class="port-class">
          <el-form-item label="verbs">
            <el-select
              v-model="item.verbs"
              multiple
              filterable
              allow-create
              default-first-option
              style="width: 100%"
              class="for-item"
              placeholder="">
            </el-select>
          </el-form-item>
          <el-form-item label="apiGroups">
            <el-select
              v-model="item.apiGroups"
              multiple
              filterable
              allow-create
              default-first-option
              style="width: 100%"
              class="for-item"
              placeholder="">
            </el-select>
          </el-form-item>
          <el-form-item label="resources">
            <el-select
              v-model="item.resources"
              multiple
              filterable
              allow-create
              default-first-option
              style="width: 100%"
              class="for-item"
              placeholder="">
            </el-select>
          </el-form-item>
          <el-form-item label="resourceNames">
            <el-select
              v-model="item.resourceNames"
              multiple
              filterable
              allow-create
              default-first-option
              style="width: 100%"
              class="for-item"
              placeholder="">
            </el-select>
          </el-form-item>
          <el-form-item label="nonResourceURLs">
            <el-select
              v-model="item.nonResourceURLs"
              multiple
              filterable
              allow-create
              default-first-option
              style="width: 100%"
              class="for-item"
              placeholder="">
            </el-select>
          </el-form-item>
          <el-button @click="form.rules.splice(index,1)"
                     size="small"
                     type="danger">
            删除
            <i class="el-icon-delete"></i>
          </el-button>
        </div>
        <el-button @click="addRules()"
                   size="small"
                   type="primary">
          add rule
          <i class="el-icon-circle-plus"></i>
        </el-button>
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
    const selectorValidator = (rule, value, callback) => {
      //校验容器定义是否为空
      if (value.length === 0) {
        callback(new Error("selector is empty"))
      } else {
        callback()
      }
    }
    return {
      value: [],
      define: {
        verbs: [],
      },
      form: {
        isCluster: false,
        name: "",
        namespace: "",
        labels: [],
        rules: []
      },
      rules: {
        name: [
          {required: true, message: 'please input name', trigger: 'blur'}
        ],
        selector: [
          {
            type: 'string',
            required: true,
            validator: selectorValidator,
            trigger: ['blur'],
            message: "please input selector"
          }
        ]
      }
    }
  },
  created() {
    this.load()
  },
  methods: {
    addRules() {
      if (this.form.rules == null) {
        this.form.rules = []
      }
      this.form.rules.push({
        verbs: [],
        apiGroups: [],
        resources: [],
        resourceNames: [],
        nonResourceURLs: [],
      })
      console.log(this.form.rules)
    },
    addPorts() {
      if (this.form.ports == null) {
        this.form.ports = []
      }
      this.form.ports.push({
        port: 80,
        targetPort: 80,
        nodePort: 0
      })
    },
    load() {
      //如果是编辑，则提前加载参数
      //获取url pod名称
      let name = this.$route.query.name
      if (name !== undefined) {
        this.disabled = true
        //请求详情
        let params = {
          namespace: this.$store.state.ns.nsName,
          name: name
        }
        this.$store.dispatch("role/getRoleDetailOrList", params).then(res => {
          // this.form = res.data
          this.form = res.data
        })
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          //校验容器子表单
          Message.error("提交失败，请检查必填型！")
          return false
        }
        //提交数据
        if(!this.form.isCluster){
          this.form.namespace = this.$store.state.ns.nsName
        }
        this.$store.dispatch("role/createRole", this.form).then(res => {
          Message.success(res.msg)
          this.$router.push(
            {
              path: "/rbac/rolelist"
            }
          )
        })
      })
    },
  }
}
</script>

<style scoped>
.col-class {
  margin: 5px 0;
}
</style>
