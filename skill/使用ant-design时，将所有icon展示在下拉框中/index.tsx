// react 环境

/**
 * 使用 ProComponent 配合 react 环境，如果 ProComponent 采用渲染 高级表格 ProTable 的 columns 属性方式渲染，那么采用以下方案
 */


// data.tsx 文件中的内容

// 引入所有的具名 icons
import * as icons from '@ant-design/icons';
// 引入默认导出的 Icon 组件
import Icon from '@ant-design/icons';




export function getColumns() {
      // 获取所有的具名变量
      const iconKeys = Object.keys(icons)
      // 过滤掉类型为 function 的变量，不然渲染时会报错
      const noFunctionList = iconKeys.filter(item => 'object' === typeof icons[item])

      return [
            {
                  title: '状态',
                  key: 'status',
                  dataIndex: 'status',
                  valueType: 'select',
                  width: 200,
                  fieldProps: {
                        options: noFunctionList.map((item, index) => {
                              return {
                                    value: index, label: item
                              }
                        }),
                        labelRender: (originNode) => (
                              <>
                                    <Icon component={icons[originNode.label]}></Icon>
                                    <span style={{ marginLeft: 8 }}>{originNode.label}</span>
                              </>
                        ),
                        optionRender: (option) => (
                              <>
                                    <Icon component={icons[option.label]}></Icon>
                                    <span style={{ marginLeft: 8 }}>{option.label}</span>
                              </>
                        ),
                  }
            },
      ]
}



// index.tsx 的内容，需要引入 data.tsx 文件
import { ProTable } from '@ant-design/pro-components'
import { getColumns } from './data'

<ProTable columns={getColumns() ...}></ProTable>
