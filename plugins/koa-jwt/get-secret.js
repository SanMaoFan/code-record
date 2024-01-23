const { decode } = require('jsonwebtoken');

module.exports = async (provider, token) => {
  // 根据用户传入的 token，获取加密 token 时所用的 payload 数据，也就是，使用 jsonwebtoken 提供的 sign 方法颁布 token 时所传入的 payload 数据
  const decoded = decode(token, { complete: true });

  if (!decoded || !decoded.header) {
    throw new Error('Invalid token');
  }

  return provider(decoded.header, decoded.payload);
};
