// 负责操作 localstorage 中的 user

// 定义一个操作的 key
const USER_KEY = 'user'

// 新增&修改 user
function setUserLocal (value) {
  window.localStorage.setItem(USER_KEY, JSON.stringify(value))
}

// 删除
function removeUserLocal () {
  window.localStorage.removeItem(USER_KEY)
}

// 查询：得到 localstorage 中的 user 对象
function getUserLocal () {
  return JSON.parse(window.localStorage.getItem(USER_KEY))
}

// 暴露方法
export { setUserLocal, removeUserLocal, getUserLocal }
