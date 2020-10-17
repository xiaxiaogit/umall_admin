import axios from 'axios'
import qs from 'qs'
import Vue from "vue"
import store from "../store"
import router from "../router"
import {
  warningAlert
} from "./alert"

//开发环境使用
Vue.prototype.$imgPre = "http://localhost:3000"
let baseURL = "/api";



//打包用
// Vue.prototype.$imgPre = ""
// let baseURL = "";

//请求拦截  后台 app.js 后端登录拦截打开
axios.interceptors.request.use(req => {
  // console.log("---请求拦截----");
  // console.log(req);
  if (req.url != baseURL + "/api/userlogin") {
    req.headers.authorization = store.state.userInfo.token;
  }
  return req;
})



//响应拦截
axios.interceptors.response.use(res => {
  console.group("=====本次请求路径是:" + res.config.url)
  console.log(res);
  console.groupEnd()

  //用户掉线了
  if (res.data.msg == "登录已过期或访问权限受限") {
    warningAlert(res.data.mag)
    router.push("/login")
  }
  return res;
})
/*********菜单管理***************/
//添加
export const reqMenuAdd = (params) => {
  return axios({
    url: baseURL + "/api/menuadd",
    method: 'post',
    data: qs.stringify(params)
  })
}

// 列表
export const reqMenuList = () => {
  return axios({
    url: baseURL + "/api/menulist",
    method: "get",
    params: {
      istree: true
    }
  })
}

//删除
export const reqMenuDel = (id) => {
  return axios({
    url: baseURL + "/api/menudelete",
    method: "post",
    data: qs.stringify({
      id: id
    })
  })
}

//1条
export const reqMenuDetail = (id) => {
  return axios({
    url: baseURL + "/api/menuinfo",
    method: "get",
    params: {
      id: id
    }
  })
}

//修改
export const reqMenuUpdate = (params) => {
  return axios({
    url: baseURL + "/api/menuedit",
    method: "post",
    data: qs.stringify(params)
  })
}

/*********角色管理***************/
//添加
export const reqRoleAdd = (params) => {
  return axios({
    url: baseURL + "/api/roleadd",
    method: "post",
    data: qs.stringify(params)
  })
}

// 列表
export const reqRoleList = () => {
  return axios({
    url: baseURL + "/api/rolelist",
    method: "get"
  })
}




//删除
export const reqRoleDel = (id) => {
  return axios({
    url: baseURL + "/api/roledelete",
    method: "post",
    data: qs.stringify({
      id: id
    })
  })
}

//1条
export const reqRoleDetail = (id) => {
  return axios({
    url: baseURL + "/api/roleinfo",
    method: 'get',
    params: {
      id: id
    }
  })
}

//修改
export const reqRoleUpdate = (params) => {
  return axios({
    url: baseURL + "/api/roleedit",
    method: "post",
    data: qs.stringify(params)
  })
}


/*********管理员管理***************/
//添加
export const reqManageAdd = (params) => {
  return axios({
    url: baseURL + "/api/useradd",
    method: "post",
    data: qs.stringify(params)
  })
}

// 管理员总数
export const reqManageCount = () => {
  return axios({
    url: baseURL + "/api/usercount",
    method: "get"
  })
}

//登录
export const reqLogin = (params) => {
  return axios({
    url: baseURL + "/api/userlogin",
    method: "post",
    data: qs.stringify(params)
  })
}

// 列表 params={page:1,size:10}
export const reqManageList = (params) => {
  return axios({
    url: baseURL + "/api/userlist",
    method: "get",
    params: params
  })
}


//删除
export const reqManageDel = (uid) => {
  return axios({
    url: baseURL + "/api/userdelete",
    method: "post",
    data: qs.stringify({
      uid: uid
    })
  })
}

//1条
export const reqManageDetail = (uid) => {
  return axios({
    url: baseURL + "/api/userinfo",
    method: 'get',
    params: {
      uid: uid
    }
  })
}

//修改
export const reqManageUpdate = (params) => {
  return axios({
    url: baseURL + "/api/useredit",
    method: "post",
    data: qs.stringify(params)
  })
}

/*********商品分类管理***************/
//添加 params={pid:1,catename:"123",img:File,state:1}
export const reqCateAdd = (params) => {
  let data = new FormData();
  for (let i in params) {
    data.append(i, params[i])
  }
  return axios({
    url: baseURL + "/api/cateadd",
    method: "post",
    data: data
  })
}

//列表 params={istree:true}  {pid:0}
export const reqCateList = (params) => {
  return axios({
    url: baseURL + "/api/catelist",
    method: "get",
    params: params
  })
}

//删除
export const reqCateDel = (id) => {
  return axios({
    url: baseURL + "/api/catedelete",
    method: "post",
    data: qs.stringify({
      id: id
    })
  })
}

//1条
export const reqCateDetail = (id) => {
  return axios({
    url: baseURL + "/api/cateinfo",
    method: "get",
    params: {
      id: id
    }
  })
}

//修改
export const reqCateUpdate = (params) => {
  let data = new FormData()
  for (let i in params) {
    data.append(i, params[i])
  }

  return axios({
    url: baseURL + "/api/cateedit",
    method: "post",
    data: data
  })
}

/*********商品分类管理***************/
//添加
export const reqSpecsAdd = (params) => {
  return axios({
    url: baseURL + "/api/specsadd",
    method: "post",
    data: qs.stringify(params)
  })
}

// 商品总数
export const reqSpecsCount = () => {
  return axios({
    url: baseURL + "/api/specscount",
    method: "get"
  })
}

// 列表 params={page:1,size:10}
export const reqSpecsList = (params) => {
  return axios({
    url: baseURL + "/api/specslist",
    method: "get",
    params: params
  })
}


//删除
export const reqSpecsDel = (id) => {
  return axios({
    url: baseURL + "/api/specsdelete",
    method: "post",
    data: qs.stringify({
      id: id
    })
  })
}

//1条
export const reqSpecsDetail = (id) => {
  return axios({
    url: baseURL + "/api/specsinfo",
    method: "get",
    params: {
      id: id
    }
  })
}

//修改
export const reqSpecsUpdate = (params) => {
  return axios({
    url: baseURL + "/api/specsedit",
    method: "post",
    data: qs.stringify(params)
  })
}

/*********商品管理***************/
export const reqGoodsAdd = (params) => {
  let data = new FormData();
  for (let i in params) {
    data.append(i, params[i])
  }
  return axios({
    url: baseURL + "/api/goodsadd",
    method: "post",
    data: data
  })
}

// 商品总数
export const reqGoodsCount = () => {
  return axios({
    url: baseURL + "/api/goodscount",
    method: "get"
  })
}

//列表 
export const reqGoodsList = (params) => {
  return axios({
    url: baseURL + "/api/goodslist",
    method: "get",
    params: params
  })
}

//删除
export const reqGoodsDel = (id) => {
  return axios({
    url: baseURL + "/api/goodsdelete",
    method: "post",
    data: qs.stringify({
      id: id
    })
  })
}

//1条
export const reqGoodsDetail = (id) => {
  return axios({
    url: baseURL + "/api/goodsinfo",
    method: "get",
    params: {
      id: id
    }
  })
}

//修改
export const reqGoodsUpdate = (params) => {
  let data = new FormData()
  for (let i in params) {
    data.append(i, params[i])
  }

  return axios({
    url: baseURL + "/api/goodsedit",
    method: "post",
    data: data
  })
}

/*********会员修改***************/
//会员列表
export const reqMemberList = (params) => {
  return axios({
    url: baseURL + "/api/memberlist",
    method: "get"
  })
}

//1条
export const reqMemberDetail = (uid) => {
  return axios({
    url: baseURL + "/api/memberinfo",
    method: "get",
    params: {
      uid: uid
    }
  })
}

//修改
export const reqMemberUpdate = (params) => {

  return axios({
    url: baseURL + "/api/memberedit",
    method: "post",
    data: qs.stringify(params)
  })
}

/*********轮播图修改***************/
//列表
export const reqBannerList = () => {
  return axios({
    url: baseURL + "/api/bannerlist",
    method: "get"
  })
}


//添加
export const reqBannerAdd = (params) => {
  let data = new FormData();
  for (let i in params) {
    data.append(i, params[i])
  }
  return axios({
    url: baseURL + "/api/banneradd",
    method: "post",
    data: data
  })
}

//1条
export const reqBannerDetail = (id) => {
  return axios({
    url: baseURL + "/api/bannerinfo",
    method: "get",
    params: {
      id: id
    }
  })
}

//修改
export const reqBannerUpdate = (params) => {
  let data = new FormData()
  for (let i in params) {
    data.append(i, params[i])
  }
  return axios({
    url: baseURL + "/api/banneredit",
    method: "post",
    data: data
  })
}

//删除
export const reqBannerDel = (id) => {
  return axios({
    url: baseURL + "/api/bannerdelete",
    method: "post",
    data: qs.stringify({
      id: id
    })
  })
}
