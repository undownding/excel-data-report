import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'

class App extends Component {

    // constructor(props) {
    //     super(props)
    //     console.log(props)
    //     this.state = {
    //         self: props.self || {},
    //         other: props.other || {}
    //     }
    //
    //     this.handleChange = this.handleChange.bind(this);
    // }
    //
    // handleChange(event) {
    //     this.setState({
    //         self: event.target.value,
    //         other: event.target.value
    //     });
    // }

    render(){

        // console.log(this.props)

        return (
            <div style={{flexDirection: 'row', textAlign: 'center', width: '100%', height:'100', paddingTop: '40px'}}>
                <p><b>个人综合得分</b></p>
                <p>(此处应有分数)</p>
                <br/>
                <p><b>各指标得分</b></p>
                <br/>
                <div style={{height: '100%', width: '800px', display: 'inline-flex'}}>
                    <ReactEcharts option={this.getChartOption([2.3, 2, 3, 3.7, 4.6, 3.2, 3.2, 4.0, 4.5, 4.3, 3.8])}
                                  style={{height: '520px', width: '580px'}}
                                  lazyUpdate={true}/>

                    <ReactEcharts option={this.getScoreOption(2.0, 2.7, 3.8)}
                                  style={{height: '200px', width: '280px'}}
                                  lazyUpdate={true}/>
                </div>
                <br/>
                <p>(此处应有得分排序blablabla)</p>
                <br/>
                <div style={{marginLeft: 'auto', marginRight: 'auto', width: '80%'}}>
                    <p><b>自我认知与他人认知对比分析图</b></p>
                    <br/>
                    <ReactEcharts option={this.getSelfKnowOption(this.props.self, this.props.other)}
                                  style={{height: '520px', width: '100%'}}
                                  lazyUpdate={true}/>
                    <br/>
                    <p><b>职位阶级认知对比分析图</b></p>
                    <br/>
                    <ReactEcharts option={this.getUpDownScoreOption()}
                                  style={{height: '800px', width: '100%'}}
                                  lazyUpdate={true}/>
                    <br/>
                    <p><b>项目组评分</b></p>
                    <br/>
                    <ReactEcharts option={this.getOutsideScoreOption([2.0, 2.7, 3.8, 4.2, 3.3], [1, 4, 3, 5, 4])}
                                  style={{height: '500px', width: '100%'}}
                                  lazyUpdate={true}/>
                    <br/>
                    <a>项目组得分：</a><a>（此处应有得分）</a>
                    <br/>
                    <a>内部得分：</a><a>（此处应有得分）</a>
                    <br/>
                    <br/>
                </div>
            </div>
        )
    }

    // 个人评估综合得分各维度报告
    getChartOption(value) {
        return(
            {
                tooltip: {},
                legend: {
                    data: ['各指标得分']
                },
                radar: {
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            color: '#fff',
                            backgroundColor: '#999',
                            borderRadius: 3,
                            padding: [3, 5]
                        }
                    },
                    indicator: [
                        { name: '战略理解', max: 5},
                        { name: '知识经验', max: 5},
                        { name: '执行效率', max: 5},
                        { name: '项目导向', max: 5},
                        { name: '沟通能力', max: 5},
                        { name: '团体协作', max: 5},
                        { name: '责任意识', max: 5},
                        { name: '情绪控制', max: 5},
                        { name: '学习成长', max: 5},
                        { name: '寻求改变', max: 5},
                        { name: '成就动机', max: 5}
                    ]
                },
                series: [{
                    name: '各指标得分',
                    type: 'radar',
                    // areaStyle: {normal: {}},
                    data : [
                        {
                            value : value,
                            name : '各指标得分'
                        }
                    ]
                }]
            }
        )
    }

    // 个人评估A/P/M 三模块得分报告
    getScoreOption(s1, s2, s3) {
      return(
          {
              color: ['#c33d39'],
              tooltip : {
                  trigger: 'axis',
                  axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                      type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                  }
              },
              grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
              },
              yAxis : [
                  {
                      type : 'category',
                      data : ['能量动机', '人际合作', '工作技能'],
                      axisTick: {
                          alignWithLabel: true,
                          max: 3
                      }
                  }
              ],
              xAxis : [
                  {
                      type : 'value',
                      max: 5.0
                  }
              ],
              series : [
                  {
                      name:'得分',
                      type:'bar',
                      barWidth: '60%',
                      data:[s3, s2, s1]
                  }
              ]
          }
      )
    }

    // 自我认知与他人认知分析
    getSelfKnowOption(n, m) {
        let self = []
        for (let key in n) {
            self.push(n[key])
        }
        let other = []
        for (let key in m) {
            other.push(m[key])
        }

      return(
          {
              // color: ['#003366', '#006699'],
              tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                      type: 'shadow'
                  }
              },
              legend: {
                  data: ['自评', '他评']
              },
              toolbox: {
                  show: true,
                  orient: 'vertical',
                  left: 'right',
                  top: 'center',
                  // feature: {
                  //     mark: {show: true},
                  //     dataView: {show: true, readOnly: false},
                  //     magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                  //     restore: {show: true},
                  //     saveAsImage: {show: true}
                  // }
              },
              calculable: true,
              yAxis: [
                  {
                      type: 'category',
                      axisTick: {show: false},
                      data: ['战略理解','知识经验','执行效率','项目导向','沟通能力', '团体协作', '责任意识', '情绪控制', '学习成长', '寻求改变', '成就动机'].reverse()
                  }
              ],
              xAxis: [
                  {
                      type: 'value',
                      min: 0,
                      max: 5
                  }
              ],
              series: [
                  {
                      name: '自评',
                      type: 'bar',
                      barGap: 0,
                      label: {},
                      data: self.reverse()
                  },
                  {
                      name: '他评',
                      type: 'bar',
                      label: {},
                      data: other.reverse()
                  },
              ]
          }
      )
    }

    // 上下级评价分析
    getUpDownScoreOption(self, up, down) {



        return(
            {
                // color: ['#003366', '#006699'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['上级', '同级', '下级']
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    // feature: {
                    //     mark: {show: true},
                    //     dataView: {show: true, readOnly: false},
                    //     magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                    //     restore: {show: true},
                    //     saveAsImage: {show: true}
                    // }
                },
                calculable: true,
                yAxis: [
                    {
                        type: 'category',
                        axisTick: {show: false},
                        data: ['战略理解','知识经验','执行效率','项目导向','沟通能力', '团体协作', '责任意识', '情绪控制', '学习成长', '寻求改变', '成就动机'].reverse()
                    }
                ],
                xAxis: [
                    {
                        type: 'value',
                        min: 0,
                        max: 5
                    }
                ],
                series: [
                    {
                        name: '上级',
                        type: 'bar',
                        barGap: 0,
                        label: {},
                        data: [3, 2, 3, 4, 2, 1, 3, 2, 5, 4, 2].reverse()
                    },
                    {
                        name: '同级',
                        type: 'bar',
                        label: {},
                        data: [1, 3, 2, 5, 4, 2, 2, 3, 4, 2, 3].reverse()
                    },
                    {
                        name: '下级',
                        type: 'bar',
                        label: {},
                        data: [1, 3, 2, 5, 4, 2, 2, 3, 4, 2, 3].reverse()
                    },
                ]
            }
        )
    }

    getOutsideScoreOption(m, n) {
        let out = []
        for (let key in n) {
            out.push(n[key].toFixed(2))
        }
        return(
            {
                tooltip: {},
                legend: {
                    data: ['项目组评分', '内部评分']
                },
                radar: {
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            color: '#fff',
                            backgroundColor: '#999',
                            borderRadius: 3,
                            padding: [3, 5]
                        }
                    },
                    indicator: [
                        { name: '项目导向', max: 5},
                        { name: '沟通能力', max: 5},
                        { name: '团体协作', max: 5},
                        { name: '责任意识', max: 5},
                        { name: '情绪控制', max: 5},
                    ]
                },
                series: [{
                    name: '各指标得分',
                    type: 'radar',
                    // areaStyle: {normal: {}},
                    data : [
                        {
                            value : {}, //inner.reverse(),
                            name : '项目组评分'
                        },
                        {
                            value : out.reverse(),
                            name : '内部评分'
                        }
                    ]
                }]
            }
        )
    }
}

export default App
