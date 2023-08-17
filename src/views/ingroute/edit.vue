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
      <el-form-item label="entryPoints">
        <el-select style="width: 50%" v-model="form.entryPoints" placeholder="选择 entryPoint" multiple>
          <el-option label="http" value="http"/>
          <el-option label="https" value="https"/>
        </el-select>
      </el-form-item>
      <el-form-item label="routes">
        <div v-for="(item,index) in form.routes" class="port-class">
          <el-row>
            <el-col class="col-class" :span="20" style="padding-right: 5px">
              <el-form-item style="margin-bottom: 5px" label="match">
                <el-input v-model="item.match"></el-input>
              </el-form-item>
              <el-form-item style="margin-bottom: 5px" label="kind">
                <el-input disabled v-model="item.kind"></el-input>
              </el-form-item>
              <el-form-item style="margin-bottom: 5px" label="services">
                <div v-for="(item_nex1,index_nex1) in item.services" class="port-class">
                  <el-form-item style="margin-bottom: 5px" label="name">
                    <el-input v-model="item_nex1.name"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 5px" label="port">
                    <el-input-number v-model="item_nex1.port"></el-input-number>
                  </el-form-item>
                  <el-button @click="form.routes[index].services.splice(index_nex1,1)"
                             size="small"
                             type="danger">
                    删除
                    <i class="el-icon-delete"></i>
                  </el-button>
                </div>
                <el-button @click.stop="addService(index)"
                           size="small"
                           type="primary">
                  add service
                  <i class="el-icon-circle-plus"></i>
                </el-button>
              </el-form-item>
              <el-form-item label="middlewares">
                <div v-for="(item_nex1,index_nex1) in item.middlewares" class="port-class">
                  <el-form-item label="name">
                    <el-select v-model="item_nex1.name" placeholder="选择中间件">
                      <el-option v-for="(item_nex2) in middlewareList" :label="item_nex2" :value="item_nex2"/>
                    </el-select>
                  </el-form-item>
                  <el-button @click="form.routes[index].middlewares.splice(index_nex1,1)"
                             size="small"
                             type="danger">
                    删除
                    <i class="el-icon-delete"></i>
                  </el-button>
                </div>
                <el-button @click.stop="addMiddleware(index)"
                           size="small"
                           type="primary">
                  add middleware
                  <i class="el-icon-circle-plus"></i>
                </el-button>
              </el-form-item>
              <el-button @click="form.routes.splice(index,1)"
                         size="small"
                         type="danger">
                删除
                <i class="el-icon-delete"></i>
              </el-button>
            </el-col>
          </el-row>
        </div>
        <el-button @click.stop="addRoute"
                   size="small"
                   type="primary">
          add route
          <i class="el-icon-circle-plus"></i>
        </el-button>
      </el-form-item>
      <el-form-item v-if="form.tls!==null" label="tls">
        <el-form-item label="secretName">
          <el-input v-model="form.tls.secretName"/>
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
    return {
      form: {
        name: "",
        namespace: "",
        labels: [],
        routes: [],
        tls: {
          secretName: ""
        }
      },
      middlewareList: [],
      rules: {
        name: [
          {required: true, message: 'please input name', trigger: 'blur'}
        ]
      },

    }
  },
  created() {
    this.load()
    this.getMiddlewareList()
  },
  methods: {
    getMiddlewareList() {
      let params = {
        namespace: this.$store.state.ns.nsName,
        name: name
      }
      this.$store.dispatch("ingroute/getMiddlewareList", params).then(res => {
        this.middlewareList = res.data
      })
    },
    addMiddleware(index) {
      if (this.form.routes[index].middlewares == null) {
        this.form.routes[index].middlewares = []
      }
      this.form.routes[index].middlewares.push({
        name: "",
      })
    },
    addService(index) {
      if (this.form.routes[index].services == null) {
        this.form.routes[index].services = []
      }
      this.form.routes[index].services.push({
        name: "",
        port: 80
      })
    },
    addRoute() {
      if (this.form.routes == null) {
        this.form.routes = []
      }
      this.form.routes.push({
        match: "",
        kind: "Rule",
        services: [],
        middlewares: []
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
        this.$store.dispatch("ingroute/getIngRouteItemOrList", params).then(res => {
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
        this.form.namespace = this.$store.state.ns.nsName
        this.$store.dispatch("ingroute/createIngRoute", this.form).then(res => {
          Message.success(res.msg)
          this.$router.push(
            {
              path: "/discovery/ingroutes"
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
