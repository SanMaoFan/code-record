// 以下代码复制于 koa-unless(https://github.com/Foxandxss/koa-unless/tree/koa-v2) 插件 koa-v2 分支上

/**
 * Koa unless middleware. Attach to any middleware and configure it to prevent/permit the
 * middleware in question to be executed.
 * 
 * Koa unless 中间件，附加到任何中间件并配置它以防止/允许中间件问题将被执行
 *
 * @module koa-unless
 */

'use strict';
var url = require('url');

/** Creates a wrapper middleware that verifies if the original middleware should be skipped. */
/** 创建一个封装的中间件，用于验证是否应该跳过原先的中间件 */
// options 对象内有关的属性如下:
/**
 * method: 字符串或者数组类型
 * path: 字符串、字符串数组、正则类型数组
 * ext: 文件后缀名，类似 .js  .css
 * custom: 自定义函数，如果 options 对象就是一个函数，那么会创建新对象，并将函数绑定在 custom 属性上
 * useOriginalUrl: 布尔值类型，默认是 true，如果为 false，则进行 ctx.url 的匹配，而不是对 ctx.originalUrl 匹配
 */

module.exports = function (options) {
  var originalMiddleware = this;

  // If a custom function was passed directly, creates a new object literal that holds it as a property called custom.
  // 如果传入的是一个自定义函数，则创建一个对象并创建 custom 属性，且将自定义函数赋值在 custom 属性上
  var opts = typeof options === 'function' ? { custom: options } : options;
  opts.useOriginalUrl = (typeof opts.useOriginalUrl === 'undefined') ? true : opts.useOriginalUrl;

  // Returns the middleware that wraps the original one.
  return function (ctx, next) {
    // ctx.originalUrl 为请求原始URL，而 ctx.url 为请求 URL
    var requestedUrl = url.parse((opts.useOriginalUrl ? ctx.originalUrl : ctx.url) || '', true);

    // any match means 'skip original middleware'
    // 通过判断来确定是否跳过中间件，若通过某一项检测，则使用 next 执行后续的中间件，否则执行绑定了 unless 的中间件
    if (matchesCustom(ctx, opts) || matchesPath(requestedUrl, opts) ||
      matchesExtension(requestedUrl, opts) || matchesMethod(ctx.method, opts)) {
      return next();
    }

    return originalMiddleware(ctx, next);
  };
};

/**
 * Returns boolean indicating whether the custom function returns true.
 *
 * @param ctx - Koa context
 * @param opts - unless configuration
 * @returns {boolean}
 */
// 判断是否根据自定义函数返回的布尔值来返回状态
function matchesCustom (ctx, opts) {
  if (opts.custom) {
    return opts.custom(ctx);
  }
  return false;
}

/**
 * Returns boolean indicating whether the requestUrl matches against the paths configured.
 *
 * @param requestedUrl - url requested by user
 * @param opts - unless configuration
 * @returns {boolean}
 */
// 判断 path 属性，可通过字符串或者正则形式对该属性进行验证，该方法用于判断请求路径是否允许跳过检验
function matchesPath (requestedUrl, opts) {
  var paths = !opts.path || Array.isArray(opts.path) ?
    opts.path : [opts.path];

  if (paths) {
    return paths.some(function (p) {
      return (typeof p === 'string' && p === requestedUrl.pathname) ||
        (p instanceof RegExp && !!p.exec(requestedUrl.pathname));
    });
  }

  return false;
}

/**
 * Returns boolean indicating whether the requestUrl ends with the configured extensions.
 *
 * @param requestedUrl - url requested by user
 * @param opts - unless configuration
 * @returns {boolean}
 */
// 根据传入的 ext 属性来判断是否跳过中间件，该 ext 通常用于判断文件的后缀名
function matchesExtension (requestedUrl, opts) {
  var exts = !opts.ext || Array.isArray(opts.ext) ?
    opts.ext : [opts.ext];

  if (exts) {
    return exts.some(function (ext) {
      return requestedUrl.pathname.substr(ext.length * -1) === ext;
    });
  }
}

/**
 * Returns boolean indicating whether the request method matches the configured methods.
 *
 * @param method - method used (GET, POST, ...)
 * @param opts - unless configuration
 * @returns {boolean}
 */
// 通过判断请求方法来决定是否跳过中间件
function matchesMethod (method, opts) {
  var methods = !opts.method || Array.isArray(opts.method) ?
    opts.method : [opts.method];

  if (methods) {
    return !!~methods.indexOf(method);
  }
}
