<template>
  <div>
    <el-dialog title="会员修改" :visible.sync="info.isshow" @closed="close">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>

        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
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
        <el-button type="primary" @click="add">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqMemberList,
  reqMemberDetail,
  reqMemberUpdate,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        id: "",
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: "",
      },
      password: "",
    };
  },
  computed: {
    ...mapGetters({
      list: "member/list",
    }),
  },
  methods: {
    ...mapActions({
      reqMemberListAction: "member/reqMemberListAction",
    }),

    //弹框消失
    cancel() {
      this.info.isshow = false;
    },
    //弹框消失完成
    close() {
      //如果是添加开的弹框，就什么都不做；如果是编辑开的弹框，就清除form
      this.form = {
        id: "",
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: "",
      };
    },
    //数据重置
    empty() {
      this.form = {
        id: "",
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: "",
      };
    },
    //点击了添加按钮
    add() {
      if (this.form.password == "") {
        warningAlert("密码不能为空");
        return;
      }

      reqMemberUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);

          //数据重置
          this.empty();

          //弹框消失
          this.cancel();

          //list数据要刷新
          this.reqMemberListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取菜单详情 （1条）
    look(uid) {
      // //发请求
      reqMemberDetail(uid).then((res) => {
        // console.log(this.form);
        if (res.data.code == 200) {
          //这个时候form是没有id的
          this.form = res.data.list;
          this.form.uid = uid;
          this.password = this.form.password;
          this.form.password = "";
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped></style>
