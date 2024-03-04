const list = [89,23,5,1,999,4,2,7,1].sort()
const current = 89
const index = binarySearch(list, current)
console.log('索引：', index)

/**
 * @description 使用二分查找法得出要查找的元素在数组中的哪个索引下
 * @param {Array} arr 已经排序好的整数数组
 * @param {Number} num 要查找的元素
 * @returns Number
 */

function binarySearch(arr, num) {
    let begin = 0
    let end = arr.length - 1;
    let mid
    while (begin <= end) {
        mid = Math.floor((begin + end) / 2)
        // console.log('current', mid, arr[mid])
        if(arr[mid] === num){
            return mid
        }else if(arr[mid] > num){
            end = mid - 1
        }else{
            begin = mid + 1
        }
    }
    return -1
}