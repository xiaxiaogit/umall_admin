export const actions = {
  //组件触发修改userInfo
  changeUserAction(context, info) {
    context.commit("changeUserInfo", info)
  }
}