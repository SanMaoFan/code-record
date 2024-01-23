/**
 * @description 发出请求，返回 Promise，当请求失败时，可进行重试，如果限定重试次数内依旧没有结果，则退出
 * @param {string} null 请求地址
 * @param {number} maxCount 最大重试次数
 */

function request(url, maxCount = 5) {
    /**
     * 以下 then 判断代码是防止某些不符合项目情况的 http 状态码进入 resolve，具体可从 mdn 上得知这个问题：
     * 当接收到一个代表错误的 HTTP 状态码时，从 fetch() 返回的 Promise 不会被标记为 reject，即使响应的 HTTP 状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve（如果响应的 HTTP 状态码不在 200 - 299 的范围内，则设置 resolve 返回值的 ok 属性为 false），仅当网络故障时或请求被阻止时，才会标记为 reject。
     *  */
    return fetch(url).then(res => res.status !== 200 ? Promise.reject(res.statusText) : Promise.resolve(res)).catch(err => maxCount > 0 ? request(url, --maxCount) : Promise.reject(err))
}

// 请求
// 测试地址 http://asdfas.asdfa3432sdf.com/todos
// http://localhost:5500/ee.json => 请求本地不存在的文件
request('http://localhost:5500/README.md').then(res => console.log('成功的请求', res)).catch(err => console.log('超过重试次数，请求失败', err))