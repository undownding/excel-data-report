import raw from './rawDataProcessor'
import wrapper from './wrapper'

export default class calc {

    constructor() {}

    calc(name) {
        const headers = ['战略理解', '知识经验', '执行效率', '项目导向', '沟通能力', '团体协作', '责任意识', '情绪控制', '学习成长', '寻求改变', '成就动机']
        const rawData = new raw().getData()
        rawData.forEach(item => {
            if (item.type == 'inner'){
                item.score = new wrapper().calcByInner(item.score)
            } else { // outter
                item.score = new wrapper().calcByOutter(item.score)
            }
        })

        let self = []
        let tmp = []
        let other = []
        headers.forEach((item) => {
            other[item] = 0
        })

        // console.log(rawData)

        // 自评/他评数据
        rawData
            .filter((v => v.targetName == name && v.type == 'inner'))
            .forEach(item => {
                if (item.isSelf) {
                    self = item.score
                } else {
                    tmp.push(item.score)
                }
            })

        headers.forEach((header) => {
            for (let key in tmp) {
                let item = tmp[key]
                other[header] += parseInt(item[header])
            }
            other[header] = (other[header] / tmp.length).toFixed(2)
        })

        // 项目组评分
        tmp = []
        let outter = []
        headers.forEach((item) => {
            outter[item] = 0
        })

        rawData
            .filter(v => v.type == 'outter' && v.targetName == name)
            .forEach((item)=>{
                tmp.push(item.score)
            })

        headers.forEach(header => {
            tmp.forEach(item => {
                outter[header] += parseFloat(item[header])
            })
            outter[header] = (outter[header] / tmp.length).toFixed(2)
        })

        // 上级评分
        let up = []
        if (name !== '林曦') {
            rawData
                .filter(v => v.type == 'inner' && v.targetName == name && v.name == '林曦')
                .forEach(item => {
                    up = item.score
                })

        }

        // 同级评分
        let mate = []
        if (name !== '林曦') {
            tmp = []
            headers.forEach((item) => {
                mate[item] = 0
            })
            rawData
                .filter(v => v.type == 'inner' && v.targetName == name && !v.isSelf && v.name !== '林曦')
                .forEach(item => {
                    tmp.push(item.score)
                })

            headers.forEach(header => {
                tmp.forEach(item =>{
                    mate[header]+= parseFloat(item[header])
                })
                mate[header] = (mate[header] / tmp.length).toFixed(2)
            })
        }

        // 下级评分
        let down = []
        if (name == '林曦') {
            tmp = []
            headers.forEach((item) => {
                down[item] = 0
            })
            rawData
                .filter(v => v.type == 'inner' &&  v.name == name && !v.isSelf)
                .forEach(item => {
                    tmp.push(item.score)
                })

            headers.forEach(header => {
                tmp.forEach(item =>{
                    down[header]+= item[header]
                })
                down[header] = (down[header] / tmp.length).toFixed(2)
            })
        }

        return (
            {
                self: self, // 自评
                other: other, // 他评
                outter: outter, // 项目组评分
                up: up, //上级评分
                mate: mate, //同级评分
                down: down // 下级评分
            }
        )
    }
}