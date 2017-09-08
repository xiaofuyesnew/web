$(() => {
    //创建根节点对象
    var zPie = echarts.init(document.getElementById('zPie')),
        cBar = echarts.init(document.getElementById('cBar'))

    var app = {
        el: $('#app'),
        setScreen: () => {
            app.el.css({"height": `${window.innerHeight - 20}px`})
        },
        appAjax_1: (type) => {
            $.ajax({
                type: "get",
                url: `http://120.76.203.56:8002/api.php/Warn/policy?uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}&type=${type}&name=&id_card=`,
                success: (data) => {
                    var jsonData = JSON.parse(data),
                        pieData = [],
                        villageData = [],
                        barData = []

                    //console.log(jsonData)
                    $('#num0').html(jsonData.batch)
                    $('#num1').html(jsonData.count)
                    $('#num2').html(jsonData.count1)
                    $('#num3').html(jsonData.count2)

                    for (var i = 0; i < 7; i++) {
                        pieData.push({
                            name: jsonData.warns[i].title,
                            value: jsonData.warns[i].sum
                        })
                    }
                    zPie.setOption({
                        series : [
                            {
                                type: 'pie',
                                radius : '60%',
                                center: ['50%', '50%'],
                                data: pieData,
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
                    //console.log(jsonData.villages)
                    for (var i = 0; i < jsonData.villages.length; i++
                    ) {
                        villageData.push(jsonData.villages[i].title)
                        barData.push(jsonData.villages[i].sum)
                    }

                    cBar.setOption({
                        legend: {
                            data: ['人口数']
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
                            data: villageData
                        },
                        series: [
                            {
                                name: '人口数',
                                type: 'bar',
                                data: barData
                            }
                        ]
                    })
                }
            })
        },
        showMsg: (msg) => {
            $('.msg').html(msg).show(() => {
                $('.msg').css({'opacity': '1'})
                setTimeout(() => {
                    $('.msg').css({'opacity': '0'})
                }, 2000)
                setTimeout(() => {
                    $('.msg').hide()
                }, 3000)
            })
        },
    }
    
    //调用方法
    app.setScreen()

    //预警批次和人数
    app.appAjax_1(1)

    

    $('.subnav .unit').click(function () {

        var status = $(this).attr('data-nav')

        $('.subnav .unit').removeClass('blue')
        $('.subnav .unit .bar').addClass('hide')
        $(this).addClass('blue')
        $(this).children('.bar').removeClass('hide')

        if (status === '1') {
            app.appAjax_1(1)
        } else if (status === '2') {
            app.appAjax_1(2)
        } else if (status === '3') {
            app.appAjax_1(3)
        }
    })
})