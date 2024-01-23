const fs = require('fs')
// 符号
const signObj = {
    // 节点
    node: '├─',
    // 连接符
    join: '│',
    // 结尾节点
    end: '└─'
}

/**
 * 
 * @param {Object} treeList 树对象
 * @param {Number} deep 当前对象的深度
 * @param {String} placeholder 占位符，主要是 | 符号，为了避免重复使用遍历，所以直接传入字符串
 * 传入的树对象格式应为：
 * [{
 *   children: [],
 *   title: ''
 * }]
 */
// 根据树对象生成一个内容，应该使用深度优先的顺序要遍历，因为每一个节点都要独占一行
function createTreeContentFile(treeList, deep = 0, placeholder = '') {
    let str = ''
    let length = treeList.length
    treeList.reduce((per, cur, index) => {
        let { title = '', children = [] } = cur
        let isEndLeaf = length === index + 1
        str += `${placeholder}${isEndLeaf ? signObj.end : index === 0 ? signObj.node : signObj.node}${title}\n`
        if (children.length > 0) {
            str += createTreeContentFile(children, deep + 1, `${placeholder + (isEndLeaf ? ' ' : signObj.join)}  `)
        }
    }, {})
    return str
}

let treeObjList = [
    {
        title: '第一',
        children: [
            {
                title: "第二",
                children: [
                    {
                        title: '第三'
                    }
                ]
            }, {
                title: '第四',
                children: [
                    {
                        title: "第五"
                    },
                    {
                        title: "第六"
                    }
                ]
            }
        ]
    }, {
        title: '第七',
        children: [

        ]
    }
]

const result = createTreeContentFile(treeObjList)

// 将内容写入 txt 并生成文件
const filePath = './treeObj.txt'
fs.writeFile(filePath, result, (err) => {
    if(err) console.log('写入内容报错', err)
})

