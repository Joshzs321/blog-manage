import http from '../utils/http'
export default {
    publish(params) {
        return http.post('/artical/saveArtical', params)
    },
    getArticalList(params) {
        return http.post('/artical/getArticalList', params)
    },
    getArticalDetail(params) {
        return http.post("/artical/getArticalDetail", params)
    },
    deleteArticalById(params) {
        return http.post("/artical/deleteArticalById", params)
    }

}