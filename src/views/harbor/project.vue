<template>
  <div class="app-container">
    <div class="data-operation">
      <div class="data-operation-item" style="width: 20%">
        <el-input placeholder="输入关键词" v-model="keyword">
          <el-button slot="append" @click="filter()" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
    <el-table :data="list">
      <!--      <el-table-column width="25">-->
      <!--        <template slot-scope="{row}">-->
      <!--          <i style="color: #67C23A" class="el-icon-success"></i>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column label="项目名称" width="150" prop="name">
        <template slot-scope="{row}">
          <a style="color: blue" @click="getMore(row.name)">{{ row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column label="访问级别" width="150" prop="hosts">
        <template slot-scope="{row}">
          {{ row.metadata.public === "true" ? "公开" : "私有" }}
        </template>
      </el-table-column>
      <el-table-column label="镜像仓库数量" width="150" prop="repo_count"/>
      <el-table-column label="创建时间" width="300" prop="creation_time"/>
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
      inputvalue: "",
      images: [],
      keyword: "",
      list: [],
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
    this.getList()
  },
  methods: {
    querySearch(queryString, cb) {
      this.$store.dispatch("harbor/matchImage", {
        keyword: queryString
      }).then(res => {
        let data = res.data
        this.images = []
        for (let i = 0; i < data.length; i++) {
          this.images.push({
            value: data[i]
          })
        }
        console.log(this.images)
        var images = this.images;
        // var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(images);
      })
    },
    handleSelect(item) {
      console.log(item);
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },
    getMore(name) {
      //页面跳转到仓库列表
      this.$router.push(
        {path: '/harbor/repositories?projectName=' + name}
      )
    },
    getList() {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      this.$store.dispatch("harbor/getProjects", params).then(res => {
        this.list = res.data.data
        this.total = res.data.totalCount
        this.pageSize = res.data.pageSize
        this.currentPage = res.data.currentPage
      })
    },
    filter() {
      let params = {
        namespace: this.$store.state.ns.nsName,
        keyword: this.keyword,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      this.$store.dispatch("harbor/getProjects", params).then(res => {
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
.custom-pagination {
  transition: opacity 0.3s ease-in-out; /* 添加过渡效果 */
}

.custom-pagination.v-enter,
.custom-pagination.v-leave-to {
  opacity: 0; /* 过渡起点和终点的透明度 */
}

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
