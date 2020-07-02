import http from "../utils/http"
export default {
    login(params) {
        ///api是跨域代理进行捕获的
        return http.post("user/login", params)
    }
}