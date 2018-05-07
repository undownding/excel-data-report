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
                    <div dangerouslySetInnerHTML={this.getCAQDes(this.getCAQMain(this.props.caq))}></div>
                </div>
                <br/>
                <h4>原始得分柱状图</h4>
                <br/>
                <ReactEcharts option={this.getCAQOptions2(this.props.caq)}
                              style={{height: '400px', width: '100%'}}
                              lazyUpdate={true}/>
                <br/>
                <p>{this.getCAQVice(this.props.caq)}</p>
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
                        {value:(parseFloat(caq[0])/ 5).toFixed(2), name: ('技术/职能型职业锚（TF） ' + (parseFloat(caq[0])/ 5).toFixed(2))},
                        {value:(parseFloat(caq[1])/ 5).toFixed(2), name:('管理型职业锚（GM）' + (parseFloat(caq[1])/ 5).toFixed(2))},
                        {value:(parseFloat(caq[2])/ 5).toFixed(2), name:('自主/独立型职业锚（AU）' + (parseFloat(caq[2])/ 5).toFixed(2))},
                        {value:(parseFloat(caq[3])/ 5).toFixed(2), name:('安全/稳定型职业锚（SE）' + (parseFloat(caq[3])/ 5).toFixed(2))},
                        {value:(parseFloat(caq[4])/ 5).toFixed(2), name:('创造/创业型职业锚（EC）' + (parseFloat(caq[4])/ 5).toFixed(2))},
                        {value:(parseFloat(caq[5])/ 5).toFixed(2), name:('服务型职业锚（SV）' + (parseFloat(caq[5])/ 5).toFixed(2))},
                        {value:(parseFloat(caq[6])/ 5).toFixed(2), name:('挑战型职业锚（CH）' + (parseFloat(caq[6])/ 5).toFixed(2))},
                        {value:(parseFloat(caq[7])/ 5).toFixed(2), name:('生活型职业锚（LS）' + (parseFloat(caq[7])/ 5).toFixed(2))}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
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
                        data: caq.reverse()
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
            if (parseFloat(caq[i]) < parseFloat(caq[max + 1])&& parseFloat(caq[i]) > parseFloat(caq[second]) && parseFloat(caq[i]) >= parseFloat(caq[max]) * 0.5 && parseFloat(caq[i]) > second && i !== max + 1) {
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
            let max = parseFloat(caq[max_nums[0]]) - 1.5;
            let second = 0;
            caq.unshift(-999);
            let flag = false
            for (let i = 1; i < caq.length; i++) {
                if (parseFloat(caq[i]) < max && parseFloat(caq[i]) > parseFloat(caq[second]) && parseFloat(caq[i]) >= max * 0.5 ) {
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
        }
    }

    getCAQDes(value) {
        const headers = ['技术/职能型职业锚（TF）', '管理型职业锚（GM）', '自主/独立型职业锚（AU）', '安全/稳定型职业锚（SE）', '创造/创业型职业锚（EC）', '服务型职业锚（SV）', '挑战型职业锚（CH）', '生活型职业锚（LS）'];
        const text = [
            '<p> 如果你的职业锚是技术/职能型，你始终不肯放弃的是在专业领域中展示自己的技能，并不断把自己的技术发展到更高层次的机会<br/>你希望通过施展自己的技能以获得别人的认可，并乐于接受来自专业领域的挑战，你可能愿意成为技术/职能领域的管理者，但管理本身并不能给你带来乐趣，你极力避免全面管理的职位\n' +
            '            </p>',
            '<p> 你始终不肯放弃的是升迁到组织更高的管理职位，这样你能够整合其他人的工作，并对组织中某项工作的绩效承担责任<br/>\n' +
            '                    你希望为最终的结果承担责任，并把组织的成功看做是自己的工作\n' +
            '                </p>',
            '<p>你始终不肯放弃的是按照自己的方式工作和生活，你希望留在能够提供足够的灵活性，并由自己来决定何时及如何工作的组织中<br/>\n' +
            '                你宁可放弃放弃升值加薪的机会，也不愿意丧失自己的自主独立性。为了最大程度自主和独立，你可能创立自己的公司\n' +
            '            </p>',
            '<p>你始终不肯放弃的是稳定的或终身雇佣制的职位<br/>你希望有成功的感觉，这样你才可以放松下来。你关注财务安全和就业安全。你对组织忠诚，对雇主言听计从，希望以此获得终身雇佣的承诺</p>',
            '<p>n 你始终不肯放弃的是凭借自己的能力和冒险愿望，扫除障碍，创立属于自己的公司或组织<br/>' +
            '你希望向世界证明你有能力创建一家企业，现在你可能在某一组织中为别人工作，但同时你会学习并评估未来的机会，一旦你认为机会成熟，就会尽快的开始自己的创业历程。\n</p>',
            '<p>你始终不肯放弃的是做一些有价值的事情，比如：解决环境问题、增进人与人之间的和谐、帮助他人等<br/>\n' +
            '你宁愿离开原来的组织，也不会放弃对这些工作机会的追求</p>',
            '<p>你始终不肯放弃的是去解决看上去无法解决的问题，战胜强硬的对手或克服面临的困难<br/>\n' +
            '对你而言，职业的意义在于允许你战胜不可能的事情</p>',
            '<p>你始终不肯放弃的是平衡并整合个人的、家庭的和职业的需要<br/>\n' +
            'n 你希望生活中的各个部分能够协调统一向前发展，因此你希望职业有足够的弹性允许你来实现这种整合</p>'
        ]
        let result = ''
        for (let key in value) {
            result += '<b>' + headers[value[key]] + '</b><br/>' + text[value[key]] + '<br/>'
        }
        return {__html:result}
    }
}

export default App
