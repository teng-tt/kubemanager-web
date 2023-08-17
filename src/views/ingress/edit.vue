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
      <el-form-item label="rules">
        <div v-for="(item,index) in form.rules" class="port-class">
          <el-form-item label="host">
            <el-input v-model="item.host"></el-input>
          </el-form-item>
          <el-form-item label="value.http.paths">
            <div v-for="(item_nex1,index_nex1) in item.value.http.paths" class="port-class">
              <el-form-item style="margin-top: 5px" label="path">
                <el-input v-model="item_nex1.path"></el-input>
              </el-form-item>
              <el-form-item style="margin-top: 5px" label="pathType">
                <el-select style="width: 50%" v-model="item_nex1.pathType" placeholder="选择 pathType">
                  <el-option label="Prefix" value="Prefix"/>
                  <el-option label="Extract" value="Extract"/>
                </el-select>
                <el-form-item style="margin-top: 5px" label="backend.service">
                  <el-form-item style="margin-top: 5px" label="name">
                    <el-input v-model="item_nex1.backend.service.name"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-top: 5px" label="port.number">
                    <el-input-number v-model="item_nex1.backend.service.port.number"></el-input-number>
                  </el-form-item>
                </el-form-item>
              </el-form-item>
              <el-button @click="form.rules[index].value.http.paths.splice(index_nex1,1)"
                         size="small"
                         type="danger">
                删除
                <i class="el-icon-delete"></i>
              </el-button>
            </div>
            <el-button @click.stop="addPath(index)"
                       size="small"
                       type="primary">
              add path
              <i class="el-icon-circle-plus"></i>
            </el-button>
          </el-form-item>
          <el-button @click="form.rules.splice(index,1)"
                     size="small"
                     type="danger">
            删除
            <i class="el-icon-delete"></i>
          </el-button>
        </div>
        <el-button @click.stop="addRule"
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
    const containersValidator = (rule, value, callback) => {
      //校验容器定义是否为空
      if (value.length === 0) {
        callback(new Error("data is empty"))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: "",
        namespace: "",
        labels: [],
        rules: [],
      },
      rules: {
        name: [
          {required: true, message: 'please input name', trigger: 'blur'}
        ],
        data: [
          {
            type: 'string',
            required: true,
            validator: containersValidator,
            trigger: ['blur'],
            message: "please input data"
          }
        ]
      }
    }
  },
  created() {
    this.load()
  },
  methods: {
    addRule() {
      if (this.form.rules == null) {
        this.form.rules = []
      }
      this.form.rules.push({
        value: {
          http: {
            paths: []
          }
        }
      })
    },
    addPath(index) {
      if (this.form.rules[index].value.http.paths == null) {
        this.form.rules[index].value.http.paths = []
      }
      this.form.rules[index].value.http.paths.push({
        path: "",
        pathType: "",
        backend: {
          service: {
            name: "",
            port: {
              number: 80
            }
          }
        }
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
        this.$store.dispatch("ingress/getIngressItemOrList", params).then(res => {
          // this.form = res.data
          this.form = res.data
          console.log(this.form)
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
        this.form.namespace = this.$store.state.ns.nsName
        this.$store.dispatch("ingress/createIngress", this.form).then(res => {
          Message.success(res.msg)
          this.$router.push(
            {
              path: "/discovery/ingresses"
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
</style>
