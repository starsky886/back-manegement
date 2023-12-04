import { getBanner }  from '@/api/banner'

const state = {

}
const mutations = {

}

const actions = {
    getBanner({ commit }, params) {
        return new Promise((resolve, reject) => {
            getBanner(params).then(res=>{
                console.log('res',res)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}