'use strict';

const pAny = require('p-any');
const unless = require('koa-unless');
const verify = require('./verify');
const getSecret = require('./get-secret');
const resolveAuthHeader = require('./resolvers/auth-header');
const resolveCookies = require('./resolvers/cookie');

module.exports = (opts = {}) => {
  // 解构传入的参数
  // debug: 是否为调试开发环境
  // getToken: 由用户提供获取 token 的方法
  // isRevoked：检查 token 是否已失效的函数，其相关的参数分别为：ctx(传递给中间件的 ctx 对象)、decodedToken(令牌的内容)、token(token)、Promise（如果 token 未失效，则 promise 必须返回 false，否则（promise 返回 true 或者错误）令牌表示失效）
  // key: 用于解析 token 的密钥，该数据会绑定在 ctx.state 属性上
  // passthrough：用于设置不需要验证 token，直接进行到下一步
  // tokenKey：若传入该选项，那么在找到有效 token 时，会将原始 token 挂在 ctx.state[opts.tokenKey] 属性上，并提供给后续的中间件使用
  const { debug, getToken, isRevoked, key = 'user', passthrough, tokenKey } = opts;
  // 定义获取 token 的方法数组
  const tokenResolvers = [resolveCookies, resolveAuthHeader];

  if (getToken && typeof getToken === 'function') {
    tokenResolvers.unshift(getToken);
  }

  const middleware = async function jwt (ctx, next) {
    let token;
    // 使用定义好的方法获取 token，使用 find 方法是为了当获取到 token 时，直接退出该数组遍历
    tokenResolvers.find(resolver => token = resolver(ctx, opts));

    // 向客户端抛出异常
    if (!token && !passthrough) {
      ctx.throw(401, debug ? 'Token not found' : 'Authentication Error');
    }

    // 获取加密 token 的密钥
    let { state: { secret = opts.secret } } = ctx;

    try {
      if (typeof secret === 'function') {
        // getSecret 方法内部时根据传入的 token 来获取颁布 token 时的 payload 数据，而 secret 方法会接收两个参数，分别为 payload.header 和 payload.payload
        secret = await getSecret(secret, token);
      }

      if (!secret) {
        throw new Error('Secret not provided');
      }

      // 若传入的 secret 参数为数组，则进行 token 验证的遍历，这里使用到了 p-any 插件，其内部实际上是使用了 promise.any 方法，接收一个 promise 数组形式的参数，当任意一个 promise 成功返回，则直接返回成功的 promise ；若全部 promise 执行失败，则返回一个失败的 promise 和 AggregateError 类型的实例，它是 Error 的一个子类，用于把单一的错误集合在一起
      let secrets = Array.isArray(secret) ? secret : [secret];
      const decodedTokens = secrets.map(async s => await verify(token, s, opts));

      const decodedToken = await pAny(decodedTokens)
        .catch(function (err) {
          if (err instanceof pAny.AggregateError) {
            for (const e of err) {
              throw e;
            }
          } else {
            throw err;
          }
        });

      if (isRevoked) {
        const tokenRevoked = await isRevoked(ctx, decodedToken, token);
        if (tokenRevoked) {
          throw new Error('Token revoked');
        }
      }

      ctx.state[key] = decodedToken;
      if (tokenKey) {
        ctx.state[tokenKey] = token;
      }

    } catch (e) {
      if (!passthrough) {
        const msg = debug ? e.message : 'Authentication Error';
        ctx.throw(401, msg, { originalError: e });
      } else {
        //lets downstream middlewares handle JWT exceptions
        ctx.state.jwtOriginalError = e;
      }
    }

    return next();
  };

  middleware.unless = unless;
  return middleware;
};
