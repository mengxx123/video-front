<template>
    <my-page title="视频" :page="page">
        <div class="common-container container">
            <app-list :data="groups" />
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    export default {
        data () {
            return {
                groups: [
                    {
                        name: '看视频',
                        apps: [
                            {
                                name: '视频播放器',
                                desc: '',
                                icon: '/static/img/video.svg',
                                to: '/player'
                            },
                            {
                                name: '视频播放器',
                                desc: 'RTMP 播放器',
                                icon: '/static/img/video.svg',
                                to: 'xxx',
                                href: 'https://demo2.yunser.com/rtmp/',
                                target: '_blank'
                            },
                            {
                                name: '追剧',
                                desc: '',
                                icon: '/static/img/video.svg',
                                to: '/list'
                            }
                            // {
                            //     name: '在线影音',
                            //     desc: '',
                            //     icon: '/static/img/video.svg',
                            //     to: '/list',
                            //     dev: true
                            // },
                            // {
                            //     name: '视频下载',
                            //     desc: '',
                            //     icon: '/static/img/video.svg',
                            //     dev: true
                            // }
                        ]
                    },
                    {
                        name: '工具',
                        apps: [
                            {
                                name: '视频格式转化',
                                desc: '',
                                icon: '/static/img/video.svg',
                                to: '/formatConvert'
                            },
                            {
                                name: '视频截图',
                                desc: '',
                                icon: '/static/img/video.svg',
                                to: '/screenshot'
                            },
                            {
                                name: '字幕格式转化',
                                desc: '',
                                icon: '/static/img/video.svg',
                                to: '/subtitle/convert'
                            }
                        ]
                    },
                    {
                        name: '相机',
                        apps: [
                            {
                                name: '拍照',
                                desc: '',
                                icon: '/static/img/video.svg',
                                to: '/camera'
                            },
                            {
                                name: '摄像头截图',
                                desc: '',
                                icon: '/static/img/video.svg',
                                to: 'xxx',
                                href: 'https://demo2.yunser.com/video/camera.html',
                                target: '_blank'
                            },
                            {
                                name: '摄像头录像',
                                desc: '请在火狐浏览器使用',
                                icon: '/static/img/video.svg',
                                to: 'xxx',
                                href: 'https://demo2.yunser.com/video/record.html',
                                target: '_blank'
                            }
                        ]
                    }
                ],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'search',
                            href: 'https://search.yunser.com?utm_source=video',
                            target: '_blank',
                            title: '搜索'
                        },
                        {
                            type: 'icon',
                            icon: 'apps',
                            href: 'https://app.yunser.com?utm_source=video',
                            target: '_blank',
                            title: '应用'
                        }
                    ]
                }
            }
        }
    }
</script>
