const H = 30
const W = 30

function pixel() {
    let pixelEle = document.querySelector('.pixel')
    for (let i = 0; i < W; i++) {
        for (let j = 0; j < H; j++) {
            let span = document.createElement('span')
            let random = Math.random()
            let randomFixed = random.toFixed(2)

            span.style.top= `${i * 20}px`
            span.style.left = `${j * 20}px`
            span.style.backgroundPosition = `${-j * 20}px ${-i * 20}px, center`
            span.style.animationDelay = randomFixed + 's'
            pixelEle.appendChild(span)
        }
    }
}

pixel()


