/**
 * @author wuaixiaoyao
 * @date 2020/1/9
 * @Description:
*/
import React from 'react'
let fundebug = require('fundebug-javascript');
fundebug.apikey = '66fda8936b8c2573dadf8211757b6fef0c89dc57b461cdb5743b3242bf7c6313';
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    // 将component中的报错发送到Fundebug
    fundebug.notifyError(error, {
      metaData: {
        info: info
      }
    });
  }

  render() {
    if (this.state.hasError) {
      return null;
      // Note: 也可以在出错的component处展示出错信息，返回自定义的结果。
    }
    return this.props.children;
  }
}
