/*
 * @Author: wuaixiaoyao 
 * @Date: 2020-03-10 12:13:52 
 * @Last Modified by: wuaixiaoyao
 * @Last Modified time: 2020-03-13 11:59:28
 */
import React from 'react'
export default class StateExample extends React.Component {
  
  constructor() {
    super();
    this.state = {
      name: 'hah',
      val: 0
    };
  }

  componentDidMount() {
    /**
     * 异步： react apis （生命周期或者onCilck onChange等）中 setState 为异步，同时会将多个set操作合并
     * 由React控制的事件处理程序，以及生命周期函数调用setState不会同步更新state 。
     */

    this.setState({val: this.state.val + 1});
    console.log('第 1 次 log', this.state.val);    // 第 1 次 log 0 

    this.setState(state => {
      console.log('回调 state', state)//回调 1
      console.log('---------this.state-----', this.state)// { val: 0}
      return state 
    })

    this.setState({name: 'jji'}, () => {
      console.log('callbac state 不合并', this.state) // 回调log 100
    });

    this.setState({ val: this.state.val + 100}, () => {//this.state.val 0
      console.log('state set 操作 合并', this.state) // 回调log 100
    });

    console.log('第 2 次 log', this.state.val);    // 第 2 次 log 0

    /**
     * 同步： settimmout setinterval addeventlistener 监听事件（click等）是同步
     * React控制之外的事件中调用setState是同步更新的。比如原生js绑定的事件，setTimeout/setInterval等。
     */

    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 3 次 log 101

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 4 次 log 102
    }, 0);
  }

  render() {
    return <React.Fragment>
      <button>state test</button>  
    </React.Fragment> ;
  }
};
