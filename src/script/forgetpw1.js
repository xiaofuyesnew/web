$(() => {
    var app = {
        el: $('#app'),
        setScreen: () => {
            app.el.css({"height": `${window.innerHeight - 20}px`})
        },
        loadBtn: () => {
            $($('.u-forget button')[0]).click(() => {
                app.showMsg('发送成功')
            })
            $($('.u-forget button')[1]).click(() => {
                $('.sp-wraper').show(() => {
                    $('.sp-wraper').css({'opacity': '1'})
                })
                setTimeout(() => {
                    $('.sp-wraper').css({'opacity': '0'});
                }, 3000)
                setTimeout(() => {
                    $('.sp-wraper').hide()
                    window.location = 'forgetpw2.html'
                }, 5000)
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

    app.setScreen()
    app.loadBtn()
})