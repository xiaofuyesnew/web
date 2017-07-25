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
        },
        getUrlPrama: (name) => {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
            var r = window.location.search.substr(1).match(reg)
            if (r != null) {
                return unescape(r[2])
            } 
            return null
        }
    }

    //调用方法
    app.setScreen()
    console.log(app.getUrlPrama('table_id'))

    //生成列表链接
    $('#condition').attr('href', `poordetail_condition.html?table_id=${app.getUrlPrama('table_id')}`)
    $('#helper').attr('href', `poordetail_helper.html?table_id=${app.getUrlPrama('table_id')}`)
    $('#result').attr('href', `poordetail_result.html?table_id=${app.getUrlPrama('table_id')}`)

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

    $('.arrow').click(function () {
        if ($(this).hasClass('up')) {
            $(this).removeClass('up').addClass('down')
            $(this).parent().next().slideToggle()
        } else {
            $(this).removeClass('down').addClass('up')
            $(this).parent().next().slideToggle()
        }
    })

    $.ajax({
        url: 'http://test.360guanggu.com/fupingv1/api.php/Macro/poorDetail',
        type: 'POST',
        data: `table_id=${app.getUrlPrama('table_id')}`,
        success: (data) => {
            console.log(JSON.parse(data).data)
            $('#name').html(JSON.parse(data).data.poor.name)
            $('#area').html(JSON.parse(data).data.poor.townname + '&nbsp;' + JSON.parse(data).data.poor.villagename)
            $('#sex').html(JSON.parse(data).data.poor.sex)
            $('#birthday').html(JSON.parse(data).data.poor.birthday)
            $('#contacnumber').html(JSON.parse(data).data.poor.contacnumber)
            $('#idnumber').html(JSON.parse(data).data.poor.idnumber)
            $('#homeaddress').html(JSON.parse(data).data.poor.homeaddress)
            $('#povertyattribute').html(JSON.parse(data).data.poor.povertyattribute)
            $('#mainpovertyreason').html(JSON.parse(data).data.poor.mainpovertyreason)

            if (JSON.parse(data).data.familys.length === 0) {
                $('.family .unit').addClass('nodata').html('暂无家庭成员信息')
                $('.photo .unit').addClass('nodata').html('暂无家庭照片信息')
            } else {
                
            }
        }
    })
})