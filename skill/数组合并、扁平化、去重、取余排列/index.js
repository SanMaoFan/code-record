let arr1 = [1, [2, 4], [44], [22, 21],]
let arr2 = [2, [6], [55], [33, [32, 31]]]
function sortArr(arr1, arr2) {
    // 获取数组扁平化
    const flat = (sourceArr) => sourceArr.flat(Infinity)
    let newArr1 = flat(arr1)
    let newArr2 = flat(arr2)
    // 合并、去重、排序数组
    let newArr = new Set([...newArr1, ...newArr2].sort((a, b) => a - b))
    // 进行数组新排列
    let current = -1
    let tmp = -1
    let result = []
    for (let i of newArr) {
        let num = Math.floor(i / 10)
        if (num !== tmp) {
            tmp = num
            ++current
            result.push([])
            result[current].push(i)
        } else {
            result[current].push(i)
        }
    }
    return result
}