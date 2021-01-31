/*
 * @Author       : Alex Ceng
 * @Date         : 2021-01-28 15:26:46
 * @LastEditors  : Alex Ceng
 * @LastEditTime : 2021-01-31 21:28:50
 * @Description  : API接口测试文档
 */
module.exports = app => {

  const expressSwagger = require('express-swagger-generator')(app);

  let options = {
    swaggerDefinition: {
      info: {
        description: '',
        title: 'Local Nodejs Server Test Api',
        version: '1.0.0',
      },
      host: 'localhost:3000',
      basePath: '/',
      produces: [
        "application/json",
        "application/xml"
      ],
      schemes: ['http', 'https'],
      securityDefinitions: {
        JWT: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: "",
        }
      }
    },
    basedir: __dirname, //app absolute path
    files: ['../routes/**/*.js'] //Path to the API handle folder
  };
  expressSwagger(options)
}