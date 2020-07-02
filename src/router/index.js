import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/login/Login'
import list from '../components/index/List'
import article from '../components/index/Article'
import index from '@/pages/index/index'


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            component: index,
            children: [{
                    path: 'list',
                    component: list
                },
                {
                    path: 'article',
                    component: article
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
})