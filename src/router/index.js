import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const Player = resolve => require(['@/views/Player'], resolve)
const PlayerHelp = resolve => require(['@/views/PlayerHelp'], resolve)
const FormatConvert = resolve => require(['@/views/FormatConvert'], resolve)
const Screenshot = resolve => require(['@/views/Screenshot'], resolve)
const SubtitleConvert = resolve => require(['@/views/SubtitleConvert'], resolve)
const SubtitleConvertHelp = resolve => require(['@/views/SubtitleConvertHelp'], resolve)
const List = resolve => require(['@/views/List'], resolve)
const ListEdit = resolve => require(['@/views/ListEdit'], resolve)
const About = resolve => require(['@/views/About'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/player',
        component: Player
    },
    {
        path: '/player/help',
        component: PlayerHelp
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
        path: '/subtitle/convert/help',
        component: SubtitleConvertHelp
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
        path: '/about',
        component: About
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
