/**
 * @author wuaixiaoyao
 * @date 2019/9/23
 * @Description:子页面
*/
import React ,{Component} from 'react';
import { renderRoutes } from 'react-router-config'
const Child = ({ route }) => (
  <div>
    <h2>子组件</h2>
    {renderRoutes(route.routes, { someProp: 'these extra props are optional' })}
  </div>
);
export default Child