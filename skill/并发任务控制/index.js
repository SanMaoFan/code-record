// 参考链接：https://www.bilibili.com/video/BV1ac411B7or/?spm_id_from=333.1007.tianma.1-1-1.click&vd_source=a4fd270dc286fce4c6b62f03ed3a035d

function timeout(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

class SuperTask {
    constructor(parallelCount = 2) {
        this.parallelCount = parallelCount  // 并发数量
        this.runningCount = 0 // 正在运行的任务数
        this.tasks = []  // 任务列表
    }

    add(task) {
        return new Promise((resolve, reject) => {
            this.tasks.push({
                task,
                resolve,
                reject
            })
            this._run()
        })
    }

    // 依次执行 taks 队列的所有任务
    _run() {
        while(this.runningCount < this.parallelCount && this.tasks.length) {
            const {task, resolve, reject} = this.tasks.shift()
            this.runningCount++
            task().then(resolve, reject).finally(() => {
                this.runningCount--
                this._run()
            })
        }
    }
}

const superTask = new SuperTask()

function addTask(time, name) {
    superTask.add(() => timeout(time)).then(() => {
        console.log(`任务${name}完成`)
    })
}


addTask(10000, 1) // 10000 ms 后输出，任务1完成
addTask(5000, 2) // 5000 ms 后输出，任务2完成
addTask(3000, 3) // 8000 ms 后输出，任务3完成
addTask(4000, 4) // 12000 ms 后输出，任务4完成
addTask(5000, 5) // 15000 ms 后输出，任务5完成