<template>
    <div id="content">
        <el-form :label-position='lablePosition' label-width="80px" :model="artical">
            <el-form-item label="标题">
                <el-input v-model="artical.title"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="artical.type" placeholder="请选择类型">
                    <el-option label="js" value="javascript"></el-option>
                    <el-option label="vue" value="vue"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="内容">
                <mavon-editor v-model="artical.content" ref="md" @change="change" style="min-height:500px"></mavon-editor>
            </el-form-item>
            <el-form-item size="large" class="operator-box">
                <el-button type="primary" @click="publish">{{isEditing?"更新":"发布"}}</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    //局部使用第三方组件
    import {mavonEditor} from 'mavon-editor'
    import artical from '../../api/article'
    import 'mavon-editor/dist/css/index.css'
    export default{
        name:'artical',
        data(){
            return{
                lablePosition:'right',
                artical:{
                    title:'',
                    type:'',
                    content:"",
                    articalId:'',
                    publishDate:''
                },
                isEditing:""
            }
        },
        mounted(){
            let articalId=this.$route.query.articalId
            this.isEditing=this.$route.query.isEditing
            if(articalId){
                artical.getArticalDetail({articalId:articalId}).then((res)=>{
                    if(res&&res.data.length>0){
                            this.artical.title=res.data[0].title
                            this.artical.type=res.data[0].type
                            this.artical.content=res.data[0].content
                            this.artical.articalId=res.data[0].articalId
                    }
                })
            }
        },
        methods:{
            change(value,html){
                console.log(html)
            },
            publish(){
                if(!this.artical.title||!this.artical.type||!this.artical.content){
                    alert("数据填写不完整")
                    return
                }
                this.artical.publishDate=new Date()
                artical.publish(this.artical).then((res)=>{
                     console.log(res.message)
                    if(res.message=="success"){
                        console.log("dadad")
                        this.$router.push({path:'/list'})
                    }
                })
            },
            cancel(){
                this.$router.push({path:'/list'})
            }
        },
        components:{
            mavonEditor
        }

    }
</script>

<style>
    
</style>