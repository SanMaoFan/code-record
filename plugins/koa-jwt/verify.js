// 使用 jsonwebtoken 的 verify 方法验证 token 有效性
const jwt = require('jsonwebtoken');

module.exports = (...args) => {
  return new Promise((resolve, reject) => {
    jwt.verify(...args, (error, decoded) => {
      error ? reject(error) : resolve(decoded);
    });
  });
};
