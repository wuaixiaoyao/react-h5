import React , { lazy , Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter  } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import ErrorBoundary from './errorBoundary'
import StateExam from '@/components/example/state'
import Button from './baseUI/button'
import './index.css';
import * as serviceWorker from './serviceWorker';
//let fundebugRevideo = require('fundebug-revideo');
const getWrapperComponent = (Component, fallback = null) => {//装饰路由组件
  return  props => {
    return (
      <Suspense fallback={null}>
        <Component {...props}/>
      </Suspense>
    );
  };
}
// import 动态加载 拆分为chunk 文件 , 和 webpack 的require.ensure() 一样  
const homePath = '/home/index';
const Home = getWrapperComponent(lazy(() => import(`./pages${homePath}`)))
const childPath = '/child/index';
const Child = getWrapperComponent(lazy(() => import(`./pages${childPath}`)));
const grandChildPath = '/grandChild/index';
const GrandChild = getWrapperComponent(lazy(() => import(`./pages${grandChildPath}`)));


const Root = ({ route }) => {
  return <ErrorBoundary>
    <div>
      <StateExam></StateExam>  
      <h1>根组件</h1>
      <Button type={'primary'}>test</Button>
      {renderRoutes(route.routes)}
    </div>
  </ErrorBoundary>
}


const routes = [
  {
    component: Root,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/child',
        component: Child,
        routes: [
          {
            path: '/child/:id',
            component: GrandChild
          }
        ]
      }
    ]
  }
];

ReactDOM.render(
  <BrowserRouter>
    {/* kick it all off with the root route */}
    {renderRoutes(routes)}
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
