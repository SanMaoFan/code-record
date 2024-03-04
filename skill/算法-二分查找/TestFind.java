import java.util.Arrays;
public class TestFind {
    public static void main(String[] args) {
        int[] arr = {89,23,5,1,999,4,2,7,1};
        Arrays.sort(arr);
        int num = 89;
        int index = binarySearch(arr, num);
        System.out.print("索引：" + index);
    }

    /**
     * @description 使用二分查找法得出要查找的元素在数组中的哪个索引下
     * @param nums 已经排序好的整数数组
     * @param num 要查找的元素
     * @return int 
     */
    public static int binarySearch(int[] nums, int num) {
        int begin = 0;
        int end = nums.length - 1;
        int mid;
        while (begin <= end) {
            mid = (begin + end) / 2; // 取中点的下标；
            // System.out.println("当前数据" + mid + "," + nums[mid]);
            if (nums[mid] == num) {
                return mid;
            } else if (nums[mid] > num) { // 说明要查找的元素在前半部分
                // end 前移
                end = mid - 1;
            } else {
                // begin 后移
                begin = mid + 1;
            }
        }
        return -1;
    }
}