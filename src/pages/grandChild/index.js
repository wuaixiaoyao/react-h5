/**
 * @author wuaixiaoyao
 * @date 2019/9/23
 * @Description:子页面
*/
import React from 'react';
import { renderRoutes } from 'react-router-config'
const GrandChild = ( props ) => {//孙子组件
  let { route ,someProp ,match } = props;
  let { params : { id }} = match;
  return <div>
    <h3> 孙子组件 { id }</h3>
    <div>{someProp}</div>
    { renderRoutes(route.routes)}
  </div>
};
export default GrandChild
