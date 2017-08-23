$(() => {
    //创建根节点对象
    var app = {
        el: $('#app'),
        setScreen: () => {
            app.el.css({"height": `${window.innerHeight - 20}px`})
        },
        appAjax_1: () => {
            $.ajax({
                type: "get",
                url: `http://120.76.203.56:8002/api.php/Warn/index?uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}`,
                success: (data) => {
                    console.log(JSON.parse(data))
                    var jsonData = JSON.parse(data)
                    $('.u-num .left .num').html(jsonData.data.batch)
                    $('.u-num .right .num').html(jsonData.data.count)
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
        app.appAjax_1()

    // 基于准备好的dom，初始化echarts实例
    var zPie = echarts.init(document.getElementById('zPie'))

    $.ajax({
        type: "get",
        url: `http://120.76.203.56:8002/api.php/Warn/warning?uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}`,
        success: (data) => {
            var jsonData = []
            for (var i = 0; i < 7; i++) {
                jsonData[i] = {value: +JSON.parse(data)[i].num, name: JSON.parse(data)[i].text}
            }
            zPie.setOption({
                series : [
                    {
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
        url: `http://120.76.203.56:8002/api.php/Warn/village?uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}`,
        success: (data) => {
            var [village, family, persons] = [[], [], []]

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