$(() => {
    //创建根节点对象
    var app = {
        el: $('#app'),
        setScreen: () => {
            app.el.css({"height": `${window.innerHeight - 20}px`})
        }
    }

    //调用方法
    app.setScreen()

    //页面切换效果
    $('.u-main:first .button').click(function () {
        $($('.u-main')[0]).children('.unit').removeClass('hide')
        $(this).parents('.unit').addClass('hide')
    })

    $('.subnav .unit').click(function () {
        $('.subnav .unit').removeClass('blue')
        $('.subnav .unit .bar').addClass('hide')
        $(this).addClass('blue')
        $(this).children('.bar').removeClass('hide')
        if ($(this).attr('data-nav') === '1') {
            $('.m-main').children().addClass('hide')
            $($('.m-main .u-main')[0]).removeClass('hide')
        } else if ($(this).attr('data-nav') === '2') {
            $('.m-main').children().addClass('hide')
            $($('.m-main .u-main')[1]).removeClass('hide')
            $($('.subnav .unit')[0]).removeClass('hide')
            $($('.subnav .unit')[3]).addClass('hide')
        } else if ($(this).attr('data-nav') === '3') {
            $('.m-main').children().addClass('hide')
            $($('.m-main .u-main')[2]).removeClass('hide')
            $($('.subnav .unit')[3]).removeClass('hide')
            $($('.subnav .unit')[0]).addClass('hide')
        } else if ($(this).attr('data-nav') === '4') {
            $('.m-main').children().addClass('hide')
            $($('.m-main .u-main')[3]).removeClass('hide')
        }
    })


    //不同年份脱贫人口数量统计图
    var diffYear = echarts.init(document.getElementById('diffYear'))

    $.ajax({
        url: `http://120.76.203.56:8002/api.php/Changepoor/index?uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}`,
        type: 'get',
        success: (data) => {
            var year = [],
                nopeople = [],
                people = []
            for (var i = 0; i < JSON.parse(data).data.length; i++) {
                year[i] = JSON.parse(data).data[i].filingyear
                nopeople[i] = JSON.parse(data).data[i].nopeople_num
                people[i] = JSON.parse(data).data[i].people_num
            }
            year.reverse()
            nopeople.reverse()
            people.reverse()
            diffYear.setOption({
                legend: {
                    data: ['贫困人口数', '脱贫人口数']
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
                    data: year
                },
                series: [
                    {
                        name: '贫困人口数',
                        type: 'bar',
                        data: nopeople
                    },
                    {
                        name: '脱贫人口数',
                        type: 'bar',
                        data: people
                    }
                ]
            })
        }
    })
    
    //同一年份不同地域脱贫人口对比图
    var diffArea = echarts.init(document.getElementById('diffArea'))

    var getDiffArea = (prama) => {
        
        //设定默认值
        if (!prama) {
            prama = `year=2017&town=不限`
        }

        //获取数据
        $.ajax({
            url: `http://120.76.203.56:8002/api.php/Changepoor/area`,
            type: 'post',
            data: `uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}&${prama}`,
            success: (data) => {
                var text = [],
                    nonum = [],
                    num = []
                for (var i = 0; i < JSON.parse(data).data.length; i++) {
                    text[i] = JSON.parse(data).data[i].text
                    nonum[i] = JSON.parse(data).data[i].nonum,
                    num[i] = JSON.parse(data).data[i].num
                }
                text.reverse()
                nonum.reverse()
                num.reverse()
                diffArea.setOption({
                    legend: {
                        data: ['贫困户数', '脱贫户数']
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
                        data: text
                    },
                    series: [
                        {
                            name: '贫困户数',
                            type: 'bar',
                            data: nonum
                        },
                        {
                            name: '脱贫户数',
                            type: 'bar',
                            data: num
                        }
                    ]
                })
            }
        })
    }

    //同一年份不同收入档次户数分布图
    var sydincome = echarts.init(document.getElementById('sydincome'))

    var getSydincome = (prama) => {
        
        //设定默认值
        if (!prama) {
            prama = 'year=2017'
        }

        //获取数据
        $.ajax({
            url: 'http://120.76.203.56:8002/api.php/Changepoor/hushu',
            type: 'post',
            data: `uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}&${prama}`,
            success: (data) => {
                var rand = []
                for (var i = 0; i < JSON.parse(data).data.length; i++) {
                    rand[i] = JSON.parse(data).data[i].res
                }
                sydincome.setOption({
                    grid: {
                        left: '5%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            name: '元',
                            type : 'category',
                            axisTick: {
                                interval: 0
                            },
                            axisLabel: {
                                interval: 0,
                                rotate: -30
                            },
                            data : ['0~1000', '1000~1500', '1500~2000', '2000~2500', 
            '2500~3000', '3000~4000', '4000以上']
                        }
                    ],
                    yAxis: [
                        {
                            name: '户数',
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name:'户数',
                            type:'bar',
                            data: rand,
                            itemStyle: {
                                normal: {
                                    color: '#4fb5ff'
                                }
                
                            }
                        }
                    ]
                })
            }
        })
    }

    //不同年份各收入档次户数对比图
    var dydincome = echarts.init(document.getElementById('dydincome'))

    var getDydincome = (prama) => {
        
        //设定默认值
        if (!prama) {
            prama = 'min=0&max=1000'
        }

        //获取数据
        $.ajax({
            url: `http://120.76.203.56:8002/api.php/Changepoor/hushu_nianfen`,
            type: 'post',
            data: `uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}&${prama}`,
            success: (data) => {
                //console.log(JSON.parse(data))
                
                var year = [],
                    num = []
                for (var i = 0; i < JSON.parse(data).data.length; i++) {
                    year[i] = JSON.parse(data).data[i].filingyear
                    num[i] = JSON.parse(data).data[i].num
                }
                dydincome.setOption({
                    grid: {
                        left: '5%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            name: '人数',
                            type: 'value',
                            boundaryGap: [0, 0.01],
                            position: 'top'
                        }
                    ],
                    yAxis: [
                        {
                            type: 'category',
                            axisTick: {
                                interval: 0
                            },
                            axisLabel: {
                                interval: 0
                            },
                            data: year
                        }
                    ],
                    series: [
                        {
                            type:'bar',
                            data: num,
                            itemStyle: {
                                normal: {
                                    color: '#4fb5ff'
                                }
                
                            }
                        }
                    ]
                })
            }
        })
    }
    
    //同一年份不同收入档次收入来源分布图
    var sydincomes = echarts.init(document.getElementById('sydincomes'))

    var getSydincomes = (prama) => {
        
        //设定默认值
        if (!prama) {
            prama = 'year=2017'
        }

        //获取数据
        $.ajax({
            url: `http://120.76.203.56:8002/api.php/Changepoor/resource`,
            type: 'post',
            data: `uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}&${prama}`,
            success: (data) => {
                var formatData = [],
                    tmpObj = {}
                for (var value in JSON.parse(data).data) {
                    switch (value) {
                        case 'wageIncome':
                            tmpObj.value = +JSON.parse(data).data[value]
                            tmpObj.name = '工资性收入'
                            formatData.push(tmpObj)
                            tmpObj ={}
                            break
                        case 'propertyIncome':
                            tmpObj.value = +JSON.parse(data).data[value]
                            tmpObj.name = '财产性收入'
                            formatData.push(tmpObj)
                            tmpObj ={}
                            break
                        case 'productiveIncome':
                            tmpObj.value = +JSON.parse(data).data[value]
                            tmpObj.name = '经营性收入'
                            formatData.push(tmpObj)
                            tmpObj ={}
                            break
                        case 'transferredIncome':
                            tmpObj.value = +JSON.parse(data).data[value]
                            tmpObj.name = '转移性收入'
                            formatData.push(tmpObj)
                            tmpObj ={}
                            break
                    }
                }
                sydincomes.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{c}元 {d}%"
                    },
                    series : [{
                        type: 'pie',
                        radius : '40%',
                        center: ['50%', '50%'],
                        data: formatData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                })
            }
        })
    }

    //产业扶贫统计图
    var industry = echarts.init(document.getElementById('industry'))

    var getIndustry = (prama) => {
        
        //设定默认值
        if (!prama) {
            prama = ''
        }

        $.ajax({
            url: 'http://120.76.203.56:8002/api.php/macro/industry',
            type: 'POST',
            data: `uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}&area=${prama}`,
            success: (data) => {
                var locData = [],
                    aniData = [],
                    plaData = [],
                    etrData = []
                console.log(JSON.parse(data).data)
                for (var i = 0; i < JSON.parse(data).data.length; i++) {
                    locData.push(JSON.parse(data).data[i].name)
                    aniData.push(+JSON.parse(data).data[i].axis[0].count)
                    plaData.push(+JSON.parse(data).data[i].axis[1].count)
                    etrData.push(+JSON.parse(data).data[i].axis[2].count)
                }

                industry.setOption({
                    legend: {
                        data: ['养殖业', '种植业', '其他']
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
                        data: locData
                    },
                    series: [
                        {
                            name: '养殖业',
                            type: 'bar',
                            data: aniData
                        },
                        {
                            name: '种植业',
                            type: 'bar',
                            data: plaData
                        },
                        {
                            name: '其他',
                            type: 'bar',
                            data: etrData
                        }
                    ]
                })
            }
        })
    }

    getDiffArea()
    getSydincome()
    getDydincome()
    getSydincomes()
    getIndustry()
    $.ajax({
        url: `http://120.76.203.56:8002/api.php/Changepoor/year?uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}`,
        type: 'get',
        success: (data) => {
            var jsonData = JSON.parse(data),
                year = []
            for (var i = 0; i < jsonData.data.length; i++) {
                year[i] = jsonData.data[i].filingyear
            }
            var yearSelect = new MobileSelect({
                trigger: '#year',
                title: '选择年份',
                wheels: [
                    {data: year}
                ],
                callback: (indexArr, data) => {
                    var prama = `year=${data[0]}&town=${$('#zhen').html()}`
                    getDiffArea(prama)
                }
            })
            var yearTwoSelect = new MobileSelect({
                trigger: '#yearTwo',
                title: '选择年份',
                wheels: [
                    {data: year}
                ],
                callback: (indexArr, data) => {
                    var prama = `year=${data[0]}`
                    getSydincome(prama)
                }
            })
            var yearTwoSelect = new MobileSelect({
                trigger: '#yearThree',
                title: '选择年份',
                wheels: [
                    {data: year}
                ],
                callback: (indexArr, data) => {
                    var prama = `year=${data[0]}`
                    getSydincomes(prama)
                }
            })
        }
    })

    var zhenSelect = new MobileSelect({
        trigger: '#zhen',
        title: '选择镇',
        wheels: [
            {data: ['不限', '河口乡', '嫘祖镇', '花林寺镇', '旧县镇', '茅坪场镇', '鸣凤镇', '洋坪镇']}
        ],
        callback: (indexArr, data) => {
            var prama = `year=${$('#year').html()}&town=${data[0]}`
            getDiffArea(prama)
        }
    })

    var areaSelect = new MobileSelect({
        trigger: '#area',
        title: '选择镇',
        wheels: [
            {data: ['不限', '河口乡', '嫘祖镇', '花林寺镇', '旧县镇', '茅坪场镇', '鸣凤镇', '洋坪镇']}
        ],
        callback: (indexArr, data) => {
            if (data[0] !== '不限') {
                getIndustry(data[0])
            } else {
                getIndustry()
            }
        }
    })

    var randSelect = new MobileSelect({
        trigger: '#rand',
        title: '选择收入范围',
        wheels: [
            {data: [{id:'1', value:'0~1000元'}, {id:'2', value:'1000~1500元'}, {id:'3', value:'1500~2000元'}, {id:'4', value:'2000~2500元'}, {id:'5', value:'2500~3000元'}, {id:'6', value:'3000~4000元'}, {id:'7', value:'4000元以上'}]}
        ],
        callback: (indexArr, data) => {
            var prama = ''
            switch (data[0].id) {
                case '1':
                    prama = 'min=0&max=1000'
                    break
                case '2':
                    prama = 'min=1000&max=1500'
                    break
                case '3':
                    prama = 'min=1500&max=2000'
                    break
                case '4':
                    prama = 'min=2000&max=2500'
                    break
                case '5':
                    prama = 'min=2500&max=3000'
                    break
                case '6':
                    prama = 'min=3000&max=4000'
                    break
                case '7':
                    prama = 'min=4000&max='
                    break 
            }
            getDydincome(prama)
        }
    })
})
