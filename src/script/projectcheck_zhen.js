$(() => {

    //创建根节点对象
    var app = {
        el: $('#app'),
        setScreen: () => {
            app.el.css({"height": `${window.innerHeight - 20}px`})
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
        }
    }

    //调用方法
    app.setScreen()

    //侧边搜索框弹出
    $('.m-dropdown .u-show').click(function () {
        $('.u-hide').addClass('animOut')
        $('.u-mask').show()
    })

    $('.u-mask').click(function () {
        getBack()
    })

    //侧边栏回收函数
    function getBack() {
        $('.u-hide').removeClass('animOut')
        $('.u-hide').addClass('animIn')
        setTimeout(function () {
            $('.u-hide').removeClass('animIn')
        }, 350)
        $('.u-mask').hide()
    }

    //重置按钮
    $('#reset').click(function () {
        $('#year').html('不限')
        $('#category').html('不限')
        $('#poverty').html('不限')
        $('#item_subtype').html('不限')
        $('#fund_source').html('不限')
    })

    //获取年份
    $.ajax({
        url: 'http://test.360guanggu.com/fupingv1/api.php/Detail/yearList',
        type: 'get',
        success: (data) => {
            var jsonData = JSON.parse(data),
                year = ['不限']

            for (var i = 0; i < jsonData.datas.length; i++) {
                year.push(jsonData.datas[i].year)
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

    //获取项目类别
    $.ajax({
        url: 'http://test.360guanggu.com/fupingv1/api.php/Detail/categoryList',
        type: 'get',
        success: (data) => {
            var jsonData = JSON.parse(data),
                category =['不限']

            for (var i = 0; i < jsonData.datas.length; i++) {
                category.push(jsonData.datas[i].category)
            }

            var categorySelect = new MobileSelect({
                trigger: '#category',
                title: '选择类别',
                wheels: [
                    {data: category}
                ]
            })
        }
    })

    //获取项目类型
    $.ajax({
        url: 'http://test.360guanggu.com/fupingv1/api.php/Detail/typeList',
        type: 'get',
        success: (data) => {
            var jsonData = JSON.parse(data),
                poverty = ['不限']

            for (var i = 0; i < jsonData.datas.length; i++) {
                poverty.push(jsonData.datas[i].poverty)
            }

            var povertySelect = new MobileSelect({
                trigger: '#poverty',
                title: '选择类型',
                wheels: [
                    {data: poverty}
                ]
            })
        }
    })

    //获取项目子类型
    $.ajax({
        url: 'http://test.360guanggu.com/fupingv1/api.php/Detail/childTypeList',
        type: 'get',
        success: (data) => {
            var jsonData = JSON.parse(data),
                item_subtype = []

            for (var i = 0; i < jsonData.datas.length; i++) {
                if (jsonData.datas[i].item_subtype === '') {
                    item_subtype.push('不限')
                } else {
                    item_subtype.push(jsonData.datas[i].item_subtype)
                }
            }

             var item_subtypeSelect = new MobileSelect({
                trigger: '#item_subtype',
                title: '选择子类别',
                wheels: [
                    {data: item_subtype}
                ]
            })
        }
    })

    //获取资金来源
    $.ajax({
        url: 'http://test.360guanggu.com/fupingv1/api.php/Detail/sourceList',
        type: 'get',
        success: (data) => {
            var jsonData = JSON.parse(data),
                fund_source =[]

            for (var i = 0; i < jsonData.datas.length; i++) {
                if (jsonData.datas[i].fund_source === '') {
                    fund_source.push('不限')
                } else {
                    fund_source.push(jsonData.datas[i].fund_source)
                }
            }

            var fund_sourceSelect = new MobileSelect({
                trigger: '#fund_source',
                title: '选择类别',
                wheels: [
                    {data: fund_source}
                ]
            })
        }
    })

    //按需加载
    function needLoad(year, category, poverty, item_subtype, fund_source) {
        var page = 0,
            prama = ''

        if (year === '不限') {
            prama += `year=&`
        } else {
            prama += `year=${year}&`
        }

        if (category === '不限') {
            prama += `category=&`
        } else {
            prama += `category=${category}&`
        }

        if (item_subtype === '不限') {
            prama += `item_subtype=&`
        } else {
            prama += `item_subtype=${item_subtype}&`
        }

        if (poverty === '不限') {
            prama += `poverty=&`
        } else {
            prama += `poverty=${poverty}&`
        }

        if (fund_source === '不限') {
            prama += `fund_source=`
        } else {
            prama += `fund_source=${fund_source}`
        }

        $.ajax({
            url: 'http://test.360guanggu.com/fupingv1/api.php/Detail/townList',
            type: 'POST',
            data: prama,
            success: (data) => {
                console.log(JSON.parse(data))
                $('#integration_money').html(+JSON.parse(data).integration_money)
                $('#pay_money').html(+JSON.parse(data).pay_money)
                $('#surplus_money').html(+JSON.parse(data).surplus_money)
            }
        })

        $('.cont').dropload({
            scrollArea : window,
            loadDownFn : (me) => {
                page++
                var result = '',
                    newPage =''
                newPage += `&page=${page}`
                $.ajax({
                    type: 'POST',
                    url: 'http://test.360guanggu.com/fupingv1/api.php/Detail/townList',
                    data: prama + newPage,
                    dataType: 'json',
                    success: function (data) {
                        if (page === 1) {
                            app.showMsg(`搜索到${data.count}条记录`)
                        }
                        var arrLen = data.datas.length
                    
                        if (arrLen > 0) {
                            for (var i = 0; i < arrLen; i++) {
                            result += `<div class="list">
                    <div class="unit-h">
                        <div class="hidden">
                        <span class="title">整合资金名称:</span>
                        <span>${data.datas[i].capital_name}</span>
                        </div>
                        <a class="more" href="projectcheck_xian_tt.html?subtype_id=${data.datas[i].subtype_id}"></a>
                    </div>
                    <div class="unit left">
                        <span class="title">类别:</span>
                        <span>${data.datas[i].category}</span>
                    </div>
                    <div class="unit over right">
                        <span class="title">责任单位:</span>
                        <span>${data.datas[i].unit}</span>
                    </div>
                    <div class="unit left">
                        <span class="title">项目类型:</span>
                        <span>${data.datas[i].poverty}</span>
                    </div>
                    <div class="unit right">
                        <span class="title">整合资金:</span>
                        <span>${+data.datas[i].company_funds}</span>
                    </div>
                    <div class="unit left">
                        <span class="title">已拨付资金:</span>
                        <span>${+data.datas[i].capital_unit}</span>
                    </div>
                    <div class="unit right">
                        <span class="title">剩余资金:</span>
                        <span>${+data.datas[i].surplus_funds}</span>
                    </div>
                </div>`
                            }
                        } else {
                            me.lock()
                            me.noData()
                        }
                        $('.lists').append(result)
                        me.resetload()
                    },
                    error: function (xhr, type) {
                        alert('数据加载错误请重试！')
                        me.resetload()
                    }
                })
            }
        })
    }

    needLoad('不限', '不限', '不限', '不限', '不限')

    //搜索按钮
    $('#search').click(function () {
        var year = $('#year').html(),
            category = $('#category').html(),
            poverty = $('#poverty').html(),
            item_subtype = $('#item_subtype').html(),
            fund_source = $('#fund_source').html()

        //清楚原始内容
        $('.cont .lists').children().remove()
        $('.cont .lists').next().remove()

        needLoad(year, category, poverty, item_subtype, fund_source)

        getBack()
    })
})