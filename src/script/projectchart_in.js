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

                    var prama = `unit=${$('#companyTwo').html()}&year=${data[0]}`

                    getSydt(prama)
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
                        prama = `unit=${$('#company').html()}&poverty=${data[0]}`
                    } else {
                        prama = `unit=${$('#company').html()}`
                    }

                    if ($('#subtype').html() !== '不限') {
                        prama += `&item_subtype=${$('#subtype').html()}`
                    }

                    getDiffYear(prama)
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
                        prama = `unit=${$('#company').html()}&item_subtype=${data[0]}`
                    } else {
                        prama = `unit=${$('#company').html()}`
                    }

                    if ($('#type').html() !== '不限') {
                        prama += `&poverty=${$('#type').html()}`
                    }

                    getDiffYear(prama)
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

                    var prama = `unit=${data[0]}`

                    if ($('#type').html() !== '不限') {
                        prama += `&poverty=${$('#type').html()}`
                    }

                    
                    if ($('#subtype').html() !== '不限') {
                        prama += `&item_subtype=${$('#subtype').html()}`
                    }

                    getDiffYear(prama)
                }
            })

            var companyTwoSelect = new MobileSelect({
                trigger: '#companyTwo',
                title: '责任单位',
                wheels: [
                    {data: company}
                ],
                callback: (indexArr, data) => {
                    var prama = `unit=${data[0]}&year=${$('#year').html()}`

                    getSydt(prama)
                }
            })

            var companyThreeSelect = new MobileSelect({
                trigger: '#companyThree',
                title: '责任单位',
                wheels: [
                    {data: company}
                ],
                callback: (indexArr, data) => {
                    /*
                    var prama = `unit=${data[0]}&year=${$('#year').html()}`

                    getSydt(prama)*/
                }
            })
        }
    })

    //不同年份统筹资金笔数分布图
    var diffYear = echarts.init(document.getElementById('diffYear'))

    var getDiffYear = (prama) => {
        var pramaData = ''
        
        if (!prama) {
            pramaData = prama + `unit=${$('#company').html()}`
        } else {
            pramaData = prama
        }

        $.ajax({
            url: 'http://test.360guanggu.com/fupingv1/api.php/Apple/differentYearMoneyCount',
            type: 'POST',
            data: pramaData,
            success: (data) => {
                var year = [],
                    count = []

                for (var i = 0; i < JSON.parse(data).length; i++) {
                    year.push(JSON.parse(data)[i].year)
                    count.push(+JSON.parse(data)[i].count)
                }

                year.reverse()
                count.reverse()

                diffYear.setOption({
                    legend: {
                        data: ['项目数']
                    },
                    grid: {
                        left: 'left',
                        containLabel: true
                    },
                    xAxis: {
                        name: '项目数',
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
                        data: year
                    },
                    series: [
                        {
                            name: '项目数',
                            type: 'bar',
                            data: count
                        }
                    ]
                })
            }
        })
    }

    //同年统筹资金的不同类型数量分布图
    var sydt = echarts.init(document.getElementById('sydt'))

    var getSydt = (prama) => {

        var pramaData =''

        if (!prama) {
            pramaData = `unit=${$('#companyTwo').html()}&year=${$('#year').html()}`
        } else {
            pramaData = prama
        }
        
        console.log(pramaData)
        $.ajax({
            url: 'http://test.360guanggu.com/fupingv1/api.php/Apple/differentTypeMoneyCount',
            type: 'POST',
            data: pramaData,
            success: (data) => {
                console.log(JSON.parse(data)[0].poverty)
                var type = ['产业发展', '创业增收', '医疗卫生', '危房改造', '发展教育', '基础设施', '民政社保等兜底', '生态补偿1'],
                    count = []
                for (var i = 0; i < JSON.parse(data).length; i++) {
                    count.push(+JSON.parse(data)[i].count)
                } 

                type.reverse()
                count.reverse()

                sydt.setOption({
                    legend: {
                        data: ['项目数']
                    },
                    grid: {
                        left: 'left',
                        containLabel: true
                    },
                    xAxis: {
                        name: '项目数',
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
                        data: type
                    },
                    series: [
                        {
                            name: '项目数',
                            type: 'bar',
                            data: count
                        }
                    ]
                })
            }
        })
    }
    

    //不同年份统筹资金金额分布图
    var dymoney = echarts.init(document.getElementById('dymoney'))

    var getDymoney = (prama) => {
        var pramaData = ''
        
        if (!prama) {
            pramaData = prama + `unit=${$('#company').html()}`
        } else {
            pramaData = prama
        }

        $.ajax({
            url: 'http://test.360guanggu.com/fupingv1/api.php/Apple/differentYearMoneyCount',
            type: 'POST',
            data: pramaData,
            success: (data) => {/*
                var year = [],
                    count = []

                for (var i = 0; i < JSON.parse(data).length; i++) {
                    year.push(JSON.parse(data)[i].year)
                    count.push(+JSON.parse(data)[i].count)
                }

                year.reverse()
                count.reverse()

                diffYear.setOption({
                    legend: {
                        data: ['项目数']
                    },
                    grid: {
                        left: 'left',
                        containLabel: true
                    },
                    xAxis: {
                        name: '项目数',
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
                        data: year
                    },
                    series: [
                        {
                            name: '项目数',
                            type: 'bar',
                            data: count
                        }
                    ]
                })*/
            }
        })
    }
    setTimeout(function () {
        getDiffYear('')
        getSydt('')
    }, 1000)

})
