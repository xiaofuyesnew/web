$(() => {
    //创建根节点对象
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
        }
    }

    //调用方法
    app.setScreen()
    app.getNotice()

    var ctxZ = $('#zPie')
    var zPie = new Chart(ctxZ, {
        type: 'pie',
    data: {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [{
            data: [30, 40, 30],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ]
        }]
    },
    options: {
        legend: {
            display: false
        },
        tooltip: {
            intersect: false
        }
    }
    })
})