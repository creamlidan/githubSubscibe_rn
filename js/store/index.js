import { applyMiddleware,createStore } from 'redux'
import thunk from 'redux-thunk'//异步action中间件
import reducers from '../reducer/index'
import { middleware } from '../navigator/AppNavigators'

// 自定义log中间件
const logger = store => next => action => {
	if(typeof action === 'function'){
		console.log('dispatchint a function')
	}else{
		console.log('dispatching ', action)
	}
	const result = next(action);
	console.log('nextState ',store.getState())
}

const middlewares =[
	middleware,
	logger,
	thunk
]

/**
* 创建store
*/
export default createStore(reducers,applyMiddleware(...middlewares))