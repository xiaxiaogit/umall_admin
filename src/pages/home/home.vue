<template>
  <div>
    <div id="main"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import echarts from "echarts";

export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqListAction",
    }),
  },
  watch: {
    list: {
      handler() {
        if (this.list.length > 0) {
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById("main"));

          // 指定图表的配置项和数据
          var option = {
            title: {
              text: "商品分类",
            },
            tooltip: {},
            legend: {
              data: ["数量"],
            },
            xAxis: {
              data: this.list.map((item) => item.catename),
            },
            yAxis: {},
            series: [
              {
                name: "销量",
                type: "bar",
                data: this.list.map((item) =>
                 { console.log(item.children)
                 if(item.children===undefined){
                   return 0
                 }else{
                    return item.children.length
                 }
                     
                 }
                 ),
              },
            ],
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.reqCateList();
  },
};
</script>
<style scoped>
#main {
  width: 80%;
  height: 500px;
  border: 1px solid #cccccc;
  margin: 20px auto;
}
</style>
