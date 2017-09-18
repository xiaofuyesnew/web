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
        },
        imgPrev: (imglist) => {
            $('.imgmulshow .left').click(function () {
                if (+$('.imgmulshow img').attr('data-now') - 1 >= 0) {
                    $('.imgmulshow img').attr('src', imglist[+$('.imgmulshow img').attr('data-now') - 1])
                    $('.imgmulshow img').attr('data-now', +$('.imgmulshow img').attr('data-now') - 1)
                } else {
                    app.showMsg('前面没有图片')
                }
            })
        },
        imgNext: (imglist) => {
            $('.imgmulshow .right').click(function () {
                if (+$('.imgmulshow img').attr('data-now') + 1 < imglist.length) {
                    $('.imgmulshow img').attr('src', imglist[+$('.imgmulshow img').attr('data-now') + 1])
                    $('.imgmulshow img').attr('data-now', +$('.imgmulshow img').attr('data-now') + 1)
                } else {
                    app.showMsg('后面没有图片')
                }
            })
        }
    }

    //调用方法
    app.setScreen()
    console.log(app.getUrlPrama('table_id'))

    //生成列表链接
    $('#basic').attr('href', `poordetail_basic.html?table_id=${app.getUrlPrama('table_id')}`)
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
        url: 'http://120.76.203.56:8002/api.php/Duty/poorDetail',
        type: 'POST',
        data: `uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}&table_id=${app.getUrlPrama('table_id')}`,
        success: (data) => {
            $('.uploader').attr('data-year', JSON.parse(data).data.poor.filingyear)
            console.log(JSON.parse(data).data)
            $('#name').html(JSON.parse(data).data.poor.name)
            $('#area').html(JSON.parse(data).data.poor.townname + '&nbsp;' + JSON.parse(data).data.poor.villagename)

            //政策全覆盖
            /*if (JSON.parse(data).data.condition2s_mark1.length) {
                var imgList2s1 = []
                for (var j = 0; j < JSON.parse(data).data.condition2s_mark1.length; j++) {
                    imgList2s1.push(JSON.parse(data).data.condition2s_mark1[j].picture)
                }
                if (JSON.parse(data).data.condition2s_mark2.length) {
                    var imgList2s2 = []
                    for (var j = 0; j < JSON.parse(data).data.condition2s_mark2.length; j++) {
                        imgList2s2.push(JSON.parse(data).data.condition2s_mark2[j].picture)
                    }
                    $('#allcover').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList2s1)} src="${JSON.parse(data).data.condition2s_mark1[0].picture}">
                            <img data-list=${JSON.stringify(imgList2s2)} src="${JSON.parse(data).data.condition2s_mark2[0].picture}">
                        </div>
                    `)
                } else {
                    $('#allcover').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList2s1)} src="${JSON.parse(data).data.condition2s_mark1[0].picture}">
                        </div>
                    `)
                }
            } else {
                if (JSON.parse(data).data.condition2s_mark2.length) {
                    var imgList2s2 = []
                    for (var j = 0; j < JSON.parse(data).data.condition2s_mark2.length; j++) {
                        imgList2s2.push(JSON.parse(data).data.condition2s_mark2[j].picture)
                    }
                    $('#allcover').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList2s2)} src="${JSON.parse(data).data.condition2s_mark2[0].picture}">
                        </div>
                    `)
                }
            }*/

            //住房情况
            if (JSON.parse(data).data.poor.isdangeroushouse === "是") {
                $('#house').html(`<span class="title">是否危房：</span>是；<span class="title">危房等级：</span>${JSON.parse(data).data.poor.dangerousgrade}；<span class="title">面积：</span>${JSON.parse(data).data.poor.dangerousarea}㎡`)
            } else {
                $('#house').html(`<span class="title">是否危房：</span>否；<span class="title">面积：</span>${JSON.parse(data).data.poor.dangerousarea}㎡`)
            }

            if (JSON.parse(data).data.condition3s_mark1.length) {
                var imgList3s1 = []
                for (var j = 0; j < JSON.parse(data).data.condition3s_mark1.length; j++) {
                    imgList3s1.push(JSON.parse(data).data.condition3s_mark1[j].picture)
                }
                if (JSON.parse(data).data.condition3s_mark2.length) {
                    var imgList3s2 = []
                    for (var j = 0; j < JSON.parse(data).data.condition3s_mark2.length; j++) {
                        imgList3s2.push(JSON.parse(data).data.condition3s_mark2[j].picture)
                    }
                    $('#housephoto').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList3s1)} src="${JSON.parse(data).data.condition3s_mark1[0].picture}">
                            <img data-list=${JSON.stringify(imgList3s2)} src="${JSON.parse(data).data.condition3s_mark2[0].picture}">
                        </div>
                    `)
                } else {
                    $('#housephoto').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList3s1)} src="${JSON.parse(data).data.condition3s_mark1[0].picture}">
                        </div>
                    `)
                }
            } else {
                if (JSON.parse(data).data.condition3s_mark2.length) {
                    var imgList3s2 = []
                    for (var j = 0; j < JSON.parse(data).data.condition3s_mark2.length; j++) {
                        imgList3s2.push(JSON.parse(data).data.condition3s_mark2[j].picture)
                    }
                    $('#housephoto').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList3s2)} src="${JSON.parse(data).data.condition3s_mark2[0].picture}">
                        </div>
                    `)
                }
            }

            //饮水状况
            $('#water').html(`<span class="title">是否饮水困难：</span>${JSON.parse(data).data.poor.isdrinkwaterdiff}；<span class="title">是否饮水安全：</span>${JSON.parse(data).data.poor.iswatersafe}`)

            if (JSON.parse(data).data.condition4s_mark1.length) {
                var imgList4s1 = []
                for (var j = 0; j < JSON.parse(data).data.condition4s_mark1.length; j++) {
                    imgList4s1.push(JSON.parse(data).data.condition4s_mark1[j].picture)
                }
                if (JSON.parse(data).data.condition4s_mark2.length) {
                    var imgList4s2 = []
                    for (var j = 0; j < JSON.parse(data).data.condition4s_mark2.length; j++) {
                        imgList4s2.push(JSON.parse(data).data.condition4s_mark2[j].picture)
                    }
                    $('#waterphoto').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList4s1)} src="${JSON.parse(data).data.condition4s_mark1[0].picture}">
                            <img data-list=${JSON.stringify(imgList4s2)} src="${JSON.parse(data).data.condition4s_mark2[0].picture}">
                        </div>
                    `)
                } else {
                    $('#waterphoto').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList4s1)} src="${JSON.parse(data).data.condition4s_mark1[0].picture}">
                        </div>
                    `)
                }
            } else {
                if (JSON.parse(data).data.condition4s_mark2.length) {
                    var imgList4s2 = []
                    for (var j = 0; j < JSON.parse(data).data.condition4s_mark2.length; j++) {
                        imgList4s2.push(JSON.parse(data).data.condition4s_mark2[j].picture)
                    }
                    $('#waterphoto').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList4s2)} src="${JSON.parse(data).data.condition4s_mark2[0].picture}">
                        </div>
                    `)
                }
            }

            //必备生活用品
            $('#isfullcondition1').html(`<span class="title">基本生活用品是否齐全：</span>${JSON.parse(data).data.poor2.isfullcondition1}；`)

            if (JSON.parse(data).data.condition1_1s.length) {
                $('#basicItem').append(`
                    <div class="unit flex">
                        <span>桌</span>
                        <img src="${JSON.parse(data).data.condition1_1s[0].picture}">
                    </div>
                `)
            }

            if (JSON.parse(data).data.condition1_2s.length) {
                $('#basicItem').append(`
                    <div class="unit flex">
                        <span>椅</span>
                        <img src="${JSON.parse(data).data.condition1_2s[0].picture}">
                    </div>
                `)
            }

            if (JSON.parse(data).data.condition1_3s.length) {
                $('#basicItem').append(`
                    <div class="unit flex">
                        <span>被</span>
                        <img src="${JSON.parse(data).data.condition1_3s[0].picture}">
                    </div>
                `)
            }

            if (JSON.parse(data).data.condition1_4s.length) {
                $('#basicItem').append(`
                    <div class="unit flex">
                        <span>电饭煲</span>
                        <img src="${JSON.parse(data).data.condition1_4s[0].picture}">
                    </div>
                `)
            }

            if (JSON.parse(data).data.condition1_5s.length) {
                $('#basicItem').append(`
                    <div class="unit flex">
                        <span>电视机</span>
                        <img src="${JSON.parse(data).data.condition1_5s[0].picture}">
                    </div>
                `)
            }

            if (JSON.parse(data).data.condition1_6s.length) {
                $('#basicItem').append(`
                    <div class="unit flex">
                        <span>电风扇</span>
                        <img src="${JSON.parse(data).data.condition1_6s[0].picture}">
                    </div>
                `)
            }

            if (JSON.parse(data).data.condition1_7s.length) {
                $('#basicItem').append(`
                    <div class="unit flex">
                        <span>柜</span>
                        <img src="${JSON.parse(data).data.condition1_7s[0].picture}">
                    </div>
                `)
            }

            if (JSON.parse(data).data.condition1_8s.length) {
                $('#basicItem').append(`
                    <div class="unit flex">
                        <span>其他</span>
                        <img src="${JSON.parse(data).data.condition1_8s[0].picture}">
                    </div>
                `)
            }

            if (JSON.parse(data).data.condition1_9s.length) {
                $('#basicItem').append(`
                    <div class="unit flex">
                        <span>床</span>
                        <img src="${JSON.parse(data).data.condition1_9s[0].picture}">
                    </div>
                `)
            }

            //用电情况
            $('#usepower').html(`<span class="title">已通生产用电：</span>${JSON.parse(data).data.poor.isproductuseelectr}；<span class="title">已通生活用电：</span>${JSON.parse(data).data.poor.islifeuseelectr}；`)

            $('#usepowerst').html(`<span class="title">电压稳定：</span>${JSON.parse(data).data.poor.isstableelectr}；`)

            if (JSON.parse(data).data.condition5s_mark1.length) {
                var imgList5s1 = []
                for (var j = 0; j < JSON.parse(data).data.condition5s_mark1.length; j++) {
                    imgList5s1.push(JSON.parse(data).data.condition5s_mark1[j].picture)
                }
                if (JSON.parse(data).data.condition5s_mark2.length) {
                    var imgList5s2 = []
                    for (var j = 0; j < JSON.parse(data).data.condition5s_mark2.length; j++) {
                        imgList5s2.push(JSON.parse(data).data.condition5s_mark2[j].picture)
                    }
                    $('#power').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList5s1)} src="${JSON.parse(data).data.condition5s_mark1[0].picture}">
                            <img data-list=${JSON.stringify(imgList5s2)} src="${JSON.parse(data).data.condition5s_mark2[0].picture}">
                        </div>
                    `)
                } else {
                    $('#power').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList5s1)} src="${JSON.parse(data).data.condition5s_mark1[0].picture}">
                        </div>
                    `)
                }
            } else {
                if (JSON.parse(data).data.condition5s_mark2.length) {
                    var imgList5s2 = []
                    for (var j = 0; j < JSON.parse(data).data.condition5s_mark2.length; j++) {
                        imgList5s2.push(JSON.parse(data).data.condition5s_mark2[j].picture)
                    }
                    $('#power').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList5s2)} src="${JSON.parse(data).data.condition5s_mark2[0].picture}">
                        </div>
                    `)
                }
            }

            //交通状况
            $('#dismainroad').html(`<span class="title">到村主干路的距离是：</span>${JSON.parse(data).data.poor.dismainroad}；`)
            
            $('#roadtype').html(`<span class="title">道路类型：</span>${JSON.parse(data).data.poor.roadtype}；`)

            if (JSON.parse(data).data.condition6s_mark1.length) {
                var imgList6s1 = []
                for (var j = 0; j < JSON.parse(data).data.condition6s_mark1.length; j++) {
                    imgList6s1.push(JSON.parse(data).data.condition6s_mark1[j].picture)
                }
                if (JSON.parse(data).data.condition6s_mark2.length) {
                    var imgList6s2 = []
                    for (var j = 0; j < JSON.parse(data).data.condition6s_mark2.length; j++) {
                        imgList6s2.push(JSON.parse(data).data.condition6s_mark2[j].picture)
                    }
                    $('#traffic').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList6s1)} src="${JSON.parse(data).data.condition6s_mark1[0].picture}">
                            <img data-list=${JSON.stringify(imgList6s2)} src="${JSON.parse(data).data.condition6s_mark2[0].picture}">
                        </div>
                    `)
                } else {
                    $('#traffic').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList6s1)} src="${JSON.parse(data).data.condition6s_mark1[0].picture}">
                        </div>
                    `)
                }
            } else {
                if (JSON.parse(data).data.condition6s_mark2.length) {
                    var imgList6s2 = []
                    for (var j = 0; j < JSON.parse(data).data.condition6s_mark2.length; j++) {
                        imgList6s2.push(JSON.parse(data).data.condition6s_mark2[j].picture)
                    }
                    $('#traffic').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList6s2)} src="${JSON.parse(data).data.condition6s_mark2[0].picture}">
                        </div>
                    `)
                }
            }

            //教育保障
            $('#isinschool').html(`<span class="title">是否有在校生：</span>${JSON.parse(data).data.poor2.isinschool}；<span class="title">在校生人数：</span>${JSON.parse(data).data.poor2.numinschool}人；`)

            if (JSON.parse(data).data.condition7s_mark1.length) {
                var imgList7s1 = []
                for (var j = 0; j < JSON.parse(data).data.condition7s_mark1.length; j++) {
                    imgList7s1.push(JSON.parse(data).data.condition7s_mark1[j].picture)
                }
                if (JSON.parse(data).data.condition7s_mark2.length) {
                    var imgList7s2 = []
                    for (var j = 0; j < JSON.parse(data).data.condition7s_mark2.length; j++) {
                        imgList7s2.push(JSON.parse(data).data.condition7s_mark2[j].picture)
                    }
                    $('#education').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList7s1)} src="${JSON.parse(data).data.condition7s_mark1[0].picture}">
                            <img data-list=${JSON.stringify(imgList7s2)} src="${JSON.parse(data).data.condition7s_mark2[0].picture}">
                        </div>
                    `)
                } else {
                    $('#education').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList7s1)} src="${JSON.parse(data).data.condition7s_mark1[0].picture}">
                        </div>
                    `)
                }
            } else {
                if (JSON.parse(data).data.condition7s_mark2.length) {
                    var imgList7s2 = []
                    for (var j = 0; j < JSON.parse(data).data.condition7s_mark2.length; j++) {
                        imgList7s2.push(JSON.parse(data).data.condition7s_mark2[j].picture)
                    }
                    $('#education').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList7s2)} src="${JSON.parse(data).data.condition7s_mark2[0].picture}">
                        </div>
                    `)
                }
            }

            //医疗保障
            $('#newfarm').html(`<span class="title">新农合，</span>参加：${JSON.parse(data).data.poor2.newfarm}人，未参加：${JSON.parse(data).data.poor2.notnewfarm}人；`)

            $('#newfarmdetail').html(`<span class="title">参合人员，</span>政府资助：${JSON.parse(data).data.poor2.govhelp}人，自费：${JSON.parse(data).data.poor2.selfhelp}人；`)

            if (JSON.parse(data).data.condition8s_mark1.length) {
                var imgList8s1 = []
                for (var j = 0; j < JSON.parse(data).data.condition8s_mark1.length; j++) {
                    imgList8s1.push(JSON.parse(data).data.condition8s_mark1[j].picture)
                }
                if (JSON.parse(data).data.condition8s_mark2.length) {
                    var imgList8s2 = []
                    for (var j = 0; j < JSON.parse(data).data.condition8s_mark2.length; j++) {
                        imgList8s2.push(JSON.parse(data).data.condition8s_mark2[j].picture)
                    }
                    $('#medical').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList8s1)} src="${JSON.parse(data).data.condition8s_mark1[0].picture}">
                            <img data-list=${JSON.stringify(imgList8s2)} src="${JSON.parse(data).data.condition8s_mark2[0].picture}">
                        </div>
                    `)
                } else {
                    $('#medical').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList8s1)} src="${JSON.parse(data).data.condition8s_mark1[0].picture}">
                        </div>
                    `)
                }
            } else {
                if (JSON.parse(data).data.condition8s_mark2.length) {
                    var imgList8s2 = []
                    for (var j = 0; j < JSON.parse(data).data.condition8s_mark2.length; j++) {
                        imgList8s2.push(JSON.parse(data).data.condition8s_mark2[j].picture)
                    }
                    $('#medical').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList8s2)} src="${JSON.parse(data).data.condition8s_mark2[0].picture}">
                        </div>
                    `)
                }
            }

            //养老保障
            $('#joinoldinsurance').html(`<span class="title">养老保险，</span>参加：${JSON.parse(data).data.poor2.joinoldinsurance}人，未参加：${JSON.parse(data).data.poor2.notbuyinsurance}人；`)
            
            $('#insurancedetail').html(`<span class="title">参保人员，</span>正在缴费：${JSON.parse(data).data.poor2.payinginsurance}人，正在享受：${JSON.parse(data).data.poor2.sharedeal}人；`)

            if (JSON.parse(data).data.condition9s_mark1.length) {
                var imgList9s1 = []
                for (var j = 0; j < JSON.parse(data).data.condition9s_mark1.length; j++) {
                    imgList9s1.push(JSON.parse(data).data.condition9s_mark1[j].picture)
                }
                if (JSON.parse(data).data.condition9s_mark2.length) {
                    var imgList9s2 = []
                    for (var j = 0; j < JSON.parse(data).data.condition9s_mark2.length; j++) {
                        imgList9s2.push(JSON.parse(data).data.condition9s_mark2[j].picture)
                    }
                    $('#pension').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList9s1)} src="${JSON.parse(data).data.condition9s_mark1[0].picture}">
                            <img data-list=${JSON.stringify(imgList9s2)} src="${JSON.parse(data).data.condition9s_mark2[0].picture}">
                        </div>
                    `)
                } else {
                    $('#pension').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList9s1)} src="${JSON.parse(data).data.condition9s_mark1[0].picture}">
                        </div>
                    `)
                }
            } else {
                if (JSON.parse(data).data.condition9s_mark2.length) {
                    var imgList9s2 = []
                    for (var j = 0; j < JSON.parse(data).data.condition9s_mark2.length; j++) {
                        imgList9s2.push(JSON.parse(data).data.condition9s_mark2[j].picture)
                    }
                    $('#pension').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList9s2)} src="${JSON.parse(data).data.condition9s_mark2[0].picture}">
                        </div>
                    `)
                }
            }

            //残疾保障
            if (JSON.parse(data).data.condition10s_mark1.length) {
                var imgList10s1 = []
                for (var j = 0; j < JSON.parse(data).data.condition10s_mark1.length; j++) {
                    imgList10s1.push(JSON.parse(data).data.condition10s_mark1[j].picture)
                }
                if (JSON.parse(data).data.condition10s_mark2.length) {
                    var imgList10s2 = []
                    for (var j = 0; j < JSON.parse(data).data.condition10s_mark2.length; j++) {
                        imgList10s2.push(JSON.parse(data).data.condition10s_mark2[j].picture)
                    }
                    $('#disabled').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList10s1)} src="${JSON.parse(data).data.condition10s_mark1[0].picture}">
                            <img data-list=${JSON.stringify(imgList10s2)} src="${JSON.parse(data).data.condition10s_mark2[0].picture}">
                        </div>
                    `)
                } else {
                    $('#disabled').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList10s1)} src="${JSON.parse(data).data.condition10s_mark1[0].picture}">
                        </div>
                    `)
                }
            } else {
                if (JSON.parse(data).data.condition10s_mark2.length) {
                    var imgList10s2 = []
                    for (var j = 0; j < JSON.parse(data).data.condition10s_mark2.length; j++) {
                        imgList10s2.push(JSON.parse(data).data.condition10s_mark2[j].picture)
                    }
                    $('#disabled').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList10s2)} src="${JSON.parse(data).data.condition10s_mark2[0].picture}">
                        </div>
                    `)
                }
            }

            //广播保障
            $('#istv').html(`<span class="title">广播电视入户：</span>${JSON.parse(data).data.poor2.istv}；`)

            if (JSON.parse(data).data.condition11s_mark1.length) {
                var imgList11s1 = []
                for (var j = 0; j < JSON.parse(data).data.condition11s_mark1.length; j++) {
                    imgList11s1.push(JSON.parse(data).data.condition11s_mark1[j].picture)
                }
                if (JSON.parse(data).data.condition11s_mark2.length) {
                    var imgList11s2 = []
                    for (var j = 0; j < JSON.parse(data).data.condition11s_mark2.length; j++) {
                        imgList11s2.push(JSON.parse(data).data.condition11s_mark2[j].picture)
                    }
                    $('#brodcast').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList11s1)} src="${JSON.parse(data).data.condition11s_mark1[0].picture}">
                            <img data-list=${JSON.stringify(imgList11s2)} src="${JSON.parse(data).data.condition11s_mark2[0].picture}">
                        </div>
                    `)
                } else {
                    $('#brodcast').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList11s1)} src="${JSON.parse(data).data.condition11s_mark1[0].picture}">
                        </div>
                    `)
                }
            } else {
                if (JSON.parse(data).data.condition11s_mark2.length) {
                    var imgList11s2 = []
                    for (var j = 0; j < JSON.parse(data).data.condition11s_mark2.length; j++) {
                        imgList11s2.push(JSON.parse(data).data.condition11s_mark2[j].picture)
                    }
                    $('#brodcast').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList11s2)} src="${JSON.parse(data).data.condition11s_mark2[0].picture}">
                        </div>
                    `)
                }
            }

            //信号保障
            $('#isradio').html(`<span class="title">通讯信号覆盖：</span>${JSON.parse(data).data.poor2.isradio}；${`${JSON.parse(data).data.poor2.isradio}` === '是'  ? `<span class="title">信号是否稳定：</span>${JSON.parse(data).data.poor2.isstate}；`: '' }`)

            if (JSON.parse(data).data.condition12s_mark1.length) {
                var imgList12s1 = []
                for (var j = 0; j < JSON.parse(data).data.condition12s_mark1.length; j++) {
                    imgList12s1.push(JSON.parse(data).data.condition12s_mark1[j].picture)
                }
                if (JSON.parse(data).data.condition12s_mark2.length) {
                    var imgList12s2 = []
                    for (var j = 0; j < JSON.parse(data).data.condition12s_mark2.length; j++) {
                        imgList12s2.push(JSON.parse(data).data.condition12s_mark2[j].picture)
                    }
                    $('#signal').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList12s1)} src="${JSON.parse(data).data.condition12s_mark1[0].picture}">
                            <img data-list=${JSON.stringify(imgList12s2)} src="${JSON.parse(data).data.condition12s_mark2[0].picture}">
                        </div>
                    `)
                } else {
                    $('#signal').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList12s1)} src="${JSON.parse(data).data.condition12s_mark1[0].picture}">
                        </div>
                    `)
                }
            } else {
                if (JSON.parse(data).data.condition12s_mark2.length) {
                    var imgList12s2 = []
                    for (var j = 0; j < JSON.parse(data).data.condition12s_mark2.length; j++) {
                        imgList12s2.push(JSON.parse(data).data.condition12s_mark2[j].picture)
                    }
                    $('#signal').append(`
                        <div class="unit flex">
                            <img data-list=${JSON.stringify(imgList12s2)} src="${JSON.parse(data).data.condition12s_mark2[0].picture}">
                        </div>
                    `)
                }
            }

            $('img').click(function () {
                var imgList
                if ($(this).attr('data-list')){
                    $('.imgmulshow').remove()
                    imgList = JSON.parse($(this).attr('data-list'))
                    //console.log(imgList)
                    $('body').append(`
                        <div class="imgmulshow">
                            <div class="left"></div>
                            <div class="right"></div>
                            <img data-now="0" src="${imgList[0]}">
                            <div class="quit"></div>
                        </div>
                    `)
                    $('.imgmulshow').show()
                    $('.imgmulshow .quit').click(function () {
                        $('.imgmulshow').hide()
                    })
                    app.imgNext(imgList)
                    app.imgPrev(imgList)
                } else {
                    $('.imgshow').remove()
                    $('body').append(`
                        <div class="imgshow">
                            <img src="${$(this).attr('src')}">
                            <div class="quit"></div>
                        </div>
                    `)
                    $('.imgshow').show()
                    $('.imgshow .quit').click(function () {
                        $('.imgshow').hide()
                    })
                }
            })
        }
    })
})