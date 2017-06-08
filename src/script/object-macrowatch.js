$(() => {
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

	new AMap.Marker({
			position: [111.640233, 31.060708],
			map: map,
			content: `<div class="maker"><div class="zhen">凤鸣镇</div><div class="hu">12345户</div><div class="ren">1234567人</div></div>`
	})

	new AMap.Marker({
			position: [111.400233, 31.090708],
			map: map,
			content: `<div class="maker"><div class="zhen">凤鸣镇</div><div class="hu">12345户</div><div class="ren">1234567人</div></div>`
	})

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
})