<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加轮播图' : '编辑轮播图'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form :model="form">
        <el-form-item label="标题" label-width="80px">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <!-- <el-form-item label="图片" label-width="80px">
          <div class="imgWrap">
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :on-change="getFile"
            >
              <img v-if="imgUrl" :src="imgUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-form-item> -->

        <!-- 原生上传图片 -->
        <el-form-item label="图片" label-width="80px">
          <div class="my-upload">
            <h3>+</h3>
            <img class="img" v-if="imgUrl" :src="imgUrl" alt="" />
            <input
              v-if="info.isshow"
              class="my-input"
              type="file"
              @change="getFile"
            />
          </div>
        </el-form-item>

        <el-form-item label="状态" label-width="80px">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqBannerDetail,
  reqBannerUpdate,
  reqBannerAdd
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        title: "",
        img: null,
        status: 1
      },
      //图片地址
      imgUrl: ""
    };
  },
  computed: {
    ...mapGetters({
      bannerList: "banner/list"
    })
  },
  methods: {
    ...mapActions({
      //列表
      reqListAction: "banner/reqListAction"
    }),

    //图片操作
    getFile(e) {
      let file = e.target.files[0];

      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    // 点击了添加按钮
    add() {
      reqBannerAdd(this.form).then(res => {
        if (res.data.code == 200) {
          //成功
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
    //取消
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
      this.form = {
        id: "",
        title: "",
        img: null,
        status: 1
      };
      this.imgUrl= "";
    },
    //获取菜单详情 （1条）
    look(id) {
      //发请求
      reqBannerDetail(id).then(res => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          //图片
          this.imgUrl = this.$imgPre + this.form.img;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //修改
    update(id) {
      reqBannerUpdate(this.form).then(res => {
        if (res.data.code == 200) {
          this.form.id = res.data.id;
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  }
};
</script>
<style scoped>
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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.imgWrap {
  width: 178px;
  height: 178px;
  border: 1px dashed #cccccc;
}
.imgWrap .img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
