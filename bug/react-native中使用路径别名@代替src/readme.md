## 版本

首先，使用 react-native 的版本为： 0.80.2，react 版本为： 19.1.0，node 版本为： 18.19.1

## babel.config.js 配置

```js
module.exports = {
  presets: ["@react-native/babel-preset"],
  plugins: [
    "react-native-reanimated/plugin", // 如果提示 “Cannot read property 'makeMutable' of undefined” 就需要配置，参考:https://github.com/software-mansion/react-native-reanimated/discussions/5511
    [
      "module-resolver",
      {
        root: ["./src"], // 设置根目录
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"], // 支持的文件扩展名
        alias: {
          "@": "./src", // 定义别名
        },
      },
    ],
  ],
};
```

## tsconfig.json 配置

如果是 ts 项目，则需要配置 tsconfig.json 文件。

```json
{
  "extends": "@react-native/typescript-config",
  "exclude": ["node_modules"],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

以上两个文件配置好后，需要先输入命令 `yarn start --reset-cache` 进行缓存清除，不然可能配置不生效。最后在项目中使用 @ 别名即可替代 src 路径。

```js
// 引入 src/common/styles/index.tsx 文件导出的样式
import commonStyles from "@/common/styles";

// 使用

<Text style={commonStyles.textStyle}>文字</Text>;
```

## 尝试的过程中遇到的问题

- 在 babel.config.js 文件中，一开始配置 presets 为：['metro-react-native-babel-preset']，会遇到 `node-modules/react-native/index.js 第 313 行缺少分号`，解决方案在：https://github.com/facebook/react-native/issues/50683
