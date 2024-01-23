// 使用 canvas 像素化图片

/**
 * 思路
 * 任意创建一个工具面板，需要包含：一个 canvas 用于加载图像
 * 一个 range input 用于调整像素块大小
 */

/**
 * 功能实现分解
 * 1、获取 canvas 2D 上下文属性（context）
 * 2、加载一张图片初始化画布
 * 3、创建一个处理图像的方法 pixelateImage(size)
 *  接受参数  size // 像素块的大小
 *   处理图像构建一个新的 ImageData 重新绘制画布
 * 4、获取 range input，绑定 input 事件将滑块选择值传入 pixelateImage 方法实现像素块大小的调整
 */


// 获取 canvas 2D 上下文属性 （context）
let canvas = document.querySelector('canvas')
let context = canvas.getContext('2d')

// 加载一张图片初始化画布
let image = new Image()
image.crossOrigin = ""
image.src = "../../static/img/winter.jpg"
image.onload = () => {
    // 初始化画布
    pixelateImage(1)
}

// 创建方法 pixelateImage() 并接受参数 size(像素块的大小)
// 数据处理流程
// 获取 imageData
// 修改 imageData
// 将新的 imageData 重新设置到 canvas 上下文中
function pixelateImage(size) {
    // 获取图像的宽度和高度
    let width = image.width
    let height = image.height

    // 在画布上绘制图像，指定其尺寸为 500 x 500 像素
    context.drawImage(image, 0, 0, width, height, 0, 0, 500, 500)

    // 从画布获取图像数据
    let imageData = context.getImageData(0, 0, width, height)

    // 获取像素数据组
    let data = imageData.data
    // 循环图片的像素点
    for (let y = 0; y < height; y += size) {
        for (let x = 0; x < width; x += size) {
            var [r, g, b, a] = [0, 0, 0, 0]
            // 计算每个像素块的平均值
            for (let j = 0; j < size; j++) {
                for (let i = 0; i < size; i++) {
                    let index = ((y + j) * width + (x + i)) * 4
                    r += data[index]
                    g += data[index + 1]
                    b += data[index + 2]
                    a += data[index + 3]
                }
            }

            // 重新设置每个像素块的颜色
            let count = size * size
            let avgR = r / count
            let avgG = g / count
            let avgB = b / count
            let avgA = a / count

            for (let j = 0; j < size; j++) {
                for (let i = 0; i < size; i++) {
                    let index = ((y + j) * width + (x + i)) * 4
                    ;[data[index], data[index + 1], data[index + 2], data[index + 3]] = [avgR, avgG, avgB, avgA]
                }
            }
        }
    }
    context.putImageData(imageData, 0, 0) // 重绘画布
}


// 获取 range input 为 input 事件绑定 pixelateImage(ele.valueAsNumber) 将滑块值传入方法
let rangeEle = document.querySelector('#pixSize')
rangeEle.addEventListener('input', () => {
    let num = rangeEle.valueAsNumber
    // 如果 num = 0 会卡死浏览器，所以设置最小值为 1
    if (!num) num = 1
    pixelateImage(num)
})