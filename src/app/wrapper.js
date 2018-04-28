export default class Wrapper {

    constructor () {
    }

    // 通过内部版评估问卷计算分值
    calcByInner(scores) {
        for (let key in scores) { scores[key] = parseInt(scores[key]) }
        let result = []
        // Ability
        result['战略理解'] = scores[6]
        result['知识经验'] = ((scores[8] + scores[16] + scores[17] + scores[18]) / 4).toFixed(2)
        result['执行效率'] = scores[7]
        result['项目导向'] = ((scores[11] + scores[19]) / 2).toFixed(2)
        // Personality
        result['沟通能力'] = ((scores[1] + scores[9] + scores[20]) / 3).toFixed(2)
        result['团体协作'] = ((scores[3] + scores[10] + scores[13]) / 3).toFixed(2)
        result['责任意识'] = ((scores[2] + scores[15]) / 2).toFixed(2)
        result['情绪控制'] = scores[14]
        // Motivation
        result['学习成长'] = scores[4]
        result['寻求改变'] = scores[5]
        result['成就动机'] = scores[12]
        // for (let key in result) { result[key] = result[key].toFixed(2)}

        return result
    }

    // 通过项目组评估问卷计算分值
    calcByOutter(scores) {
        for (let key in scores) { scores[key] = parseInt(scores[key]) }
        let result = []
        // Ability
        result['项目导向'] = ((scores[6] + scores[10]) / 2).toFixed(2)
        // Personality
        result['沟通能力'] = ((scores[1] + scores[4] + scores[11]) / 3).toFixed(2)
        result['团体协作'] = ((scores[3] + scores[5] + scores[7]) / 3).toFixed(2)
        result['责任意识'] = ((scores[2] + scores[9]) / 2).toFixed(2)
        result['情绪控制'] = scores[8]
        // for (let key in result) { result[key] = result[key].toFixed(2)}
        return result
    }

    // 计算权重
    calcWeight(rowData) {
        if (rowData.isSelf) { //自评
            return 0.2
        }
    }
}