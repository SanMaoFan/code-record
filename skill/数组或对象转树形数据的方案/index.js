// 对象转数函数
function formatToTree(ary, pid) {
    return ary.filter(item => 
        // 如果没有父 id （第一次递归的时候），将所有父级查询出来
        // 一般 item.modulePid === 0 就是最顶层，可能存在 modulePid 为空的场景
        pid === undefined ? !item.modulePid : item.modulePid === pid
        ).map(item => {
            // 通过父节点 id 查询所有子节点
            item.children = formatToTree(ary, item.moduleId)
            return item
        })
}


// eg: 