import {
	createStackNavigator,
	createSwitchNavigator,
	createAppContainer
} from 'react-navigation'
import WelcomePage from '../page/WelcomePage'
import HomePage from '../page/HomePage'
import Details from '../page/Details'
//redux
import { connect } from 'react-redux'
import { createReactNavigationReduxMiddleware,createReduxContainer } from 'react-navigation-redux-helpers'

//设置跟路由
export const rootCom = 'Init'

const InitNavigator = createStackNavigator({
	WelcomePage:{
		screen:WelcomePage,
		navigationOptions:{
			header:null
		}
	}
})
const MainNavigator = createStackNavigator({
	HomePage:{
		screen:HomePage,
		navigationOptions:{
			header:null
		}
	},
	DetailsPage:{
		screen:Details,
		navigationOptions:{
			title:'我是详情'
		}
	}
})

export const RootNavigator = createAppContainer(createSwitchNavigator({
	Init:InitNavigator,
	Main:MainNavigator,
},{
	navigationOptions:{
		header:null
	}
}))

//redux使用流程
/*
* 1.初始化react-navigation与redux的中间件
* 最大作用就是为reduxifyNavigator的key设置actionSubscribers(行为订阅者)
* 设置订阅者
* 检测订阅者是否存在
* 在项目中即使不使用也需要初始化因为方法里面使用key关联到了state
*/

export const middleware = createReactNavigationReduxMiddleware(
	state => state.nav,
	'root'
)

/*
* 2.将根导航器组件传递给reduxifyNavigator函数
* 并返回一个将navigation state和dispatch函数作为props的新组件
* 注意：要在createReactNavigationReduxMiddleware之后执行
*/
const AppWithNavigationState = createReduxContainer(RootNavigator, 'root');

/*
* State到Props的映射关系
* @param state
*/
const mapStateTpProps = state =>({
	state: state.nav
})

/*
* 3.连接React 组件与Redux store
*/
export default connect(mapStateTpProps)(AppWithNavigationState)