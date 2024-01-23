/**
 * js 中整数范围可以在控制台输入 Number.MAX_SAFE_INTEGER 可以得知整数范围，虽然可以用 BigInt 来实现，但以下使用其他方案实现
 */

/**
 * 腾讯面试题
 * 两个超过整数存储范围的大整数求和
 * @param {String} a
 * @param {String} b
 */


// 传入字符串参数
function sum(a, b) {
    // 使用字符串来存储结果并返回
    let result = ''
    // 将字符串参数对齐，因为输入参数的字符串长度会不同，所以将较短的字符串使用 0 补齐长度
    const len = Math.max(a.length, b.length)
    a = a.padStart(len, '0')
    b = b.padStart(len, '0')

    // 保存进位的数据
    let carry = 0

    // 将字符串从后往前循环
    for (let i = len - 1; i >= 0; i--) {
        // 将参数对应索引的数字进行相加处理
        // 将字符串转为数字并得到相加的结果
        const n = +a[i] + +b[i] + carry

        // 如果相加的数据大于 10，则更新进位 carry 变量的数据
        carry = Math.floor(n / 10)

        // 将结果放到 result 中
        result = (n % 10) + result

    }
    // 最后判断进位是否有值，有则在 result 前加上 1
    result = carry ? ('1' + result) : result
    return result

}

console.log(sum('145513452345234523452345234523', '24523452425352351235234523'))