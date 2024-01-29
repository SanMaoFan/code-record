// index.ts  
// 项目如果没有 tsconfig.json 文件，使用命令 tsc --init 初始化项目再进行其他操作 ;使用 tsc -w 命令开启 typescript 文件的实时编译，便可以保证 html 可以正常引入 index.js

/**
  * 压缩的图片的逻辑顺序：
  * 1、获取到文件对象
  * 2、将文件对象转换为 base64 格式
  * 3、创建一个新图片对象并存放 2 步骤中的 base64 数据，这一步中可以获取到图片的宽高
  * 4、创建一个 canvas 对象，将图片内容、宽高数据传入 canvas，在 canvas 中便可以去调解图片的质量
**/

interface Options {
  file: File // 文件对象
  quality?: number // 0.1 - 1 图片质量范围
  success?: (base64: string) => void  // 回调
}

//
class CompressImg {
  options: Options
  // 文件读取器
  fileReader = new FileReader()

  constructor(options: Options) {
    this.options = options
    this.createBase64()
  }
  // 将文件数据转为 base64 格式
  createBase64() {
    // 监听完成的回调
    this.fileReader.onload = (e) => {
      // console.log(e.target?.result) // base64 数据
      this.compress(e.target?.result as string)
    }
    this.fileReader.readAsDataURL(this.options.file) // 传入 file 对象可得到 base64 数据
  }
  // 压缩图片
  compress(url: string) {
    const img = new Image()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    img.src = url
    // 获取图片数据并设置到 canvas 中
    img.onload = () => {
      // 设置 canvas 的宽高
      canvas.width = img.width
      canvas.height = img.height
      // 将图片画到 canvas 中
      ctx?.drawImage(img, 0, 0, img.width, img.height)
      // 将 canvas 转为 base64
      const base64 = canvas.toDataURL(this.options.file.type, this.options.quality)
      // 将数据传递给回调
      this.options.success?.(base64)
    }
  }
}

// 获取 file 节点
const file = document.querySelector('#file') as HTMLInputElement
// 获取文件对象数据
file.addEventListener('change', (e) => {
  const target = e.target as HTMLInputElement
  const fileObj = target.files?.[0]
  if (fileObj) {
    new CompressImg({
      file: fileObj,
      quality: 0.5,
      success: (base64) => {
        console.log('压缩后的内容', base64)
        // 将内容输出到页面上
        const img = document.createElement('img')
        img.src = base64
        document.body.appendChild(img)
      }
    })
  }
})
