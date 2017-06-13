$(() => {
    //创建根节点对象
    var app = {
        el: $('#app'),
        setScreen: () => {
            app.el.css({"height": `${window.innerHeight - 20}px`})
        },
        getNotice: () => {
            var notice = 1
            var ntcNum = 6
            if (notice) {
                $('.u-notice').css({
                    'background': 'url("../image/noticebell-spot.png") no-repeat',
                    'background-size': '28px',
        'background-position': '0 16px'
                })
                if (ntcNum > 9) {
                    $('.ntc-num').html('')
                } else {
                    $('.ntc-num').html(ntcNum)
                }
            } else {
                $('.u-notice').css({
                    'background': 'url("../../image/noticebell-nospot.png") no-repeat',
                    'background-size': '28px',
        'background-position': '0 16px'
                })
            }
        },
        appAjax_1: () => {
            $.ajax({
                type: "get",
                url: "http://test.360guanggu.com/yuanan_fupin/api.php/Warn/index?user_id=6",
                success: (data) => {
                    var jsonData = JSON.parse(data)
                    $('.u-num .left .num').html(jsonData.data.batch)
                    $('.u-num .right .num').html(jsonData.data.count)
                }
            })
        }
    }

    //调用方法
    app.setScreen()
    app.getNotice()

        //预警批次和人数
        app.appAjax_1()

    // 基于准备好的dom，初始化echarts实例
    var zPie = echarts.init(document.getElementById('zPie'))

    $.ajax({
        type: "get",
        url: "http://test.360guanggu.com/yuanan_fupin/api.php/Warn/warning?user_id=6",
        success: (data) => {
            var jsonData = []
            for (var i = 0; i < 6; i++) {
                jsonData[i] = {value: +JSON.parse(data)[i].num, name: JSON.parse(data)[i].text}
            }
            zPie.setOption({
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius : '60%',
                        center: ['50%', '50%'],
                        data: jsonData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            })
        }
    })

    var cBar = echarts.init(document.getElementById('cBar'))
    
    $.ajax({
        type: "get",
        url: "http://test.360guanggu.com/yuanan_fupin/api.php/Warn/village?user_id=6",
        success: (data) => {
            var village = [],
                family = [],
                persons = []

            for (var i = 0; i < 117; i++) {
                village[i] = JSON.parse(data)[i].text
                persons[i] = +JSON.parse(data)[i].family_count
                family[i] = +JSON.parse(data)[i].num
            }
            village.reverse()
            family.reverse()
            persons.reverse()

            cBar.setOption({
                legend: {
                    data: ['贫困户数', '贫困人口数']
                },
                grid: {
                    left: 'left',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01],
                    position: 'top'
                },
                yAxis: {
                    type: 'category',
                    axisTick: {
                        interval: 0
                    },
                    axisLabel: {
                        interval: 0
                    },
                    data: village
                },
                series: [
                    {
                        name: '贫困户数',
                        type: 'bar',
                        data: family
                    },
                    {
                        name: '贫困人口数',
                        type: 'bar',
                        data: persons
                    }
                ]
            })
        }
    })
})



/**
接口信息
精准识别 批次号和预警人数：http://test.360guanggu.com/yuanan_fupin/api.php/Warn/index?user_id=6
饼图
http://test.360guanggu.com/yuanan_fupin/api.php/Warn/warning?user_id=6
柱状图
http://test.360guanggu.com/yuanan_fupin/api.php/Warn/village?user_id=6
 */