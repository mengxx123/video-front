<template>
    <my-page title="编辑" :page="page" backable>
        <div class="common-container container">
            <ui-text-field v-model="detail.name" label="剧名" />
            <br>
            <ui-text-field v-model.number="detail.current" type="number" label="看到第几集" />
            <br>
            <ui-text-field v-model="detail.url" label="链接" />
        </div>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                isAdd: true,
                detail: {
                    name: '',
                    current: null,
                    url: ''
                },
                page: {
                    menu: [
                    ]
                }
            }
        },
        mounted() {
            let id = this.$route.query.id
            if (id) {
                let list = this.$storage.get('list', [])
                for (let item of list) {
                    if (item.id === id) {
                        this.detail = item
                    }
                }
                this.page.menu.push({
                    type: 'icon',
                    icon: 'delete',
                    click: this.remove,
                    title: '应用'
                })
            }
            this.page.menu.push({
                type: 'icon',
                icon: 'check',
                click: this.save,
                title: '应用'
            })
            this.isAdd = !this.$route.query.id
        },
        methods: {
            remove() {
                let list = this.$storage.get('list', [])
                for (let i = 0; i < list.length; i++) {
                    if (list[i].id === this.detail.id) {
                        list.splice(i, 1)
                        this.$storage.set('list', list)
                        this.$router.go(-1)
                        return
                    }
                }
            },
            save() {
                if (!this.detail.name) {
                    this.$message({
                        type: 'danger',
                        text: '请输入剧名'
                    })
                    return
                }
                if (!this.detail.current) {
                    this.detail.current = 0
                }
                if (this.detail.id) {
                    let list = this.$storage.get('list', [])
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].id === this.detail.id) {
                            this.detail.updateTime = new Date().getTime()
                            list.splice(i, 1, this.detail)
                            this.$storage.set('list', list)
                            this.$router.go(-1)
                            return
                        }
                    }
                } else {
                    let list = this.$storage.get('list', [])
                    this.detail.id = '' + new Date().getTime()
                    this.detail.createTime = new Date().getTime()
                    this.detail.updateTime = new Date().getTime()
                    list.push(this.detail)
                    this.$storage.set('list', list)
                    this.$router.go(-1)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.list {
    display: flex;
    .item {
        // display: flex;
        width: 120px;
        margin-right: 16px;
        margin-bottom: 16px;
        cursor: pointer;
    }
    .img {
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
}
.float-btn {
    position: fixed;
    bottom: 24px;
    right: 24px;
}
</style>
