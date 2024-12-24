import axios from "axios";

/**
 *
 * @param {*} concurrency 最大请求并发数
 * @returns
 */

const requestQueue = (concurrency = 6) => {
  const queue = [];
  let current = 0;

  function dequeue() {
    while (current < concurrency && queue.length) {
      current++;
      // 取出队列第一个请求
      const requestFn = queue.shift();
      // 执行请求
      requestFn()
        .then(() => {
          // 成功的回调
        })
        .catch((err) => {
          console.log("失败的回调");
        })
        .finally(() => {
          // 请求处理完的回调
          current--;
          // 继续执行队列中的请求
          dequeue();
        });
    }
  }

  return (request) => {
    queue.push(request);
    dequeue();
  };
};

// 测试
const enqueue = requestQueue(6);

for (const i = 0; i < 100; i++) {
  enqueue(() => axios.get("/apis/test" + i));
}
