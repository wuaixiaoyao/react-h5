import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter  } from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { renderRoutes } from 'react-router-config';
const Root = ({ route }) => {
  return <div>
    <h1>Root</h1>
    {renderRoutes(route.routes)}
  </div>
}

const Home = ({ route }) => (
  <div>
    <h2>我是Home页</h2>
  </div>
);

const Child = ({ route }) => (
  <div>
    <h2>Child</h2>
     child routes won't render without this
    {renderRoutes(route.routes, { someProp: 'these extra props are optional' })}
  </div>
);

const GrandChild = ( props ) => {//孙子组件
  let { route ,someProp ,match ,location} = props;
  let { params : { id }} = match;
  debugger
  return <div>
    <h3>Grand Child id { id }</h3>
    <div>{someProp}</div>
  </div>
};
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
            path: '/',
            component: GrandChild
          },
          {
            path: '/:id/grand-child',
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
