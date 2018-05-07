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

    calcCAQ(caq, high) {
        let sp = high.split("|");
        for (let key in sp) { // add 4
            caq[parseInt(sp[key])] = parseInt(caq[parseInt(sp[key])]) + 4
        }


        let tmp = [];
        for (let i = 1; i <= 8; i++) {
            tmp[i] = 0;
            for (let j = 0; j < 33; j += 8) {
                tmp[i] += parseInt(caq[i + j])
            }
        }

        return tmp
    }

    calcPDP(pdp) {
        let tmp = [];
        tmp.push(parseInt(pdp[5]) + parseInt(pdp[10]) + parseInt(pdp[14]) + parseInt(pdp[18]) + parseInt(pdp[24]) + parseInt(pdp[30]));
        tmp.push(parseInt(pdp[3]) + parseInt(pdp[6]) + parseInt(pdp[13]) + parseInt(pdp[20]) + parseInt(pdp[22]) + parseInt(pdp[29]));
        tmp.push(parseInt(pdp[2]) + parseInt(pdp[8]) + parseInt(pdp[15]) + parseInt(pdp[17]) + parseInt(pdp[25]) + parseInt(pdp[28]));
        tmp.push(parseInt(pdp[1]) + parseInt(pdp[7]) + parseInt(pdp[11]) + parseInt(pdp[16]) + parseInt(pdp[21]) + parseInt(pdp[26]));
        return tmp
    }

    // 计算权重
    calcWeight(rowData) {
        if (rowData.isSelf) { //自评
            return 0.2
        }
    }
}