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

    var diffYear = echarts.init(document.getElementById('diffYear'))

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
                    data: ['2013', '2014', '2015', '2016']
                },
                series: [
                    {
                        name: '贫困人口数',
                        type: 'bar',
                        data: [100, 200, 300, 400]
                    },
                    {
                        name: '脱贫人口数',
                        type: 'bar',
                        data: [50, 100, 150, 200]
                    }
                ]
            })

    var diffArea = echarts.init(document.getElementById('diffArea'))

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
                    data: ['凤鸣镇', '凤鸣镇', '凤鸣镇', '凤鸣镇', '凤鸣镇', '凤鸣镇']
                },
                series: [
                    {
                        name: '贫困户数',
                        type: 'bar',
                        data: [100, 200, 300, 400, 400, 400]
                    },
                    {
                        name: '脱贫户数',
                        type: 'bar',
                        data: [50, 100, 150, 200, 200, 200]
                    }
                ]
            })
    /*
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

            
        }
    })*/
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

    var yearSelect = new MobileSelect({
        trigger: '#year',
        title: '选择年份',
        wheels: [
            {data: ['2013', '2014', '2015', '2016', '2017']}
        ],
        callback: (indexArr, data) => {
             
        }
    })

    var yearSelect = new MobileSelect({
        trigger: '#yearTwo',
        title: '选择年份',
        wheels: [
            {data: ['2013', '2014', '2015', '2016', '2017']}
        ],
        callback: (indexArr, data) => {
             
        }
    })

    var zhenSelect = new MobileSelect({
        trigger: '#zhen',
        title: '选择镇',
        wheels: [
            {data: ['不限', '凤鸣镇', '凤鸣镇', '凤鸣镇', '凤鸣镇', '凤鸣镇']}
        ],
        callback: (indexArr, data) => {
             
        }
    })
})


/**
 * 不同年份脱贫人口数量统计图：http://test.360guanggu.com/yuanan_fupin/api.php/Changepoor/index     
 * 获取年份：http://test.360guanggu.com/yuanan_fupin/api.php/Changepoor/year    
 * 同一年份不同地域脱贫人口对比图:http://test.360guanggu.com/yuanan_fupin/api.php/Changepoor/area?year=2017&town=河口乡
同一年份不同收入档次户数分布图：http://test.360guanggu.com/yuanan_fupin/api.php/Changepoor/hushu
不同年份各收入档次户数对比图：http://test.360guanggu.com/yuanan_fupin/api.php/Changepoor/hushu_nianfen?min=0&max=3000

 */