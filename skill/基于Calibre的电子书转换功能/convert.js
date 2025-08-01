const fs = require("node:fs").promises;
const path = require("node:path");
const { exec } = require("node:child_process");
const readline = require("node:readline");
const { promisify } = require("node:util");

const execPromise = promisify(exec);

/**
 * @param {Object} 对象，包含以下参数
 * @param {String} inputDir 要导入的文件所在目录，字符串类型
 * @param {String} outputDir 导出的文件存放目录，字符串类型
 * @param {String} inputType 要转换的源文件格式，字符串类型
 * @param {String} outputType 要转换的目标文件格式，字符串类型
 */
class eBookConverter {
  constructor(options = {}) {
    this.options = {
      inputDir: "./inputDir", // 要导入的文件所在目录
      outputDir: "./outputDir", // 导出的文件存放目录
      inputType: ".epub", // 要转换的源文件格式
      outputType: ".mobi", // 要转换的目标文件格式
      ...options,
    };
  }

  // 可转换的类型
  _convertType = [".epub", ".mobi", ".pdf", ".html"];

  // 转换失败的文件
  _failedFilePathList = [];

  // 跳过的文件
  _skippedFilePathList = [];

  // 判断转换类型是否符合
  judgeType(type) {
    return this._convertType.includes(type);
  }

  // 恢复转换失败的文件数组
  resetFailedFilePathList() {
    this._failedFilePathList.splice(0);
  }

  // 恢复跳过的文件数组
  resetSkippedFilePathList() {
    this._skippedFilePathList.splice(0);
  }

  // 检测 Calibre 工具是否已经安装
  async checkCalibreInstalled() {
    try {
      await execPromise("ebook-convert --version");
      return true;
    } catch (e) {
      console.log(
        "\n未找到 Calibre 命令行工具，请先安装 Calibre：https://calibre-ebook.com/"
      );
      return false;
    }
  }

  // 检测目录是否存在
  async checkDirExist(dirPath) {
    try {
      await fs.access(dirPath);
    } catch (e) {
      // 不存在则创建
      await fs.mkdir(dirPath, { recursive: true });
    }
  }

  // 获取目录中的指定文件
  async getFiles(dirPath) {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    return entries
      .filter(
        (entry) =>
          entry.isFile() &&
          this.options.inputType === path.extname(entry.name).toLowerCase()
      )
      .map((entry) => path.join(dirPath, entry.name));
  }

  // 单个转换文件
  async convertFile(sourcePath, targetPath) {
    try {
      // 检测目标文件是否已经存在，避免重复创建
      try {
        await fs.access(targetPath);
        return { success: true, skipped: true };
      } catch (e) {}
      //     执行转换命令
      const command = `ebook-convert "${sourcePath}" "${targetPath}"`;
      const { stdout, stderr } = await execPromise(command);
      if (stdout) {
        console.log("\n", stdout.trim());
      }
      if (stderr) {
        console.log("\n", stderr.trim());
      }
      return { success: true, skipped: false };
    } catch (e) {
      console.error(`\n${sourcePath} 转换失败`);
      console.error("\n转换失败原因：", e.message);
      return { success: false, error: e.message };
    }
  }

  // 批量转换文件
  async batchConvertFile() {
    try {
      // 进行工具校验
      const calibreInstalled = await this.checkCalibreInstalled();
      if (!calibreInstalled) return false;
      // 判断输入输出目录是否存在
      await this.checkDirExist(this.options.inputDir);
      await this.checkDirExist(this.options.outputDir);
      // 判断转换类型是否相等
      if (this.options.inputType === this.options.outputType) {
        console.log("\n要转换的文件类型不能与目标文件类型相同！");
        return false;
      }
      //  判断转换类型是否符合
      if (!this.judgeType(this.options.inputType)) {
        console.log(
          "\n源文件的类型不符合转换类型要求，仅支持 epub、mobi、pdf、html 类型，仅可输入 .epub、.mobi、.pdf、.html 格式"
        );
        return false;
      }
      if (!this.judgeType(this.options.outputType)) {
        console.log(
          "\n目标文件类型不符合转换类型要求，仅支持 epub、mobi、pdf、html 类型，仅可输入 .epub、.mobi、.pdf、.html 格式"
        );
        return false;
      }
      // 进行目录中的文件整理
      const filePaths = await this.getFiles(this.options.inputDir);
      if (0 === filePaths.length) {
        console.log("\n输入目录中没有相关文件，请检查");
        return false;
      }
      //
      console.log(
        `\n共找到${filePaths.length} 个 ${this.options.inputType} 相关文件，准备转换为 ${this.options.outputType} ...`
      );
      //   整理进度条
      const progressBar = this.createProgressBar(filePaths.length);

      //   统计文件个数
      let successCount = 0; // 转换成功的文件个数
      let failedCount = 0; // 转换失败的文件个数
      let skippedCount = 0; // 不参与转换的文件格式

      for (const filePath of filePaths) {
        const fileName = path.basename(filePath, this.options.inputType);
        const targetPath = path.join(
          this.options.outputDir,
          `${fileName}${this.options.outputType}`
        );
        const convertResult = await this.convertFile(filePath, targetPath);
        if (convertResult.success) {
          if (convertResult.skipped) {
            this._skippedFilePathList.push(filePath);
            skippedCount++;
          } else {
            successCount++;
          }
        } else {
          this._failedFilePathList.push(filePath);
          failedCount++;
        }
        console.log("\n============= 当前所有文件转换总进度 =============");
        progressBar.update(successCount + failedCount + skippedCount);
        // progressBar.close();
        console.log("\n正在进行下一份文件的转换....");
      }

      //   输出结果
      console.log("\n============= 转换结果 =============");
      console.log(`\n转换成功数量： ${successCount}`);
      console.log(`\n跳过转换数量： ${skippedCount}`);
      console.log(`\n转换失败数量： ${failedCount}`);
      console.log(`\n导出文件的目录在： ${this.options.outputDir}`);
      console.log("\n===================================");
      return successCount > 0;
    } catch (e) {
      console.error("\n转换过程中发生错误！", e.message);
      // progressBar.close();
    } finally {
      if (this._failedFilePathList.length) {
        console.log(
          "\n转换失败的文件包含：\n",
          this._failedFilePathList.join("\n")
        );
      }
      if (this._skippedFilePathList.length) {
        console.log(
          "\n跳过的文件包含：\n",
          this._skippedFilePathList.join("\n")
        );
      }
      this.resetFailedFilePathList();
      this.resetSkippedFilePathList();
      process.exit();
    }
  }

  // 进度条展示
  createProgressBar(total) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    return {
      update: (cur) => {
        const percent = Math.round((cur / total) * 100);
        const bar = "█".repeat(percent / 2) + " ".repeat(50 - percent / 2);
        // rl.cursorTo(0); // 总会报错
        // 如果开头不加 \n 换行符号，则打印时会出现多个进度条在一起的情况
        rl.write(`\n[${bar}] ${percent}% (${cur}/${total})`);
      },
      close: () => {
        rl.close();
      },
    };
  }
}

module.exports = eBookConverter;
