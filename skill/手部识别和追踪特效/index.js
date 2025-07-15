// 兼容写法，获取视频设备
navigator.mediaDevices.getUserMedia =
  navigator.mediaDevices.getUserMedia ||
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
console.log("window", handTrack);
// 存放手部检测的算法模型
let model;

// 原点元素
const pointerEle = document.getElementById("pointer");

//
function handDetection() {
  // 检测手部位置的边框预测结果数组
  model.detect(video).then((predictions) => {
    //   返回的数据
    //   {
    //       //  包含手部的状态；打开、关闭等；手部信息；脸部信息
    //       label: 'open',
    //       //  识别率，接近于 1 识别率越高
    //       score: 0.88,
    //       //  表示手部位置边框数据的数组，分别为 x、y、宽度、高度
    //       bbox: [100,200,300,400]
    //   }
    //  在画布上绘制边框
    //     model.renderPredictions(predictions, canvas, context, video);
    //  循环数组
    predictions.forEach((item) => {
      //   过滤只打开手的状态
      if ("open" === item.label) {
        const { bbox } = item;
        console.log("打印信息>>>", bbox);
        // 仅限单只手
        pointerEle.style.setProperty("--x", bbox[0] + "px");
        pointerEle.style.setProperty("--y", bbox[1] + "px");
      }
    });
  });
  // 使用 requestAnimationFrame 在时间间隔内检测手部
  requestAnimationFrame(handDetection);
}

// 启动视频流
function startVideo() {
  handTrack.startVideo(video).then((data) => {
    // 判断是否授权，是则进行获取摄像头的操作
    if (data.status) {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          // 将视频流放设置到元素中
          video.srcObj = stream;
          handDetection();
        });
    }
  });
}

// handTrack 的 load 方法加载手部检测模型
handTrack.load().then((loadedModel) => {
  model = loadedModel;
  startVideo();
});
