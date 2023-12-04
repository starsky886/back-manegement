import request from '@/utils/request'

export function loginApi(data) {
  return request({
    url: '/api/admin/login',
    method: 'post',
    data
  })
}

export function getInfoApi(token) {
  return request({
    url: '/api/admin/whoami',
    method: 'get',
    params: { token }
  })
}

export function logoutApi() {
  return request({
    url: '/api/admin',
    method: 'post'
  })
}

// 修改用户
export function setUser(data){
  return request({
    url : '/api/admin',
    method : 'PUT',
    data
  })
}
