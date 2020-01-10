/**
 * @author wuaixiaoyao
 * @date 2019/9/23
 * @Description:子页面
*/
import React ,{Component} from 'react';
import { renderRoutes } from 'react-router-config'
const Child = ({ route }) => {
  function loadRequest() {
    var oReq = new XMLHttpRequest();
    oReq.open('get', 'http://127.0.0.1:8080/example/');
    oReq.send();
  }
  return  <div>
    <h2>子组件</h2>
    <h1>This is a test for HTTP request error !</h1>
    <button onClick={loadRequest}>Click</button>
    {renderRoutes(route.routes, { someProp: 'these extra props are optional' })}
  </div>
};
export default Child
