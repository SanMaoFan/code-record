<template>
  <div class="container">
    <div class="videoContent">
      <video class="video" ref="videoRef" muted autoplay></video>
      <div v-show="showCut" class="cut"></div>
    </div>
    <div class="btn-group">
      <el-button @click="openCamera">打开摄像头</el-button>
      <el-button @click="cutImage">拍照</el-button>
      <el-button @click="closeVideo">关闭摄像头</el-button>
    </div>

    <div class="imageContainer">
      <img :src="imageUrl" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
// 设置视频元素
const videoRef = ref();
const showCut = ref(false);
// 视频内容
let videoStream = null;
// 设置图片内容
const imageUrl = ref();

// 打开摄像头
async function openCamera() {
  videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
  videoRef.value.srcObject = videoStream;
  showCut.value = true;
}

// 拍照
function cutImage() {
  const canvas = document.createElement("canvas");
  canvas.width = 275;
  canvas.height = 360;
  canvas
    .getContext("2d")
    .drawImage(videoRef.value, 182, 0, 275, 360, 0, 0, 275, 360);
  const base64 = canvas.toDataURL("image/jepg", 1);
  imageUrl.value = base64;
}

// 关闭视频
function closeVideo() {
  videoRef.value.srcObject = null;
  videoStream?.getTracks().forEach((track) => {
    track.stop();
  });
  showCut.value = false;
}
</script>

<style scoped>
.videoContent {
  position: relative;
  width: 750px;
  height: 276px;
  background: black;
}

.video {
  width: 100%;
  height: 100%;
}

.cut {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 272px;
  width: 182px;
  border: 2px solid red;
}

.btn-group {
  margin: 16px 0;
}
</style>
