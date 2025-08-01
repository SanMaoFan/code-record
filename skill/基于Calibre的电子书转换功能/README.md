## 项目名称

基于 Calibre 工具的电子书转换工具，在使用前，需要先前往 [Calibre 官网](https://calibre-ebook.com/) 安装软件。使用的 nodejs 版本为 18.19.1。

## 使用步骤

主要的工具函数为 convert.js 文件，入口为 index.js 文件，其中的 eBookConvert 实例可以传入一个包含四个参数的对象，四个参数都为字符串类型：

- inputDir : 要导入的文件所在目录, 默认值为 ./inputDir
- outputDir : 导出的文件存放目录，默认值为 ./outputDir
- inputType : 要转换的源文件格式，默认值为 .epub
- outputType : 要转换的目标文件格式，默认值为 .mobi

inputType 、outputType 参数可选四个值： .epub、 .mobi、 .pdf、 .html

除了以上四个参数，还可以传入其他参数值，具体要参考 [Calibre 官网](https://calibre-ebook.com/) 提供的属性内容。
