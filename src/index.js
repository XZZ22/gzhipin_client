//入口文件js
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux';

//引入路由
import {HashRouter,Switch,Route} from 'react-router-dom'

//引入store
import store from './redux/store';

//引入依赖包
import Login from './containers/login/login';
import Register from './containers/register/register';
import Main from './containers/main/main';

ReactDOM.render(
  (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route component={Main}></Route>
        </Switch>
      </HashRouter>
    </Provider>
  ),
  document.getElementById('root')
)