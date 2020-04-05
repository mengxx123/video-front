import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const Player = resolve => require(['@/views/Player'], resolve)
const FormatConvert = resolve => require(['@/views/FormatConvert'], resolve)
const Screenshot = resolve => require(['@/views/Screenshot'], resolve)
const SubtitleConvert = resolve => require(['@/views/SubtitleConvert'], resolve)
const List = resolve => require(['@/views/List'], resolve)
const ListEdit = resolve => require(['@/views/ListEdit'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Home
    },
    { path: '/camera', component: resolve => require(['@/views/Camera'], resolve) },
    {
        path: '/player',
        component: Player
    },
    {
        path: '/formatConvert',
        component: FormatConvert
    },
    {
        path: '/screenshot',
        component: Screenshot
    },
    {
        path: '/subtitle/convert',
        component: SubtitleConvert
    },
    {
        path: '/list',
        component: List
    },
    {
        path: '/list/edit',
        component: ListEdit
    },
    {
        path: '*',
        component: Error404
    }
]

let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

export default router
