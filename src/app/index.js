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

        let values = this.calcTotal(this.props.mate, this.props.up, this.props.self)
        let high = ""
        for (let key in values) {
          if (parseFloat(values[key]) > 4) {
            high += key + " "
          }
        }
        let low = ""
        for (let key in values) {
          if (parseFloat(values[key]) < 4) {
            low += key + " "
          }
        }

        return (
            <div style={{flexDirection: 'row', textAlign: 'center', width: '100%', height:'100%', paddingTop: '40px'}}>
                <h2>360评估综合报告</h2>
                <div style={{textAlign: 'right', width: '80%'}}><p>参测人:{this.props.name}</p></div>
                <br/>
                <div style={{textAlign: 'left', width: '80%'}}>
                <span className="mdl-chip">
                    <span className="mdl-chip__text">个人综合得分</span>
                </span>
                <br/>
                <p style={{marginLeft: '20px'}}>{this.getTotalSorce(this.props.mate, this.props.up, this.props.self)}</p>
                <br/>
                </div>
                <br/>
                <div style={{textAlign: 'left', width: '80%'}}>
                    <span className="mdl-chip">
                        <span className="mdl-chip__text">各指标得分</span>
                    </span>
                </div>
                <br/>
                <div style={{width: '100%', display: 'inline-flex'}}>
                    <ReactEcharts option={this.getChartOption(this.props.mate, this.props.up, this.props.self)}
                                  style={{height: '520px', width: '580px'}}
                                  lazyUpdate={true}/>

                    <ReactEcharts option={this.getScoreOption(this.props.mate, this.props.up, this.props.self)}
                                  style={{height: '200px', width: '280px'}}
                                  lazyUpdate={true}/>
                </div>
                <br/>
                <div style={{textAlign: 'left', width: '80%', marginLeft: '20px'}}>
                    <p><b>高分项：</b>{high}</p>
                    <br/>
                    <p><b>低分项：</b>{low}</p>
                    <br/>
                </div>
                <br/>
                <div style={{flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto', width: '100%', display: 'inline-flex', flexWrap: 'wrap'}}>
                    <div style={{textAlign: 'left', width: '80%'}}>
                        <span className="mdl-chip">
                            <span className="mdl-chip__text">自我认知与他人认知</span>
                        </span>
                    </div>
                    <br/>
                    <ReactEcharts option={this.getSelfKnowOption(this.props.self, this.props.other)}
                                  style={{height: '520px', width: '100%'}}
                                  lazyUpdate={true}/>
                    <br/>
                    <div style={{textAlign: 'left', width: '80%'}}>
                        <span className="mdl-chip">
                            <span className="mdl-chip__text">各职位层级认知</span>
                        </span>
                    </div>
                    <br/>
                    <ReactEcharts option={this.getUpDownScoreOption(this.props.mate, this.props.up, this.props.down)}
                                  style={{height: '800px', width: '100%'}}
                                  lazyUpdate={true}/>
                    <br/>
                    <div style={{textAlign: 'left', width: '80%'}}>
                        <span className="mdl-chip">
                            <span className="mdl-chip__text">项目组内外认知</span>
                        </span>
                    </div>
                    <br/>
                    <ReactEcharts option={this.getOutsideScoreOption(this.calcInner(this.props.mate, this.props.up, this.props.self), this.props.outter)}
                                  style={{height: '500px', width: '100%'}}
                                  lazyUpdate={true}/>
                    <br/>
                </div>
                <div style={{textAlign: 'left', width: '100%', marginLeft: '20px'}}>
                    <p>1. 该图用来呈现您在不同指标上，不同评估者的平均分值对比。</p>
                    <br/>
                    <p>2. 您可以了解某一类评估者（如：上级）严重的相对更优和相对不足：观察某一类颜色的条形，在平均分值高低进行对比。依此顺延查看其他类评估者。</p>
                    <br/>
                    <p>3. 您可以了解自我评估与其他类评估者的整体吻合度：通过观察相同颜色的 3 个条形长短趋势，以查看自我评估在指标上高中低的排序与其他评估者的高中低排序。</p>
                    <br/>
                    <p>4. 与您自我评估分值相差较大的指标值得引起您的重视，并请你思索产生这种情况的可能原因，判断是否需要您采取行动以及采取何种行动。</p>
                </div>
                <br/>
            </div>
        )
    }

    // 个人评估综合得分各维度报告
    calcTotal(mate, up, self) {
        const headers = ['战略理解','知识经验','执行效率','项目导向','沟通能力', '团体协作', '责任意识', '情绪控制', '学习成长', '寻求改变', '成就动机']
        let value = []
        for (let key in headers) {
            value[headers[key]] = 0
        }
        for (let key in mate) {
            if (!isNaN(mate[key])) {
                value[key] += parseFloat(mate[key]) * 0.3
            }
        }
        for (let key in up) {
            if (!isNaN(up[key])) {
                value[key] += parseFloat(up[key]) * 0.5
            }
        }
        for (let key in self) {
            if (!isNaN(self[key])) {
                value[key] += parseFloat(self[key]) * 0.2
            }
        }
        return value
    }

    // 个人评估综合得分各维度报告
    getChartOption(mate, up, self) {
      let value = this.calcTotal(mate, up, self)
        let tmp = []
        for (let key in value) {
            tmp.push(value[key].toFixed(2))
        }
        value = tmp
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

    // 综合得分计算
    getTotalSorce(mate, up, self) {
        const result = this.calcTotal(mate, up, self)
        let a = ((result['战略理解'] + result['知识经验'] + result['执行效率'] + result['项目导向']) / 4).toFixed(2)
        let p = ((result['沟通能力'] + result['团体协作'] + result['责任意识'] + result['情绪控制']) / 4).toFixed(2)
        let m = ((result['学习成长'] + result['寻求改变'] + result['成就动机']) / 3).toFixed(2)
        return (0.5 * a) + (0.3 * p) + (0.2 * m)
    }
    // 个人评估A/P/M 三模块得分报告
    getScoreOption(mate, up, self) {
        const result = this.calcTotal(mate, up, self)
        let s1 = ((result['战略理解'] + result['知识经验'] + result['执行效率'] + result['项目导向']) / 4).toFixed(2)
        let s2 = ((result['沟通能力'] + result['团体协作'] + result['责任意识'] + result['情绪控制']) / 4).toFixed(2)
        let s3 = ((result['学习成长'] + result['寻求改变'] + result['成就动机']) / 3).toFixed(2)
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
    getUpDownScoreOption(s, u, d) {
      let self = []
      for (let key in s) {
          self.push(s[key])
      }

      let up = []
      if (u !== undefined) {
          for (let key in u) {
            up.push(u[key])
        }
      }

      let down = []
      if (d !== undefined) {
        for (let key in s) {
          if (!d[key]) {
            down.push(d[key])
          }
        }
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
                        data: up.reverse()
                    },
                    {
                        name: '同级',
                        type: 'bar',
                        label: {},
                        data: self.reverse()
                    },
                    {
                        name: '下级',
                        type: 'bar',
                        label: {},
                        data: down.reverse()
                    },
                ]
            }
        )
    }

    calcInner(mate, up, self) {
        const headers = ['项目导向', '沟通能力', '团体协作', '责任意识', '情绪控制']
        let value = this.calcTotal(mate, up, self)
        let result = []
        for (let key in headers) {
            result.push(value[headers[key]].toFixed(2))
        }
        return result
    }
    getOutsideScoreOption(m, n) {
        const headers = ['项目导向', '沟通能力', '团体协作', '责任意识', '情绪控制']
        let inner = m
        let outter = []
        for (let key in n) {
            outter.push(n[key])
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
                            value : outter,
                            name : '项目组评分'
                        },
                        {
                            value : inner,
                            name : '内部评分'
                        }
                    ]
                }]
            }
        )
    }
}

export default App
