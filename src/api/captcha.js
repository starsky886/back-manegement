import request from '@/utils/request'

export function getCaptcha(params) {
    return request({
        url: "/res/captcha",
        method: 'get',
        params
    })
} 