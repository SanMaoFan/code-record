const lines = document.querySelectorAll(".line");
const playBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resumeBtn = document.getElementById("resume");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const voiceSelect = document.getElementById("voices");

const synth = window.speechSynthesis;
let voices = [];
let currentIndex = 0;
let currentUtterance = null;
let isPaused = false;

// 获取所有可以使用的 TTS 语言作为下拉框，部分语音在国内网络无法播放
function populateVoices() {
  voices = synth.getVoices();
  voiceSelect.innerHTML = "";
  voices.forEach((voice, index) => {
    const opt = document.createElement("option");
    opt.value = index;
    opt.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(opt);
  });
}

// 高亮正在读取的文本
function highlightLine(index) {
  lines.forEach((line, i) => {
    line.classList.toggle("active", i === index);
  });
  // 进行滚动条移动
  lines[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
}

// 读取文本
function speakLine(index) {
  if (index >= lines.length) return;
  // 获取文本内容
  const text = lines[index].textContent;
  // 填充要读取的文本
  const utter = new SpeechSynthesisUtterance(text);
  // 获取当前该用什么语言来读取文本
  const selected = voiceSelect.value;
  // 设置读取文本的语言和速度
  if (voices[selected]) utter.voice = voices[selected];
  utter.rate = 1;

  // 监听读取开始
  utter.onstart = () => {
    // 高亮文本
    highlightLine(index);
    // 设置按钮是否可点击
    playBtn.disabled = true;
    pauseBtn.disabled = false;
    resumeBtn.disabled = true;
    stopBtn.disabled = false;
  };

  // 监听读取结束
  utter.onend = () => {
    // 当前索引 +1
    currentIndex++;
    // 如果当前索引小于总行数，则读取当前索引行文本
    if (currentIndex < lines.length) {
      speakLine(currentIndex);
    } else {
      // 重置
      resetControls();
    }
  };

  currentUtterance = utter;
  // 进行朗读
  synth.speak(utter);
}

// 重置控制，恢复按钮原先的状态
function resetControls() {
  playBtn.disabled = false;
  pauseBtn.disabled = true;
  resumeBtn.disabled = true;
  stopBtn.disabled = true;
}

// 开始按钮的点击事件
playBtn.onclick = () => {
  currentIndex = 0;
  speakLine(currentIndex);
};

// 暂停按钮点击事件
pauseBtn.onclick = () => {
  synth.pause();
  isPaused = true;
  pauseBtn.disabled = true;
  resumeBtn.disabled = false;
};

// 继续按钮点击事件
resumeBtn.onclick = () => {
  synth.resume();
  isPaused = false;
  pauseBtn.disabled = false;
  resumeBtn.disabled = true;
};

// 停止按钮点击事件
stopBtn.onclick = () => {
  synth.cancel();
  resetControls();
};

// 重新开始按钮点击事件
resetBtn.onclick = () => {
  init();
};

// 初始化
function init() {
  synth.cancel();
  currentIndex = 0;
  highlightLine(currentIndex);
}

// 监听点击行的事件
lines.forEach((line, index) => {
  line.addEventListener("click", () => {
    synth.cancel();
    currentIndex = index;
    speakLine(currentIndex);
  });
});

init();
synth.onvoiceschanged = populateVoices;
populateVoices();
