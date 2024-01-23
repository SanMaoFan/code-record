/**
 * @description 在输入中文时，会直接触发输入框 input 事件，但是如果用户中文并没有输入完成，那么没必要去触发 input 事件。可以使用 compositionstart、compositionend 来得知当前是否在输入中文，并用 isStart 变量来控制是否要触发输入框的 input 事件
 * */    


let inp = document.querySelector('.input')
let isStart = false

inp.addEventListener('input', (e) => {
    if (isStart) return
    search()
})

inp.addEventListener('compositionstart', () => {
    isStart = true
    console.log('在输入中文')
})

inp.addEventListener('compositionend', () => {
    isStart = false
    console.log('中文输入完成')
    search()
})


function search() {
    console.log('触发输入框事件', inp.value)
}