<template>
    <div class="evaluate">
        <van-empty description="还没有收藏的商品" v-if="list.length < 1">

        </van-empty>
        <div v-else>
            <van-checkbox-group v-model="result" ref="checkboxGroup">
                <van-cell title="" :value="text"
                    @click="isshow == false ? isshow = true : isshow = false; text == '管理' ? text = '取消' : text = '管理'">

                </van-cell>
                <van-grid :column-num="2">

                    <van-grid-item v-for="(item, index) in list" :key="index">
                        <van-checkbox :name="item.pid" v-show="isshow" @click="toggle(item.pid)"></van-checkbox>
                        <router-link :to="'productDetails?id=' + item.pid">
                            <van-image :src="$baseApi + item.image">
                            </van-image>
                            <div>
                                <span>{{ item.storeName }}</span>
                                <div style="height:8px">

                                </div>
                                <span style="color:#ff7800">￥{{ item.price }}</span>
                            </div>
                        </router-link>
                    </van-grid-item>
                </van-grid>

            </van-checkbox-group>
            <van-submit-bar button-text="删除" @submit="onSubmit" v-show="isshow">
                <template #default>
                    <van-checkbox v-model="checked" style="margin-right:48%" @change="toggleAll">
                        全选
                    </van-checkbox>
                </template>
            </van-submit-bar>
        </div>
    </div>
</template>

<script>
import { getCollect, delCollects } from '../../api/collect'
export default {
    data() {
        return {
            list: [
                {
                    id: 1,
                    image: "https://ts1.cn.mm.bing.net/th/id/R-C.0bb5b865aac87f09eda036384bee5335?rik=F2SVhS8ESYTDXA&riu=http%3a%2f%2fk.sinaimg.cn%2fn%2fsinakd20231130ac%2f178%2fw822h956%2f20231130%2f8ab0-7cac5b733beb2a6372b587707f2be3dc.jpg%2fw700d1q75cms.jpg%3fby%3dcms_fixed_width&ehk=xP2eCjeI4qfzndnq3BykPRCveOPhZWjImWQROlekSGg%3d&risl=&pid=ImgRaw&r=0",
                    storeName: "iPhone 16 Pro Max",
                    price: "12999",
                    otPrice: "13999",
                },
                {
                    id: 2,
                    image: "https://ts1.cn.mm.bing.net/th/id/R-C.0bb5b865aac87f09eda036384bee5335?rik=F2SVhS8ESYTDXA&riu=http%3a%2f%2fk.sinaimg.cn%2fn%2fsinakd20231130ac%2f178%2fw822h956%2f20231130%2f8ab0-7cac5b733beb2a6372b587707f2be3dc.jpg%2fw700d1q75cms.jpg%3fby%3dcms_fixed_width&ehk=xP2eCjeI4qfzndnq3BykPRCveOPhZWjImWQROlekSGg%3d&risl=&pid=ImgRaw&r=0",
                    storeName: "iPhone 16 Pro Max",
                    price: "12999",
                    otPrice: "13999",
                },
            ],
            isshow: false,
            text: '管理',
            limit: 0,
            result: [],
            checklist: [],
            checked: false
        };
    },
    watch: {
        checklist(data) {
            if (data.length === 0) return
            let isSelect = data.length === this.list.length

            console.log(data, isSelect, this.checked);
            if (isSelect !== this.checked) {
                this.checked = isSelect
            }
        },
        isshow(data) {
            if (!data) { this.checklist = []; this.$refs.checkboxGroup.toggleAll(false); }
        }
    },
    created() {
        this.more();
    },
    methods: {
        more() {
            this.limit += 10,
                this.getList()
        },
        getList() {
            if (this.$route.query.type == 'collect') {
                this.$route.meta.title = '我的收藏'
            } else {
                this.$route.meta.title = '我的足迹'
            }

            getCollect({
                type: this.$route.query.type,
                limit: this.limit
            }).then(res => {
                this.list = res.data
                console.log(this.list)
            })
        },
        toggle(pid) {
            for (var i = 0; i < this.checklist.length; i++) {
                if (this.checklist[i] == pid) {
                    this.checklist = this.checklist.filter(res => {
                        return res != pid
                    })
                    pid = null
                    return
                }
            }

            if (pid != null) {
                this.checklist.push(pid)
            }
            console.log(this.checklist)
        },
        onSubmit() {
            delCollects({
                productIds: this.checklist.join(','),
                category: this.$route.query.type
            }).then(res => {
                this.$toast.success(res.msg)
                this.getList()
            })
        },
        toggleAll(data) {
            // if (this.checked) {
            // 	this.$refs.checkboxGroup.toggleAll(true);
            // 	this.checked = !this.checked
            // } else {
            // 	this.$refs.checkboxGroup.toggleAll(false);
            // 	this.checked = !this.checked
            // }
            if (!data) {
                if (this.checklist.length !== this.list.length) {

                }
                else this.$refs.checkboxGroup.toggleAll(data);
            } else this.$refs.checkboxGroup.toggleAll(data);

            this.checklist = this.result
        }
    },
};
</script>

<style scoped>
.warpper {
    width: calc(100% - 10px);
    margin: 0 auto;
}

.van-grid-item /deep/.van-grid-item__content--center {
    align-items: flex-start;
    line-height: 20px;
}

.van-grid-item .van-image {
    margin-bottom: 8px;
}

.ckbox {
    top: 10px;
    position: absolute;
    z-index: 2;
}
</style>
