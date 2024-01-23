// 当前存在的问题，如果在暂停时，某一个任务还没有执行完，再次执行时，其任务会再一次执行，主要问题在于，当while中，有任务执行的时间过长，从而还无法判断其 isRunning 是否被取消，所以，还是要试试其他方案，例如发布订阅
function processTasks(...tasks) {
    // 判断队列是否在执行中
    let isRunning = false
    // 存放任务执行结果的数组
    const result = []
    // 当前执行任务的索引
    let i = 0
    return {
        start() {
            return new Promise(async (resolve, reject) => {
                try {
                    // 防止多次开启执行操作
                    if (isRunning) return
                    isRunning = true
                    // 依次执行任务
                    while (i < tasks.length) {
                        console.log(`${i} - 任务开始`)
                        result.push(await tasks[i]())
                        console.log(`${i} - 任务结束`)
                        i++
                        if (!isRunning) return
                    }
                    // 所有任务均已完成
                    isRunning = false
                    resolve(result)
                } catch (err) {
                    console.log(`出现错误,此时 i 为 ${i}`, err)
                    result.push({ error: err })
                    isRunning = false
                    if (i < tasks.length) {
                        i++
                    }
                    reject('出错了')
                    return
                }
            }).catch(err => { console.log('内部捕获错误', err); throw err })
        },
        pause() {
            if (i < tasks.length && isRunning) {
                i++
            }
            isRunning = false
        }
    }

}


// 测试
const tasks = []
for (let i = 0; i < 6; i++) {
    // 捕获错误测试
    // if (i == 3) {
    // tasks.push(() => { throw '测试报错' })
    // } else {
    tasks.push(() =>
        new Promise(resolve => {
            setTimeout(() => resolve(i), 2000)
        })
    )
    // }

}

const processFn = processTasks(...tasks)

setTimeout(() => {
    console.log('开始执行')
    processFn.start()
}, 1000)

setTimeout(() => {
    console.log('暂停一下')
    processFn.pause()
    setTimeout(() => {
        console.log('再次开始')
        processFn.start().then(data => {
            console.log('最终的结果', data)
        }).catch(err => {
            console.log('外部捕获到错误')
            setTimeout(() => {
                console.log('继续剩下的任务')
                processFn.start().then(data => console.log('最后的结果', data))
            }, 2000)
        })
    }, 1000)
}, 4000)

