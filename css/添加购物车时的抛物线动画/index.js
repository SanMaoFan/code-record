const car = document.querySelector('.car')
const btn = document.querySelectorAll('.btn')
const PLUS_SIZE = 20

btn.forEach(item => item.onclick = function () {
    const div = document.createElement('div')
    div.className = 'plus'
    div.innerHTML = `<i class="iconfont">+</i>`

    // 设置新增图标的出现位置
    const btnRect = item.getBoundingClientRect()
    // 图标出现的 x 坐标
    const left = btnRect.left + btnRect.width / 2 - PLUS_SIZE / 2
    div.style.setProperty('--left', `${left}px`)
    // 图标出现的 y 坐标
    const top = btnRect.top - PLUS_SIZE
    div.style.setProperty('--top', `${top}px`)
    // 获取购物车的位置
    const carRect = car.getBoundingClientRect()
    // 图标要到达的 x 坐标
    const x = carRect.left + carRect.width / 2 - PLUS_SIZE / 2 - left
    // 图标要到达的 y 坐标
    const y = carRect.top - PLUS_SIZE - top
    div.style.setProperty('--x', `${x}px`)
    div.style.setProperty('--y', `${y}px`)

    div.addEventListener('animationend', () => {
        div.remove()
    })

    document.body.appendChild(div)
})
