最近在 csdn 看技术文章时，在其网站控制台尝试调试代码，但是在控制台中使用 console.log 却不会有任何输出。

![控制台无反应](/static/img/在chrome控制台使用console无任何输出/01.jpg)

但是在其他网站下的控制台却可以正常输出内容。原本以为是否该网站浏览器过滤掉了 console.log 的打印，但是在打开 Default levels 属性时，其 info 选项是勾选上的。

![info选项是勾选的](/static/img/在chrome控制台使用console无任何输出/02.jpg)

虽然其 warnings、errors 选项也是勾选的，可是在控制台中打印 console.warn 和 console.error 却也无法显示出来。

![warn、error也无法输出](/static/img/在chrome控制台使用console无任何输出/03.jpg)

最后在网上搜索到解决方案：

![解决方案](/static/img/在chrome控制台使用console无任何输出/04.jpg)

> Make sure you are using the browser’s console (Ctrl + Shift+ J in Chrome) and not the fake console that FCC provides.

一般情况下是 F12 键打开控制台的，但以上方案中，提示在 Chrome 使用 Ctrl + Shift+ J 组合键方式打开控制台，以避免使用 FCC 提供的虚假控制台。

使用以上方案，第一次可能依旧无法正常输出 console，多按几次组合键便正常了。

![正常输出](/static/img/在chrome控制台使用console无任何输出/05.jpg)
