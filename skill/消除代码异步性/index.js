function getUser() {
    return fetch('http://localhost:5500/my.json')
}

function m1() {
    return getUser()
}

function m2() {
    return m1()
}

function m3() {
    return m2()
}

function main() {
    const user = m3()
    console.log(user)
}

function run(func) {
    // 保存数据
    let cache = []
    let i = 0
    // 保存原来的环境
    const _originalFetch = window.fetch
    // 改动环境
    window.fetch = function (...args) {
        let cacheVal = cache[i]
        // 有缓存
        if (cacheVal) {
            if (cacheVal.status === 'fulfilled') {
                return cacheVal.data
            } else if (cacheVal.status === 'rejected') {
                throw cacheVal.err
            }
        }
        const result = {
            status: 'pending',
            data: null,
            err: null
        }
        cache[i++] = result
        // 1、发送真实请求
        const prom = _originalFetch(...args).then(resp => resp.json()).then(res => {
            result.status = 'fulfilled'
            result.data = res
        }, err => {
            result.status = 'rejected'
            result.err = err
        })
        // 2、报错
        throw prom
    }
    try {
        func()
    } catch (err) {
        // 什么时候引发重新执行 func
        if (err instanceof Promise) {
            const reRun = () => {
                i = 0
                func()
            }
            err.then(reRun, reRun)
        }
    }
}

run(main)