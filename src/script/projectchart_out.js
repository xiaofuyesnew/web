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

    //获取年份
    $.ajax({
        url: 'http://test.360guanggu.com/fupingv1/api.php/Apple/getYear',
        type: 'get',
        success: (data) => {

            var jsonData = JSON.parse(data).data
            
            var yearSelect = new MobileSelect({
                trigger: '#year',
                title: '选择年份',
                wheels: [
                    {data: jsonData}
                ],
                callback: (indexArr, data) => {

                    var prama = `unit=${$('#company').html()}&year=${data[0]}`

                    if ($('#type').html() !== '不限') {
                        prama += `&poverty=${$('#type').html()}`
                    }

                    if ($('#subtype').html() !== '不限') {
                        prama += `&item_subtype=${$('#subtype').html()}`
                    }

                    getOutcount(prama)
                }
            })

            var yearTwoSelect = new MobileSelect({
                trigger: '#yearTwo',
                title: '选择年份',
                wheels: [
                    {data: jsonData}
                ],
                callback: (indexArr, data) => {

                    var prama = `unit=${$('#companyTwo').html()}&year=${data[0]}`

                    if ($('#typeTwo').html() !== '不限') {
                        prama += `&poverty=${$('#typeTwo').html()}`
                    }

                    if ($('#subtypeTwo').html() !== '不限') {
                        prama += `&item_subtype=${$('#subtypeTwo').html()}`
                    }

                    getOutmoney(prama)
                }
            })
        }
    })

    //获取项目数据
    $.ajax({
        type: 'GET',
        url: 'http://test.360guanggu.com/fupingv1/api.php/Apple/getType',
        success: (data) => {

            var type = ['不限']

            for (var i = 0; i < JSON.parse(data).data.length; i++) {
                type.push(JSON.parse(data).data[i].poverty)
            }

            var typeSelect = new MobileSelect({
                trigger: '#type',
                title: '项目类型',
                wheels: [
                    {data: type}
                ],
                callback: (indexArr, data) => {
                    var prama = ''

                    if (data[0] !== '不限') {
                        prama = `unit=${$('#company').html()}&year=${$('#year').html()}&poverty=${data[0]}`
                    } else {
                        prama = `unit=${$('#company').html()}&year=${$('#year').html()}`
                    }

                    if ($('#subtype').html() !== '不限') {
                        prama += `&item_subtype=${$('#subtype').html()}`
                    }

                    getOutcount(prama)
                }
            })

            var typeTwoSelect = new MobileSelect({
                trigger: '#typeTwo',
                title: '项目类型',
                wheels: [
                    {data: type}
                ],
                callback: (indexArr, data) => {
                    var prama = ''

                    if (data[0] !== '不限') {
                        prama = `unit=${$('#companyTwo').html()}&year=${$('#yearTwo').html()}&poverty=${data[0]}`
                    } else {
                        prama = `unit=${$('#companyTwo').html()}&year=${$('#yearTwo').html()}`
                    }

                    if ($('#subtypeTwo').html() !== '不限') {
                        prama += `&item_subtype=${$('#subtypeTwo').html()}`
                    }

                    getOutmoney(prama)
                }
            })
        }
    })

    //获取子项目数据
    $.ajax({
        type: 'GET',
        url: 'http://test.360guanggu.com/fupingv1/api.php/Apple/getSubType',
        success: (data) => {

            var subType = []

            for (var i = 0; i < JSON.parse(data).data.length; i++) {
                if (!JSON.parse(data).data[i].item_subtype) {
                    subType.push('不限')
                } else {
                    subType.push(JSON.parse(data).data[i].item_subtype)
                }
            }

            var subTypeSelect = new MobileSelect({
                trigger: '#subtype',
                title: '子项目类型',
                wheels: [
                    {data: subType}
                ],
                callback: (indexArr, data) => {
                    var prama = ''

                    if (data[0] !== '不限') {
                        prama = `unit=${$('#company').html()}&year=${$('#year').html()}&item_subtype=${data[0]}`
                    } else {
                        prama = `unit=${$('#company').html()}&year=${$('#year').html()}`
                    }

                    if ($('#type').html() !== '不限') {
                        prama += `&poverty=${$('#type').html()}`
                    }

                    getOutcount(prama)
                }
            })

            var subTypeTwoSelect = new MobileSelect({
                trigger: '#subtypeTwo',
                title: '子项目类型',
                wheels: [
                    {data: subType}
                ],
                callback: (indexArr, data) => {

                    var prama = ''

                    if (data[0] !== '不限') {
                        prama = `unit=${$('#companyTwo').html()}&year=${$('#yearTwo').html()}&item_subtype=${data[0]}`
                    } else {
                        prama = `unit=${$('#companyTwo').html()}&year=${$('#yearTwo').html()}`
                    }

                    if ($('#typeTwo').html() !== '不限') {
                        prama += `&poverty=${$('#typeTwo').html()}`
                    }

                    getOutmoney(prama)
                }
            })
        }
    })

    //获取责任单位
    $.ajax({
        type: 'POST',
        url: 'http://test.360guanggu.com/fupingv1/api.php/Apple/getUnit',
        data: `uid=${localStorage.uid}`,
        success: (data) => {
            var company = []

            for (var i = 0; i < JSON.parse(data).data.length; i++) {
                company.push(JSON.parse(data).data[i].name)
            }

            $('#company').html(company[0])
            $('#companyTwo').html(company[0])

            var companySelect = new MobileSelect({
                trigger: '#company',
                title: '责任单位',
                wheels: [
                    {data: company}
                ],
                callback: (indexArr, data) => {

                    var prama = `unit=${data[0]}&year=${$('#year').html()}`

                    if ($('#type').html() !== '不限') {
                        prama += `&poverty=${$('#type').html()}`
                    }

                    if ($('#subtype').html() !== '不限') {
                        prama += `&item_subtype=${$('#subtype').html()}`
                    }

                    getOutcount(prama)
                }
            })

            var companyTwoSelect = new MobileSelect({
                trigger: '#companyTwo',
                title: '责任单位',
                wheels: [
                    {data: company}
                ],
                callback: (indexArr, data) => {

                    var prama = `unit=${data[0]}&year=${$('#yearTwo').html()}`

                    if ($('#typeTwo').html() !== '不限') {
                        prama += `&poverty=${$('#typeTwo').html()}`
                    }

                    if ($('#subtypeTwo').html() !== '不限') {
                        prama += `&item_subtype=${$('#subtypeTwo').html()}`
                    }

                    getOutmoney(prama)
                }
            })
        }
    })
    
     //统筹资金去向-笔数统计图
    var outcount = echarts.init(document.getElementById('outcount'))

    var getOutcount = (prama) => {
        var pramaData = ''
        
        if (!prama) {
            pramaData = prama + `unit=${$('#company').html()}&year=${$('#year').html()}`
        } else {
            pramaData = prama
        }

        $.ajax({
            url: 'http://test.360guanggu.com/fupingv1/api.php/Apple/differentNameMoneyCount',
            type: 'POST',
            data: pramaData,
            success: (data) => {

                var name = [],
                    count = []

                for (var i = 0; i < JSON.parse(data).length; i++) {
                    name.push(JSON.parse(data)[i].name)
                    count.push(JSON.parse(data)[i].count)
                }

                name.reverse()
                count.reverse()

                outcount.setOption({
                    legend: {
                        data: ['笔数']
                    },
                    grid: {
                        left: 'left',
                        containLabel: true
                    },
                    xAxis: {
                        name: '笔数',
                        nameRotate: -90,
                        type: 'value',
                        boundaryGap: [0, 1],
                        position: 'top'
                    },
                    yAxis: {
                        type: 'category',
                        axisTick: {
                            interval: 0
                        },
                        axisLabel: {
                            interval: 0
                        },
                        data: name
                    },
                    series: [
                        {
                            name: '笔数',
                            type: 'bar',
                            data: count
                        }
                    ]
                })
            }
        })
    }

    //统筹资金去向-金额统计图
    var outmoney = echarts.init(document.getElementById('outmoney'))

    var getOutmoney = (prama) => {
        var pramaData = ''
        
        if (!prama) {
            pramaData = prama + `unit=${$('#companyTwo').html()}&year=${$('#yearTwo').html()}`
        } else {
            pramaData = prama
        }
        console.log(pramaData)
        $.ajax({
            url: 'http://test.360guanggu.com/fupingv1/api.php/Apple/differentNameMoneySum',
            type: 'POST',
            data: pramaData,
            success: (data) => {
                console.log(JSON.parse(data))
                var name = [],
                    sum = []

                for (var i = 0; i < JSON.parse(data).length; i++) {
                    name.push(JSON.parse(data)[i].name)
                    sum.push(JSON.parse(data)[i].sum)
                }

                name.reverse()
                sum.reverse()

                outmoney.setOption({
                    legend: {
                        data: ['金额数']
                    },
                    grid: {
                        left: 'left',
                        containLabel: true
                    },
                    xAxis: {
                        name: '金额数',
                        nameRotate: -90,
                        type: 'value',
                        boundaryGap: [0, 0.01],
                        position: 'top'
                    },
                    yAxis: {
                        type: 'category',
                        axisTick: {
                            interval: 0
                        },
                        axisLabel: {
                            interval: 0
                        },
                        data: name
                    },
                    series: [
                        {
                            name: '金额数',
                            type: 'bar',
                            data: sum
                        }
                    ]
                })
            }
        })
    }

    setTimeout(function () {
        getOutcount('')
        getOutmoney('')
    }, 1000)
})