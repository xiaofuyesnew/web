$(() => {

    //地图标记数组
    var area = []

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
    $('.u-main .button').click(function () {
        $('.u-main').children('.unit').removeClass('hide')
        $(this).parents('.unit').addClass('hide')
        
        if ($(this).html() === '切换到户数') {
            setPooroutHu($('#year').html(), $('#area').html())
        } else {
            setPooroutRen($('#year').html(), $('#area').html())
        }
    })

    $('.subnav .unit').click(function () {
        var status = $(this).attr('data-nav'),
            year = $('#year').html(),
            area = $('#area').html()
        $('.subnav .unit').removeClass('blue')
        $('.subnav .unit .bar').addClass('hide')
        $(this).addClass('blue')
        $(this).children('.bar').removeClass('hide')
        if (status === '1') {
            $('.m-main').children().addClass('hide')
            $($('.m-main .u-main')[0]).removeClass('hide')
            $('#pageStatus').val(status)

            setPooroutRen(year, area)
            setPooroutHu(year, area)
        } else if (status === '2') {
            if ($(this).prev().hasClass('hide')) {
                $(this).prev().removeClass('hide')
            }
            $(this).next().next().addClass('hide')
            $('.m-main').children().addClass('hide')
            $($('.m-main .u-main')[1]).removeClass('hide')
            $('#pageStatus').val(status)

            setPoorattrHu(year, area)
        } else if (status === '3') {
            if (!$(this).prev().prev().hasClass('hide')) {
                $(this).prev().prev().addClass('hide')
            }
            $(this).next().removeClass('hide')
            $('.m-main').children().addClass('hide')
            $($('.m-main .u-main')[2]).removeClass('hide')
            $('#pageStatus').val(status)

            setPoorcsHu(year, area)
        } else if (status === '4') {
            $('.m-main').children().addClass('hide')
            $($('.m-main .u-main')[3]).removeClass('hide')
            $('#pageStatus').val(status)

            setOutpoorRen(year, area)
        }
    })

    //下拉搜索框
    $('.m-dropdown .u-show').click(function () {
        if ($('.m-dropdown .u-hide').hasClass('animDown')) {
            $('.m-dropdown .u-hide').removeClass('animDown')
            $('.m-dropdown .u-hide').addClass('animUp')
            $(this).children('img').attr('src', '../image/dropdown.png')
            $(this).children('span').html('点击展开搜索')
        } else if ($('.m-dropdown .u-hide').hasClass('animUp')) {
            $('.m-dropdown .u-hide').removeClass('animUp')
            $('.m-dropdown .u-hide').addClass('animDown')
            $(this).children('img').attr('src', '../image/dropup.png')
            $(this).children('span').html('点击隐藏搜索')
        } else {
            $('.m-dropdown .u-hide').addClass('animDown')
            $(this).children('img').attr('src', '../image/dropup.png')
            $(this).children('span').html('点击隐藏搜索')
        }
    })

    //重置按钮
    $('#reset').click(function () {
        $('#year').html('不限')
        $('#area').html('不限')
    })

    //获取地域
    $.ajax({
        url: `http://120.76.203.56:8002/api.php/Macro/areaList?pid=420525000000&uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}`,
        type: 'GET',
        success: (data) => {
            var jsonData = JSON.parse(data)
            for (var i = 0; i < jsonData.data.length; i++) {
                area[i] = jsonData.data[i].text
            }
            var areaSelect = new MobileSelect({
                trigger: '#area',
                title: '行政区划',
                wheels: [
                    {data: area}
                ]
            })
        }
    })

    //获取年份
    $.ajax({
        url: `http://120.76.203.56:8002/api.php/Macro/yearList?uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}`,
        type: 'GET',
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
                ]
            })
        }
    })

    //搜索按钮
    $('#search').click(function () {
        var year = $('#year').html(),
            area = $('#area').html()
        
        setStatus(year, area)

        switch ($('.blue').attr('data-nav')) {
            case '1':
                setPooroutRen(year, area)
                setPooroutHu(year, area)
                break
            case '2':
                setPoorattrHu(year, area)
                break
            case '3':
                setPoorcsHu(year, area)
                break
            case '4':
                setOutpoorRen(year, area)
                break
        }
    })

    //地域-人数
    var pooroutRen = echarts.init(document.getElementById('poorout-ren'))
    //地域-户数
    var pooroutHu = echarts.init(document.getElementById('poorout-hu'))
    //属性-户数
    var poorattrHu = echarts.init(document.getElementById('poorattr-hu'))
    //原因-户数
    var poorcsHu = echarts.init(document.getElementById('poorcs-hu'))
    //脱贫-人数
    var outpoorRen = echarts.init(document.getElementById('outpoor-ren'))

    //地域-人数
    function setPooroutRen(year, area) {
        var prama = '',
            yearData = '',
            areaData = '',
            conditionData = 'condition=1',
            baseData = 'base=1'

        if (year && year !== '不限') {
            yearData = `filingYear=${year}`
        } else {
            yearData = 'filingYear=2017'
        }

        if (area && area !== '不限') {
            areaData = `area=${area}`
        } else {
            areaData = 'area=远安县'
        }

        prama = `uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}&${yearData}&${areaData}&${conditionData}&${baseData}`

        $.ajax({
            url: 'http://120.76.203.56:8002/api.php/Macro/axis',
            type: 'POST',
            data: prama,
            success: (data) => {
                var jsonData = JSON.parse(data).data.axis,
                    nameData = [],
                    pcData = [],
                    ncData = []

                for (var i = 0; i < jsonData.length; i++) {
                    nameData.push(jsonData[i].name)
                    pcData.push(+jsonData[i].poor_count)
                    ncData.push(+jsonData[i].npoor_count)
                }
                
                nameData.reverse()
                pcData.reverse()
                ncData.reverse()
                
                pooroutRen.setOption({
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
                        data: nameData
                    },
                    series: [
                        {
                            name: '贫困人口数',
                            type: 'bar',
                            data: pcData
                        },
                        {
                            name: '脱贫人口数',
                            type: 'bar',
                            data: ncData
                        }
                    ]
                })
            }
        })
    }

    setPooroutRen()

    //地域-户数
    function setPooroutHu(year, area) {
        var prama = '',
            yearData = '',
            areaData = '',
            conditionData = 'condition=1',
            baseData = 'base=2'

        if (year && year !== '不限') {
            yearData = `filingYear=${year}`
        } else {
            yearData = 'filingYear=2017'
        }

        if (area && area !== '不限') {
            areaData = `area=${area}`
        } else {
            areaData = 'area=远安县'
        }

        prama = `uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}&${yearData}&${areaData}&${conditionData}&${baseData}`

        $.ajax({
            url: 'http://120.76.203.56:8002/api.php/Macro/axis',
            type: 'POST',
            data: prama,
            success: (data) => {
                var jsonData = JSON.parse(data).data.axis,
                    nameData = [],
                    pcData = [],
                    ncData = []

                for (var i = 0; i < jsonData.length; i++) {
                    nameData.push(jsonData[i].name)
                    pcData.push(+jsonData[i].poor_count)
                    ncData.push(+jsonData[i].npoor_count)
                }
                
                nameData.reverse()
                pcData.reverse()
                ncData.reverse()
                
                pooroutHu.setOption({
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
                        data: nameData
                    },
                    series: [
                        {
                            name: '贫困户数',
                            type: 'bar',
                            data: pcData
                        },
                        {
                            name: '脱贫户数',
                            type: 'bar',
                            data: ncData
                        }
                    ]
                })
            }
        })
    }

    setPooroutHu()

    //属性-户数
    function setPoorattrHu(year, area) {
        var prama = '',
            yearData = '',
            areaData = '',
            conditionData = 'condition=2',
            baseData = 'base=2'

        if (year && year !== '不限') {
            yearData = `filingYear=${year}`
        } else {
            yearData = 'filingYear=2017'
        }

        if (area && area !== '不限') {
            areaData = `area=${area}`
        } else {
            areaData = 'area=远安县'
        }

        prama = `uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}&${yearData}&${areaData}&${conditionData}&${baseData}`

        $.ajax({
            url: 'http://120.76.203.56:8002/api.php/Macro/axis',
            type: 'POST',
            data: prama,
            success: (data) => {
                var jsonData = JSON.parse(data).data.axis,
                    nameData = [],
                    numData = []

                for (var i = 0; i < jsonData.length; i++) {
                    nameData.push(jsonData[i].name)
                    numData.push(+jsonData[i].num)
                }
                
                nameData.reverse()
                numData.reverse()
                
                poorattrHu.setOption({
                    legend: {
                        data: ['户数']
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
                        data: nameData
                    },
                    series: [
                        {
                            name: '户数',
                            type: 'bar',
                            data: numData
                        }
                    ]
                })
            }
        })
    }

    setPoorattrHu()

    //原因-户数
    function setPoorcsHu(year, area) {
        var prama = '',
            yearData = '',
            areaData = '',
            conditionData = 'condition=3',
            baseData = 'base=2'

        if (year && year !== '不限') {
            yearData = `filingYear=${year}`
        } else {
            yearData = 'filingYear=2017'
        }

        if (area && area !== '不限') {
            areaData = `area=${area}`
        } else {
            areaData = 'area=远安县'
        }

        prama = `uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}&${yearData}&${areaData}&${conditionData}&${baseData}`

        $.ajax({
            url: 'http://120.76.203.56:8002/api.php/Macro/axis',
            type: 'POST',
            data: prama,
            success: (data) => {
                var jsonData = JSON.parse(data).data.axis,
                    nameData = [],
                    numData = []

                for (var key in jsonData) {
                    nameData[+key - 1] = jsonData[key].name
                    numData[+key - 1] = jsonData[key].num
                }
        
                nameData.reverse()
                numData.reverse()
                
                poorcsHu.setOption({
                    legend: {
                        data: ['户数']
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
                        data: nameData
                    },
                    series: [
                        {
                            name: '户数',
                            type: 'bar',
                            data: numData
                        }
                    ]
                })
            }
        })
    }

    setPoorcsHu()

    //脱贫-人数
    function setOutpoorRen(year, area) {
        var prama = '',
            yearData = '',
            areaData = '',
            conditionData = 'condition=4',
            baseData = 'base=1'

        if (year && year !== '不限') {
            yearData = `filingYear=${year}`
        } else {
            yearData = 'filingYear=2017'
        }

        if (area && area !== '不限') {
            areaData = `area=${area}`
        } else {
            areaData = 'area=远安县'
        }

        prama = `uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}&${yearData}&${areaData}&${conditionData}&${baseData}`

        $.ajax({
            url: 'http://120.76.203.56:8002/api.php/Macro/axis',
            type: 'POST',
            data: prama,
            success: (data) => {
                var jsonData = JSON.parse(data).data.axis,
                    nameData = [],
                    numData = []

                for (var i = 0; i < jsonData.length; i++) {
                    nameData.push(jsonData[i].name)
                    numData.push(+jsonData[i].npoor_count)
                }
                
                nameData.reverse()
                numData.reverse()
                
                outpoorRen.setOption({
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
                        data: nameData
                    },
                    series: [
                        {
                            name: '人口数',
                            type: 'bar',
                            data: numData
                        }
                    ]
                })
            }
        })
    }

    setOutpoorRen()

    //安放当前的状态数据
    function setStatus(year, area, condition, base) {
        var prama = '',
            yearData = '',
            areaData = '',
            conditionData = '',
            baseData = ''

        if (year && year !== '不限') {
            yearData = `filingYear=${year}`
        } else {
            yearData = 'filingYear=2017'
        }

        if (area && area !== '不限') {
            areaData = `area=${area}`
        } else {
            areaData = 'area=远安县'
        }

        conditionData = condition ? `condition=${condition}` : 'condition=1'

        baseData = base ? `base=${base}` : 'base=1'

        prama = `uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}&${yearData}&${areaData}&${conditionData}&${baseData}`

        $.ajax({
            url: 'http://120.76.203.56:8002/api.php/Macro/axis',
            type: 'POST',
            data: prama,
            success: (data) => {
                var jsonData = JSON.parse(data).data
                $('#pvc').html(jsonData.poor_village_count)
                $('#ppc').html(jsonData.poor_people_count)
                $('#pc').html(jsonData.poor_count)
                $('#oc').html(jsonData.opoor_count)
            }
        })
    }

    //调用设置数据方法
    setStatus()
})
