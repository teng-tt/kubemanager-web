<template>
  <div class="app-container">
    <div class="data-operation">
      <div class="data-operation-item" style="width: 20%">
        <el-input placeholder="输入关键词" v-model="keyword">
          <el-button slot="append" @click="filterPv()" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="data-operation-item">
        <el-button type="primary" @click="redirectTo('/volume/sc-edit')">新增</el-button>
      </div>
    </div>
    <el-table :data="list">
      <el-table-column width="25">
        <template slot-scope="{row}">
          <i style="color: #67C23A" class="el-icon-success"></i>
        </template>
      </el-table-column>
      <el-table-column label="name" width="100" prop="name"/>
      <el-table-column label="provisioner" width="200" prop="provisioner"></el-table-column>
      <el-table-column label="mountOptions" width="120" prop="mountOptions"></el-table-column>
      <el-table-column label="reclaimPolicy" width="120" prop="reclaimPolicy"></el-table-column>
      <el-table-column label="volumeBindingMode" width="160" prop="volumeBindingMode"></el-table-column>
      <el-table-column label="age" width="100" prop="age">
        <template slot-scope="{row}" style="cursor: pointer">
          <timestamp :data="row.age"></timestamp>
        </template>
      </el-table-column>
      <el-table-column label="operation">
        <template slot-scope="{row}">
          <a class="operation-class" @click="doDel(row.name)">删除</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Timestamp from "@/components/Timestamp";
import {Message} from "element-ui";

export default {
  name: "Index",
  components: {
    Timestamp
  },
  data() {
    return {
      keyword: "",
      list: []
    }
  },
  created() {
    this.getScList()
  },
  methods: {
    getScList() {
      let params = {
        namespace: this.$store.state.ns.nsName
      }
      this.$store.dispatch("sc/getScList", params).then(res => {
        console.log(res.data)
        this.list = res.data
      })
    },
    doDel(name) {
      let params = {
        name: name,
        namespace: this.$store.state.ns.nsName
      }
      this.$confirm('此操作将永久删除该StorageClass, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch("sc/deleteSc", params).then(res => {
          Message.success(res.msg)
          //刷新当先页面(延迟3秒)
          this.getScList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    filterPv() {
      let params = {
        namespace: this.$store.state.ns.nsName,
        keyword: this.keyword
      }
      this.$store.dispatch("sc/getScList", params).then(res => {
        this.list = res.data
      })
    },
    redirectTo(url) {
      this.$router.push(
        {
          path: url
        }
      )
    },
  }
}
</script>

<style scoped>
.data-operation-item {
  display: inline-block;
}

.data-operation div:nth-child(n+2) {
  margin-left: 5px;
}

.operation-class {
  margin: 5px;
}

.operation-class:hover {
  color: #409EFF;
}
</style>
