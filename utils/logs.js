/*
 * @Author       : Alex Ceng
 * @Date         : 2021-01-31 20:38:09
 * @LastEditors  : Alex Ceng
 * @LastEditTime : 2021-01-31 21:28:07
 * @Description  : 日志记录文件
 */

const fs = require('fs');
const morgan = require('morgan')
const { accessFile } = require('./index')

module.exports = app => {
  const logPath = 'logs'
  const accessLogName = 'access.log'
  const errorLogName = 'error.log'
  accessFile(logPath, accessLogName)
  accessFile(logPath, errorLogName)
  const accessLogfile = fs.createWriteStream(logPath + '/' + accessLogName, {flags: 'a'});
  const errorLogfile = fs.createWriteStream(logPath + '/' + errorLogName, {flags: 'a'});

  // 访问日志
  app.use(morgan('combined', {stream: accessLogfile}));

  // 错误日志
  app.use(function(err, req, res, next){
    var meta = '['+new Date()+']' + req.url + '\n';
    errorLogfile.write(meta + err.stack + '\n');
    next();
  });
}