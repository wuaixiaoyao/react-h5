/*
 * @Author: wuaixiaoyao 
 * @Date: 2020-03-16 10:31:15 
 * @Last Modified by: wuaixiaoyao
 * @Last Modified time: 2020-04-06 17:43:58
 */


// eventLoop 时间循环机制
import React, {
  Component
} from 'react'

// eslint-disable-next-line react/require-render-return
export default class EventLoop extends Component {
  componentDidMount() {
    // 这是一个同步任务
    console.log('1') //-- -- -- -- > 直接被执行
    //目前打印结果为： 1

    // 这是一个宏任务
    setTimeout(function () {
      //整体的setTimeout被放进宏任务列表
      console.log('2') //目前宏任务列表记为【 s2】
    });

    new Promise(function (resolve) {
      // 这里是同步任务
      console.log('3');
      //直接被执行
      resolve();
      //目前打印结果为： 1、 3
      // then是一个微任务
    }).then(function () {
      //-- -- -- -- > 整体的then[包含里面的setTimeout] 被放进微任务列表
      console.log('4') //目前微任务列表记为【 t45】
      setTimeout(function () {
        console.log('5')
      });
    });



    /**
     * 
     * 浏览器瞅了一眼微任务列表 发现里面有微任务 就开始全部执行
        then(function () {
        console.log('4')            --------> 直接被执行
                                                目前打印结果为：1、3、4
        setTimeout(function () {    --------> 被放进宏任务列表了
            console.log('5')                    目前宏任务列表记为【s2、s5】
        });
        });


        浏览器发现微任务执行完毕了

        开始执行宏任务列表

        setTimeout(function () {
        console.log('2')   --------> 直接被执行
                                    目前打印结果为：1、3、4、2

        });

        setTimeout(function () {
        console.log('5')   --------> 直接被执行
                                    目前打印顺序为： 1、3、4、2、5、5
        });

        最终结果为： 1、3、4、2、5
     * 
     */
    
  }
  render() {
    console.log('-----render 我是 eventLoop 孙子组件')  
    return <div>EventLoop 组件</div>
  }
}