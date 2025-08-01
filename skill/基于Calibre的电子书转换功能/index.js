const eBookConvert = require("./convert");

async function startConvert() {
  const convert = new eBookConvert({});
  const result = await convert.batchConvertFile();
  if (result) {
    console.log("转换完毕");
  } else {
    console.log("转换中断");
  }
}

startConvert();
