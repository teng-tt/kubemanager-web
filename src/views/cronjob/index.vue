<template>
  <div class="app-container">
    <div class="data-operation">
      <div class="data-operation-item" style="width: 20%">
        <el-input placeholder="输入关键词" v-model="keyword">
          <el-button slot="append" @click="filterCronJob()" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="data-operation-item">
        <el-button type="primary" @click="redirectTo('/workload/cronjob-edit')">新增</el-button>
      </div>
    </div>
    <el-table :data="podList">
      <el-table-column width="25">
        <template slot-scope="{row}">
          <i v-if="row.current===row.desired" style="color: #67C23A" class="el-icon-success"></i>
          <i v-else style="color:#F56C6C" class="el-icon-warning"></i>
        </template>
      </el-table-column>
      <el-table-column label="name" width="235" prop="name">
      </el-table-column>
      <el-table-column label="suspend" width="120" prop="suspend">
        <template slot-scope="{row}" style="cursor: pointer">
          {{ row.suspend }}
        </template>
      </el-table-column>
      <el-table-column label="active" width="120" prop="active"/>
      <el-table-column label="lastSchedule" prop="age">
        <template slot-scope="{row}" style="cursor: pointer">
          <timestamp :data="row.lastSchedule"></timestamp>
        </template>
      </el-table-column>
      <el-table-column label="age" prop="age">
        <template slot-scope="{row}" style="cursor: pointer">
          <timestamp :data="row.age"></timestamp>
        </template>
      </el-table-column>
      <el-table-column label="operation">
        <template slot-scope="{row}">
          <a class="operation-class" @click="editCronJob(row.name)">编辑</a>
          <a class="operation-class" @click="deleteCronJob(row.name)">删除</a>
        </template>

        <!--        <a class="operation-class">日志</a>-->
        <!--        <a class="operation-class">进入</a>-->

      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Timestamp from "@/components/Timestamp";
import Timeformat from "@/components/Timeformat";
import {Message} from "element-ui";

export default {
  name: "Index",
  components: {
    Timestamp,
    Timeformat
  },
  data() {
    return {
      keyword: "",
      podList: []
    }
  },
  created() {
    this.getCronJobItemOrList()
  },
  watch: {
    '$store.state.ns.nsName'(newVal) {
      this.getCronJobItemOrList()
    }
  },
  methods: {
    filterCronJob() {
      let params = {
        namespace: this.$store.state.ns.nsName,
        keyword: this.keyword
      }
      this.$store.dispatch("cronjob/getCronJobItemOrList", params).then(res => {
        this.podList = res.data
      })
    },
    getCronJobItemOrList() {
      let params = {
        namespace: this.$store.state.ns.nsName
      }
      this.$store.dispatch("cronjob/getCronJobItemOrList", params).then(res => {
        this.podList = res.data
      })
    },
    deleteCronJob(name) {
      let params = {
        namespace: this.$store.state.ns.nsName,
        name: name
      }
      this.$confirm('此操作将永久删除该CronJob, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch("cronjob/deleteCronJob", params).then(res => {
          Message.success(res.msg)
          //刷新当先页面(延迟3秒)
          this.getCronJobItemOrList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    editCronJob(name) {
      this.redirectTo("/workload/cronjob-edit?name=" + name)
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
