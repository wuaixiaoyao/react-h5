/**
 * @author wuaixiaoyao
 * @date 2019/10/24
 * @Description:
 */
const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');
const compression = require('compression');
const app = express();
const RUNTIME_ENV = process.env.RUNTIME_ENV || 'dev';
const port = process.env.PORT || 4001;

app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));

const apiMaps = {
  // dev 开发
  dev: [{
    prefix: '/api',
    proxyTo: 'http://10.250.100.68:7001',
    rewrite: ''
  }],
  // sit 测试
  sit: [{
    prefix: '/api',
    proxyTo: 'http://10.250.200.200:7010',
    rewrite: ''
  }, ],
  // uat 验收
  uat: [{
    prefix: '/api',
    proxyTo: 'https://testapi.api.com',
    rewrite: ''
  }, ],
  // pro 生产
  pro: [{
    prefix: '/api',
    proxyTo: 'https://api.api.com',
    rewrite: ''
  }],
}

apiMaps[RUNTIME_ENV].map(api => (
  app.use(api.prefix, proxy({
    pathRewrite: api.hasOwnProperty('rewrite') ? ({
      [`^${api.prefix}`]: api.rewrite
    }) : {},
    target: api.proxyTo,
    changeOrigin: true,
    ws: false,
  }))
))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);

console.log('h5 project started');
console.log('port:', port);