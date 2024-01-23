const circle = document.querySelector('.circle')

let availTop = 0
let availLeft = 0

function update() {
    const screenX = window.screenX
    const screenY = window.screenY

    circle.style.setProperty('--offset-x', `${availLeft - screenX}px`)
    circle.style.setProperty('--offset-y', `${availTop - screenY}px`)

    window.requestAnimationFrame(update)
}

window.requestAnimationFrame(update)