<template>
    <div id="top">Josh个人博客
        <div class="login-box">欢迎{{username}}</div>
    </div>
</template>

<script>
    export default{
        name:"top-nav",
        data(){
            return{
                username:""
            }
        },
        mounted(){
            if(this.$store.state.username){
                this.username=this.$store.state.username
            }else if(this.$cookies.get("token")){
                this.username=this.$cookies.get("username")
            }else{
                this.$router.push({path:"/login"})
            }
        }
    }
</script>

<style>
    #top{
        width: 100%;
        height: 8vh;
        /* 渐变颜色 */
        background: linear-gradient(to left,#3b76d6,#0b7ad4);
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        font-size: 25px;
        color: white;
        overflow: hidden;
        line-height:8vh ;
        padding-left: 20px;
    }
    .login-box{
        float: right;
        margin-right: 30px;
    }
</style>