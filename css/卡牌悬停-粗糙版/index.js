const cardList = document.querySelectorAll('.card')

cardList.forEach((item, index) => {
    const attiI = Number(item.getAttribute('--i') )
    item.style.left = `${100 * (index + 1)}px`
    item.style.top = `${30 * Math.abs(attiI === 0 ? 0.5 : attiI) + 100}px`
    item.style.zIndex = index
    item.style.transform = `rotate(${attiI * 8}deg)`
})