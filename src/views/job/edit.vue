<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-position="left" label-width="150px" class="my-form">
      <el-form-item label="name" prop="base.name">
        <el-input v-model="form.base.name" placeholder="deployment name"></el-input>
      </el-form-item>
      <el-form-item label="completions">
        <el-input-number v-model="form.base.completions" placeholder="deployment name"></el-input-number>
      </el-form-item>
      <!--      <el-form-item label="replicas">-->
      <!--        <el-input-number v-model="form.base.replicas" placeholder="副本数"/>-->
      <!--      </el-form-item>-->
      <el-form-item label="labels">
        <el-row v-for="(item,index) in form.base.labels" class="for-item">
          <el-col :span="10" style="padding-right: 5px">
            <el-input v-model="item.key" placeholder="label key"></el-input>
          </el-col>
          <el-col :span="1" style="text-align: center">-</el-col>
          <el-col :span="10">
            <el-input v-model="item.value" placeholder="label value"></el-input>
          </el-col>
          <el-col :span="3" style="text-align: center">
            <el-button style="height: 40px" @click="form.base.labels.splice(index,1)"
                       size="small"
                       type="danger">
              delete
              <i class="el-icon-delete"></i>
            </el-button>
          </el-col>
        </el-row>
        <el-button @click="form.base.labels.push({})"
                   size="small"
                   type="primary">
          add label
          <i class="el-icon-circle-plus"></i>
        </el-button>
      </el-form-item>
<!--      <el-form-item label="selector" prop="base.selector">-->
<!--        <el-row v-for="(item,index) in form.base.selector" class="for-item">-->
<!--          <el-col :span="10" style="padding-right: 5px">-->
<!--            <el-input v-model="item.key" placeholder="label key"></el-input>-->
<!--          </el-col>-->
<!--          <el-col :span="1" style="text-align: center">-</el-col>-->
<!--          <el-col :span="10">-->
<!--            <el-input v-model="item.value" placeholder="label value"></el-input>-->
<!--          </el-col>-->
<!--          <el-col :span="3" style="text-align: center">-->
<!--            <el-button style="height: 40px" @click="form.base.selector.splice(index,1)"-->
<!--                       size="small"-->
<!--                       type="danger">-->
<!--              delete-->
<!--              <i class="el-icon-delete"></i>-->
<!--            </el-button>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-button @click="form.base.selector.push({})"-->
<!--                   size="small"-->
<!--                   type="primary">-->
<!--          add label-->
<!--          <i class="el-icon-circle-plus"></i>-->
<!--        </el-button>-->
<!--      </el-form-item>-->
      <el-divider></el-divider>
      <el-form-item label="podTemplate">
        <!--        <el-form-item label="name" prop="base.name">-->
        <!--          <el-input :disabled="disabled" v-model="form.template.base.name" placeholder="pod name"/>-->
        <!--        </el-form-item>-->
        <el-form-item label="labels">
          <el-row v-for="(item,index) in form.template.base.labels" class="for-item">
            <el-col :span="10" style="padding-right: 5px">
              <el-input v-model="item.key" placeholder="label key"></el-input>
            </el-col>
            <el-col :span="1" style="text-align: center">-</el-col>
            <el-col :span="10">
              <el-input v-model="item.value" placeholder="label value"></el-input>
            </el-col>
            <el-col :span="3" style="text-align: center">
              <el-button style="height: 40px" @click="form.template.base.labels.splice(index,1)"
                         size="small"
                         type="danger">
                delete
                <i class="el-icon-delete"></i>
              </el-button>
            </el-col>
          </el-row>
          <el-button @click="form.template.base.labels.push({})"
                     size="small"
                     type="primary">
            add label
            <i class="el-icon-circle-plus"></i>
          </el-button>
        </el-form-item>
        <el-form-item label="imagePullSecrets">
          <el-select multiple placeholder="please select secret" v-model="form.template.base.imagePullSecrets"
                     style="width: 100%">
            <el-option v-for="item in resourceRef['regSecret']"
                       :key="item"
                       :label="item"
                       :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="restartPolicy">
          <el-select v-model="form.template.base.restartPolicy" placeholder="please select restart policy"
                     style="width: 100%">
            <el-option v-for="item in restartPolicyOpts"
                       :key="item"
                       :value="item"
                       :label=item></el-option>
          </el-select>
        </el-form-item>
        <pod-networking :net-working="form.template.netWorking" @netWorkingChange="netWorkingChange"/>
        <pod-node-scheduling :node-scheduling="form.template.nodeScheduling"
                             @nodeSchedulingChange="nodeSchedulingChange"></pod-node-scheduling>
        <pod-tolerations :tolerations="form.template.tolerations"
                         @tolerationsChange="tolerationsChange"></pod-tolerations>
        <pod-volume :volumes="form.template.volumes" :resourceRef="resourceRef"
                    @volumechange="volumesChange"></pod-volume>
        <el-form-item>
          <el-divider/>
        </el-form-item>
        <container-list
          :label="'initContainers'"
          :base="form.template.base"
          :volumes="form.template.volumes"
          :data="form.template.initContainers"
          :resourceRef="resourceRef"
          ref="initContainers"
          :define="define"/>
        <container-list
          :label="'containers'"
          :base="form.template.base"
          :volumes="form.template.volumes"
          :resourceRef="resourceRef"
          :data="form.template.containers"
          ref="containers"
          :define="define"/>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit('form')" type="primary">
          submit
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import CreateContainerDialog from "@/views/pod/components/create-container-dialog";
import PodNetworking from "@/views/pod/components/pod-networking";
import PodNodeScheduling from "@/views/pod/components/pod-node-scheduling";
import PodTolerations from "@/views/pod/components/pod-tolerations";
import PodVolume from "@/views/pod/components/pod-volume";
import ContainerList from "@/views/pod/components/container"
import {Message} from 'element-ui'

export default {
  name: "PodCreate",
  components: {
    CreateContainerDialog,
    ContainerList,
    PodNetworking,
    PodNodeScheduling,
    PodTolerations,
    PodVolume
  },
  data() {
    const selectorValidator = (rule, value, callback) => {
      //校验容器定义是否为空
      if (value.length === 0) {
        callback(new Error("please input selector"))
      } else {
        callback()
      }
    }
    return {
      //为true 表示为更新操作 名字禁止修改
      disabled: false,
      resourceRef: {
        configMap: [],
        secret: [],
        regSecret: [],
        pvc: [],
        configMapKeys: {},
        secretKeys: {}
      },
      define: {
        volumeOpts: [
          "emptyDir"
        ],
        imagePullPolicyOpts: [
          "Always", "IfNotPresent", "Never"
        ],
      },
      restartPolicyOpts: [
        "On-Failure", "Never"
      ],
      imagePullSecrets: [],
      dialogLabelVisible: false,
      dialogContainerVisible: false,
      dialogEnvVisible: false,
      activeNames: [],
      form: {
        base: {
          name: "",
          labels: [],
          completions: 1,
          // replicas: 1,
          selector: []
        },
        template: {
          base: {
            name: "",
            labels: [],
            imagePullSecrets: [],
            restartPolicy: "On-Failure",
            namespace: ""
          },
          volumes: [],
          nodeScheduling: {
            type: "nodeAny",
            nodeName: "",
            nodeSelector: [],
            nodeAffinity: [],
          },
          tolerations: [],
          netWorking: {
            hostNetwork: false,
            dnsConfig: {
              nameservers: []
            },
            dnsPolicy: "Default",
            hostAliases: [],
            hostName: ""
          },
          initContainers: [],
          containers: [],
        },
      },
      rules: {
        "base.name": [
          {required: true, message: 'please input deployment name', trigger: 'blur'}
        ],
        "base.selector": [
          {
            type: "array",
            required: true,
            validator: selectorValidator,
            trigger: ['blur']
          }
        ],
        "base.template.restartPolicy": [
          {required: true, message: 'please input restartPolicy', trigger: 'blur'}
        ],
      }
    }
  },
  created() {
    this.load()
    this.loadRef()
  },
  methods: {
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
        this.$store.dispatch("job/getJobItemOrList", params).then(res => {
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
        //校验container表单，init-container可以不填写的
        this.$refs.initContainers.onSubmit("form")
        this.$refs.containers.onSubmit("form")
        //获取子组件变量校验是否表单验证通过
        if (!this.$refs.initContainers.formValidatePass || !this.$refs.containers.formValidatePass) {
          Message.error("提交失败，请检查必填项！")
          return false
        }
        //组件数据提交到后台
        this.form.template.initContainers = this.$refs.initContainers.form.containers
        this.form.template.containers = this.$refs.containers.form.containers
        this.form.base.namespace = this.$store.state.ns.nsName
        this.$store.dispatch("job/createJob", this.form).then(response => {
          Message.success(response.msg)
          this.$router.push(
            {
              path: "/workload/jobs"
            }
          )
        })
      })
    },
    close() {
      this.dialogVisible = false
    },
    closeContainerDialog() {
      this.dialogContainerVisible = false
    },
    handleChange(val) {
      console.log(val);
    },
    netWorkingChange(val) {
      this.form.template.netWorking = val
    },
    nodeSchedulingChange(val) {
      this.form.template.nodeScheduling = val
    },
    tolerationsChange(val) {
      this.form.template.tolerations = val
    },
    volumesChange(val) {
      this.form.volumes = val
    },
    loadRef() {
      //加载configmap
      this.resourceRef.configMap = []
      let params = {
        namespace: this.$store.state.ns.nsName,
      }
      this.$store.dispatch("cm/getCmItemOrList", params).then(res => {
        let data = res.data
        for (let i = 0; i < data.length; i++) {
          this.resourceRef.configMap.push(data[i].name)
          //加载keys
          params.name = data[i].name
          this.$store.dispatch("cm/getCmItemOrList", params).then(resDetail => {
            let dataList = resDetail.data
            let keys = []
            for (let j = 0; j < dataList.length; j++) {
              keys.push(dataList[j].key)
            }
            this.$set(this.resourceRef.configMapKeys, resDetail.data.name, keys)
          })
        }
      })
      //加载secret
      let params_secret = {
        namespace: this.$store.state.ns.nsName,
      }
      this.resourceRef.secret = []
      this.resourceRef.regSecret = []
      this.$store.dispatch("secret/getSecretItemOrList", params_secret).then(resSecret => {
        let data_secret = resSecret.data
        for (let i = 0; i < data_secret.length; i++) {
          this.resourceRef.secret.push(data_secret[i].name)
          if (data_secret[i].type === 'kubernetes.io/dockerconfigjson') {
            this.resourceRef.regSecret.push(data_secret[i].name)
          }
          //加载keys
          params_secret.name = data_secret[i].name
          this.$store.dispatch("secret/getSecretItemOrList", params_secret).then(resDetail => {
            let dataList = resDetail.data
            let keys = []
            for (let j = 0; j < dataList.length; j++) {
              keys.push(dataList[j].key)
            }
            this.$set(this.resourceRef.secretKeys, resDetail.data.name, keys)
          })
        }
      })

      //加载pvc
      this.resourceRef.pvc = []
      this.$store.dispatch("pvc/getPVCList", params_secret).then(resPvc => {
        let data = resPvc.data
        for (let i = 0; i < data.length; i++) {
          this.resourceRef.pvc.push(data[i].name)
        }
      })
    },
  }
}
</script>

<style scoped>
.my-form {
  width: 90%;
  margin-left: 5%;
}


.el-form-item {
  margin-bottom: 22px;
}

.for-item {
  margin-bottom: 5px;
}
</style>
