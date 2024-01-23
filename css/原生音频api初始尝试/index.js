// 参考视频： https://www.bilibili.com/list/watchlater?bvid=BV1JH4y1275k&oid=963725154

const audioEle = document.querySelector('audio')
const cvs = document.querySelector('canvas')
const ctx = cvs.getContext('2d')

// 初始化 canvas 的尺寸
function initCvs() {
    cvs.width = window.innerWidth * devicePixelRatio
    cvs.height = (window.innerHeight / 2) * devicePixelRatio
}

initCvs()

let isInit = false
let dataArray, analyser
audioEle.onplay = function() {
    if(isInit) {
        return
    }
    // 初始化
    const audCtx = new AudioContext()  // 创建音频上下文
    const source = audCtx.createMediaElementSource(audioEle)  // 创建音频源节点，节点是指音频处理的一个环节
    analyser = audCtx.createAnalyser()  // 分析器节点
    analyser.fftSize = 512
    // 创建一个数组，用于接受分析器节点产生的数据
    dataArray = new Uint8Array(analyser.frequencyBinCount)

    source.connect(analyser)
    // 输出到设备
    analyser.connect(audCtx.destination)

    isInit = true
}

// 把分析出的波形绘制到 canvas 上
function draw() {
    requestAnimationFrame(draw)
    // 清空画布
    const { width, height } = cvs
    ctx.clearRect(0, 0, width, height)
    if(!isInit) return;
    // 让分析器节点分析出数据到数组中
    analyser.getByteFrequencyData(dataArray)
    // 绘制数据
    const len = dataArray.length / 1.5
    // 获取条的宽度, 除以 2 是为了画对称图形
    const barWidth = width / len / 2
    ctx.fillStyle = '#f90'
    for(let i = 0; i< len; i++) {
        const data = dataArray[i] // 因为是 8 位的数字，所以值一定是小于 256 的
        const barHeight  = (data / 255) * height
        // x 坐标，从画布中间开始画，为了对称
        const x1 = i * barWidth + width / 2 // 右图
        const x2 = width / 2 - (i + 1) * barWidth // 左图
        // y 坐标
        const y = height - barHeight
        ctx.fillRect(x1, y, barWidth - 2, barHeight)
        ctx.fillRect(x2, y, barWidth - 2, barHeight)
    }
}

draw()