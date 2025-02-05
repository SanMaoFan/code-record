/**
 *
 * @description 快速排序 -- js 版本，使用递归方案将数组进行从小到大进行排序
 * @param {number []} arr
 * @returns
 */

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr; // 数组长度小于等于 1，表示没有元素需要排序
  }

  const pivot = arr[Math.floor(arr.length / 2)]; // 选用中间元素作为基准
  const left = []; // 存放小于基准的元素
  const right = []; // 存放大于基准的元素
  const equal = []; // 存放相等于基准的元素

  for (let ele of arr) {
    if (ele < pivot) {
      left.push(ele);
    } else if (ele > pivot) {
      right.push(ele);
    } else {
      equal.push(ele);
    }
  }

  // 对左右数组进行递归的快速排序，并将结果合并
  return [...quickSort(left), ...equal, ...quickSort(right)];
}

// 测试

const array = [5, 3, 8, 4, 2, 44, 23, 12, 1, 5];
const sortedArray = quickSort(array);
console.log(sortedArray);
