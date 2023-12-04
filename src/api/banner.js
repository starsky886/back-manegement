import request from '@/utils/request'

export function getBanner(params) {
    return request({
        url: '/api/banner',
        method: 'get',
        params
    })
}

// 设置首页标语
export function setBanner(data){
    return request({
      url: '/api/banner',
      method: 'post',
      data
    })
  }