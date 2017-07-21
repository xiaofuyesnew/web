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
        $('#area').html('不限')
        $('#poor').html('不限')
        $('#npoor').html('不限')
    })

    //获取地域
    $.ajax({
        url: 'http://test.360guanggu.com/fupingv1/api.php/Macro/areaList?pid=420525000000',
        type: 'GET',
        success: (data) => {
            var jsonData = JSON.parse(data),
                area = [{id:'0',value:'不限'}],
                cun = [{id:'0',value:'不限'}]
            for (var i = 0; i < jsonData.data.length; i++) {
                $.ajax({
                    url: `http://test.360guanggu.com/fupingv1/api.php/Macro/areaList?pid=${jsonData.data[i].id}`,
                    type: 'GET',
                    async: false,
                    success: (data) => {
                        for (var i = 0; i < JSON.parse(data).data.length; i++) {
                            cun.push({id: JSON.parse(data).data[i].id, value: JSON.parse(data).data[i].text})
                        }
                    }
                })

                area.push({id: jsonData.data[i].id, value: jsonData.data[i].text, childs: cun})

                cun = [{id:'0',value:'不限'}]
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
/*
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
*/
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

/*
    //按需加载
    var page = 0,
        prama = ''

    $('.content').dropload({
        scrollArea : window,
        loadDownFn : (me) => {
            page++
            prama = `page=${page}`
            console.log(page)
            var result = ''
            $.ajax({
                type: 'POST',
                url: 'http://test.360guanggu.com/fupingv1/api.php/Macro/poorList',
                data: prama,
                dataType: 'json',
                success: function (data) {
                    var arrLen = data.data.datas.length
                    
                    if (arrLen > 0) {
                        for (var i = 0; i < arrLen; i++) {
                            result += `<div class="list">${data.data.datas[i].name}</div>`
                        }
                    } else {
                        me.lock()
                        me.noData()
                    }
                    setTimeout(() => {
                        $('.lists').append(result)
                        me.resetload()
                    }, 2000)
                },
                error: function (xhr, type) {
                    alert('Ajax error!')
                    me.resetload()
                }
            })
        }
    })*/
})