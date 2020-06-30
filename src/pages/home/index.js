/**
 * @author wuaixiaoyao
 * @date 2019/9/23
 * @Description:
 */
import React from 'react';
import {
  renderRoutes
} from 'react-router-config'
import io from 'socket.io'
import Example from '@/components/hooks/exmap'
import WordAdder from '@/components/example/pureComponent'
const Home = ({
  route
}) => {
  //todo;待完善
  const soc = io('http://localhost:7002');
  //向指定的服务器建立连接，地址可以省略
  console.log('soc', soc);
  soc.emit('msg', '你好服务器');
  //自定义msg事件，发送‘你好服务器’字符串向服务器
  soc.on('msg', (data) => {
    //监听浏览器通过msg事件发送的信息
    console.log(data); //你好浏览器
  });
  debugger
  return (
    <div>
      <h2>我是Home组件</h2>
      <Example/>  
      {/* 测试 浅比较 */}
      <WordAdder></WordAdder> 
  
      {renderRoutes(route.routes, { someProp: 'these extra props are optional' })}

    </div>
  )
};
export default Home