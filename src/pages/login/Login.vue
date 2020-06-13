<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avater_box">
                <img src="../../assets/fifi.jpg" alt="">
            </div>
            <!-- 登录表单区域 -->
            <!-- 因为设置 -->
            <!-- 可以通过在form组件上绑定一个rules属性，然后在item的prop属性中进行调用，进行表单验证 -->
            <!-- 表单验证中要使item中的prop名字跟item下input里的v-model绑定的名字保持一致！！ -->
            <!-- 通过ref属性可以唯一标识元素，并在逻辑代码中获得-->
            <!-- 表单标签上有一个resetFields方法 -->
            <el-form ref="loginFormFef" label-width="px" class="login_form" :rules="rules" :model="loginForm">
                <!-- prefix-icon/suffix-icon分别表示在前后输入icon/还可以用slot的方式-->
                <el-form-item prop="username" >
                    <el-input prefix-icon="el-icon-user" v-model="loginForm.username" ></el-input>
                </el-form-item>
                 <el-form-item prop="password">
                     <!-- 这里使用的是第三方的icon -->
                    <el-input type="password" prefix-icon="iconfont icon-3702mima" v-model="loginForm.password"></el-input>
                </el-form-item>
                 <el-form-item class="buts" >
                    <el-button type="primary" @click="login" class="test_buttom">FiFi❤</el-button>
                    <el-button type="success">游客</el-button>
                    <el-button type="info" @click="resetHandler">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- <el-alert
        :title="alertTitle" :type="alertType" v-if="isShowAlert" center @close="onAlertClose()" show-icon
        ></el-alert> -->
    </div>
</template>

<script>
import user from "../../api/user"
export default {
    name:"login",
    data() {
        return {
            alertTitle:"",
            alertType:"",
            isShowAlert:false,
            loginForm: {
                username: 'admin',
                password: '123456'
            },
            rules:{
                username:[
                    { required: true, message: '请输入活动名称', trigger: ['blur','change']},
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: ['blur','change']},
                    { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        resetHandler:function(e){
            // 必须要给输入项输入验证规则后，重置才有效果
            this.$refs.loginFormFef.resetFields()
            // e.terget.resetFields()
        },
        // 两种不同的函数定义方式
        loginVerify(){
            this.$refs.loginFormFef.validate(async valid=>{
                // 如果验证不成功，就返回不执行调用请求
                if(!valid) return;
                console.log(valid)
                // 这个回调函数是用来处理验证结果的
                // 验证成功后，validate函数内会将true作为参数传给该函数，否则将false传给valid
                // 验证成功后，就往后台发送请求
                // axios的post方法：两个参数->地址和带的参数
                const {data:res}=await this.$http.post("login",this.loginForm)
                // 如果不传入回调函数，这个validate方法将返回一个promise对象，利用promise的then方法也可以达到同样的效果
                console.log(res)
                if(res.meta.status!==200) 
                    // 用element组件进行更友好的提示
                    // return alert("登录失败")
                    return this.$message.errer("登录失败")
                // alert("登录成功")
                this.$message({
                    message:"登录成功",
                    duration:1000,
                    type:"success"
                })
                // 1、将登录之后的token，保存到客户端的sessionStorage【会话阶段存储--localStorage是长久存储】
                // 1.1项目中的其他接口API接口，必须在登录之后才能访问
                // 1.2token只应在当前网站打开期间生效，所以保存到sessionStorage
                // 1.3如果用户没有登录，但是直接通过URL访问特定页面。需要重新导航到登录页面
                
                // 
                window.sessionStorage.setItem("token",res.data.token)
                // 2、通过编程式导航跳转到后台主页，路由地址为/home
                this.$router.push("/home")
            })
        },
        login(){
            user.login(this.loginForm).then((res)=>{
                console.log(res)
                if(res.data.token){
                    //vuex：存在在localstorage里
                    this.$store.state.username=this.loginForm.username
                    //页面刷新和关闭这些信息都会消失
                    //存token是为了后续发请求时带上token
                    this.$cookies.set("token",res.data.token)
                    //存username是为了显示欢迎xxx
                    this.$cookies.set("username",this.loginForm.username)
                    this.$router.push({path:'/list'})
                }else{
                    this.alertTitle="用户名或者密码错误！"
                    this.alertType="error"
                    this.isShowAlert=true
                }
            })
        },
        onAlertClose(){
            //这是当登录错误出现提示后，再次错误登录还能继续出现提示
            this.isShowAlert=false
        }

    }

}
</script>

<style lang="less" scoped>
    // .test_buttom{
    //     background-color: greenyellow;
    //     color: greenyellow;
    // }
    .login_container{
        background: url(../../assets/back.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        height: 100%;
    }

    .login_box{
        width: 450px;
        height: 300px;
        background-color: white;
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }

    .avater_box{
        height: 130px;
        width: 130px;
        border:1px solid #eee ;
        border-radius: 50%;
        box-shadow: 0 0 10px #ddd;
        padding: 5px;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: white;
        // less的嵌套?
        img{
            height: 100%;
            width: 100%;
            border-radius: 50%;
        }
    }
    .login_form{
        position: absolute;
        bottom: 0px;
        // width和height默认作用的是盒子模型中的border-content内容
        // 可以通过box-sizing进行更改
        box-sizing: border-box;
        width: 100%;
        // 上下左右
        padding:0 20px ;
    }
    .buts{
        display: flex;
        // 改变轴的起始方向
        justify-content: flex-end;
    }
</style>
