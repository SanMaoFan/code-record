## 场景

用 ProFormSelect 配和 request 属性以及 showSearch 属性使用时可能出现多次搜索（实现下拉框展示公司列表，并结合搜索功能的类似场景），可能导致下拉框每输入一次字符便进行一次搜索

## 解决方案

可设置 fetchDataOnSearch 为 false 避免多次搜索，参考地址：https://github.com/ant-design/pro-components/issues/2527
