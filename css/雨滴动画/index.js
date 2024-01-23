const COUNT = 60
let scene = document.querySelector('.scene')
let rect = scene.getBoundingClientRect()

// 生成雨滴
const createRaindrop = () => {
    let item = document.createElement('div')
    item.className = 'raindrop'

    let size = `${Math.random() * 20 + 20}px` // 随机生成雨滴的长度
    item.style.height = size
    item.style.left = `${Math.random() * rect.width}px`  // 在场景的宽度范围内随机生成雨滴的 x 坐标位置
    item.style.top = `${rect.y - size}px` // 让雨滴初始高度生成在场景外

    // 在 js 中设置动画参数，通过随机生成的动画延迟时间和动画时长来长生不规律的雨滴下落动画
    item.style.animationName = 'drop'
    item.style.animationTimingFunction = 'linear'
    item.style.animationIterationCount = 'infinite'
    item.style.animationDelay = `${Math.random() * 1.5}s`
    item.style.animationDuration = `${0.5 + Math.random()}s`

    scene.appendChild(item)
}

let snowflakes = new Array(COUNT).fill(0)
snowflakes.forEach(createRaindrop)  // 创建一个数组，循环数组调用生成雨滴的方法