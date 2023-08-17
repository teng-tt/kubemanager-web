<template>
  <div class="app-container">
    <div class="data-operation">
      <div class="data-operation-item" style="width: 20%">
        <el-input placeholder="输入关键词" v-model="keyword">
          <el-button slot="append" @click="filter()" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
    <div style="margin: 12px 0">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/harbor/projects' }">harbor</el-breadcrumb-item>
        <el-breadcrumb-item>{{ projectName }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table :data="list">
      <el-table-column label="项目名称" width="150" prop="name">
        <template slot-scope="{row}">
          <a style="color: blue" @click="getMore(row.name)">{{ row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column label="Artifacts" width="150" prop="artifact_count"/>
      <el-table-column label="下载次数" width="150" prop="pull_count"/>
      <el-table-column label="最新变更时间" width="300" prop="update_time"/>
    </el-table>
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20, 30]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
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
      list: [],
      projectName: "",
      total: 0,
      pageSize: 10,
      currentPage: 1, // 当前页码
    }
  },
  watch: {
    '$store.state.ns.nsName'(newVal) {
      this.getNodeItemOrList()
    }
  },
  created() {
    this.projectName = this.$route.query.projectName
    this.getList()
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },
    getMore(repositoryName) {
      //页面跳转到仓库列表
      let projectName = this.projectName
      this.$router.push(
        {path: '/harbor/artifacts?projectName=' + projectName + "&repositoryName=" + repositoryName}
      )
    },
    getList() {
      let params = {
        projectName: this.projectName,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      this.$store.dispatch("harbor/getRepositories", params).then(res => {
        this.list = res.data.data
        this.total = res.data.totalCount
        this.pageSize = res.data.pageSize
        this.currentPage = res.data.currentPage
      })
    },
    filter() {
      let params = {
        projectName: this.projectName,
        namespace: this.$store.state.ns.nsName,
        keyword: this.keyword,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      this.$store.dispatch("harbor/getRepositories", params).then(res => {
        this.list = res.data.data
        this.total = res.data.totalCount
        this.pageSize = res.data.pageSize
        this.currentPage = res.data.currentPage
      })
    },
    goEdit(name) {
      this.redirectTo("/discovery/ingress-edit?name=" + name)
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
