<!-- home -->
<template>
    <div>
        <div class='warpper'>
            <van-sticky :offset-top='0'>
                <van-search background='#fff' shape='round' placeholder='请输入搜索关键词' />
            </van-sticky>
            <!-- 搜索end -->
            <van-swipe :autoplay='3000' class='my-swipe' style='margin-top: 5px;'>
                <van-swipe-item v-for='(image, index) in slideshowList' :key='index'>
                    <img v-lazy='imgUrls + image.pic' />
                </van-swipe-item>
            </van-swipe>
            <!-- 轮播图end -->
            <div style='background-color: #FFFFFF;margin-top: 5px;'>
                <div style='margin-top: 5px;'>
                    <van-grid :column-num='4' :border='false'>
                        <template v-for='item in menus'>
                            <van-grid-item :to='item.url' v-bind:key='item.id'>
                                <van-image width='50' height='50' :src='imgUrls + item.pic' />
                                <span>
                                    <font size='3' color=''>{{ item.name }}</font>
                                </span>
                            </van-grid-item>
                        </template>
                    </van-grid>
                </div>
            </div>
            <!-- 宫格end -->
        </div>
    </div>
</template>

<script>
import {
    getMenus,
    getBanner
} from '../../api/home'

export default {
    data() {
        return {
            imgUrls: this.$baseApi,
            menus: [],
            slideshowList: []
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            getMenus().then(res => {
                this.menus = res.data
            })
            getBanner().then(res => {
                this.slideshowList = res.data
            })
        }
    }
}
</script>
<style lang='scss' scoped>
.warpper {
    background-color: #F8F8F8;
    padding: 5px;
}

.my-swipe .van-swipe-item img {
    width: 100%;
    height: 200px;
}

.my-swipe {
    margin-top: 5px;
    margin-bottom: 7px;
    height: 180px;
}

// 滚动条
.item {
    margin: 5px;
    width: 31.3%;
    white-space: nowrap;
    display: inline-block;
}

.scroll {
    padding: 5px;
    margin-top: 8px;
    background-color: #fff;
    text-align: center;
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
}

::-webkit-scrollbar {
    display: none;
}
</style>