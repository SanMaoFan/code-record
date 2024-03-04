// 实现函数的要求：如何实现将一个数组内的数据整理为相同类型下的数据（最后效果参考图片内容）

// 数据
const testData = [
  { id: 1, name: "A", parent: null },
  { id: 2, name: "B", parent: null },
  { id: 3, name: "A", parent: 1 },
  { id: 4, name: "C", parent: 2 },
  { id: 5, name: "A", parent: 1 },
  { id: 6, name: "B", parent: 2 },
];

// 个人答案(有缺陷，在使用 parent 作为整理类型时，输出数据是错误的，当前来说，只有当整理的类型为 name时，输出数据是正确的；主要问题出在 list[j].parent === null 判断和自我思维误导上，以为数据一定需要有一个父元素，也就是以为数据一定要使用 parent 才能实现父子数据分配的情况)：
// console.log(JSON.stringify(getData(testData), null, 2));
function getData(data, type = "name") {
  const returnData = [];
  const obj = {};
  // 复制数据
  const d = JSON.parse(JSON.stringify(data));
  // 遍历数据，并将其相同类型数据设置在 obj 对象上
  d.map((e) => {
    (obj[e[type]] || (obj[e[type]] = [])).push(e);
  });
  // 循环 obj 数据
  for (let i in obj) {
    const arr = [];
    const list = obj[i];
    for (let j = 0; j < list.length; j++) {
      // 如果该项的 parent 属性为 null，说明该项为父元素
      if (list[j].parent === null) {
        const obj = {
          ...list[j],
          children: [...arr, ...list.slice(j + 1, list.length)],
        };
        returnData.push(obj);
        break;
      } else {
        arr.push(list[j]);
      }
      if (j === list.length - 1) {
        returnData.push(...arr);
        break;
      }
    }
  }
  return returnData;
}

// 出题人答案：
console.log(JSON.stringify(groupAndMerge(testData), null, 2));

function groupAndMerge(arr, fieldName = "parent") {
  // 创建一个临时对象来存储字段和对应的数组
  const tempMap = {};
  //遍历数组，根据字段名分组
  arr.forEach((item) => {
    const fieldValue = item[fieldName];
    if (!tempMap[fieldValue]) {
      //如果该字段还没有对应的数组，则初始化一个空数组
      tempMap[fieldValue] = [];
    }
    //将当前对象添加到对应字段值的数组中
    tempMap[fieldValue].push(item);
  });
  // 创建一个新数组来存储合并后的对象
  const result = [];
  // 遍历临时对象，处理每个字段值的数组
  Object.keys(tempMap).forEach((fieldValue) => {
    const group = tempMap[fieldValue];
    //如果数组中只有一个对象，则直接添加到结果数组中
    if (group.length === 1) {
      result.push(group[0]);
    } else {
      //否则，创建一个新对象，将第一个对象作为父对象，并添加children属性
      const parent = group.shift(); //取出第一个对象作为父对象
      parent.children = group; //将剩余的对象作为子对象添加到children数组中
      result.push(parent); //将父对象添加到结果数组中
    }
  });
  return result;
}
