import { Platform, StatusBar, NativeModules, Dimensions } from "react-native";

const { StatusBarManager } = NativeModules;

const WINDOW_DIMENSIONS = Dimensions.get("window");

export const WINDOW_WIDTH = WINDOW_DIMENSIONS.width;
export const WINDOW_HEIGHT = WINDOW_DIMENSIONS.height;

export const STATUS_BAR_HEIGHT =
  "android" === Platform.OS ? StatusBar.currentHeight : StatusBarManager.HEIGHT;

// ios 平台中，状态栏默认是沉浸式，View 的内容会从屏幕顶部开始绘制，如果不行处理，就会被状态栏覆盖。因此可以手动获取状态栏的高度。
// ios 环境专属方法
StatusBarManager.getHeight((statusBarHeight) => {
  console.log("ios 环境下状态栏高度为：", statusBarHeight);
});

// 在 android 平台，状态栏默认不是沉浸式的
<StatusBar translucent={true} backgroundColor="transparent"></StatusBar>;
