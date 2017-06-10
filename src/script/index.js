$(() => {
    //创建根节点对象
    var app = {
        el: $('#app'),
        setScreen: () => {
            app.el.css({"height": `${window.innerHeight - 20}px`})
        },
        loadBtn: () => {
            $('.u-login button').click(() => {
                $('.sp-wraper').show(() => {
                    $('.sp-wraper').css({'opacity': '1'})
                })
                setTimeout(() => {
                    $('.sp-wraper').css({'opacity': '0'});
                }, 3000)
                setTimeout(() => {
                    window.location = 'html/macroresult.html'
                }, 5000)
            })
        },
        ajax: () => {
            var api = 'http://test.360guanggu.com/yuanan_fupin/api.php/Login/get_code'
            $('.u-check img').click(function () {
                $.get(api, (data, status) => {
                    $('.u-check img').attr('src', api)
                })
            })
        }
    }

    //调用方法
    app.setScreen()
    app.loadBtn()
    app.ajax()
})

/*
http://test.360guanggu.com/yuanan_fupin/api.php/Login/login?username=shenjiju&password=123456&code=1408
登陆接口
post

http://test.360guanggu.com/yuanan_fupin/api.php/Login/get_code

验证码接口
get获取验证码
post提交验证




精准识别 批次号和预警人数：http://localhost/fupin/api.php/Warn/index?user_id=6



http://localhost/fupin/api.php/Warn/warning?user_id=6


http://localhost/fupin/api.php/Warn/village?user_id=6

*/