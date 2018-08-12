//引入redux的createStore，异步处理工具
import {createStore,applyMiddleware} from 'redux';

//引入异步
import thunk from 'redux-thunk';

//引入reducers
import reducers from './reducers';

//引入调试工具
import {composeWithDevTools} from 'redux-devtools-extension';

//暴露
export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk)));
