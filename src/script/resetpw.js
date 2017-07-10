$(() => {
    var app = {
        el: $('#app'),
        setScreen: () => {
            app.el.css({"height": `${window.innerHeight - 20}px`})
        },
        loadBtn: () => {
            $('.u-reset button').click(() => {
                $('.sp-wraper').show(() => {
                    $('.sp-wraper').css({'opacity': '1'})
                })
                setTimeout(() => {
                    $('.sp-wraper').css({'opacity': '0'});
                }, 3000)
                setTimeout(() => {
                    $('.sp-wraper').hide()
                    app.showMsg()
                }, 5000)
            })
        },
        showMsg: () => {
            $('.msg').html('重置成功').show(() => {
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
})