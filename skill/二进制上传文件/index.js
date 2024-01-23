function uploadFile(url) {
    const file = document.querySelector('input')
    const xhr = new XMLHttpRequest()
    xhr.open('post', url)
    // 设置请求头
    xhr.setRequestHeader('Content-Type', 'application/octet-stream')
    xhr.setRequestHeader('x-ext', '.' + file.name.split('.').pop())
    xhr.send(file)
    return function () {
        xhr.abort()
    }
}