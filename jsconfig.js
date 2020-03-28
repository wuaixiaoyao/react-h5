/**
 * @author wuaixiaoyao
 * @date 2019/11/5
 * @Description:
*/
const path = require('path')
const resolve = dir => path.join(__dirname, dir);

module.exports = {
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      '@':resolve('src')
    },
  }
}
