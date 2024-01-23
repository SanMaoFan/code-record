#!/usr/bin/env node
const whichPMRuns = require('which-pm-runs')
const boxen = require('boxen')

// 在 README.md 文档中，启动该插件的命令写在了 package.json 文件内的 scripts 下的 preinstall 属性中，preinstall 命令不同于平时开发定义的 dev、serve 命令，preinstall 命令在运行 npm install <pkg-name> 时运行，可以做到无感知的安装，并且它会在安装任何依赖包之前运行

// process 对象是一个全局变量，它提供 node 进程的有关信息，以及控制当前 node 进程。因为是全局变量，所以无需使用 require 引入
// process.argv 属性返回一个数组，这个数组包含了启动 node 进程时的命令行参数
// 一般来说 process.argv[0] 返回启动 node 进程的可执行文件所在的绝对路径
// process.argv[1] 为当前执行的 js 文件路径
// process.argv[2] 则代表要传入的其他参数，每多一个空格，那么改变 process.argv 对应的索引便可以获取到相关参数

// 例如一条命令为：node scripts/build.js web-runtime-cjs,web-server-renderer

// 那么 process.argv[0] 返回 F:\NodeJs\node.exe  (以本地安装 node 环境路径为准)
// process.argv[1] 返回 F:\Study_document\vue-resource\vue-dev\scripts\build.js  (以本地文件所在路径为准)
// process.argv[2] web-runtime-cjs,web-server-renderer

// 所以，若以 npx only-allow npm 命令为例，则 process.argv.slice(2) 应返回 ['npm']
const argv = process.argv.slice(2)
// 当 argv 长度为零时，则表示用户没有限制使用什么管理器下载插件
if (argv.length === 0) {
  console.log('Please specify the wanted package manager: only-allow <npm|cnpm|pnpm|yarn>')
  // process.exit(1) 表示终止当前进程并返回给定的 code，这里的 1 表示“未捕获的致命异常”
  process.exit(1)
}
const wantedPM = argv[0]
// 而当用户传入的包管理器不属于 npm、cnpm、pnpm、yarn 中的一种，亦是提醒用户
if (wantedPM !== 'npm' && wantedPM !== 'cnpm' && wantedPM !== 'pnpm' && wantedPM !== 'yarn') {
  console.log(`"${wantedPM}" is not a valid package manager. Available package managers are: npm, cnpm, pnpm, or yarn.`)
  process.exit(1)
}
// 获取包管理器类型和版本
const usedPM = whichPMRuns()
// process.env.INIT_CWD || process.cwd() 表示获取当前 node 流程的当前工作目录，也就是获取本地项目在设备中的地址，例如：D:\\MyWork\\project\\front\\test-vue3
const cwd = process.env.INIT_CWD || process.cwd()
const isInstalledAsDependency = cwd.includes('node_modules')
if (usedPM && usedPM.name !== wantedPM && !isInstalledAsDependency) {
  const boxenOpts = { borderColor: 'red', borderStyle: 'double', padding: 1 }
  switch (wantedPM) {
    case 'npm':
      console.log(boxen('Use "npm install" for installation in this project', boxenOpts))
      break
    case 'cnpm':
      console.log(boxen('Use "cnpm install" for installation in this project', boxenOpts))
      break
    case 'pnpm':
      console.log(boxen(`Use "pnpm install" for installation in this project.

If you don't have pnpm, install it via "npm i -g pnpm".
For more details, go to https://pnpm.js.org/`, boxenOpts))
      break
    case 'yarn':
      console.log(boxen(`Use "yarn" for installation in this project.

If you don't have Yarn, install it via "npm i -g yarn".
For more details, go to https://yarnpkg.com/`, boxenOpts))
      break
  }
  process.exit(1)
}
