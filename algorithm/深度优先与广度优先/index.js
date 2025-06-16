const graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"],
};

/**
 *
 * @param {{[key: string]: string[]}} graph
 * @param {string} start
 * @param {new Set()} visited
 * @description DFS(Depth-First Search)，深度优先搜索， 是一种图遍历算法，沿着每一条分支尽可能深入再回溯，使用集合 visited 跟踪访问过的节点，若无记载在集合中，则进行递归访问该节点的书属性值
 */
function dfs(graph, start, visited) {
  // 新增开始的节点
  visited.add(start);
  // 遍历开始节点在对象中对应的属性值
  for (const item of graph[start]) {
    // 判断当前 item 值是否已被记录，若无，则进行递归
    if (!visited.has(item)) {
      dfs(graph, item, visited);
    }
  }
}

// 测试
const curSet = new Set();
dfs(graph, "A", curSet);
console.log("深度优先", curSet);

/**
 *
 * @param {{[key: string]: string[]}} graph
 * @param {string} start
 * @returns new Set()
 * @description BFS(Breadth-First Search)，广度优先，是一种图遍历算法，使用队列 queue 逐层访问节点，接着使用集合 visited 跟踪访问过的节点，并最后返回集合
 */
function bfs(graph, start) {
  // 声明保存节点的队列数组
  const queue = [];
  // 将第一个节点存入数组尾端
  queue.push(start);
  // 声明集合
  const visited = new Set([...queue]);
  // 进行 while 循环，判断队列 queue 数组是否有长度
  while (queue.length > 0) {
    // 去除队列数组的第一个元素
    const node = queue.shift();
    // 遍历当前元素在 graph 对象中对应的属性值
    for (const item of graph[node]) {
      // 判断当前 item 值是否被记录，若未被记录，则进行集合以及队列新增 item 的操作
      if (!visited.has(item)) {
        visited.add(item);
        queue.push(item);
      }
    }
  }
  return visited;
}

// 测试
// const curSet = bfs(graph, "A");
// console.log("广度优先", curSet);
