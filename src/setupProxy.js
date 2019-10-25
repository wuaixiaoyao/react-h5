/**
 * @author wuaixiaoyao
 * @date 2019/7/25
 * @Description:
*/
const proxy = require('http-proxy-middleware');
const API_ENV = process.env.API_ENV||'development';
const apiMap = {
  development:'http://10.250.90.23:4000',
  test:'http://test.api.com',
  uat:'http://uat.api.com',
  pro:'http://pro.api.com'
}
const envApi = apiMap[API_ENV];
module.exports = function (app) {
  app.use('/api', proxy({
    target: envApi, // target host
    changeOrigin: true,
    ws: false,
    pathRewrite: {
      '^/api': '',
    }
  }));
};

