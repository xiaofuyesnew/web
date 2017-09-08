$(() => {
    var app = {
        el: $('#app'),
        setScreen: () => {
            app.el.css({"height": `${window.innerHeight - 20}px`})
        },
        getNotice: () => {
            var notice = 1
            var ntcNum = 6
            if (notice) {
                $('.u-notice').css({
                    'background': 'url("../image/noticebell-spot.png") no-repeat',
                    'background-size': '28px',
        'background-position': 'left center'
                })
                if (ntcNum > 9) {
                    $('.ntc-num').html('')
                } else {
                    $('.ntc-num').html(ntcNum)
                }
            } else {
                $('.u-notice').css({
                    'background': 'url("../../image/noticebell-nospot.png") no-repeat',
                    'background-size': '28px',
        'background-position': 'left center'
                })
            }
        },
        logOut: () => {
            $('.u-logout').click(function () {
                localStorage.logout = '1'
                window.location = '../index.html?logout=1'
            })
        }
    }

    //调用方法
    app.setScreen()
    app.getNotice()
    app.logOut()
})