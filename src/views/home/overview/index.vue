<template>
  <div style="padding:20px;">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-row :gutter="12"  style="text-align:center;line-height:25px;">
        <el-col :span="8" >
          <el-card shadow="always" >
            <p>粉丝数</p>
            <p>50</p>
            <p>昨日馈赠:0</p>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="always">            
            <p>粉丝阅读累计阅读数</p>
            <p>3000</p>
            <p>累计阅读数:0</p></el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="always">
            <p>阅读粉丝收益</p>
            <p>800</p>
            <p>月度累计收益:800元</p>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card" style="margin-top:20px;">
  <div slot="header" class="clearfix">
    <span>数据分析</span>
  </div>
  <div ref="wrap" style="height:400px;"></div>
</el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
mounted() {
  let myChart = echarts.init(this.$refs.wrap);
  let option = {
    title: {
        text: '折线图堆叠'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'视频广告',
            type:'line',
            stack: '总量',
            data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
            name:'直接访问',
            type:'line',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
            name:'搜索引擎',
            type:'line',
            stack: '总量',
            data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
};
  myChart.setOption(option);
},

};
</script>

<style>
</style>