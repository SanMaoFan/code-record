## 场景

在日常开发中，有些文件不想让用户在浏览器中直接预览，而是直接下载到用户本地，例如：图片、pdf 等。

## 实现

在服务器端，设置文件的相应头，告诉浏览器这是一个附件，浏览器会自动下载该文件，关键的相应头为： `Content-Disposition`,其作为消息主题的标头（HTTP 场景）时，默认值为 `inline`，表示响应的内容体会以页面的一部分或者整个页面的形式展示，或者选用 `attachment`，该值表示响应的内容应该下载到本地，大多数浏览器会呈现一个“保存为”的对话框，然后还可以在 `attachment` 后添加一个 `filename` 值，标识下载该文件时的名称。

```js
  // 默认值
  Content-Disposition: inline
  // 下载文件形式
  Content-Disposition: attachment
  // 下载文件形式，并指定下载的文件名
  Content-Disposition: attachment; filename="test.jpg"
```

可参考 nginx 根据实际情况配置响应头：[nginx,文件下载,预览,防止浏览器下载时直接打开,防止预览时直接下载文件,解决 nginx 谷歌浏览器不支持下载问题](https://www.cnblogs.com/owenzhou/p/5325570.html)
