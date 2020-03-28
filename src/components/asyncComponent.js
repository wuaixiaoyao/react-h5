/**
 * @author wuaixiaoyao
 * @date 2019/3/13
 * @Description: 异步组件
*/
import React, { Component } from 'react';
export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null
      };
    }
    async componentWillMount() {
      const { default: component } = await importComponent();
      this.setState({
        component: component
      });
    }
    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}