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
        <el-breadcrumb-item :to="{ path: '/harbor/repositories?projectName='+projectName }">{{
            projectName
          }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ repositoryName }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table :data="list">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table :data="scope.row.tags">
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column label="拉取命令">
              <template slot-scope="{row}">
                <i style="" class="el-icon-document-copy copy-btn"
                   @click="copyToClipboard(scope.row.host,row.name)"></i>
              </template>
            </el-table-column>
            <el-table-column prop="pull_time" label="拉取时间"></el-table-column>
            <el-table-column prop="push_time" label="推送时间"></el-table-column>
            <!-- 可根据需要展示更多的字段 -->
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="Artifacts" width="200" prop="digest">
        <template slot-scope="scope">
          <i style="color: #67C23A" class="docker"></i>
          <div v-if="scope.row.digest.length > 10">
            <el-tooltip effect="dark" :content="scope.row.digest" placement="top">
              <a>{{ scope.row.digest.slice(0, 20) }}</a>
            </el-tooltip>
          </div>
          <div v-else>
            <a>{{ scope.row.digest }}</a>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="tags">
        <template slot-scope="{row}">
          {{ getTags(row.tags) }}
        </template>
      </el-table-column>
      <el-table-column label="大小" width="150" prop="size">
        <template slot-scope="{row}">
          {{ convertBytesToMiBGiB(row.size) }}
        </template>
      </el-table-column>
      <el-table-column label="推送时间" width="300" prop="push_time"/>
      <el-table-column label="拉取时间" width="300" prop="pull_time"/>
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
import Clipboard from 'clipboard';
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
      repositoryName: "",
      total: 0,
      pageSize: 10,
      currentPage: 1, // 当前页码
    }
  },
  watch: {
    '$store.state.ns.nsName'(newVal) {
      this.getList()
    }
  },
  created() {
    this.projectName = this.$route.query.projectName
    this.repositoryName = this.reNewRepositoryName(this.$route.query.repositoryName)
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
    getTags(tags) {
      if (tags == null) {
        return ""
      }
      let rs = []
      for (let i = 0; i < tags.length; i++) {
        rs.push(tags[i].name)
      }
      return rs.join(",")
    },
    copyToClipboard(host, tag) {
      let dockerpull = host + "/" + this.projectName + "/" + this.repositoryName + ":" + tag
      const clipboard = new Clipboard('.copy-btn', {
        text: () => dockerpull
      });
      clipboard.on('success', (e) => {
        Message.success("复制成功！")
        clipboard.destroy();
      });

      clipboard.on('error', (e) => {
        console.error('复制失败:', e.action);
        clipboard.destroy();
      });

      // clipboard.onClick({
      //   target: {
      //     className: 'copy-btn'
      //   }
      // });
    },
    toggleExpand(row) {
      row.isExpanded = !row.isExpanded;
    },
    convertBytesToMiBGiB(bytes) {
      if (bytes < 1024 * 1024 * 1024) {
        // 不足1GiB，返回MiB
        const mib = bytes / (1024 * 1024);
        return mib.toFixed(2) + " MiB";
      } else {
        // 大于等于1GiB，返回GiB
        const gib = bytes / (1024 * 1024 * 1024);
        return gib.toFixed(2) + " GiB";
      }
    },
    reNewRepositoryName(curRepositoryName) {
      let newRepositoryName = ""
      let curRepositoryNameArr = curRepositoryName.split("/")
      let lent = curRepositoryNameArr.length
      if (lent <= 2) {
        newRepositoryName = curRepositoryNameArr[lent - 1]
      } else {
        let newCurRepositoryNameArr = curRepositoryNameArr.slice(1, lent)
        newRepositoryName = newCurRepositoryNameArr.join("%252F");
      }
      return newRepositoryName
    },
    getList() {
      let params = {
        projectName: this.projectName,
        repositoryName: this.repositoryName,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      this.$store.dispatch("harbor/getArtifacts", params).then(res => {
        this.list = res.data.data
        this.total = res.data.totalCount
        this.pageSize = res.data.pageSize
        this.currentPage = res.data.currentPage
      })
    },
    filter() {
      let params = {
        projectName: this.projectName,
        repositoryName: this.repositoryName,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        keyword: this.keyword,
      }
      this.$store.dispatch("harbor/getArtifacts", params).then(res => {
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

.copy-btn {
  font-size: 18px;
  cursor: pointer
}

.operation-class {
  margin: 5px;
}

.operation-class:hover {
  color: #409EFF;
}
</style>
