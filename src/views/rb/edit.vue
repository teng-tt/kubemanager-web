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
      <el-form-item label="roleRef">
        <el-select v-model="form.roleRef" placeholder="请选择">
          <el-option
            v-for="item in roleRefList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="subjects">
        <div v-for="(item,index) in form.subjects" class="port-class">
          <el-form-item label="namespace">
            <el-input disabled v-model="item.namespace" class="for-item"></el-input>
          </el-form-item>
          <el-form-item label="name">
            <el-select v-model="item.name" placeholder="请选择" style="width: 100%">
              <el-option
                v-for="item in saRefList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-button @click="form.subjects.splice(index,1)"
                     size="small"
                     type="danger">
            delete
            <i class="el-icon-delete"></i>
          </el-button>
        </div>
        <el-button @click="addSubject()"
                   size="small"
                   type="primary">
          add subject
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
      roleRefList: [],
      saRefList:[],
      form: {
        isCluster:false,
        name: "",
        namespace: "",
        labels: [],
        roleRef: [],
        subjects: []
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
    this.loadRole()
    this.loadSa()
  },
  methods: {
    loadSa() {
      let params = {
        namespace: this.$store.state.ns.nsName
      }
      this.$store.dispatch("sa/getSaList", params).then(res => {
        let rdata = res.data
        for(let i=0;i<rdata.length;i++){
          this.saRefList.push({
            value:rdata[i].name,
            label:rdata[i].name,
          })
        }
      })
    },
    loadRole() {
      let params = {
        namespace: this.$store.state.ns.nsName
      }
      this.$store.dispatch("role/getRoleDetailOrList", params).then(res => {
        let rdata = res.data
        for(let i=0;i<rdata.length;i++){
          this.roleRefList.push({
            value:rdata[i].name,
            label:rdata[i].name,
          })
        }
      })
    },
    addSubject() {
      if (this.form.subjects == null) {
        this.form.subjects = []
      }
      this.form.subjects.push({
        namespace: this.$store.state.ns.nsName,
        name: ""
      })
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
        this.$store.dispatch("rb/getRbDetailOrList", params).then(res => {
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
        this.$store.dispatch("rb/createRb", this.form).then(res => {
          Message.success(res.msg)
          this.$router.push(
            {
              path: "/rbac/rblist"
            }
          )
        })
      })
    },
  }
}
</script>

<style scoped>
.port-class {
  padding: 10px;
  border: 1px solid #eee;
  margin: 10px 0;
  border-radius: 10px;
}

.col-class {
  margin: 5px 0;
}
</style>
