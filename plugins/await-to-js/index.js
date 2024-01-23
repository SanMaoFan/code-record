/**
 * @param { Promise } promise  - 传入的 promise 对象
 * @param { Object= } errorExt - 传入的错误信息
 * @return { Promise }
 */
export function to (promise, errorExt) {
  return promise
    // 若传入的 promise 的 resolve 有数据返回，则最后返回一个数组，第一个元素为 null，代表无错误
    .then(data => [null, data])
    // 而当 promise 抛出错误时，先判断用户用户是否有传入 errorExt 对象，有的话，使用 Object.assign 进行合并，从而包含用户传入的错误对象数据
    .catch(err => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt);
        return [parsedError, undefined];
      }

      return [err, undefined];
    });
}

export default to;