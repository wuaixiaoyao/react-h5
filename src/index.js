import React , { lazy , Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter  } from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { renderRoutes } from 'react-router-config';
const getWrapperComponent = (Component, fallback = null) => {//装饰路由组件
  return  props => {
    return (
      <Suspense fallback={null}>
        <Component {...props}/>
      </Suspense>
    );
  };
}
const Home = getWrapperComponent(lazy(() => import('./pages/home/index')))
const Child = getWrapperComponent(lazy(() => import('./pages/child/index')));
const GrandChild = getWrapperComponent(lazy(() => import('./pages/grandChild/index')));


const Root = ({ route }) => {
  return <div>
    <h1>根组件</h1>
    {renderRoutes(route.routes)}
  </div>
}


const routes = [
  {
    component: Root,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
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
