<template>
    <my-page title="播放器" :page="page">
        <div class="common-container container">
            <!-- <video class="" id="player" src="videoSrc" controls autoplay="autoplay" v-if="videoSrc"></video> -->
            <div class="video-box">
                <video-player class="video-player-box video-js vjs-big-play-centered"
                        ref="player"
                        :options="playerOptions"
                        :playsinline="true"
                        customEventName="customstatechangedeventname"
                        v-if="playerOptions" />
            </div>

            <div class="file-box">
                <input class="file" id="file" type="file" @change="fileChange" />
                <br>
                <ui-text-field v-model="url" label="视频链接" />
                <br>
                <ui-raised-button label="播放" primary @click="play" />
            </div>
        </div>
    </my-page>
</template>

<script>
    import 'video.js/dist/video-js.css'
    import { videoPlayer } from 'vue-video-player'
    // const videojs = window.videojs

    export default {
        data () {
            return {
                url: 'http://vjs.zencdn.net/v/oceans.mp4',
                playerOptions: null,
                videoSrc: '',
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/c056b64084eb11e988feeb2106d47d62',
                            target: '_blank'
                        }
                    ]
                }
            }
        },
        destroyed() {
            // this.player.dispose()
        },
        mounted() {
            let { data } = this.$route.query
            if (data) {
                this.url = data
                this.playVideo(this.url)
            }
        },
        methods: {
            play() {
                this.playVideo(this.url)
            },
            playVideo(src) {
                this.videoSrc = src
                this.playerOptions = {
                    // videojs options
                    // muted: true,
                    width: 638,
                    height: 359,
                    language: 'zh-CN',
                    playbackRates: [0.5, 0.75, 1.0, 1.25, 1.5, 2.0],
                    autoplay: true,
                    sources: [{
                        type: 'video/mp4',
                        // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
                        src: src
                    }]
                }
                // this.$refs.player.play()
            },
            fileChange(e) {
                console.log('cahnge')
                let file = e.target.files[0]
                if (!file) {
                    return
                }
                let url = window.URL.createObjectURL(file)
                this.playVideo(url)
                // let video = document.getElementById('player')
                // video.src = url
                // this.$nextTick(() => {
                //     var options = {
                //         language: 'zh-CN'
                //     }
                //     var player = videojs('player', options, function onPlayerReady() {
                //         videojs.log('Your player is ready!')
                //         // In this context, `this` is the player that was created by Video.js.
                //         this.play()
                //         // How about an event listener?
                //         this.on('ended', function() {
                //             videojs.log('Awww...over so soon?!')
                //         })
                //     })
                //     this.player = player
                // })
            }
        },
        components: {
            videoPlayer
        }
    }
</script>

<style lang="scss" scoped>
.video-box {
    width: 638px;
    height: 359px;
    margin-bottom: 16px;
    border: 1px solid #eee;
    background-color: #000;
}
.video-player-box {
    z-index: 100000;
}
.file {
    margin-bottom: 16px;
}
</style>
<style lang="scss">
.vjs-paused .vjs-big-play-button,
.vjs-paused.vjs-has-started .vjs-big-play-button {
    display: block;
}

// 圆圈
.video-js .vjs-big-play-button{
    font-size: 2.5em;
    line-height: 2.3em;
    height: 2.5em;
    width: 2.5em;
    -webkit-border-radius: 2.5em;
    -moz-border-radius: 2.5em;
    border-radius: 2.5em;
    background-color: #73859f;
    background-color: rgba(115,133,159,.5);
    border-width: 0.15em;
    margin-top: -1.25em;
    margin-left: -1.75em;
}
/* 中间的播放箭头 */
.vjs-big-play-button .vjs-icon-placeholder {
    font-size: 1.63em;
}
/* 加载圆圈 */
.vjs-loading-spinner {
    font-size: 2.5em;
    width: 2em;
    height: 2em;
    border-radius: 1em;
    margin-top: -1em;
    margin-left: -1.5em;
}
// .video-js .vjs-time-control{display:block;}
.video-js .vjs-remaining-time{display: none;}
</style>