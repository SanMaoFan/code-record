// 建议先参考文章 https://sanmaofan.github.io/2025/02/09/%E4%BD%BF%E7%94%A8node%E8%84%9A%E6%9C%AC%E6%89%B9%E9%87%8F%E5%85%8B%E9%9A%86gitee%E4%BB%93%E5%BA%93/ 比较好
const { exec } = require("child_process");
const { Request } = require("utils-lib-js");
const fs = require("fs");

// 判断当前项目中是否包含 repos 文件夹 以及 fileManagement.txt 文件，若无，则创建该文件夹或者文件
const dir = "./repos";
const txtFile = "./fileManagement.txt";

judgeFile(dir);
judgeFile(txtFile, "file");

function judgeFile(fileName, type = "dir") {
  if (fs.existsSync(fileName)) {
    console.log(`${fileName} 已存在\n`);
  } else {
    console.log(`${fileName} 不存在，正在创建\n`);
    "dir" === type ? fs.mkdirSync(fileName) : fs.writeFileSync(fileName, "");
    judgeFile(fileName, type);
  }
}

// access_token：用户授权码，在 Swagger 测试中可以拿到
const access_token = "";
const per_page = 3; // 每页获取的数量
const page = 1; // 页码

// 请求实例化
const request = new Request("https://gitee.com/");

/**
 * 获取所有仓库信息，这里还加入了两个参数：
 * visibility： 仓库状态：公开(public)、私有(private)或者所有(all)，默认: 所有(all)
 * affiliation： 所属组织：owner(授权用户拥有的仓库)、collaborator(授权用户为仓库成员)、organization_member(授权用户为仓库所在组织并有访问仓库权限)、enterprise_member(授权用户所在企业并有访问仓库权限)、admin(所有有权限的，包括所管理的组织中所有仓库、所管理的企业的所有仓库)。 可以用逗号分隔符组合。如: owner, organization_member 或 owner, collaborator, organization_member
 */

const getAllRepos = (page) => {
  request
    .GET(`/api/v5/user/repos`, {
      access_token,
      page,
      per_page,
      visibility: "public",
      affiliation: "owner",
    })
    .then((repos) => {
      if (0 < repos.length) {
        repos.forEach((repo) => {
          const { html_url, name, path } = repo;
          // 克隆每个仓库到本地
          exec(`cd ${dir} && git clone ${html_url}`, (cloneErr) => {
            if (cloneErr) {
              console.log(`仓库${name}克隆失败\n`, cloneErr);
            } else {
              console.log(`仓库${name}克隆成功\n`);
            }
          });
          // 将内容写入文件中，方便识别克隆仓库的名称
          fs.appendFileSync(txtFile, `${path}: ${name}\n`);
        });
        // 继续请求下一页内容
        getAllRepos(page + 1);
      } else {
        console.log("所有仓库已获取完毕！");
      }
    })
    .catch((err) => console.log("提示错误：", err));
};

getAllRepos(page);
