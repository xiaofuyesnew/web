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
            $('.u-check img').click(function () {
                    $('.u-check img').attr('src', 'http://test.360guanggu.com/yuanan_fupin/api.php/Login/get_codes?PHPSESSID=d93793f0dc2942f1e97e4370fa9a3fdb')
            })
        },
        login: () => {
            $('button').click(function () {
                var username = `username=${$('#username').val()}`,
                    password = `password=${$('#password').val()}`,
                    code = `code=${$('#code').val()}`,
                    key = 'PHPSESSID=d93793f0dc2942f1e97e4370fa9a3fdb',
                    prama = `${username}&${password}&${code}&${key}`
                    console.log(prama)
                $.ajax({
                    url: 'http://test.360guanggu.com/yuanan_fupin/api.php/Login/login',
                    type: "post",
                    data: prama,
                    success: (data) => {
                        if (JSON.parse(data).status === 1) {
                            window.location = 'html/macroresult.html'
                        } else {
                            app.showMsg(JSON.parse(data).info)
                        }
                        console.log(JSON.parse(data))
                    }
                })
            })
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
    app.ajax()
    app.login()

    //window.location = 'html/macroresult.html'
})

/*
http://test.360guanggu.com/yuanan_fupin/api.php/Login/login?username=shenjiju&password=123456&code=1408
登陆接口
post

http://test.360guanggu.com/yuanan_fupin/api.php/Login/get_code

验证码接口
get获取验证码
post提交验证

http://test.360guanggu.com/yuanan_fupin/api.php/Login/add?username=shenjiju&mail=xxue495725835@163.com


*/