module.exports = app => {

  const expressSwagger = require('express-swagger-generator')(app);

  let options = {
    swaggerDefinition: {
      info: {
        description: 'This is a sample server',
        title: 'Local Test Api',
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