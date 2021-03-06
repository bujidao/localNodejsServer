/*
 * @Author       : Alex Ceng
 * @Date         : 2021-03-06 21:32:54
 * @LastEditors  : Alex Ceng
 * @LastEditTime : 2021-03-06 21:53:44
 * @Description  : 根据地址打开浏览器
 */
// 可以使用exec 来执行系统的默认命令；child_process为内置模块 
const { exec } = require("child_process");
//传入url
module.exports = function (url) {
  // 拿到当前系统的参数
  switch (process.platform) {
    //mac系统使用 一下命令打开url在浏览器
    case "darwin":
      exec(`open ${url}`);
    //win系统使用 一下命令打开url在浏览器
    case "win32":
      exec(`start ${url}`);
    // 默认mac系统
    default:
      exec(`open ${url}`);
  }
}