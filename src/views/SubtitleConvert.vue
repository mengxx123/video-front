<template>
    <my-page title="字幕格式转化" :page="page">
        <div class="common-container container">
            <textarea class="form-control" v-model="code" rows="6" placeholder="要编码/解码的内容"></textarea>
            <select class="form-control charset" v-model="type">
                <option value="srt2smi">SRT 转 SMI</option>
                <option value="srt2txt">SRT 转 TXT</option>
                <option value="srt2json">SRT 转 JSON</option>
                <option value="srt2vtt">SRT 转 VTT</option>
                <option value="ass2srt">ASS 转 SRT</option>
                <option value="vtt2srt">VTT 转 SRT</option>
            </select>
            <div class="btns">
                <ui-raised-button class="btn" primary label="转化" @click="convert" />
            </div>
            <textarea class="form-control" v-model="result" rows="6" placeholder="结果" disabled v-if="result"></textarea>
        </div>
    </my-page>
</template>

<script>
    import Subtitle from 'subtitle-utils'
    import vtt2srt from '../util/vtt2srt'
    const srt2smi = require('srt2smi')
    const ass2srt = require('ass-to-srt')
    const parseSRT = require('parse-srt')

    export default {
        data () {
            return {
                type: 'srt2smi',
                // code: '',
                code: `1
00:04:07,029 --> 00:04:08,029
嗨 哥们!

2
00:04:10,029 --> 00:04:11,041
什么事?

3
00:04:13,045 --> 00:04:14,029
你说什么呢?

4
00:06:50,062 --> 00:06:51,033
走

5
00:07:08,070 --> 00:07:10,045
干嘛呢 桑尼?

6
00:07:12,008 --> 00:07:13,050
工作怎么样?

7
00:07:13,050 --> 00:07:14,075
棒极了
`,
                charset: 'utf-8',
                result: '',
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/553ed44084ec11e988feeb2106d47d62',
                            target: '_blank',
                            title: '帮助'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
            },
            convert() {
                if (!this.code) {
                    alert('请输入内容')
                    return
                }
                switch (this.type) {
                    case 'srt2smi':
                        this.result = srt2smi(this.code)
                        break
                    case 'ass2srt':
                        this.result = ass2srt(this.code)
                        break
                    case 'srt2txt':
                        this.result = this._srt2txt(this.code)
                        break
                    case 'srt2json':
                        let json = parseSRT(this.code)
                        this.result = JSON.stringify(json, null, 4)
                        break
                    case 'srt2vtt':
                        this.result = Subtitle.fromSRT(this.code).toVTT()
                        break
                    case 'vtt2srt':
                        this.result = vtt2srt(this.code)
                        break
                }
            },
            _srt2txt(text) {
                let ret = []
                let arr = text.split('\n\n')
                console.log(arr.length)
                for (let item of arr) {
                    console.log('==========================')
                    console.log(item)
                    let arr2 = item.split('\n').filter(item => item && item.replace(/\s/g, ''))
                    if (arr2.length === 3) {
                        ret.push(arr2[2])
                    }
                }
                return ret.join('\n')
            }
        }
    }
</script>

<style lang="scss" scoped>
textarea.form-control {
    height: auto;
}
.form-control {
    display: block;
    width: 100%;
    max-width: 400px;
    height: 33px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42;
    color: #55595c;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 2px;
    outline: none;
}
.charset {
    margin-top: 16px;
}
.btns {
    margin-top: 16px;
    margin-bottom: 16px;
    .btn {
        margin-right: 8px;
        margin-bottom: 8px;
    }
}
</style>
