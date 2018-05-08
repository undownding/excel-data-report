import XLSX from 'xlsx'

// eslint-disable-next-line
const offset = 7; //题号偏移量

export default class rawDataProcessor {

    // eslint-disable-next-line
    constructor() {

    }

    getData() {

        let result = [];

        // 读取内部问卷情况
        let workbook = XLSX.readFile('assets/public/inner.xls', {type: 'binary'});
        let sheetNames = workbook.SheetNames;
        let worksheet = workbook.Sheets[sheetNames[0]];

        let json = XLSX.utils.sheet_to_json(worksheet, {header: 0, raw: true});

        for (let i = 1; i <= json.length; i++) {
            const nameCol = XLSX.utils.encode_cell({r: i, c: 29});
            const targetNameCol = XLSX.utils.encode_cell({r: i, c: 7});
            const selfCol = XLSX.utils.encode_cell({r: i, c: 6});
            const scorce = [];
            scorce.push(-1)
            for (let j = 8; j <= 27; j++) {
                const scoreCol = XLSX.utils.encode_cell({r: i, c: j});
                scorce.push(worksheet[scoreCol].v)
            }
            result.push(
                {
                    targetName: worksheet[targetNameCol].v,
                    // eslint-disable-next-line
                    isSelf: worksheet[selfCol].v == '自评',
                    type: 'inner',
                    score: scorce,
                    name: worksheet[nameCol].v
                }
            )
        }

        // 读取项目组问卷情况
        workbook = XLSX.readFile('assets/public/outter.xls', {type:'binary'});
        sheetNames = workbook.SheetNames;
        worksheet = workbook.Sheets[sheetNames[0]];
        json = XLSX.utils.sheet_to_json(worksheet, {header: 0, raw: true});

        for (let i = 1; i <= json.length; i++) {
            const targetNameCol = XLSX.utils.encode_cell({r: i, c: 6});
            const nameCol = XLSX.utils.encode_cell({r: i, c: 19});

            const scorce = [];
            scorce.push(-1);
            for (let j = 7; j <= 17; j++) {
                const scoreCol = XLSX.utils.encode_cell({r: i, c: j});
                scorce.push(parseInt(worksheet[scoreCol].v))
            }

            result.push(
                {
                    targetName: worksheet[targetNameCol].v,
                    isSelf: false,
                    type: 'outter',
                    score: scorce,
                    name: worksheet[nameCol].v
                }
            )
        }

        // 读取测评问卷情况
        workbook = XLSX.readFile('assets/public/ceping.xls', {type:'binary'});
        sheetNames = workbook.SheetNames;
        worksheet = workbook.Sheets[sheetNames[0]];
        json = XLSX.utils.sheet_to_json(worksheet, {header: 0, raw: true});


        for (let i = 1; i <= json.length; i++) {
            const nameCol = XLSX.utils.encode_cell({r: i, c: 6});
            const caq = [];
            caq.push(-1);
            for (let j = 7; j <= 46; j++) {
                const scoreCol = XLSX.utils.encode_cell({r: i, c: j});
                caq.push(parseInt(worksheet[scoreCol].v))
            }
            // {r: i, c: 47} => 这里对应3题

            const pdp = [];
            pdp.push(-1);
            for (let j = 48; j <= 77; j++) {
                const scoreCol = XLSX.utils.encode_cell({r: i, c: j});
                pdp.push(parseInt(worksheet[scoreCol].v))
            }

            result.push({
                name: worksheet[nameCol].v,
                type: 'ceping',
                high: worksheet[XLSX.utils.encode_cell({r: i, c: 47})].v,
                caq: caq,
                pdp: pdp
            })
        }

        return result
    }
}
