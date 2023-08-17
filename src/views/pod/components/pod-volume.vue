<template>
  <el-form-item label="volumes">
    <div v-for="(item,index) in volumes" class="volume-class">
      <el-row>
        <el-col class="col-class" :span="10" style="padding-right: 5px">
          <el-form-item label="类型" label-width="100px">
            <el-select v-model="item.type" placeholder="volume type" style="display: block">
              <el-option v-for="item in volumeOpts"
                         :label="item"
                         :key="item"
                         :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="col-class" :span="10">
          <el-form-item label="卷名" label-width="100px">
            <el-input v-model="item.name" placeholder="volume name"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="col-class" :span="4">
          <el-button style="height: 40px;margin-left: 10px" @click="volumes.splice(index,1)"
                     size="small"
                     type="danger">
            删除
            <i class="el-icon-delete"></i>
          </el-button>
        </el-col>
      </el-row>
      <el-row v-if="item.type==='configMap'">
        <el-col :span="10">
          <el-form-item label="configMap" label-width="100px">
            <el-select v-model="item.configMapRefVolume.name">
              <el-option v-for="(refItem,_) in resourceRef['configMap']"
                         :value="refItem"
                         :label="refItem"/>
            </el-select>
          </el-form-item>
          <el-form-item class="col-class" label="optional" label-width="120px">
            <el-switch v-model="item.configMapRefVolume.optional"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="item.type==='secret'">
        <el-col :span="10">
          <el-form-item label="secret" label-width="100px">
            <el-select v-model="item.secretRefVolume.name">
              <el-option v-for="(refItem,_) in resourceRef['secret']"
                         :value="refItem"
                         :label="refItem"/>
            </el-select>
          </el-form-item>
          <el-form-item class="col-class" label="optional" label-width="120px">
            <el-switch v-model="item.secretRefVolume.optional"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="border: 1px solid #eeeeee;background: #eeeeee;padding: 10px;border-radius: 10px"
              v-if="item.type==='downwardAPI'">
        <el-col class="col-class" v-for="(downwardAPIItem,downwardAPIItemIndex) in item.downwardAPIVolume.items"
                :span="24">
          <el-row>
            <el-col class="col-class" :span="10">
              <el-form-item label="fieldRefPath" label-width="100px">
                <el-input v-model="downwardAPIItem.fieldRefPath"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="col-class" :span="10">
              <el-form-item label="path" label-width="100px">
                <el-input v-model="downwardAPIItem.path"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="col-class" :span="4">
              <el-button style="height: 40px;margin-left: 10px"
                         @click="item.downwardAPIVolume.items.splice(downwardAPIItemIndex,1)"
                         size="small"
                         type="danger">
                删除
                <i class="el-icon-delete"></i>
              </el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-button @click.stop="addFieldPath(index)"
                   size="small"
                   type="primary">
          新增fieldPath
          <i class="el-icon-circle-plus"></i>
        </el-button>
      </el-row>
      <el-row v-if="item.type==='hostPath'">
        <el-col :span="10">
          <el-form-item label="type" label-width="100px">
            <el-select v-model="item.hostPathVolume.type">
              <el-option v-for="(opt,_) in hostPathOpts"
                         :value="opt"
                         :label="opt"/>
            </el-select>
          </el-form-item>
          <el-form-item class="col-class" label="宿主机路径" label-width="100px">
            <el-input v-model="item.hostPathVolume.path"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="item.type==='pvc'">
        <el-col :span="10">
          <el-form-item label="PVC名称" label-width="100px">
            <el-select v-model="item.PVCVolume.name">
              <el-option v-for="(opt,_) in resourceRef['pvc']"
                         :value="opt"
                         :label="opt"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <el-button @click.stop="addVolume"
               size="small"
               type="primary">
      新增卷
      <i class="el-icon-circle-plus"></i>
    </el-button>
  </el-form-item>
</template>

<script>
export default {
  name: "PodVolume",
  props: {
    volumes: {
      type: Array
    },
    resourceRef: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      envRef: {
        configMap: [],
        secret: [],
      },
      hostPathOpts: ["Directory", "DirectoryOrCreate", "File", "FileOrCreate", "Socket"],
      volumeOpts: ["emptyDir", "configMap", "secret", "hostPath", "downwardAPI", "pvc"]
    }
  },
  watch: {
    volumes: {
      handler(val) {
        this.$emit("tolerationsChange", val)
      },
      deep: true
    }
  },
  created() {
  },
  methods: {
    addFieldPath(index) {
      if (this.volumes[index].downwardAPIVolume.items == null) {
        this.volumes[index].items = []
      }
      this.volumes[index].downwardAPIVolume.items.push({})
    },
    addVolume() {
      this.volumes.push(
        {
          type: "emptyDir",
          name: "",
          configMapRefVolume: {
            name: "",
            optional: false
          },
          secretRefVolume: {
            name: "",
            optional: false
          },
          hostPathVolume: {
            type: "Unset",
            path: ""
          },
          downwardAPIVolume: {
            type: "downwardAPI",
            items: []
          },
          PVCVolume: {
            name: ""
          }
        }
      )
    }
  }
}
</script>

<style scoped>
.col-class {
  margin: 5px 0;
}
</style>
