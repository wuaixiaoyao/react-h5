/**
 * @author wuaixiaoyao
 * @date 2019/9/23
 * @Description:
*/
import React from 'react';
import { renderRoutes } from 'react-router-config'
import Example from '@/components/hooks/exmap'
import WordAdder from '@/components/example/pureComponent'
const Home = ({ route }) => (
  //todo;待完善
  <div>
    <h2>我是Home组件</h2>
    <Example/>  
    {/* 测试 浅比较 */}
    <WordAdder></WordAdder> 
    {renderRoutes(route.routes, { someProp: 'these extra props are optional' })}

  </div>

);
export default Home
