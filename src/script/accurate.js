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
        'background-position': 'left center'
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
        'background-position': 'left center'
                })
            }
        }
    }

    //调用方法
    app.setScreen()
    app.getNotice()

    // 基于准备好的dom，初始化echarts实例
    var zPie = echarts.init(document.getElementById('zPie'))
    var cBar = echarts.init(document.getElementById('cBar'))
    var zPieConf = {
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '60%',
                    center: ['50%', '50%'],
                    data:[
                        {value:335, name:'①镇'},
                        {value:310, name:'②镇'},
                        {value:234, name:'③镇'},
                        {value:135, name:'④镇'},
                        {value:1548, name:'⑤镇'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    var cBarConf = {
            legend: {
                data: ['贫困户数', '贫困人口数']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                position: 'top'
            },
            yAxis: {
                type: 'category',
                data: ['阳平镇','阳平镇','阳平镇','阳平镇','阳平镇','阳平镇']
            },
            series: [
                {
                    name: '贫困户数',
                    type: 'bar',
                    data: [123, 123, 123, 123, 456, 456]
                },
                {
                    name: '贫困人口数',
                    type: 'bar',
                    data: [456, 456, 456, 456, 789, 789]
                }
            ]
    }

    zPie.setOption(zPieConf)
    cBar.setOption(cBarConf)
})