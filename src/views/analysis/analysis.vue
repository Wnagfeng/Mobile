<template>
    <div class="warpper">
        <div id="Piecharts" style="height: 450px;"></div>
        <div id="Radarcharts" style="height: 300px;"></div>
    </div>
</template>

<script>


export default {
    name: 'analysis',
    data() {
        return {
            piedata: [
                {
                    name: "1",
                    value: 20
                },
                {
                    name: "2",
                    value: 20
                },
                {
                    name: "3",
                    value: 20
                },
                {
                    name: "4",
                    value: 20
                },
                {
                    name: "5",
                    value: 20
                }
            ],
            radardata: {
                indicator: [
                    { name: '2022-1月', max: 11780 },
                    { name: '2022-2月', max: 7400 },
                    { name: '2022-3月', max: 6400 },
                    { name: '2022-4月', max: 4280 },
                    { name: '2022-5月', max: 5450 },
                    { name: '2022-6月', max: 2999 },
                    { name: '2022-7月', max: 6400 },
                    { name: '2022-8月', max: 4280 },
                    { name: '2022-9月', max: 2099 },
                    { name: '2022-10月', max: 15597 },
                    { name: '2022-11月', max: 600 },
                    { name: '2022-12月', max: 3590 }
                ],
                data: [
                    {
                        value: [
                            11180, 6800, 5800, 3680, 4850, 2399, 5800, 3680, 1499,
                            14997, 0, 2990,
                        ],
                        areaStyle: {
                            color: "rgb(42,242,272,.3)"
                        },
                        label: {
                            show: true
                        }
                    }
                ]
            }
        }
    },
    mounted() {
        this.initDom()
    },
    methods: {
        // 初始化dom
        initDom() {
            // 初始化基站
            const piedom = this.$echarts.init(document.getElementById('Piecharts'));
            const radardom = this.$echarts.init(document.getElementById('Radarcharts'));

            const pieChartsOpstion = {
                title: {
                    text: "本年度消费分析",
                    subtext: "本年度消费分析",
                    textStyle: {
                        color: "#fff"
                    },
                    subtextStyle: {
                        color: "#fff"
                    },
                    left: "center"
                },
                series: {
                    type: "pie",
                    radius: "50%",
                    data: this.piedata
                },
                legend: {
                    show: true,
                    orient: '',
                    left: 0,
                    textStyle: {
                        color: "#fff"
                    }
                }
            }
            const radarChartsOption = {
                title: {
                    text: "本年度消费分析",
                    textStyle: {
                        color: "#fff",
                    }
                },
                radar: {
                    radius: "68%",
                    indicator: this.radardata.indicator,
                },
                series: {
                    type: "radar",
                    splitNumber: 5,
                    symbolSize: 5,
                    data: this.radardata.data
                }
            }
            radardom.setOption(radarChartsOption);
            piedom.setOption(pieChartsOpstion);

            console.log(piedom, radardom);
            // 绘制饼图
        }
    }
}
</script>

<style scoped>
.warpper {
    width: 100vw;
    height: calc(100vh - 96px);
    background-color: rgb(4, 4, 42);
}
</style>
