$(() => {

    //地图标记数组
    var mapMarker = [],
        area = []

    //创建根节点对象
    var app = {
        el: $('#app'),
        setScreen: () => {
            app.el.css({"height": `${window.innerHeight - 20}px`})
        }
    }

    //调用方法
    app.setScreen()

    //调用地图
    var district, map = new AMap.Map("map", {
        resizeEnable: false,
        zoom: 10,
        center: [111.640233, 31.060708]
    })


    AMap.event.addDomListener(document.getElementById('search'), 'click', function() {
        map.remove(mapMarker);
    }, false);
    /*
	new AMap.Marker({
			position: [111.640233, 31.060708],
			map: map,
			content: `<div class="maker"><div class="zhen">凤鸣镇</div><div class="hu">12345户</div><div class="ren">1234567人</div></div>`
	})


	new AMap.Marker({
			position: [111.400233, 31.090708],
			map: map,
			content: `<div class="maker"><div class="zhen">测试</div><div class="hu">12345户</div><div class="ren">1234567人</div></div>`
	})
    */
    addYuanan()

    function addYuanan() {
        //加载行政区划插件
        AMap.service('AMap.DistrictSearch', function() {
            var opts = {
                subdistrict: 1,   //返回下一级行政区
                extensions: 'all',  //返回行政区边界坐标组等具体信息
                level: 'district'  //查询行政级别为 市
            }
            //实例化DistrictSearch
            district = new AMap.DistrictSearch(opts);
            district.setLevel('district');
            //行政区查询
            district.search('远安县', function(status, result) {
                var bounds = result.districtList[0].boundaries;
                var polygons = [];
                if (bounds) {
                    for (var i = 0, l = bounds.length; i < l; i++) {
                        //生成行政区划polygon
                        var polygon = new AMap.Polygon({
                            map: map,
                            strokeWeight: 1,
                            path: bounds[i],
                            fillOpacity: 0.4,
                            fillColor: '#CCF3FF',
                            strokeColor: '#F29494'
                        });
                        polygons.push(polygon);
                    }
                    map.setFitView();//地图自适应
                }
            });
        });
    }


    //下拉搜索框
    $('.m-dropdown .u-show').click(function () {
        if ($('.m-dropdown .u-hide').hasClass('animDown')) {
            $('.m-dropdown .u-hide').removeClass('animDown')
            $('.m-dropdown .u-hide').addClass('animUp')
            $(this).children('img').attr('src', '../image/dropdown.png')
            $(this).children('span').html('点击展开搜索')
        } else if ($('.m-dropdown .u-hide').hasClass('animUp')) {
            $('.m-dropdown .u-hide').removeClass('animUp')
            $('.m-dropdown .u-hide').addClass('animDown')
            $(this).children('img').attr('src', '../image/dropup.png')
            $(this).children('span').html('点击隐藏搜索')
        } else {
            $('.m-dropdown .u-hide').addClass('animDown')
            $(this).children('img').attr('src', '../image/dropup.png')
            $(this).children('span').html('点击隐藏搜索')
        }
    })

    //重置按钮
    $('#reset').click(function () {
        $('#year').html('不限')
        $('#area').html('不限')
    })

    //获取标记点
    var getYearData = (year, dist) => {
        var prama = '',
            index = 0

        if (!year || year === '不限') {
            prama = `filingYear=2017&uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}`
        } else {
            prama = `filingYear=${year}&uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}`
        }

        if (mapMarker !== []) {
            mapMarker = []
        }   

        $.ajax({
            url: 'http://120.76.203.56:8002/api.php/Macro/map',
            type: 'POST',
            data: prama,
            async: false,
            success: (data) => {
                for (var i = 0; i < 7; i++) {
                    mapMarker.push(
                        new AMap.Marker({
                            label: i,
	    		            position: JSON.parse(data).data[i].position,
	    		            map: map,
                            content: `<div class="maker"><div class="zhen">${JSON.parse(data).data[i].name}</div><div class="hu">${JSON.parse(data).data[i].hu}户</div><div class="ren">${JSON.parse(data).data[i].ren}人</div></div>`
                        })
                    )
                }
            }
        })

        if (dist && dist !== '不限') {
            for (var i = 0; i < 7; i++) {
                if (i !== area.indexOf(dist)) {
                    mapMarker[i].hide()
                }
            }
        }
    }
    
    getYearData()

    //获取地域
    $.ajax({
        url: `http://120.76.203.56:8002/api.php/Macro/areaList?pid=420525000000&uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}`,
        type: 'GET',
        success: (data) => {
            var jsonData = JSON.parse(data)
            for (var i = 0; i < jsonData.data.length; i++) {
                area[i] = jsonData.data[i].text
            }
            var areaSelect = new MobileSelect({
                trigger: '#area',
                title: '行政区划',
                wheels: [
                    {data: area}
                ]
            })
        }
    })

    //获取年份
    $.ajax({
        url: `http://120.76.203.56:8002/api.php/Macro/yearList?uid=${localStorage.uid}&username=${localStorage.username}&password=${localStorage.password}`,
        type: 'GET',
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

    //搜索按钮
    $('#search').click(function () {

        getYearData($('#year').html(), $('#area').html())
        
    })
})