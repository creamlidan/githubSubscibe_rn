import {
	createStackNavigator,
	createSwitchNavigator,
	createAppContainer
} from 'react-navigation'
import WelcomePage from '../page/WelcomePage'
import HomePage from '../page/HomePage'
import DetailPage from '../page/DetailPage'
import FetchDemo from '../page/FetchDemo'
import AsyncStorageDemoPage from '../page/AsyncStorageDemoPage'
import DataStoreDemoPage from '../page/DataStoreDemoPage'
//redux
import { connect } from 'react-redux'
import { createReactNavigationReduxMiddleware,createReduxContainer } from 'react-navigation-redux-helpers'

//���ø�·��
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
	DetailPage:{
		screen:DetailPage,
		navigationOptions:{
			header:null
		}
	},
	FetchDemo:{
		screen:FetchDemo,
		navigationOptions:{
			title:'FetchDemo'
		}
	},
	AsyncStorageDemoPage:{
		screen:AsyncStorageDemoPage,
		navigationOptions:{
			title:'AsyncStorageDemoPage'
		}
	},
	DataStoreDemoPage:{
		screen:DataStoreDemoPage,
		navigationOptions:{
			title:'DataStoreDemoPage'
		}
	},
})

export const RootNavigator = createAppContainer(createSwitchNavigator({
	Init:InitNavigator,
	Main:MainNavigator,
},{
	navigationOptions:{
		header:null
	}
}))

//reduxʹ������
/*
* 1.��ʼ��react-navigation��redux���м��
* ������þ���ΪreduxifyNavigator��key����actionSubscribers(��Ϊ������)
* ���ö�����
* ��ⶩ�����Ƿ����
* ����Ŀ�м�ʹ��ʹ��Ҳ��Ҫ��ʼ����Ϊ��������ʹ��key��������state
*/

export const middleware = createReactNavigationReduxMiddleware(
	state => state.nav,
	'root'
)

/*
* 2.����������������ݸ�reduxifyNavigator����
* ������һ����navigation state��dispatch������Ϊprops�������
* ע�⣺Ҫ��createReactNavigationReduxMiddleware֮��ִ��
*/
const AppWithNavigationState = createReduxContainer(RootNavigator, 'root');

/*
* State��Props��ӳ���ϵ
* @param state
*/
const mapStateTpProps = state =>({
	state: state.nav
})

/*
* 3.����React �����Redux store
*/
export default connect(mapStateTpProps)(AppWithNavigationState)