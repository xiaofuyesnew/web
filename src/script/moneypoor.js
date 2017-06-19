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
    
    $('.subnav .unit').click(function () {
        $('.subnav .unit').removeClass('blue')
        $('.subnav .unit .bar').addClass('hide')
        $(this).addClass('blue')
        $(this).children('.bar').removeClass('hide')
        if ($(this).attr('data-nav') === '1') {
            $('.m-main').children().addClass('hide')
            $($('.m-main .u-main')[0]).removeClass('hide')
        } else if ($(this).attr('data-nav') === '2') {
            $('.m-main').children().addClass('hide')
            $($('.m-main .u-main')[1]).removeClass('hide')
        } else if ($(this).attr('data-nav') === '3') {
            $('.m-main').children().addClass('hide')
            $($('.m-main .u-main')[2]).removeClass('hide')
        }
    })

    //当前年资金来源总体分布图
    var moneyin = echarts.init(document.getElementById('moneyin'))

    var  getMoneyin = (prama) => {
        //设定默认值
        if (!prama) {
            prama = 'year=2017'
        }
                
        //获取数据
        $.ajax({
            url: 'http://test.360guanggu.com/yuanan_fupin/api.php/Changepoor/zijin_total',
            type: 'post',
            data: prama,
            success: (data) => {
                var formatData = [{name: '县级统筹'}, {name: '省办项目'}]
                for (var key in JSON.parse(data).data) {
                    switch (key) {
                        case 'xianji':
                            formatData[0].value = +JSON.parse(data).data[key]
                            break
                        case 'shengban':
                            formatData[1].value = +JSON.parse(data).data[key]
                            break
                    }   
                }

                moneyin.setOption({
                    series : [{
                        type: 'pie',
                        radius : '35%',
                        center: ['50%', '40%'],
                        data: formatData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        label: {
                            normal: {
                                formatter: '{b} {c} {d}%'
                            }
                        }
                    }]
                })
            }
        })        
    }

    //当前年资金来源总体分布图
    var moneyout = echarts.init(document.getElementById('moneyout'))

    var  getMoneyout = (prama) => {
        //设定默认值
        if (!prama) {
            prama = 'year=2017'
        }
                
        //获取数据
        $.ajax({
            url: 'http://test.360guanggu.com/yuanan_fupin/api.php/Changepoor/zijin_total',
            type: 'post',
            data: prama,
            success: (data) => {
                var formatData = [{name: '县级统筹'}, {name: '省办项目'}]
                for (var key in JSON.parse(data).data) {
                    switch (key) {
                        case 'xianji':
                            formatData[0].value = +JSON.parse(data).data[key]
                            break
                        case 'shengban':
                            formatData[1].value = +JSON.parse(data).data[key]
                            break
                    }   
                }

                moneyout.setOption({
                    series : [{
                        type: 'pie',
                        radius : '35%',
                        center: ['50%', '40%'],
                        data: formatData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        label: {
                            normal: {
                                formatter: '{b} {c} {d}%'
                            }
                        }
                    }]
                })
            }
        })        
    }

    //同年度资金去向分布图
    var symoneygo = echarts.init(document.getElementById('symoneygo'))

    var getSymoneygo = (prama) => {
        //设定默认值
        if (!prama) {
            prama = 'year=2017&projectTypeText=&projectChildTypeText='
        }
                
        //获取数据
        $.ajax({
            url: 'http://test.360guanggu.com/yuanan_fupin/api.php/Changepoor/finaly',
            type: 'post',
            data: prama,
            success: (data) => {
                var formatData = [],
                    tmpObj = {}
                
                for (var key in JSON.parse(data).data) {
                    switch (key) {
                        case 'hangyeMoney':
                            tmpObj.name = '行业部门资金'
                            tmpObj.value = +JSON.parse(data).data[key]
                            formatData.push(tmpObj)
                            tmpObj ={}
                            break
                        case 'otherMoney':
                            tmpObj.name = '其他资金'
                            tmpObj.value = +JSON.parse(data).data[key]
                            formatData.push(tmpObj)
                            tmpObj ={}
                            break
                        case 'shehuiMoney':
                            tmpObj.name = '社会自筹资金'
                            tmpObj.value = +JSON.parse(data).data[key]
                            formatData.push(tmpObj)
                            tmpObj ={}
                            break
                        case 'shenjiMoney':
                            tmpObj.name = '省级专项资金'
                            tmpObj.value = +JSON.parse(data).data[key]
                            formatData.push(tmpObj)
                            tmpObj ={}
                            break
                        case 'shijiMoney':
                            tmpObj.name = '市级专项资金'
                            tmpObj.value = +JSON.parse(data).data[key]
                            formatData.push(tmpObj)
                            tmpObj ={}
                            break
                        case 'xianjiMoney':
                            tmpObj.name = '县级专项资金'
                            tmpObj.value = +JSON.parse(data).data[key]
                            formatData.push(tmpObj)
                            tmpObj ={}
                            break
                        case 'xindaiMoney':
                        tmpObj.name = '信贷资金'
                            tmpObj.value = +JSON.parse(data).data[key]
                            formatData.push(tmpObj)
                            tmpObj ={}
                            break
                        case 'zhongyangMoney':
                            tmpObj.name = '中央专项资金'
                            tmpObj.value = +JSON.parse(data).data[key]
                            formatData.push(tmpObj)
                            tmpObj ={}
                            break
                    }
                }

                symoneygo.setOption({
                    series : [{
                        type: 'pie',
                        radius : '35%',
                        center: ['50%', '40%'],
                        data: formatData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        label: {
                            normal: {
                                formatter: '{b} {c} {d}%'
                            }
                        }
                    }]
                })
            }
        })
    }

    //各年度不同资金去向支持项目数量图
    var eymoneysproject = echarts.init(document.getElementById('eymoneysproject'))
    
    var getEymoneysproject = (prama) => {

        //设定默认值
        if (!prama) {
            prama = 'ziduan=&town=&country=&projectTypeText=&projectChildTypeText='
        }

        //获取数据
        $.ajax({
            url: 'http://test.360guanggu.com/yuanan_fupin/api.php/Changepoor/laiyuan_num',
            type: 'post',
            data: prama,
            success: (data) => {
                var year = [],
                    total = []
                
                for (var i = 0; i < JSON.parse(data).data.length; i++) {
                    year[i] = JSON.parse(data).data[i].year
                    total[i] = +JSON.parse(data).data[i].total
                }

                eymoneysproject.setOption({
                    grid: {
                        left: 'left',
                        containLabel: true
                    },
                    xAxis: {
                        name: '项目数',
                        nameRotate: 90,
                        type: 'value',
                        boundaryGap: [0, 0.01],
                        position: 'top'
                    },
                    yAxis: {
                        name: '年份',
                        nameLocation: 'start',
                        type: 'category',
                        axisTick: {
                            interval: 0
                        },
                        axisLabel: {
                            interval: 0
                        },
                        data: year
                    },
                    series: [
                        {
                            name: '项目数',
                            type: 'bar',
                            data: total
                        }
                    ]
                })
            }
        })
    }

    //不同资金去向项目资金对比图
    var dmoneygo = echarts.init(document.getElementById('dmoneygo'))
    
    var getDmoneygo = (prama) => {

        //设定默认值
        if (!prama) {
            prama = 'ziduan=&town=&country=&projectTypeText=&projectChildTypeText='
        }

        //获取数据
        $.ajax({
            url: 'http://test.360guanggu.com/yuanan_fupin/api.php/Changepoor/laiyuan_num1',
            type: 'post',
            data: prama,
            success: (data) => {
                var year = [],
                    total = []
                
                for (var i = 0; i < JSON.parse(data).data.length; i++) {
                    year[i] = JSON.parse(data).data[i].year
                    total[i] = +JSON.parse(data).data[i].total
                }

                dmoneygo.setOption({
                    grid: {
                        left: 'left',
                        containLabel: true
                    },
                    xAxis: {
                        name: '总金额',
                        nameRotate: 90,
                        type: 'value',
                        boundaryGap: [0, 0.01],
                        position: 'top'
                    },
                    yAxis: {
                        name: '年份',
                        nameLocation: 'start',
                        type: 'category',
                        axisTick: {
                            interval: 0
                        },
                        axisLabel: {
                            interval: 0
                        },
                        data: year
                    },
                    series: [
                        {
                            name: '项目数',
                            type: 'bar',
                            data: total
                        }
                    ]
                })
            }
        })
    }

    //同年度资金来源分布图
    var smoneygo = echarts.init(document.getElementById('smoneygo'))
    
    var getSmoneygo = (prama) => {

        //设定默认值
        if (!prama) {
            prama = 'year=2017'
        }

        //获取数据
        $.ajax({
            url: 'http://test.360guanggu.com/yuanan_fupin/api.php/Changepoor/laiyuan_num2',
            type: 'post',
            data: prama,
            success: (data) => {
                var formatData = [],
                    tmpObj = {}
                
                for (var i = 0; i < JSON.parse(data).data.length; i++) {
                    tmpObj.name = JSON.parse(data).data[i].text
                    tmpObj.value = +JSON.parse(data).data[i].num
                    formatData.push(tmpObj)
                    tmpObj = {}
                }

                smoneygo.setOption({
                    series : [{
                        type: 'pie',
                        radius : '35%',
                        center: ['50%', '40%'],
                        data: formatData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        label: {
                            normal: {
                                formatter: '{b} {c} {d}%'
                            }
                        }
                    }]
                })
            }
        })
    }

    getMoneyin()
    getMoneyout()
    getSymoneygo()
    getEymoneysproject()
    getDmoneygo()
    getSmoneygo()

    //获取项目细节
    $.ajax({
        url: 'http://test.360guanggu.com/yuanan_fupin/api.php/Changepoor/search',
        type: 'get',
        success: (data) => {
            var formatDate = [{data: [{id: '0', value: '不限'}]}],
                singleData = ['不限'],
                tmpObj = {},
                tmpSubObj = {}
            for (var i = 0; i < JSON.parse(data).data.length; i++) {
                tmpObj.id = JSON.parse(data).data[i].id
                tmpObj.value = JSON.parse(data).data[i].text
                singleData.push(JSON.parse(data).data[i].text)
                if (JSON.parse(data).data[i].data.length) {
                    tmpObj.childs = [{id: '0', value: '不限'}]
                    for (var j = 0; j < JSON.parse(data).data[i].data.length; j++) {
                        tmpSubObj.id = JSON.parse(data).data[i].data[j].id
                        tmpSubObj.value = JSON.parse(data).data[i].data[j].text
                        tmpObj.childs.push(tmpSubObj)
                        tmpSubObj = {}
                    }
                }
                formatDate[0].data.push(tmpObj)
                tmpObj = {}
            }
            var projectSelect = new MobileSelect({
                trigger: '#project',
                title: '选择项目类型',
                wheels: formatDate,
                callback: (indexArr, data) => {
                    var prama = '',
                        year = JSON.parse($('#yearThree').attr('data-self'))[0],
                        project = ''
                    $('#project').attr('data-self', JSON.stringify(data))

                    if (data.length === 1) {
                        if (data[0].id === '0') {
                            project = `projectTypeText=&projectChildTypeText=`
                        } else {
                            project = `projectTypeText=${data[0].value}&projectChildTypeText=`
                        }
                    } else {
                        if (data[1].id === '0') {
                            project = `projectTypeText=${data[0].value}&projectChildTypeText=`
                        } else {
                            project = `projectTypeText=${data[0].value}&projectChildTypeText=${data[1].value}`
                        }
                    }    
                    prama = `${year}&${project}`
                    getSymoneygo(prama)
                }
            })
            var projectTwoSelect = new MobileSelect({
                trigger: '#projectTwo',
                title: '选择项目类型',
                wheels: formatDate,
                callback: (indexArr, data) => {
                   var prama = '',
                        source = '',
                        project = '',
                        zhen = '',
                        sourceData = JSON.parse($('#source').attr('data-self')),
                        zhenData = JSON.parse($('#zhen').attr('data-self'))

                    $('#projectTwo').attr('data-self', JSON.stringify(data))

                    switch (sourceData[0]) {
                        case '行业部门资金':
                            source = 'ziduan=hangyeMoney'
                            break
                        case '其他资金':
                            source = 'ziduan=otherMoney'
                            break
                        case '社会自筹资金':
                            source = 'ziduan=shehuiMoney'
                            break
                        case '省级专项资金':
                            source = 'ziduan=shenjiMoney'
                            break
                        case '市级专项资金':
                            source = 'ziduan=shijiMoney'
                            break
                        case '县级专项资金':
                            source = 'ziduan=xianjiMoney'
                            break
                        case '信贷资金':
                            source = 'ziduan=xindaiMoney'
                            break
                        case '中央专项资金':
                            source = 'ziduan=zhongyangMoney'
                            break
                    }

                    if (data.length === 1) {
                        if (data[0].id === '0') {
                            project = 'projectTypeText=&projectChildTypeText='
                        } else {
                            project = `projectTypeText=${data[0].value}&projectChildTypeText=`
                        }
                    } else {
                        if (data[1].id === '0') {
                            project = `projectTypeText=${data[0].value}&projectChildTypeText=`
                        } else {
                            project = `projectTypeText=${data[0].value}&projectChildTypeText=${data[1].value}`
                        }
                    }

                    if (zhenData.length === 1) {
                            zhen = 'town=&country='
                    } else {
                        if (zhenData[1].id === '0') {
                            zhen = `town=${zhenData[0].value}&country=`
                        } else {
                            project = `town=${zhenData[0].value}&country=${zhenData[1].value}`
                        }
                    }

                    prama =`${source}&${zhen}&${project}`
                    getEymoneysproject(prama)
                }
            })
            var projectThreeSelect = new MobileSelect({
                trigger: '#projectThree',
                title: '选择项目类型',
                wheels: formatDate,
                callback: (indexArr, data) => {
                   var prama = '',
                        source = '',
                        project = '',
                        zhen = '',
                        sourceData = JSON.parse($('#sourceTwo').attr('data-self')),
                        zhenData = JSON.parse($('#zhenTwo').attr('data-self'))

                    $('#projectThree').attr('data-self', JSON.stringify(data))

                    switch (sourceData[0]) {
                        case '行业部门资金':
                            source = 'ziduan=hangyeMoney'
                            break
                        case '其他资金':
                            source = 'ziduan=otherMoney'
                            break
                        case '社会自筹资金':
                            source = 'ziduan=shehuiMoney'
                            break
                        case '省级专项资金':
                            source = 'ziduan=shenjiMoney'
                            break
                        case '市级专项资金':
                            source = 'ziduan=shijiMoney'
                            break
                        case '县级专项资金':
                            source = 'ziduan=xianjiMoney'
                            break
                        case '信贷资金':
                            source = 'ziduan=xindaiMoney'
                            break
                        case '中央专项资金':
                            source = 'ziduan=zhongyangMoney'
                            break
                    }

                    if (data.length === 1) {
                        if (data[0].id === '0') {
                            project = 'projectTypeText=&projectChildTypeText='
                        } else {
                            project = `projectTypeText=${data[0].value}&projectChildTypeText=`
                        }
                    } else {
                        if (data[1].id === '0') {
                            project = `projectTypeText=${data[0].value}&projectChildTypeText=`
                        } else {
                            project = `projectTypeText=${data[0].value}&projectChildTypeText=${data[1].value}`
                        }
                    }

                    if (zhenData.length === 1) {
                            zhen = 'town=&country='
                    } else {
                        if (zhenData[1].id === '0') {
                            zhen = `town=${zhenData[0].value}&country=`
                        } else {
                            project = `town=${zhenData[0].value}&country=${zhenData[1].value}`
                        }
                    }

                    prama =`${source}&${zhen}&${project}`
                    getDmoneygo(prama)
                }
            })
        }
    })

    //获取年份
    $.ajax({
        url: 'http://test.360guanggu.com/yuanan_fupin/api.php/Changepoor/zijinyear',
        type: 'get',
        success: (data) => {
            var year = []
            for (var i = 0; i < JSON.parse(data).data.length; i++) {
                year[i] = JSON.parse(data).data[i].moneyyear
            }
            var yearSelect = new MobileSelect({
                trigger: '#year',
                title: '选择年份',
                wheels: [
                    {data: year}
                ],
                callback: (indexArr, data) => {
                    var prama = `year=${data[0]}`
                    getMoneyin(prama)
                }
            })
            var yearTwoSelect = new MobileSelect({
                trigger: '#yearTwo',
                title: '选择年份',
                wheels: [
                    {data: year}
                ],
                callback: (indexArr, data) => {
                    var prama = `year=${data[0]}`
                    getMoneyout(prama)
                }
            })
            var yearThreeSelect = new MobileSelect({
                trigger: '#yearThree',
                title: '选择年份',
                wheels: [
                    {data: year}
                ],
                callback: (indexArr, data) => {
                    var prama = '',
                        year = `year=${data[0]}`,
                        project = '',
                        projectData = JSON.parse($('#project').attr('data-self'))

                    $('#yearThree').attr('data-self', JSON.stringify(data))
                    if (projectData.length === 1) {
                        if (projectData[0].id === '0') {
                            project = `projectTypeText=&projectChildTypeText=`
                        } else {
                            project = `projectTypeText=${projectData[0].value}&projectChildTypeText=`
                        }
                    } else {
                        if (projectData[1].id === '0') {
                            project = `projectTypeText=${projectData[0].value}&projectChildTypeText=`
                        } else {
                            project = `projectTypeText=${projectData[0].value}&projectChildTypeText=${projectData[1].value}`
                        }
                    }
                    prama = `${year}&${project}`
                    getSymoneygo(prama)
                }
            })
            var yearFourSelect = new MobileSelect({
                trigger: '#yearFour',
                title: '选择年份',
                wheels: [
                    {data: year}
                ],
                callback: (indexArr, data) => {
                    var prama = `year=${data[0]}`
                    getSmoneygo(prama)
                }
            })
        }
    })

    //资金来源
    $.ajax({
        url: 'http://test.360guanggu.com/yuanan_fupin/api.php/Changepoor/laiyuan',
        type: 'get',
        success: (data) => {
            var source = ['不限']
            
            for (var key in JSON.parse(data).data) {
                source.push(JSON.parse(data).data[key])
            }

            var sourceSelect = new MobileSelect({
                trigger: '#source',
                title: '选择资金来源',
                wheels: [
                    {data: source}
                ],
                callback: (indexArr, data) => {
                    var prama = '',
                        source = '',
                        project = '',
                        zhen = '',
                        projectData = JSON.parse($('#projectTwo').attr('data-self')),
                        zhenData = JSON.parse($('#zhen').attr('data-self'))

                    $('#source').attr('data-self', JSON.stringify(data))

                    switch (data[0]) {
                        case '行业部门资金':
                            source = 'ziduan=hangyeMoney'
                            break
                        case '其他资金':
                            source = 'ziduan=otherMoney'
                            break
                        case '社会自筹资金':
                            source = 'ziduan=shehuiMoney'
                            break
                        case '省级专项资金':
                            source = 'ziduan=shenjiMoney'
                            break
                        case '市级专项资金':
                            source = 'ziduan=shijiMoney'
                            break
                        case '县级专项资金':
                            source = 'ziduan=xianjiMoney'
                            break
                        case '信贷资金':
                            source = 'ziduan=xindaiMoney'
                            break
                        case '中央专项资金':
                            source = 'ziduan=zhongyangMoney'
                            break
                    }

                    if (projectData.length === 1) {
                        if (projectData[0].id === '0') {
                            project = 'projectTypeText=&projectChildTypeText='
                        } else {
                            project = `projectTypeText=${projectData[0].value}&projectChildTypeText=`
                        }
                    } else {
                        if (projectData[1].id === '0') {
                            project = `projectTypeText=${projectData[0].value}&projectChildTypeText=`
                        } else {
                            project = `projectTypeText=${projectData[0].value}&projectChildTypeText=${projectData[1].value}`
                        }
                    }

                    if (zhenData.length === 1) {
                            zhen = 'town=&country='
                    } else {
                        if (zhenData[1].id === '0') {
                            zhen = `town=${zhenData[0].value}&country=`
                        } else {
                            project = `town=${zhenData[0].value}&country=${zhenData[1].value}`
                        }
                    }

                    prama =`${source}&${zhen}&${project}`
                    getEymoneysproject(prama)
                }
            })
            var sourceTwoSelect = new MobileSelect({
                trigger: '#sourceTwo',
                title: '选择资金来源',
                wheels: [
                    {data: source}
                ],
                callback: (indexArr, data) => {
                    var prama = '',
                        source = '',
                        project = '',
                        zhen = '',
                        projectData = JSON.parse($('#projectThree').attr('data-self')),
                        zhenData = JSON.parse($('#zhenTwo').attr('data-self'))

                    $('#sourceTwo').attr('data-self', JSON.stringify(data))

                    switch (data[0]) {
                        case '行业部门资金':
                            source = 'ziduan=hangyeMoney'
                            break
                        case '其他资金':
                            source = 'ziduan=otherMoney'
                            break
                        case '社会自筹资金':
                            source = 'ziduan=shehuiMoney'
                            break
                        case '省级专项资金':
                            source = 'ziduan=shenjiMoney'
                            break
                        case '市级专项资金':
                            source = 'ziduan=shijiMoney'
                            break
                        case '县级专项资金':
                            source = 'ziduan=xianjiMoney'
                            break
                        case '信贷资金':
                            source = 'ziduan=xindaiMoney'
                            break
                        case '中央专项资金':
                            source = 'ziduan=zhongyangMoney'
                            break
                    }

                    if (projectData.length === 1) {
                        if (projectData[0].id === '0') {
                            project = 'projectTypeText=&projectChildTypeText='
                        } else {
                            project = `projectTypeText=${projectData[0].value}&projectChildTypeText=`
                        }
                    } else {
                        if (projectData[1].id === '0') {
                            project = `projectTypeText=${projectData[0].value}&projectChildTypeText=`
                        } else {
                            project = `projectTypeText=${projectData[0].value}&projectChildTypeText=${projectData[1].value}`
                        }
                    }

                    if (zhenData.length === 1) {
                            zhen = 'town=&country='
                    } else {
                        if (zhenData[1].id === '0') {
                            zhen = `town=${zhenData[0].value}&country=`
                        } else {
                            project = `town=${zhenData[0].value}&country=${zhenData[1].value}`
                        }
                    }

                    prama =`${source}&${zhen}&${project}`
                    getDmoneygo(prama)
                }
            })
        }
    })

    //乡镇
    $.ajax({
        url: 'http://test.360guanggu.com/yuanan_fupin/api.php/Changepoor/searchtown',
        type: 'get',
        success: (data) => {
            var formatDate = [{data: [{id: '0', value: '不限'}]}],
                tmpObj = {},
                tmpSubObj = {}
            for (var i = 0; i < JSON.parse(data).data.length; i++) {
                tmpObj.id = JSON.parse(data).data[i].id
                tmpObj.value = JSON.parse(data).data[i].text
                if (JSON.parse(data).data[i].data.length) {
                    tmpObj.childs = [{id: '0', value: '不限'}]
                    for (var j = 0; j < JSON.parse(data).data[i].data.length; j++) {
                        tmpSubObj.id = JSON.parse(data).data[i].data[j].id
                        tmpSubObj.value = JSON.parse(data).data[i].data[j].text
                        tmpObj.childs.push(tmpSubObj)
                        tmpSubObj = {}
                    }
                }
                formatDate[0].data.push(tmpObj)
                tmpObj = {}
            }
            var zhenSelect = new MobileSelect({
                trigger: '#zhen',
                title: '选择镇',
                wheels: formatDate,
                callback: (indexArr, data) => {
                    var prama = '',
                        source = '',
                        project = '',
                        zhen = '',
                        projectData = JSON.parse($('#projectTwo').attr('data-self')),
                        sourceData = JSON.parse($('#source').attr('data-self'))
                    
                    $('#zhen').attr('data-self', JSON.stringify(data))

                    switch (sourceData[0]) {
                        case '行业部门资金':
                            source = 'ziduan=hangyeMoney'
                            break
                        case '其他资金':
                            source = 'ziduan=otherMoney'
                            break
                        case '社会自筹资金':
                            source = 'ziduan=shehuiMoney'
                            break
                        case '省级专项资金':
                            source = 'ziduan=shenjiMoney'
                            break
                        case '市级专项资金':
                            source = 'ziduan=shijiMoney'
                            break
                        case '县级专项资金':
                            source = 'ziduan=xianjiMoney'
                            break
                        case '信贷资金':
                            source = 'ziduan=xindaiMoney'
                            break
                        case '中央专项资金':
                            source = 'ziduan=zhongyangMoney'
                            break
                    }

                    if (data.length === 1) {
                            zhen = 'town=&country='
                    } else {
                        if (data[1].id === '0') {
                            zhen = `town=${data[0].value}&country=`
                        } else {
                            zhen = `town=${data[0].value}&country=${data[1].value}`
                        }
                    }

                    if (projectData.length === 1) {
                        if (projectData[0].id === '0') {
                            project = 'projectTypeText=&projectChildTypeText='
                        } else {
                            project = `projectTypeText=${projectData[0].value}&projectChildTypeText=`
                        }
                    } else {
                        if (projectData[1].id === '0') {
                            project = `projectTypeText=${projectData[0].value}&projectChildTypeText=`
                        } else {
                            project = `projectTypeText=${projectData[0].value}&projectChildTypeText=${projectData[1].value}`
                        }
                    }

                    prama =`${source}&${zhen}&${project}`
                    getEymoneysproject(prama)
                }
            })
            var zhenTwoSelect = new MobileSelect({
                trigger: '#zhenTwo',
                title: '选择镇',
                wheels: formatDate,
                callback: (indexArr, data) => {
                    var prama = '',
                        source = '',
                        project = '',
                        zhen = '',
                        projectData = JSON.parse($('#projectThree').attr('data-self')),
                        sourceData = JSON.parse($('#sourceTwo').attr('data-self'))
                    
                    $('#zhenTwo').attr('data-self', JSON.stringify(data))

                    switch (sourceData[0]) {
                        case '行业部门资金':
                            source = 'ziduan=hangyeMoney'
                            break
                        case '其他资金':
                            source = 'ziduan=otherMoney'
                            break
                        case '社会自筹资金':
                            source = 'ziduan=shehuiMoney'
                            break
                        case '省级专项资金':
                            source = 'ziduan=shenjiMoney'
                            break
                        case '市级专项资金':
                            source = 'ziduan=shijiMoney'
                            break
                        case '县级专项资金':
                            source = 'ziduan=xianjiMoney'
                            break
                        case '信贷资金':
                            source = 'ziduan=xindaiMoney'
                            break
                        case '中央专项资金':
                            source = 'ziduan=zhongyangMoney'
                            break
                    }

                    if (data.length === 1) {
                            zhen = 'town=&country='
                    } else {
                        if (data[1].id === '0') {
                            zhen = `town=${data[0].value}&country=`
                        } else {
                            zhen = `town=${data[0].value}&country=${data[1].value}`
                        }
                    }

                    if (projectData.length === 1) {
                        if (projectData[0].id === '0') {
                            project = 'projectTypeText=&projectChildTypeText='
                        } else {
                            project = `projectTypeText=${projectData[0].value}&projectChildTypeText=`
                        }
                    } else {
                        if (projectData[1].id === '0') {
                            project = `projectTypeText=${projectData[0].value}&projectChildTypeText=`
                        } else {
                            project = `projectTypeText=${projectData[0].value}&projectChildTypeText=${projectData[1].value}`
                        }
                    }

                    prama =`${source}&${zhen}&${project}`
                    getDmoneygo(prama)
                }
            })
        }
    })
})
