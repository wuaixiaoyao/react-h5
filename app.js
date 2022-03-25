/**
 * @author wuaixiaoyao
 * @date 2019/10/24
 * @Description:
*/
const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');
const compression = require('compression');
const chalk = require('chalk');
const app = express();
const RUNTIME_ENV = process.env.RUNTIME_ENV || 'dev';
const port = process.env.PORT || 4001;

app.use(compression());
// 基于http协议讲解Cache-Control在服务中的应用
// https://zhuanlan.zhihu.com/p/43414403
app.use((req, res, next) => {
  // 将 index.html 设为 no-cache, 每次请求 都会检查是否更新
  if (req.url == '/') {
    // res.setHeader('Cache-control', 'no-cache');
  }
  next();
});
app.use(express.static(path.join(__dirname, 'build'), {
  etag: false,
  maxAge: 10 * 60 * 60 * 24 * 365 // 缓存一年
}));

const apiMaps = {
  // dev 开发
  dev: [
    { prefix: '/api', proxyTo: 'http://10.250.100.68:7001', rewrite: '' }
  ],
  // sit 测试
  sit: [
    { prefix: '/api', proxyTo: 'http://10.250.200.200:7010', rewrite: '' },
  ],
  // uat 验收
  uat: [
    { prefix: '/api', proxyTo: 'https://testapi.api.com', rewrite: '' },
  ],
  // pro 生产
  pro: [
    { prefix: '/api', proxyTo: 'https://api.api.com', rewrite: '' }
  ],
}

apiMaps[RUNTIME_ENV].map(api => (
  app.use(api.prefix, proxy({
    pathRewrite: api.hasOwnProperty('rewrite') ? ({ [`^${api.prefix}`]: api.rewrite }) : {},
    target: api.proxyTo,
    changeOrigin: true, ws: false,
  }))
))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);
console.log(chalk.greenBright('服务已开启:'));
console.log(chalk.yellowBright(`http://localhost:${port}`));
