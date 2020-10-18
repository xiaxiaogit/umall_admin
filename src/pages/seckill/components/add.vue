<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '活动添加' : '活动修改'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="活动期限">
          <el-date-picker
            @change="changeT"
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="一级分类">
          <el-select
            v-model="form.first_cateid"
            @change="changeFirst"
            placeholder="请选择一级分类"
          >
            <el-option
              v-for="item in firstList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类">
          <el-select
            v-model="form.second_cateid"
            @change="changeSecond"
            placeholder="请选择二级分类"
          >
            <el-option
              v-for="item in secondList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品">
          <el-select v-model="form.goodsid" placeholder="请选择商品">
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            placeholder="请选择上级菜单"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="cancel">取 消</el-button> -->
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqCateList,
  reqSeckAdd,
  reqSeckDetail,
  reqSeckUpdate,
  reqGoodsList
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      },
      value1: [],
      //二级分类的list
      secondList: [],
      //商品list
      goodsList: []
    };
  },
  computed: {
    ...mapGetters({
      list: "seckill/list",
      //商品一级分类
      firstList: "cate/list"
    })
  },
  methods: {
    ...mapActions({
      reqListAction: "seckill/reqListAction",
      //商品分类
      reqCateAction: "cate/reqListAction"
    }),
    //一级分类修改了，获取二级分类的list
    changeFirst() {
      this.form.second_cateid = "";
      this.getSecondList();
    },
    //获得二级分类list
    getSecondList() {
      // 方法1:通过一级菜单里的id获取当前二级菜单列表,赋值给secondList
      let obj = this.firstList.find(item => item.id == this.form.first_cateid)
        .children;
      this.secondList = obj;

      //方法2: 发pid给后端,返回当前分类下的二级分类
      // reqCateList({ pid: this.form.first_cateid }).then(res => {
      //   this.secondList = res.data.list;
      //   console.log(this.secondList);
      // });
    },
    //获取三级分类商品list
    changeSecond() {
      this.form.goodsid = "";
      this.getThirdList();
    },

    getThirdList() {
      reqGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid
      }).then(res => {
        this.goodsList = res.data.list.filter(
          item => item.second_cateid == this.form.second_cateid
        );
        this.goodsList = res.data.list;
      });
    },
    changeT() {
      this.form.begintime = this.value1[0].getTime();
      this.form.endtime = this.value1[1].getTime();
    },

    //弹框消失
    cancel() {
      this.info.isshow = false;
    },
    //弹框消失完成
    close() {
      //如果是添加开的弹框，就什么都不做；如果是编辑开的弹框，就清除form
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //数据重置
    empty() {
      (this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      }),
        (this.value1 = []),
        //二级分类的list
        (this.secondList = []),
        //商品list
        (this.goodsList = []);
    },
    //点击了添加按钮
    add() {
      reqSeckAdd(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);

          //数据重置
          this.empty();

          //弹框消失
          this.cancel();

          //list数据要刷新
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取菜单详情 （1条）
    look(id) {
      //发请求
      reqSeckDetail(id).then(res => {
        // this.form.value1 = [new Date(parseInt(this.form.begintime)),new Date(parseInt(this.form.endtime))]
        if (res.data.code == 200) {
          this.value1 = [
            parseInt(res.data.list.begintime),
            parseInt(res.data.list.endtime)
          ];
          this.form = res.data.list;
          //这个时候form是没有id的
          this.form.id = id;
          this.getSecondList();
          this.getThirdList();
          console.log(this.form.id);
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //修改
    update() {
      // this.form.begintime = new Date(this.value1[0]).getTime();
      // this.form.endtime = new Date(this.value1[1]).getTime();
      reqSeckUpdate(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          // this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {
    if (this.firstList.length == 0) {
      this.reqCateAction();
    }
  }
};
</script>
<style lang="stylus" scoped>
.my-upload {
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  position: relative;
}

.my-upload h3 {
  text-align: center;
  line-height: 150px;
  font-size: 30px;
  font-weight: 400;
}

.my-upload .my-input {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  opacity: 0;
}

.my-upload .img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
