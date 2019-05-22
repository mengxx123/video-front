<template>
    <my-page title="追剧" :page="page">
        <div class="common-container container">
            <div class="empty-box" v-if="!list.length">列表为空，去添加你正在看的剧吧~</div>
            <ul class="list">
                <li class="item" v-for="item in list">
                    <div class="img">
                        <ui-icon-button class="btn btn-add" icon="add" @click="addOne(item)" tooltip="看了一集" />
                        <ui-icon-button class="btn btn-edit" icon="edit" @click="edit(item)" tooltip="编辑" />
                        <ui-icon-button class="btn btn-link" icon="link" 
                            v-if="item.url"
                            @click="openUrl(item)" tooltip="打开连接" />
                    </div>
                    <div class="name">{{ item.name }}</div>
                    <div class="current">第 {{ item.current }} 集</div>
                </li>
            </ul>
        </div>
        <ui-float-button class="float-btn" icon="add" @click="add"/>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                list: [
                    // {
                    //     id: '1',
                    //     name: '海贼王',
                    //     current: 700,
                    // },
                    // {
                    //     id: '2',
                    //     name: '工作细胞',
                    //     current: 8,
                    // }
                ],
                page: {
                    menu: [
                        // {
                        //     type: 'icon',
                        //     icon: 'apps',
                        //     href: 'https://app.yunser.com/',
                        //     target: '_blank',
                        //     title: '应用'
                        // }
                    ]
                }
            }
        },
        mounted() {
            this.list = this.$storage.get('list', this.list)
            this.list = this.list.sort((a, b) => {
                return b.updateTime - a.updateTime
            })
            console.log('list', this.list)
        },
        methods: {
            addOne(item) {
                let list = this.$storage.get('list', [])
                for (let i = 0; i < list.length; i++) {
                    if (list[i].id === item.id) {
                        item.current++
                        item.updateTime = new Date().getTime()
                        list.splice(i, 1, item)
                        this.$storage.set('list', list)
                        return
                    }
                }
            },
            add() {
                this.$router.push('/list/edit')
            },
            edit(item) {
                this.$router.push('/list/edit?id=' + item.id)
            },
            openUrl(item) {
                window.open(item.url)
            }
        }
    }
</script>

<style lang="scss" scoped>
.list {
    display: flex;
    .item {
        position: relative;
        // display: flex;
        width: 120px;
        margin-right: 16px;
        margin-bottom: 16px;
        cursor: pointer;
        &:hover {
            .btn {
                display: block;
            }
        }
    }
    .img {
        position: relative;
        width: 120px;
        height: 160px;
        margin-bottom: 8px;
        border: 1px solid rgba(0, 0, 0, .12);
    }
    .name {
        font-weight: bold;
        font-size: 16px;
    }
    .current {
        color: #999;
    }
    .btn {
        display: none;
        position: absolute;
    }
    .btn-edit {
        top: 0;
        left: 0;
    }
    .btn-link {
        top: 0;
        right: 0;
    }
    .btn-add {
        bottom: 0;
        left: 0;
    }
}
.float-btn {
    position: fixed;
    bottom: 24px;
    right: 24px;
}
.empty-box {
    padding: 80px 0;
    text-align: center;
    font-size: 16px;
    color: #999;
}
</style>
