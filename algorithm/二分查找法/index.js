/**
 *
 * @description 二分搜索适用于已排序的数组，通过逐步缩小查找范围来定位目标值；具体做法是先初始化左右边界，接着计算中间索引，比较中间元素与目标值，然后通过比对调整左右边界，缩小查找范围，直到找到目标值或查找范围为空
 * @param {number[]} arr 要查找的有序数组
 * @param {number} target 要查找的目标值
 * @returns 找到则返回目标值在数组中对应的索引，若找不到，则返回 -1
 */
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (target === arr[mid]) {
      return mid;
    } else if (target < arr[mid]) {
      right = mid - 1;
    } else if (target > arr[mid]) {
      left = mid + 1;
    }
  }
  return -1;
}

console.log(binarySearch([12, 16, 18, 22, 27, 33, 35, 40, 49, 50], 27));
