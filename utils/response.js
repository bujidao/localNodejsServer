/*
 * @Author       : Alex Ceng
 * @Date         : 2021-01-27 11:05:24
 * @LastEditors  : Alex Ceng
 * @LastEditTime : 2021-01-31 21:28:21
 * @Description  : 请求响应格式
 */
const successResult = function(data) {
  return {
    code: 200,
    msg: 'success',
    data
  }
}

module.exports = {
	successResult
}
