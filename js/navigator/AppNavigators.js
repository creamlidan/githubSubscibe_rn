import {
	createStackNavigator,
	createMaterialTopTabNavigator,
	createBottomTabNavigator,
	createSwitchNavigator
} from 'react-navigation'
import WelcomePage from '../page/WelcomePage'
import HomePage from '../page/HomePage'
import Details from '../page/Details'

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

export default createSwitchNavigator({
	Init:InitNavigator,
	Main:MainNavigator,
},{
	navigationOptions:{
		header:null
	}
})