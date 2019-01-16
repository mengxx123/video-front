<template>
    <my-page title="视频截图">
        <input class="file" id="file" type="file" @change="fileChange" />
        <div v-if="loaded">
            <video id="player" controls autoplay="autoplay"></video>
            <br>
            <ui-raised-button class="capture" label="截图" primary @click="capture" />
        </div>
        <canvas id="canvas" class="canvas" style="display: none"></canvas>
        <ul class="screenshot-list">
            <li class="item" v-for="screenshot, index in screenshots" @click="removeItem(index)">
                <img class="img" :src="screenshot.image">
                <div class="time">{{ screenshot.time }}</div>
                <ui-icon-button class="close" icon="close" />
            </li>
        </ul>
        <!-- 捕捉（）张截图
        捕捉1张截图每隔（）秒
        开始时间
        图像宽度 -->

        <!-- <video
            id="my-player"
            class="video-js"
            controls
            preload="auto"
            data-setup='{}'>
            <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"></source>
            <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm"></source>
            <source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg"></source>
            <p class="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a
                web browser that
                <a href="http://videojs.com/html5-video-support/" target="_blank">
                supports HTML5 video
                </a>
            </p>
        </video> -->
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                loaded: false,
                loading: false,
                screenshots: [
                    // {
                    //     image: 'https://www.baidu.com/img/bd_logo1.png?where=super',
                    //     time: '00:05'
                    // },
                    // {
                    //     image: 'https://www.baidu.com/img/bd_logo1.png?where=super',
                    //     time: '00:03'
                    // }
                ],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            to: '/help'
                        }
                    ]
                }
            }
        },
        mounted() {
            console.log('mounted')
        },
        methods: {
            capture() {
                let video = document.getElementById('player')
                let canvas = document.getElementById('canvas')
                let context = canvas.getContext('2d')

                let rect = video.getBoundingClientRect()
                console.log(rect)
                this.videoWidth = rect.width
                this.videoHeight = rect.height
                context.drawImage(video, 0, 0, this.videoWidth, this.videoHeight)
                this.screenshots.unshift({
                    image: canvas.toDataURL(),
                    time: this.getFormatTime(video.currentTime)
                })
            },
            getFormatTime(second) {
                let minute = Math.floor(second / 60)
                second = Math.floor(second % 60)
                return minute + ':' + second
            },
            removeItem(index) {
                this.screenshots.splice(index, 1)
            },
            fileChange(e) {
                if (!e.target.files.length) {
                    return
                }
                let url = window.URL.createObjectURL(e.target.files[0])
                this.loaded = true
                this.$nextTick(() => {
                    let video = document.getElementById('player')
                    video.onload = () => {
                        let rect = video.getBoundingClientRect()
                        console.log(rect)
                        this.videoWidth = rect.width
                        this.videoHeight = rect.height
                    }
                    video.src = url
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.file {
    margin-bottom: 16px;
}
.capture {
    margin-top: 16px;
    margin-bottom: 16px;
}
.screenshot-list {
    width: 320px;
    .item {
        position: relative;
        margin-bottom: 16px;
        border: 1px solid rgba(0, 0, 0, .12);
    }
    .img {
        width: 100%;
        max-width: 100%;
    }
    .time {
        position: absolute;
        top: 0;
        left: 0;
        min-width: 56px;
        padding: 4px 8px;
        background-color: #fff;
    }
    .close {
        position: absolute;
        top: 0;
        right: 0;
    }
}
</style>
