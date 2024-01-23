'use strict'

// process.env.npm_config_user_agent 获取用户本地的开发环境，例如： npm/8.19.2 node/v16.14.0 win32 x64 workspaces/false

module.exports = function () {
  if (!process.env.npm_config_user_agent) {
    return undefined
  }
  return pmFromUserAgent(process.env.npm_config_user_agent)
}

function pmFromUserAgent (userAgent) {
  const pmSpec = userAgent.split(' ')[0]
  const separatorPos = pmSpec.lastIndexOf('/')
  const name = pmSpec.substring(0, separatorPos)
  // 返回使用的包管理器和版本
  return {
    name: name === 'npminstall' ? 'cnpm' : name,
    version: pmSpec.substring(separatorPos + 1)
  }
}
