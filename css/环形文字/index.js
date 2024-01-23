const TEXTELE = document.querySelector('.text')
const TEXT = TEXTELE.innerHTML
const ARR = TEXT.split("")
const DEG = 360 / (ARR.length)
TEXTELE.innerHTML = ''
ARR.forEach((item, index) => {
    const SPAN = document.createElement('span')
    SPAN.classList.add('item')
    SPAN.innerHTML = item
    SPAN.style.transform = `rotate(${(index + 1) * DEG}deg)`
    TEXTELE.appendChild(SPAN)
})