const fs = require('fs')
/**
 * 判断是否文件夹
 */
const accessFolder = (folder) => {
  try {
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder, { recursive: true });
  }
}

/**
 * 判断是否文件
 */
const accessFile = (folder, file) => {
  accessFolder(folder)
  const filePath = folder + '/' + file
  try {
    fs.accessSync(filePath);
  } catch (e) {
    fs.writeFile(filePath, '', 'utf8', () => {})
  }
}

module.exports = {
  accessFolder,
  accessFile
}
