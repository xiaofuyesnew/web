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
        $('#area').html('不限')
        $('#poor').html('不限')
        $('#npoor').html('不限')
    })

    $.ajax({
        url: `http://120.76.203.56:8002/api.php/Macro/yearList?uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}`,
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
                ]
            })
        }
    })

    //获取地域
    $.ajax({
        url: `http://120.76.203.56:8002/api.php/Macro/areaList?pid=420525000000&uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}`,
        type: 'GET',
        success: (data) => {
            var jsonData = JSON.parse(data),
                area = [{id:'0',value:'不限'}],
                cun = [{id:'0',value:'不限'}]
            for (var i = 0; i < jsonData.data.length; i++) {
                $.ajax({
                    url: `http://120.76.203.56:8002/api.php/Macro/areaList?pid=${jsonData.data[i].id}&uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}`,
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
                ],
                callback: function (indexArr, data) {
                    if (indexArr.length === 2 && indexArr[1] === 0) {
                        $('#area').html(data[0].value)
                    } else if (indexArr.length === 2 && indexArr[1] !== 0) {
                        $('#area').html(data[1].value)
                    } else {
                        $('#area').html('不限')
                    }
                }
            })
        }
    })

    //获取贫困属性
    $.ajax({
        url: `http://120.76.203.56:8002/api.php/Macro/attrList?type=JDLK_POVERTY_ATTR&uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}`,
        type: 'GET',
        success: (data) => {
            var jsonData = JSON.parse(data),
                poor =['不限']
            
            for (var i = 0; i < jsonData.data.length; i++) {
                poor.push(jsonData.data[i].text)
            }

            var poorSelect = new MobileSelect({
                trigger: '#poor',
                title: '贫困属性',
                wheels: [
                    {data: poor}
                ]
            })
        }
    })

    //获取脱贫属性
    $.ajax({
        url: `http://120.76.203.56:8002/api.php/Macro/attrList?type=DIC_OUT_POOR&uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}`,
        type: 'GET',
        success: (data) => {
            var jsonData = JSON.parse(data),
                npoor =['不限']
                
            for (var i = 0; i < jsonData.data.length; i++) {
                npoor.push(jsonData.data[i].text)
            }

            var poorSelect = new MobileSelect({
                trigger: '#npoor',
                title: '脱贫属性',
                wheels: [
                    {data: npoor}
                ]
            })
        }
    })

    //按需加载
    function needLoad(year, name, area, poor, npoor) {
        var page = 0,
            prama = `uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}&`

        if (year === '不限') {
            prama += `filingYear=&`
        } else {
            prama += `filingYear=${year}&`
        }

        if (area === '不限') {
            prama += `area=&`
        } else {
            prama += `area=${area}&`
        }

        if (poor === '不限') {
            prama += `povertyAttribute=&`
        } else {
            prama += `povertyAttribute=${poor}&`
        }

        if (npoor === '不限') {
            prama += `isOupoor=&`
        } else {
            prama += `isOupoor=${npoor}&`
        }

        prama += `name=${name}&`

        $('.cont').dropload({
            scrollArea : window,
            loadDownFn : (me) => {
                page++
                var result = '',
                    newPage =''
                newPage += `page=${page}`
                $.ajax({
                    type: 'POST',
                    url: 'http://120.76.203.56:8002/api.php/Macro/poorList',
                    data: prama + newPage,
                    dataType: 'json',
                    success: function (data) {
                        if (page === 1) {
                            app.showMsg(`搜索到${data.data.count}条记录`)
                        }
                        var arrLen = data.data.datas.length
                    
                        if (arrLen > 0) {
                            for (var i = 0; i < arrLen; i++) {
                            result += `<div class="list">
                    <div class="unit left">
                        <span class="title">姓名：</span>
                        <span>${data.data.datas[i].name}</span>
                    </div>
                    <div class="unit right">
                        <a class="more" href="poordetail_basic.html?table_id=${data.data.datas[i].table_id}"></a>
                    </div>
                    <div class="unit left">
                        <span class="title">贫困属性：</span>
                        <span>${data.data.datas[i].povertyattribute}</span>
                    </div>
                    <div class="unit over right">
                        <span class="title">村镇：</span>
                        <span>${data.data.datas[i].townname}&nbsp;${data.data.datas[i].villagename}</span>
                    </div>
                    <div class="unit left">
                        <span class="title">脱贫属性：</span>
                        <span>${data.data.datas[i].isoupoor}</span>
                    </div>
                    <div class="unit right">
                        <span class="title">致贫原因：</span>
                        <span>${data.data.datas[i].mainpovertyreason}</span>
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

    needLoad('不限', '', '不限', '不限', '不限')

    //搜索按钮
    $('#search').click(function () {
        var year = $('#year').html(),
            name = $('#name').val(),
            area = $('#area').html(),
            poor = $('#poor').html(),
            npoor = $('#npoor').html()


        //清楚原始内容
        $('.cont .lists').children().remove()
        $('.cont .lists').next().remove()

        needLoad(year, name, area, poor, npoor)

        getBack()
    })
})