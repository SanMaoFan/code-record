function Chain(name) {
    // 定义要执行的的函数队列
    const queue = []

    // Chain函数第一次执行触发的方法
    queue.push(() => {
        console.log(`Chain first trigger -- ${name}`)
    })

    // 执行的方法
    function doSomething(action) {
        queue.push(() => console.log(`action trigger -- ${action}`))
        return this
    }

    // 过渡时间
    function wait(time) {
        queue.push(() => new Promise(resolve => {
            setTimeout(resolve, time * 1000)
        }))
        return this
    }

    // 头部过渡时间
    function waitFirst(time) {
        queue.unshift(() => new Promise(resolve => {
            setTimeout(resolve, time * 1000)
        }))
        return this
    }

    // 执行函数队列
    async function execute() {
        for (let i of queue) {
            await i()
        }
        return this
    }

    return {
        do: doSomething,
        wait,
        waitFirst,
        execute
    }

}


// 测试用例

// Chain('第一').do('do方法').wait(3).waitFirst(2).do('哈哈哈哈哈').wait(1).do('嘿嘿嘿').wait(2).do('结束').execute()

// Chain('第一').do('哈哈哈哈哈').execute()

