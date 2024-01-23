## await-to-js

### 作用

捕获 promise 异步方法的抛出错误，常规使用 try-catch 无法捕获 Promise 发生的错误，使用 async await 方案便可能捕获，当前该插件提供另一种思路

### 用法

```
import to from 'await-to-js';
// 如果使用 CommonJS (i.e NodeJS environment) 方案引入该插件，则应该使用以下方法声明:
// const to = require('await-to-js').default;

async function asyncFunctionWithThrow() {
  const [err, user] = await to(UserModel.findById(1));
  // 当判断 user 变量为 false 时，则代表返回的数据有错误
  if (!user) throw new Error('User not found');

}

```
