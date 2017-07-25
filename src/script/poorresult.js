$(() => {
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

    $.ajax({
        url: 'http://test.360guanggu.com/fupingv1/api.php/Detail/userType',
        type: 'POST',
        data: `uid=${localStorage.uid}`,
        success: (data) => {
            if (JSON.parse(data).type === 1) {
                $('#projectcheck').attr('href', 'projectcheck_xian.html')
            } else if (JSON.parse(data).type === 2) {
                $('#projectcheck').attr('href', 'projectcheck_zhen.html')
            } else if (JSON.parse(data).type === 0) {
                $('#projectcheck').click(function () {
                    app.showMsg('无权限')
                })
            }   
        }
    })
})