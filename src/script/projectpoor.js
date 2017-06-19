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
    
    //中央/省财政支持项目状态图
    var projectStatus = echarts.init(document.getElementById('projectStatus'))

    var getProjectStatus = (prama) => {
        //设定默认值
        if (!prama) {
            prama = 'projectTypeText=&projectChildTypeText='
        }

        //获取数据
        $.ajax({
            url: 'http://test.360guanggu.com/yuanan_fupin/api.php/Changepoor/project',
            type: 'post',
            data: prama,
            success: (data) => {
                var formatData = [],
                    tmpObj = {}

                for (var i = 0; i < JSON.parse(data).data.length; i++) {
                    tmpObj.name = JSON.parse(data).data[i].text
                    tmpObj.value = +JSON.parse(data).data[i].total
                    formatData.push(tmpObj)
                    tmpObj ={}
                }

                projectStatus.setOption({
                    series : [{
                        type: 'pie',
                        radius : '35%',
                        center: ['50%', '50%'],
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

    //不同年份项目数量分布图
    var dyprojectnum = echarts.init(document.getElementById('dyprojectnum'))

    var getDyprojectnum = (prama) => {
        //设定默认值
        if (!prama) {
            prama = 'projectTypeText=&projectChildTypeText=&town=&country='
        }

        //获取数据
        $.ajax({
            url: 'http://test.360guanggu.com/yuanan_fupin/api.php/Changepoor/differentyear',
            type: 'post',
            data: prama,
            success: (data) => {
                var year = [],
                    project = []
                
                for (var i = 0; i < JSON.parse(data).data.length; i ++) {
                    year[i] = JSON.parse(data).data[i].year
                    project[i] = JSON.parse(data).data[i].total
                }

                dyprojectnum.setOption({
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
                            data: project
                        }
                    ]
                })
            }
        })
    }


    //同年份不同项目类型分布图
    var sydproject = echarts.init(document.getElementById('sydproject'))

    var getSydproject = (prama) => {
        
        //设定默认值
        if (!prama) {
            prama = 'projectTypeText=&year=2017&town=&country='
        }
                
        //获取数据
        $.ajax({
            url: 'http://test.360guanggu.com/yuanan_fupin/api.php/Changepoor/differentproject',
            type: 'post',
            data: prama,
            success: (data) => {
                var project = [],
                    num = []
                for (var i = 0; i < JSON.parse(data).data.length; i++) {
                    project[i] = JSON.parse(data).data[i].text
                    num[i] = JSON.parse(data).data[i].total
                }

                sydproject.setOption({
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
                        name: '项目类型',
                        nameLocation: 'start',
                        type: 'category',
                        axisTick: {
                            interval: 0
                        },
                        axisLabel: {
                            interval: 0
                        },
                        data: project
                    },
                    series: [
                        {
                            name: '项目数',
                            type: 'bar',
                            data: num
                        }
                    ]
                })
            }
        })        
    }

    //同年不同项目类型受益/脱贫人数分布图
    var sydprojectb = echarts.init(document.getElementById('sydprojectb'))

    var  getSydprojectb = (prama) => {
        //设定默认值
        if (!prama) {
            prama = 'projectTypeText=&year=2017&town=&country='
        }
                
        //获取数据
        $.ajax({
            url: 'http://test.360guanggu.com/yuanan_fupin/api.php/Changepoor/souyi',
            type: 'post',
            data: prama,
            success: (data) => {
                var project = [],
                    num = [],
                    nonum = []
                for (var i = 0; i < JSON.parse(data).data.length; i++) {
                    project[i] = JSON.parse(data).data[i].text
                    num[i] = JSON.parse(data).data[i].total
                    nonum[i] = JSON.parse(data).data[i].total
                }

                sydprojectb.setOption({
                    legend: {
                        data: ['受益人数', '脱贫人数']
                    },
                    grid: {
                        left: 'left',
                        containLabel: true
                    },
                    xAxis: {
                        name: '人数',
                        nameRotate: 90,
                        type: 'value',
                        boundaryGap: [0, 0.01],
                        position: 'top'
                    },
                    yAxis: {
                        name: '项目类型',
                        nameLocation: 'start',
                        type: 'category',
                        axisTick: {
                            interval: 0
                        },
                        axisLabel: {
                            interval: 0
                        },
                        data: project
                    },
                    series: [
                        {
                            name: '受益人数',
                            type: 'bar',
                            data: num
                        },
                        {
                            name: '脱贫人数',
                            type: 'bar',
                            data: nonum
                        }
                    ]
                })
            }
        })        
    }

    getProjectStatus()
    getDyprojectnum()
    getSydproject()
    getSydprojectb()

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
            var project = new MobileSelect({
                trigger: '#project',
                title: '选择项目',
                wheels: formatDate,
                callback: (indexArr, data) => {
                    var prama = ''
                    switch (data.length) {
                        case 1:
                            if (data[0].value === '不限') {
                                prama = `projectTypeText=&projectChildTypeText=`
                            } else {
                                prama = `projectTypeText=${data[0].value}&projectChildTypeText=`
                            }
                            break
                        case 2:
                            if (data[1].value === '不限') {
                                prama = `projectTypeText=${data[0].value}&projectChildTypeText=`
                            } else {
                                prama = `projectTypeText=${data[0].value}&projectChildTypeText=${data[1].value}`
                            }
                            break
                    }
                    getProjectStatus(prama)
                }
            })
            var projectTwo = new MobileSelect({
                trigger: '#projectTwo',
                title: '选择项目',
                wheels: formatDate,
                callback: (indexArr, data) => {
                    var prama = '',
                        zhen = '',
                        project = '',
                        zhenData = JSON.parse($('#zhen').attr('data-self'))
                    
                    $('#projectTwo').attr('data-self', JSON.stringify(data))

                    if (zhenData.length === 1) {
                        zhen = 'town=&country='
                    } else {

                        if (zhenData[1].id === '0') {
                            zhen = `town=${zhenData[0].value}&country=`
                        } else {
                            zhen = `town=${zhenData[0].value}&country=${zhenData[1].value}`
                        }
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
                    prama = `${project}&${zhen}`
                    getDyprojectnum(prama)
                }
            })
            var projectThree = new MobileSelect({
                trigger: '#projectThree',
                title: '选择项目',
                wheels: [
                        {data: singleData}
                    ],
                callback: (indexArr, data) => {
                    var prama = '',
                        zhen = '',
                        project = '',
                        year = JSON.parse($('#year').attr('data-self'))[0],
                        zhenData = JSON.parse($('#zhenTwo').attr('data-self'))
                    
                    $('#projectThree').attr('data-self', JSON.stringify(data))

                    if (zhenData.length === 1) {
                        zhen = 'town=&country='
                    } else {

                        if (zhenData[1].id === '0') {
                            zhen = `town=${zhenData[0].value}&country=`
                        } else {
                            zhen = `town=${zhenData[0].value}&country=${zhenData[1].value}`
                        }
                    }

                    if (data[0] === '不限') {
                        project = 'projectTypeText='
                    } else {
                        project = `projectTypeText=${data[0]}`
                    }

                    prama = `${project}&year=${year}&${zhen}`
                    getSydproject(prama)
                }
            })
            var projectFour = new MobileSelect({
                trigger: '#projectFour',
                title: '选择项目',
                wheels: [
                        {data: singleData}
                    ],
                callback: (indexArr, data) => {
                    var prama = '',
                        zhen = '',
                        project = '',
                        year = JSON.parse($('#yearTwo').attr('data-self'))[0],
                        zhenData = JSON.parse($('#zhenThree').attr('data-self'))
                    
                    $('#projectFour').attr('data-self', JSON.stringify(data))

                    if (zhenData.length === 1) {
                        zhen = 'town=&country='
                    } else {

                        if (zhenData[1].id === '0') {
                            zhen = `town=${zhenData[0].value}&country=`
                        } else {
                            zhen = `town=${zhenData[0].value}&country=${zhenData[1].value}`
                        }
                    }

                    if (data[0] === '不限') {
                        project = 'projectTypeText='
                    } else {
                        project = `projectTypeText=${data[0]}`
                    }

                    prama = `${project}&year=${year}&${zhen}`
                    getSydprojectb(prama)
                }
            })
        }
    })

    //获取镇村细节
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
                        zhen = '',
                        project = '',
                        projectData = JSON.parse($('#projectTwo').attr('data-self'))
                    
                    $('#zhen').attr('data-self', JSON.stringify(data))

                    if (projectData.length === 1) {
                        if (projectData[0].id === '0') {
                            project = 'projectTypeText=&projectChildTypeText='
                        } else {
                            project = `projectTypeText=${projectData[0].value}&projectChildTypeText=`
                        }
                    } else {

                        if (projectData[1].id === '0') {
                            project = `town=${projectData[0].value}&country=`
                        } else {
                            project = `town=${projectData[0].value}&country=${projectData[1].value}`
                        }
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
                    prama = `${project}&${zhen}`
                    getDyprojectnum(prama)
                }
            })
            var zhenTwoSelect = new MobileSelect({
                trigger: '#zhenTwo',
                title: '选择镇',
                wheels: formatDate,
                callback: (indexArr, data) => {
                    var prama = '',
                        zhen = '',
                        project = '',
                        year = JSON.parse($('#year').attr('data-self'))[0],
                        projectData = JSON.parse($('#projectThree').attr('data-self'))
                    
                    $('#zhenTwo').attr('data-self', JSON.stringify(data))

                    if (projectData[0] === '不限') {
                        project = 'projectTypeText='
                    } else {
                        project = `projectTypeText=${projectData[0]}`
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
                    prama = `${project}&year=${year}&${zhen}`
                    getSydproject(prama)
                }
            })
            var zhenThreeSelect = new MobileSelect({
                trigger: '#zhenThree',
                title: '选择镇',
                wheels: formatDate,
                callback: (indexArr, data) => {
                    var prama = '',
                        zhen = '',
                        project = '',
                        year = JSON.parse($('#yearTwo').attr('data-self'))[0],
                        projectData = JSON.parse($('#projectFour').attr('data-self'))
                    
                    $('#zhenThree').attr('data-self', JSON.stringify(data))

                    if (projectData[0] === '不限') {
                        project = 'projectTypeText='
                    } else {
                        project = `projectTypeText=${projectData[0]}`
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
                    prama = `${project}&year=${year}&${zhen}`
                    getSydproject(prama)
                }
            })
        }
    })

    //获取年份
    $.ajax({
        url: 'http://test.360guanggu.com/yuanan_fupin/api.php/Changepoor/year',
        type: 'get',
        success: (data) => {
            var year =[]
            for (var i = 0; i < JSON.parse(data).data.length; i++) {
                year[i] = JSON.parse(data).data[i].filingyear
            }
            var yearSelect = new MobileSelect({
                trigger: '#year',
                title: '选择年份',
                wheels: [
                    {data: year}
                ],
                callback: (indexArr, data) => {
                    var prama = '',
                        zhen = '',
                        project = '',
                        zhenData = JSON.parse($('#zhenTwo').attr('data-self')),
                        projectData = JSON.parse($('#projectThree').attr('data-self'))
                    
                    $('#year').attr('data-self', JSON.stringify(data))

                    if (zhenData.length === 1) {
                        zhen = 'town=&country='
                    } else {

                        if (zhenData[1].id === '0') {
                            zhen = `town=${zhenData[0].value}&country=`
                        } else {
                            zhen = `town=${zhenData[0].value}&country=${zhenData[1].value}`
                        }
                    }

                    if (projectData[0] === '不限') {
                        project = 'projectTypeText='
                    } else {
                        project = `projectTypeText=${projectData[0]}`
                    }

                    prama = `${project}&year=${data[0]}&${zhen}`
                    getSydproject(prama)
                }
            })
            var yearTwoSelect = new MobileSelect({
                trigger: '#yearTwo',
                title: '选择年份',
                wheels: [
                    {data: year}
                ],
                callback: (indexArr, data) => {
                    var prama = '',
                        zhen = '',
                        project = '',
                        zhenData = JSON.parse($('#zhenThree').attr('data-self')),
                        projectData = JSON.parse($('#projectFour').attr('data-self'))
                    
                    $('#yearTwo').attr('data-self', JSON.stringify(data))

                    if (zhenData.length === 1) {
                        zhen = 'town=&country='
                    } else {

                        if (zhenData[1].id === '0') {
                            zhen = `town=${zhenData[0].value}&country=`
                        } else {
                            zhen = `town=${zhenData[0].value}&country=${zhenData[1].value}`
                        }
                    }

                    if (projectData[0] === '不限') {
                        project = 'projectTypeText='
                    } else {
                        project = `projectTypeText=${projectData[0]}`
                    }

                    prama = `${project}&year=${data[0]}&${zhen}`
                    getSydprojectb(prama)
                }
            })
        }
    })
    

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

    
})
