import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducer';

/**
 * @Description: 自定义中间件
 * @date 2019/11/17
*/
const  logger = store => next => action => {
    if(typeof  action === 'function'){
        console.log('dispatching a funtion');
    }else {
        console.log('dispatching',action)
    }
    const result = next(action);
    console.log('nextState', store.getState());
    return result
}

const middlewares = [
    // logger,
    thunk,
];


/**
 * @Description: 2.创建store
 * @parpm
 * @date 2019/11/17
 */

export default createStore(reducers, applyMiddleware(...middlewares));
