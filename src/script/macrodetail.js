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
    })

    $('.subnav .unit').click(function () {
        var status = $(this).attr('data-nav')
        $('.subnav .unit').removeClass('blue')
        $('.subnav .unit .bar').addClass('hide')
        $(this).addClass('blue')
        $(this).children('.bar').removeClass('hide')
        if (status === '1') {
            $('.m-main').children().addClass('hide')
            $($('.m-main .u-main')[0]).removeClass('hide')
            $('#pageStatus').val(status)
        } else if (status === '2') {
            if ($(this).prev().hasClass('hide')) {
                $(this).prev().removeClass('hide')
            }
            $(this).next().next().addClass('hide')
            $('.m-main').children().addClass('hide')
            $($('.m-main .u-main')[1]).removeClass('hide')
            $('#pageStatus').val(status)
        } else if (status === '3') {
            if (!$(this).prev().prev().hasClass('hide')) {
                $(this).prev().prev().addClass('hide')
            }
            $(this).next().removeClass('hide')
            $('.m-main').children().addClass('hide')
            $($('.m-main .u-main')[2]).removeClass('hide')
            $('#pageStatus').val(status)
        } else if (status === '4') {
            $('.m-main').children().addClass('hide')
            $($('.m-main .u-main')[3]).removeClass('hide')
            $('#pageStatus').val(status)
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
        url: 'http://test.360guanggu.com/fupingv1/api.php/Macro/areaList?pid=420525000000',
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
        url: 'http://test.360guanggu.com/fupingv1/api.php/Macro/yearList',
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

    })

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

        prama = `${yearData}&${areaData}&${conditionData}&${baseData}`

        $.ajax({
            url: 'http://test.360guanggu.com/fupingv1/api.php/Macro/axis',
            type: 'POST',
            data: prama,
            success: (data) => {
                var jsonData = JSON.parse(data).data
                console.log(JSON.parse(data))
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
