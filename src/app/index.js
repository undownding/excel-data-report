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
          if (parseFloat(values[key]) >= 4) {
            high += key + " "
          }
        }
        let low = ""
        for (let key in values) {
          if (parseFloat(values[key]) < 3) {
            low += key + " "
          }
        }

        return (
            <div style={{flexDirection: 'row', textAlign: 'center', width: '100%', height:'100%', paddingTop: '40px'}}>
                <h2>360评估综合报告</h2>
                <div style={{textAlign: 'right', width: '80%'}}>
                    <p>参测人:{this.props.name}</p>
                    <br/>
                    <p>{this.props.date}</p>
                </div>
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
                    <p>2. 您可以了解自我评估与其他类评估者的整体吻合度：通过观察不同条形长短趋势，以查看自我评估在指标上高中低的排序与其他评估者的高中低排序。</p>
                    <br/>
                    <p>3. 与您自我评估分值相差较大的指标值得引起您的重视，并请你思索产生这种情况的可能原因，判断是否需要您采取行动以及采取何种行动。</p>
                </div>
                <br/>
                <div style={{textAlign: 'left', width: '80%'}}>
                        <span className="mdl-chip">
                            <span className="mdl-chip__text">职业锚测试结果</span>
                        </span>
                </div>
                <br/>
                <ReactEcharts option={this.getCAQOptions(this.props.caq)}
                              style={{height: '600px', width: '100%'}}
                              lazyUpdate={true}/>
                <br/>
                <div style={{textAlign: 'left', width: '80%', marginLeft: '20px'}}>
                    <p><b>您的职业锚为：</b>{this.getCAQMainTitle(this.getCAQMain(this.props.caq))}</p>
                    <br/>
                    <div dangerouslySetInnerHTML={this.getCAQDes(this.getCAQMain(this.props.caq))}/>
                    <p><b>您的辅助锚为：</b>{this.getCAQMainTitle(this.getCAQVice(this.props.caq))}</p>
                    <br/>
                    <div dangerouslySetInnerHTML={this.getCAQDes(this.getCAQVice(this.props.caq))}/>
                </div>
                <br/>
                <h4>原始得分柱状图</h4>
                <br/>
                <ReactEcharts option={this.getCAQOptions2(this.props.caq)}
                              style={{height: '400px', width: '100%'}}
                              lazyUpdate={true}/>
                <br/>
                <div style={{textAlign: 'left', width: '80%'}}>
                        <span className="mdl-chip">
                            <span className="mdl-chip__text">PDP事业优势诊断系统测评结果</span>
                        </span>
                </div>
                <br/>
                <ReactEcharts option={this.getPDPChart(this.props.pdp)}
                              style={{height: '600px', width: '100%'}}
                              lazyUpdate={true}/>
                <div style={{textAlign: 'left', width: '80%', marginLeft: '20px'}}>
                    <br/>
                    <p><b>您的职业性格类型为：</b></p><div dangerouslySetInnerHTML={this.getPDPText(this.props.pdp)}/>
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
                            name : '各指标得分',
                            label: {
                                normal: {
                                    show: true,
                                    formatter:function(params) {
                                        return params.value;
                                    }
                                }
                            },
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
        return ((0.5 * a) + (0.3 * p) + (0.2 * m)).toFixed(2)
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
                      label: {
                          normal: {
                              show: true
                          }
                      },
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
                      label: {
                          normal: {
                              show: true
                          }
                      },
                      data: self.slice().reverse()
                  },
                  {
                      name: '他评',
                      type: 'bar',
                      label: {
                          normal: {
                              show: true
                          }
                      },
                      data: other.slice().reverse()
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
                        label: {
                            normal: {
                                show: true
                            }
                        },
                        data: up.slice().reverse()
                    },
                    {
                        name: '同级',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true
                            }
                        },
                        data: self.slice().reverse()
                    },
                    {
                        name: '下级',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true
                            }
                        },
                        data: down.slice().reverse()
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
                            name : '项目组评分',
                            label: {
                                normal: {
                                    show: true,
                                    formatter:function(params) {
                                        return params.value;
                                    }
                                }
                            }
                        },
                        {
                            value : inner,
                            name : '内部评分',
                            label: {
                                normal: {
                                    show: true,
                                    formatter:function(params) {
                                        return params.value;
                                    }
                                }
                            }
                        }
                    ]
                }]
            }
        )
    }

    getCAQOptions(caq) {
        return({
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} ({d}%)"
            },
            //
            // visualMap: {
            //     show: false,
            //     min: 0,
            //     max: 8.5,
            // },
            legend: {
                orient: 'horizontal',
                left: 'left',
                data: ['技术/职能型职业锚（TF）', '管理型职业锚（GM）', '自主/独立型职业锚（AU）', '安全/稳定型职业锚（SE）', '',  '创造/创业型职业锚（EC）', '服务型职业锚（SV）', '挑战型职业锚（CH）', '生活型职业锚（LS）']
            },
            series : [
                {
                    name:'成分构成',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value: caq[0], name:('技术/职能型职业锚（TF） ')},
                        {value: caq[1], name:('管理型职业锚（GM）')},
                        {value: caq[2], name:('自主/独立型职业锚（AU）')},
                        {value: caq[3], name:('安全/稳定型职业锚（SE）')},
                        {value: caq[4], name:('创造/创业型职业锚（EC）')},
                        {value: caq[5], name:('服务型职业锚（SV）')},
                        {value: caq[6], name:('挑战型职业锚（CH）')},
                        {value: caq[7], name:('生活型职业锚（LS）')}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                        normal: {
                            label: {
                                show: true,
                                formatter: '{b} {d}%'
                            }
                        }
                    }
                }
            ]
        })
    }

    getCAQOptions2(caq) {
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
                    data: ['原始得分']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
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
                        data: ['技术/职能型职业锚（TF）', '管理型职业锚（GM）', '自主/独立型职业锚（AU）', '安全/稳定型职业锚（SE）', '创造/创业型职业锚（EC）', '服务型职业锚（SV）', '挑战型职业锚（CH）', '生活型职业锚（LS）'].reverse()
                    }
                ],
                xAxis: [
                    {
                        type: 'value',
                        min: 0,
                        max: 45
                    }
                ],
                series: [
                    {
                        name: '原始得分',
                        type: 'bar',
                        barGap: 0,
                        label: {
                            normal: {
                                position: 'right',
                                show: true
                            }
                        },
                        data: caq.slice().reverse()
                    },
                ]
            }
        )
    }

    getCAQMain(caq) {
        let max = 0;
        for (let i = 1; i < caq.length; i++) {
            if (parseInt(caq[i]) > caq[max]) {
                max = i
            }
        }
        let max_nums = [max];
        let second = 0
        let flag = false
        caq.unshift(-999);
        for (let i = 1; i < caq.length; i++) {
            if (parseFloat(caq[i]) < parseFloat(caq[max + 1])&& parseFloat(caq[i]) > parseFloat(caq[second]) && parseFloat(caq[i]) >= parseFloat(caq[max + 1]) - 2 && parseFloat(caq[i]) > second && i !== max + 1) {
                second = i
                flag = true
            }
        }
        caq.shift();
        if (flag) {
            max_nums.push(second - 1)
        }
        return max_nums
    }

    getCAQMainTitle(value) {
        const headers = ['技术/职能型职业锚（TF）', '管理型职业锚（GM）', '自主/独立型职业锚（AU）', '安全/稳定型职业锚（SE）', '创造/创业型职业锚（EC）', '服务型职业锚（SV）', '挑战型职业锚（CH）', '生活型职业锚（LS）'];
        let result = ''
        for (let key in value) {
            result += headers[value[key]]
        }
        return result
    }

    getCAQVice(caq) {
        let max_nums = this.getCAQMain(caq);
        if (max_nums.length == 1) {
            let max = parseFloat(caq[max_nums[0]]) - 2;
            let second = 0;
            caq.unshift(-999);
            let flag = false
            for (let i = 1; i < caq.length; i++) {
                if (parseFloat(caq[i]) < max && parseFloat(caq[i]) > parseFloat(caq[second]) && parseFloat(caq[i]) >= (max + 2 ) * 0.5) {
                    second = i
                    flag = true
                }
            }
            caq.shift();
            if (!flag) {
                return []
            } else {
                second--
                // 找出与 caq[second] 相同的作为辅助锚
                let sec_nums = [second]
                for (let i = 1; i < caq.length; i++) {
                    if (parseInt(caq[i]) == parseInt(caq[second]) && i != second) {
                        sec_nums.push(i)
                    }
                }
                return sec_nums
            }
        } else if (max_nums.length == 2) {
            // 70% 算法
            let thr = 0;
            if (caq.filter(v => v >= 0.7 * parseFloat(max_nums[1])).length == 0) {
                return [] // 没有辅助锚
            } else {
                caq.unshift(-999);
                let thr = 0
                for (let i = 1; i < caq.length; i++) {
                    if (parseFloat(caq[i]) >= 0.7 * parseFloat(max_nums[1]) && parseFloat(caq[i]) > parseFloat(caq[thr]) && i != parseInt(max_nums[0]) + 1&& i != parseInt(max_nums[1]) + 1) {
                        thr = i
                    }
                }
                caq.shift();
                thr = thr - 1
                if (thr == -1) {
                    return []
                }
                let sec_nums = [thr]
                for (let key in caq) {
                    if (parseInt(caq[key]) == parseInt(caq[thr]) && key != thr) {
                        sec_nums.push[key]
                    }
                }
                return sec_nums;
            }

        } else {
            return [] // 没有辅助锚
        }
    }

    getCAQDes(value) {
        const headers = ['技术/职能型职业锚（TF）', '管理型职业锚（GM）', '自主/独立型职业锚（AU）', '安全/稳定型职业锚（SE）', '创造/创业型职业锚（EC）', '服务型职业锚（SV）', '挑战型职业锚（CH）', '生活型职业锚（LS）'];
        const text = [
            '<p> 如果你的职业锚是技术/职能型，你始终不肯放弃的是在专业领域中展示自己的技能，并不断把自己的技术发展到更高层次的机会<br/>你希望通过施展自己的技能以获得别人的认可，并乐于接受来自专业领域的挑战，你可能愿意成为技术/职能领域的管理者，但管理本身并不能给你带来乐趣，你极力避免全面管理的职位<br/>'+
            '            </p>',
            '<p> 你始终不肯放弃的是升迁到组织更高的管理职位，这样你能够整合其他人的工作，并对组织中某项工作的绩效承担责任<br/>\n' +
            '                    你希望为最终的结果承担责任，并把组织的成功看做是自己的工作\n' +
            '                </p>',
            '<p>你始终不肯放弃的是按照自己的方式工作和生活，你希望留在能够提供足够的灵活性，并由自己来决定何时及如何工作的组织中<br/>\n' +
            '                你宁可放弃放弃升值加薪的机会，也不愿意丧失自己的自主独立性。为了最大程度自主和独立，你可能创立自己的公司\n' +
            '            </p>',
            '<p>你始终不肯放弃的是稳定的或终身雇佣制的职位<br/>你希望有成功的感觉，这样你才可以放松下来。你关注财务安全和就业安全。你对组织忠诚，对雇主言听计从，希望以此获得终身雇佣的承诺</p>',
            '<p>你始终不肯放弃的是凭借自己的能力和冒险愿望，扫除障碍，创立属于自己的公司或组织<br/>' +
            '你希望向世界证明你有能力创建一家企业，现在你可能在某一组织中为别人工作，但同时你会学习并评估未来的机会，一旦你认为机会成熟，就会尽快的开始自己的创业历程。\n</p>',
            '<p>你始终不肯放弃的是做一些有价值的事情，比如：解决环境问题、增进人与人之间的和谐、帮助他人等<br/>\n' +
            '你宁愿离开原来的组织，也不会放弃对这些工作机会的追求</p>',
            '<p>你始终不肯放弃的是去解决看上去无法解决的问题，战胜强硬的对手或克服面临的困难<br/>\n' +
            '对你而言，职业的意义在于允许你战胜不可能的事情</p>',
            '<p>你始终不肯放弃的是平衡并整合个人的、家庭的和职业的需要<br/>\n' +
            '你希望生活中的各个部分能够协调统一向前发展，因此你希望职业有足够的弹性允许你来实现这种整合</p>'
        ]
        let result = ''
        for (let key in value) {
            result += '<b>' + headers[value[key]] + '</b><br/>' + text[value[key]] + '<br/>'
        }
        return {__html: result}
    }

    getPDPChart(pdp) {
        return ({

            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} ({d}%)"
            },
            //
            // visualMap: {
            //     show: false,
            //     min: 0,
            //     max: 8.5,
            // },
            legend: {
                orient: 'horizontal',
                left: 'left',
                data: ['老虎型（支配型Dominance）', '孔雀型（表达型Extroversion）','考拉型（耐心型Pace/Patience）', '猫头鹰型（精确型Conformity）', '变色龙型（整合型1/2 Sigma）']
            },
            series : [
                {
                    name:'成分构成',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value: pdp[0], name:('老虎型（支配型Dominance）')},
                        {value: pdp[1], name:('孔雀型（表达型Extroversion）')},
                        {value: pdp[2], name:('考拉型（耐心型Pace/Patience）')},
                        {value: pdp[3], name:('猫头鹰型（精确型Conformity）')},
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                        normal: {
                            label: {
                                show: true,
                                formatter: '{b} {d}%'
                            }
                        }
                    }
                }
            ]
        })
    }

    getPDPText(value) {
        const headers = ['老虎型（支配型Dominance）', '孔雀型（表达型Extroversion）','考拉型（耐心型Pace/Patience）', '猫头鹰型（精确型Conformity）', '变色龙型（整合型1/2 Sigma）']
        const text = ['<p><b>老虎型（支配型Dominance）</b><br/>'+
        '“老虎”一般企图心强烈，喜欢冒险，个性积极，竞争力强，凡事喜欢掌控全局发号施令，不喜欢维持现状，但行动力强，目标一经确立便会全力以赴。它的缺点是在决策上较易流于专断，不易妥协，故较容易与人发生争执摩擦。如果下属中有“老虎”要给予他更多的责任，他会觉得自己有价值，布置工作时注意结果导向，如果上司是老虎则要在他面前展示自信果断的一面，同时避免在公众场合与他唱反调。中外名人中毛泽东、朱熔基以及前英国首相撒切尔夫人为较典型的老虎型，德国为老虎型人数最多的国家。<br/>' +
        '个性特点：<br/>' +
        '有自信，够权威，决断力高，竞争性强，胸怀大志，喜欢评估。企图心强烈，喜欢冒险，个性积极，竞争力强，有对抗性。<br/>' +
        '优点：<br/>' +
        '善于控制局面并能果断地作出决定的能力；用这一类型工作方式的人成就非凡。<br/>' +
        '缺点：<br/>' +
        '当感到压力时，这类人就会太重视迅速的完成工作，就容易忽视细节，他们可能不顾自己和别人的情感。由于他们要求过高，加之好胜的天性，有时会成为工作狂。<br/>' +
        '老虎型工作风格的主要行为：<br/>' +
        '交谈时进行直接的目光接触；有目的性且能迅速行动；说话快速且具有说服力；运用直截了当的实际性语言；办公室挂有日历、计划要点。<br/>' +
        '　老虎型领导人都倾向以权威作风来进行决策，当其部属者除要高度服从外，也要有冒险犯难的勇气，为其杀敌闯关。<br/>' +
        '　老虎型族人最适合开创性与改革性的工作，在开拓市场的时代或需要执行改革的环境中，最容易有出色的表现。<br/>' +
        '　宏碁集团的施振荣和前美国GE总裁韦尔奇（Jack Welch）等，都是老虎型领导人。</p>',
        '<p><b>孔雀型（表达型Extroversion）</b><br/>' +
        '　“孔雀”热情洋溢，好交朋友，口才流畅，重视形象，擅于人际关系的建立，富同情心，最适合人际导向的工作。缺点是容易过于乐观，往往无法估计细节，在执行力度上需要高专业的技术精英来配合。对孔雀要以鼓励为主给他表现机会保持他的工作激情，但也要注意他的情绪化和防止细节失误。孙中山、克林顿、里根、戈尔巴乔夫都是这一类型的人，美国是孔雀型人最多的国家。\n' +
        '个性特点：<br/>' +
        '很热心，够乐观，口才流畅，好交朋友，风度翩翩，诚恳热心。热情洋溢、好交朋友、口才流畅、个性乐观、表现欲强。<br/>'+
        '优点：<br/>'+
        '此类型的人生性活泼。能够使人兴奋，他们高效地工作，善于建立同盟或搞好关系来实现目标。他们很适合需要当众表现、引人注目、态度公开的工作。<br/>'+
        '缺点：<br/>'+
        '因其跳跃性的思考模式，常无法顾及细节以及对事情的完成执着度<br/>'+
        '孔雀型工作风格的主要行为：<br/>'+
        '运用快速的手势；面部表情特别丰富；运用有说服力的语言；工作空间里充满了各种能鼓舞人心的东西。<br/>'+
        '　孔雀百利具有高度的表达能力，他的社交能力极强，有流畅无碍的口才和热情幽默的风度，在团体或社群中容易广结善缘、建立知名度。孔雀型领导人天生具备乐观与和善的性格，有真诚的同情心和感染他人的能力，在以团队合作为主的工作环境中，会有最好的表现。<br/>'+
        '　孔雀型领导人在任何团体内，都是人缘最好的人和最受欢迎的人，是最能吹起领导号角的人物。当孔雀型领导人的部属者，除要能乐于在团队中工作外，还要对其领导谦逊得体，不露锋、不出头，把一切成功光华都让与领导。孔雀型领导人，不宜有个老虎型领导人当二把手或部属。<br/>'+
        '　反之，若老虎型领导人有个孔雀型的人甘愿当其二把手，则会是最佳搭配。孔雀型的人天生具有鼓吹理想的特质，在推动新思维、执行某种新使命或推广某项宣传等任务的工作中，都会有极出色的表现。他们在开发市场或创建产业的工作环境中，最能发挥其所长。<br/>'+
        '　有台湾企管大师之称的石滋宜博士，就是属于孔雀型的人。</p>',
        '<p><b>考拉型（耐心型Pace/Patience）</b><br/>'+
        '　“考拉”属于行事稳健，不会夸张强调平实的人，性情平和对人不喜欢制造麻烦，不兴风作浪，温和善良，在别人眼中常让人误以为是懒散不积极，但只要决心投入，绝对是“路遥知马力”的最佳典型。对考拉要多给予关注和温柔想方设法挖掘他们内在的潜力。印度的甘地、蒋经国、宋庆龄都是此类型的人，一般而言，宗教信仰者都是“考拉”，而中国正是考拉型最多的摇篮。<br/>'+
        '个性特点：<br/>'+
        '很稳定，够敦厚，温和规律，不好冲突。行事稳健、强调平实，有过人的耐力，温和善良。<br/>'+
        '优点：<br/>'+
        '他们对其他人的感情很敏感，这使他们在集体环境中左右逢源。<br/>'+
        '缺点：<br/>'+
        '很难坚持自己的观点和迅速做出决定。一般说来，他们不喜欢面对与同事意见不和的局面，他们不愿处理争执。<br/>'+
        '考拉型工作风格的主要行为：<br/>'+
        '面部表情和蔼可亲；说话慢条斯理，声音轻柔；用赞同型、鼓励性的语言；办公室里摆有家人的照片。<br/>'+
        '　考拉具有高度的耐心。他敦厚随和，行事冷静自持；生活讲求律规但也随缘从容，面对困境，都能泰然自若。<br/>'+
        '　考拉熊型领导人，适宜当安定内部的管理工作，在需要专业精密技巧的领域，或在气氛和谐且不具赶迫时间表等的职场环境中，他们最能发挥所长。当企业的产品稳踞市场时，考拉型的企业领导人是极佳的总舵手。但当企业还在开拓市场的时候，老虎型或孔雀型的人似乎较占优势。<br/>'+
        '　 或许，勇于开疆辟土的老虎型的人当一哥，配以与人为善的考拉型人当二把手，也是好的搭配。无尾熊型领导人强调无为而治，能与周围的人和睦相处而不树敌，是极佳的人事领导者，适宜在企业改革后，为公司和员工重建互信的工作。又由于他们具有高度的耐心性，有能力为企业赚取长远的利益，或为公司打好永续经营的基础。</p>',
        '<p><b>猫头鹰型（精确型Conformity）</b><br/>'+
        '　“猫头鹰”传统而保守，分析力强，精确度高是最佳的品质保证者，喜欢把细节条例化，个性拘谨含蓄，谨守分寸忠于职责，但会让人觉得“吹毛求疵”。“猫头鹰”清晰分析道理说服别人很有一套，处事客观合理，只是有时会钻在牛角尖里拔不出来。古代断案如神的包拯（包青天）正是此种类型的典范。日本是这个类型人数较多的国家。<br/>'+
        '个性特点：<br/>'+
        '很传统，注重细节，条理分明，责任感强，重视纪律。保守、分析力强，精准度高，喜欢把细节条例化，个性拘谨含蓄。<br/>'+
        '优点：<br/>'+
        '天生就有爱找出事情真相的习性，因为他们有耐心仔细考察所有的细节并想出合乎逻辑的解决办法。<br/>'+
        '缺点：<br/>'+
        '把事实和精确度置于感情之前，这会被认为是感情冷漠。在压力下，有时为了避免做出结论，他们会分析过度。<br/>'+
        '猫头鹰型工作风格的主要行为：<br/>'+
        '很少有面部表情；动作缓慢；使用精确的语言、注意特殊细节；办公室里挂有图表、统计数字等。<br/>'+
        '　猫头鹰斯诺具有高度精确的能力，其行事风格，重规则轻情感，事事以规则为准绳，并以之为主导思想。他性格内敛、善于以数字或规条为表达工具而不大擅长以语言来沟通情感或向同事和部属等作指示。他行事讲究条理分明、守纪律重承诺，是个完美主义者<br/>'+
        '　架构稳定和制度健全的组织最好聘用猫头鹰型的人来当各级领导人，因为猫头鹰型领导人喜欢在安全架构的环境中工作，且其表现也会最好。其行事讲究制度化，事事求依据和规律的习性，极为适合事务机构的行事方式。然而，当企业需要进行目标重整、结构重组、流程变革时，猫头鹰型领导人就会产生迷失，不知如何处事，也不知如何自处。对改革行动，上者会先保持观望的态度，再慢慢适应新的局面；中者也会先保持观望的态度，然后呈辞求去；下者则会结集反对力量，公然表示反对或隐晦地从事反对等的行为。<br/>'+
        '　又由于猫头鹰型人的行事决策风格，是以数据和规则为其主导思想，其直觉能力和应变能力都偏低，随而创造和创新能力也相对地弱，因而不宜担任需要创建或创新能力的任务。组织完善和发展安定的企业，宜用猫头鹰型企管人当家。<br/>'+
        '　　他们尊重传统、重视架构、事事求据喜爱工作安定的性格，是企业安定力量的来源。然而，由于他们行事讲究制度化，事事求依据和规律，故会将细节条例化，事事检查以求正确无误，甚至为了办事精确，不惜对人吹毛求疵或挑剔别人的错误，以显现自己一切照章办事的态度和求取完美的精神，不易维持团队内的团结精神和凝聚力。\n</p>',
        '<p><b>变色龙型（整合型1/2 Sigma）</b><br/>'+
        '　“变色龙”中庸而不极端，凡事不执着，韧性极强，擅于沟通是天生的谈判家，他们能充分融入各种新环境新文化且适应性良好，在他人眼中会觉得他们“没有个性”，故“没有原则就是最高原则”，他们懂得凡事看情况看场合。前总理周恩来、美国前国务卿基辛格、诸葛亮都是这种类型。香港和台湾是变色龙较多的地区。<br/>'+
        '工作风格的优点：<br/>'+
        '善于在工作中调整自己的角色去适应环境，具有很好的沟通能力。<br/>'+
        '缺点：<br/>'+
        '从别人眼中看变色龙族群，会觉得他们较无个性及原则。<br/>'+
        '变色龙型工作风格的主要行为：<br/>'+
        '综合老虎、孔雀、考拉、猫头鹰的特质，看似没有突出个性，但擅长整合内外资；没有强烈的个人意识形态，是他们处事的价值观。<br/>'+
        '　变色龙型的领导人，是支配型、表达型、耐心型、精确型四种特质的综合体，没有突出的个性，擅长整合内外信息，兼容并蓄，不会与人为敌，以中庸之道处世。他们处事圆融，弹性极强，处事处处留有余地，行事绝对不会走偏锋极端，是一个办事让你放心的人物。然而，由于他们以善变为其专长，故做人不会有什么立场或原则，也不会对任何人有效忠的意向，是个冯道式的人物。部属会难以忍受其善变和不讲原则的行为；当他们上司者，则会日夜担心不知何时会遭其“出卖”。<br/>'+
        '　变色龙型的领导人既没有凸出的个性，对事也没有什么强烈的个人意识型态，事事求中立并倾向站在没有立场的位置，故在冲突的环境中，是个能游走折中的高手。由于他们能密切地融合于各种环境中，他们可以为企业进行对内对外的各种交涉，只要任务确实和目标清楚，他们都能恰如其分地完成其任务。\n</p>']
        const max_nums = []
        const max = Math.max.apply(null, value)
        let result = ''
        for (let key in value) {
            if (value[key] > max - 2) max_nums.push(key)
        }
        if (max_nums.length == 1) {
            result += headers[max_nums[0]]
            result += '<br/><br/>'
            result += text[max_nums[0]]
            result += '<br/>'
        } else {
            result += headers[4] + '：'
            for (let key in max_nums) {
                result += headers[max_nums[key]]
            }
            result += '<br/><br/>'
            for (let key in max_nums) {
                result += text[max_nums[key]] + '<br/><br/>'
            }
        }
        result += '<br/>'
        return {__html: result}
    }
}

export default App
