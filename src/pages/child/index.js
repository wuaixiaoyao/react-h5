/**
 * @author wuaixiaoyao
 * @date 2019/9/23
 * @Description:子页面
*/
import React from 'react';
import { renderRoutes } from 'react-router-config'
import EventLoop from '@/components/example/eventLoop'

const Child = ({ route }) => {

  return  <div>
    <h2>我是子组件 哈哈哈</h2>
    <EventLoop></EventLoop>
    <button>Click</button>
    {renderRoutes(route.routes, { someProp: 'these extra props are optional' })}
  </div>
};
export default Child
