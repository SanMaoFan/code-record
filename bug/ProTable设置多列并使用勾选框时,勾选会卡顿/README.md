## 场景

在使用 @ant-design/pro-components 依赖中的 ProTable 组件开发时，如果设置的列过多，并且采用了勾选框，那么在勾选过程中可能出现卡顿的情况。

```tsx
// 主要代码如下

function ReloadTable() {


  // 勾选列
  const [selectKey ,setSelectKey] = useState()
  // 假设列有 30 列
  const columns = [
     {
      title: '商保申报方案',
      key: 'test1',
    },
     {
      title: '商保申报方案',
      key: 'test2',
    },{
      title: '商保申报方案',
      key: 'test3',
    },
     {
      title: '商保申报方案',
      key: 'test4',
    },
    ....... // 省略其他列
  ]

  return (
    <ProTable
      columns={columns}
      rowKey="id"
      rowSelection={{
        type: "checkbox",
        selectedRowKeys: selectKey,
        onChange: (selectedRowKeys) => {
          setSelectKey(selectedRowKeys);
        },
      }}
      search={{
        labelWidth: "auto",
        defaultCollapsed: true,
      }}
      dateFormatter="string"
    />
  );
}
```

当当前页数据多达一百条时，点击全选的勾选框，会导致页面卡顿两三秒后才有反应。

## 解决方案

给表格加上虚拟列表属性 **virtual**，并给表格加上 y 轴滚动高度 scroll={{ y: 高度值 }}，这样就可以解决这个问题。

```tsx
<ProTable
  virtual
  scroll={{ x: "max-content", y: 500 }}
  columns={columns}
  rowKey="id"
  rowSelection={{
    type: "checkbox",
    selectedRowKeys: selectKey,
    onChange: (selectedRowKeys) => {
      setSelectKey(selectedRowKeys);
    },
  }}
  search={{
    labelWidth: "auto",
    defaultCollapsed: true,
  }}
  dateFormatter="string"
/>
```

如果设置虚拟列表属性后，其勾选框出现遮挡其他列的问题，设置以下参数即可。

```tsx

rowSelection={{
  selections: true,
  hideSelectAll: false,
  columnWidth: 60,
  checkStrictly: false,
  fixed: true,
  type: "checkbox",
  selectedRowKeys: selectKey,
  onChange: (selectedRowKeys) => {
    setSelectKey(selectedRowKeys);
  },
}}

```
