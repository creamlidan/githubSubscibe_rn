import { combineReducers } from 'redux'
import theme from './theme'
import popular from './popular'
import trending from './trending'
import { rootCom ,RootNavigator} from '../navigator/AppNavigators'

//1.指定默认state
const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootCom))

/**
* 2.创建自己的navigation reducer
*/
const navReducer = (state = navState,action)=>{
	const nextState = RootNavigator.router.getStateForAction(action,state);
	return nextState || state;
}

/**
* 3.合并reducer
*/
const index = combineReducers({
	nav:navReducer,
	theme:theme,
	popular:popular,
	trending:trending
})

export default index;