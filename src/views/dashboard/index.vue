<template>
  <div class="dashboard-container">
    <div class="dashboard-group">
		<el-row>
			<el-col class="card" v-for="item in cluster" :span="6">
        <el-card  class="box-card">
          <div slot="header" class="clearfix">
            <span>{{item.value}}</span>
          </div>
          <div class="text item">
            {{item.title}}
          </div>
        </el-card>
<!--				<dashboard-card :data="item"/>-->
			</el-col>
		</el-row>
	</div>
	<div class="dashboard-group">
		<el-row>
			<el-col class="card" v-for="item in resource" :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{item.value}}</span>
          </div>
          <div class="text item">
            {{item.title}}
          </div>
        </el-card>
<!--				<dashboard-card :data="item"/>-->
			</el-col>
		</el-row>
	</div>
	<div class="dashboard-group">
		<el-row style="height: 200px;">
			<el-col v-for="item in usage" class="card" :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{item.value}}</span>
          </div>
          <div class="text item">
            {{item.title}}
          </div>
        </el-card>
<!--				<dash-pointer-card :data="item"/>-->
			</el-col>
		</el-row>
	</div>
	<div>
		<el-row style="height: 200px;">
			<el-col v-for="item in usageRange" class="card" :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{item.title}}</span>
          </div>
          <div class="text item">
            {{item.value}}
          </div>
        </el-card>
<!--				<dash-range-card :data="item"/>-->
			</el-col>
		</el-row>
	</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  // components: {
	// DashboardCard,
	// DashResourceCard,
	// DashPointerCard,
	// DashRangeCard,
  // },
  data() {
	return {
		resource: [],
		cluster: [],
		usage: [],
		usageRange: [],
	}
  },
  created() {
	this.getData()
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    getData() {
      this.$store.dispatch("metrics/getMetricsDashboard").then(res => {
        this.cluster = res.data.cluster
        this.resource = res.data.resource
        this.usage = res.data.usage
        this.usageRange = res.data.usageRange
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
