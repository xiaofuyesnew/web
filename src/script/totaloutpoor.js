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
        } else if ($(this).attr('data-nav') === '3') {
            $('.m-main').children().addClass('hide')
            $($('.m-main .u-main')[2]).removeClass('hide')
        }
    })


    //不同年份脱贫人口数量统计图
    var diffYear = echarts.init(document.getElementById('diffYear'))

    $.ajax({
        url: 'http://test.360guanggu.com/yuanan_fupin/api.php/Changepoor/index',
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
            prama = 'year=2017&town=不限'
        }

        //获取数据
        $.ajax({
            url: 'http://test.360guanggu.com/yuanan_fupin/api.php/Changepoor/area',
            type: 'post',
            data: prama,
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
            url: 'http://test.360guanggu.com/yuanan_fupin/api.php/Changepoor/hushu',
            type: 'post',
            data: prama,
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
                    
                })
            }
        })
    }
    
    getDiffArea()

    $.ajax({
        url: 'http://test.360guanggu.com/yuanan_fupin/api.php/Changepoor/year',
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

    $.ajax({
        url: 'http://test.360guanggu.com/yuanan_fupin/api.php/Changepoor/searchtown',
        type: 'get',
        success: (data) => {
            for (var i = 0; i < JSON.parse(data).data.length; i++) {
                console.log(JSON.parse(data).data[i].text)
            }
        }
    })


})

