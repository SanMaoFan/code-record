const aEle = document.querySelector('.download')
const xunleiDownload = document.querySelector('.xunlei-download')
const href = 'https://wallpaper-static.cheetahfun.com/wallpaper/sites/beauty/pic1.jpg'

// 普通下载，在下载链接加上 ?response-content-type=application/octet-stream 即可下载，如果网站有权限限制则无法下载
aEle.onclick = () => {
    const a = document.createElement('a')
    a.href = `${href}?response-content-type=application/octet-stream`
    a.click()
}

// 迅雷下载
xunleiDownload.onclick = () => {
    // binary to ascii，用于将ascii字符串或二进制数据转换成一个base64编码过的字符串表示，即Base64的编码过程，常用于编码字符串。【注意】btoa不能编辑Unicode字符。
    const base64 = btoa(`AA${href}ZZ`)
    const a = document.createElement('a')
    // 迅雷有自己的下载规则，需要在下载地址前加上 thunder://
    a.href = `thunder://${base64}`
    a.click()
}