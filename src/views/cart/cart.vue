<template>
    <div class="warpper">
        <van-submit-bar :price="money * 100" button-text="提交订单" @submit="onSubmit" tip="向左滑动商品可删除该商品！">
            <van-checkbox v-model="value" @click="toggleAll(ckAll == false ? true : false)">全选</van-checkbox>
        </van-submit-bar>
        <van-empty description="空空如也!" v-if="cartList.length <= 0" />
        <div class="cart">
            <van-checkbox-group v-model="result" ref="checkboxGroup">
                <van-swipe-cell v-for="item in cartList" :key="item.id"
                    v-if="item.productInfo.isIntegral != 1 && item.combinationId == 0">
                    <van-card :num="item.cartNum" :desc="item.productInfo.storeInfo" :title="item.productInfo.storeName"
                        :thumb="imgUrls + item.productInfo.image">
                        <template #tags>
                            <van-tag plain type="danger" style="margin-top: 10px;">{{ item.productInfo.attrInfo.sku }}
                            </van-tag>
                        </template>
                        <template #price>
                            <span v-if="!item.combinationId">
                                <font color="red" size="3"> ￥{{ item.truePrice }}</font>
                            </span>
                            <span v-if="item.combinationId">
                                <font color="red" size="3"> 拼团价：￥{{ item.truePrice }}</font>
                            </span>
                        </template>
                        <template #footer>
                            <van-stepper v-model="item.cartNum" integer @change="onChange" :value="changevalue"
                                @plus="itemId = item.id" @minus="itemId = item.id" @focus="itemId = item.id" />
                        </template>
                        <template #tag>
                            <van-checkbox :name="item.id" @click="toggle(item.id, item.truePrice * item.cartNum)"
                                checked-color="#ee0a24"></van-checkbox>
                        </template>
                    </van-card>
                    <template #right>
                        <van-button square text="删除" type="danger" class="delete-button" @click="del(item.id)" />
                    </template>
                </van-swipe-cell>

            </van-checkbox-group>
        </div>
    </div>
</template>

<script>
import {
    getCartList,
    upCartNum,
    delCart
} from "@/api/cart.js"
export default {
    data() {
        return {
            imgUrls: this.$baseApi,
            changevalue: 0, //count
            cartList: [
                {
                    id: 2,
                    productInfo: {
                        storeName: "商品A",
                        storeInfo: "商家A",
                        image: "https://example.com/imageA.jpg",
                        isIntegral: 0,
                        attrInfo: {
                            sku: "SKU-A",
                            price: 99.00
                        }
                    },
                    cartNum: 2, // 购物车中的数量
                    truePrice: 99.00, // 商品真实价格
                    combinationId: 0 // 是否为组合商品
                },
            ],
            value: false, //全选按钮
            money: 0, //总金额
            result: [], //all check name
            list: [], //select list
            ckAll: false, //是否全选
            itemId: null, //商品id 
        };
    },
    created() {
        this.getCart()
    },
    methods: {
        //获取购物车列表
        getCart() {
            getCartList().then(res => {
                this.cartList = res.data.valid
            })
        },
        //获取点击的name 复选框
        toggle(name, money) {
            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i] == name) {
                    this.ckAll = false
                    this.money = this.money - money
                    this.list.splice(i, 1);
                    name = null
                    this.value = false
                    return
                }
            }
            if (name != null) {
                this.list.push(name)
                this.money = this.money + money
            }
        },
        ////修改购物车数量
        onChange(value) {
            this.money = 0
            this.cartList.forEach((item, index) => {
                if (item.id == this.list[index]) {
                    this.money = this.money + item.truePrice * item.cartNum
                }
            })

            this.$toast.loading({
                forbidClick: true
            });
            let vm = this
            clearTimeout(vm.timer);
            vm.timer = setTimeout(() => {
                vm.$toast.clear();
                vm.changevalue = value;
                if (vm.changevalue > 0 && vm.itemId != null) {
                    upCartNum({
                        number: vm.changevalue,
                        id: vm.itemId
                    }).then(res => { })
                }
            }, 500);


        },
        //提交按钮
        onSubmit() {
            if (this.list.length > 0) {
                if (this.list.length == 1) {
                    this.$router.push({
                        name: 'createOrder',
                        query: {
                            ids: this.list[0]
                        }
                    });
                } else {
                    this.$router.push({
                        name: 'createOrder',
                        query: {
                            ids: JSON.stringify(this.list).replace('[', '').replace(']', '')
                        }
                    });
                }

            } else {
                this.$toast.fail("至少选择一件商品！")
            }


        },
        //删除
        del(id) {
            let list = []
            list.push(id)
            delCart({
                ids: list
            }).then(res => {
                if (res.status) {
                    this.getCart()
                    this.$toast.success('删除成功');
                }
            })
        },
        //全选
        toggleAll(ckAll) {
            this.money = 0
            this.$refs.checkboxGroup.toggleAll(ckAll);
            this.ckAll = ckAll
            this.list = []
            let money = 0
            if (ckAll) {
                //计算总金额
                this.cartList.forEach(item => {
                    money = money + item.productInfo.attrInfo.price * item.cartNum
                    this.list.push(item.id)
                })
                this.money = money
            } else {
                this.list = []
                this.money = money
            }
        },
    },
};
</script>

<style scoped>
.warpper {
    position: absolute;

    left: 0px;
    right: 0px;
    height: 80%;
    background: #fff;
}

.cart {

    background-color: #FFFFFF;
    padding: 10px;
}

.delete-button {
    height: 100%;
}

.van-swipe-cell {
    margin-top: 5px;
}
</style>
