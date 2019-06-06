import React,{ Component } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import DynamicTabNavigator from '../navigator/DynamicTabNavigator'
import NavigationUtil from '../navigator/NavigationUtil'

//监听物理键
import { BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

class HomePage extends Component{
	//监听物理键
	componentDidMount(){
		BackHandler.addEventListener('hardwareBackPress',this.onBackPress)
	}
	//销毁时移除监听
	componentWillUnmount(){
		BackHandler.removeEventListener('hardwareBackPress',this.onBackPress)
	}

	/**
	* 处理物理键返回
	*/
	onBackPress = () => {
		const { dispatch,nav } = this.props;
		/*
		* MainNavigator这个路由在AppNavigators中的RootNavigator配置中位置为1
		* 如果RootNavigator中的MainNavigator的index为0的时候则不处理返回事件
		*/
		if(nav.routes[1].index === 0){
			return false
		}
		dispatch(NavigationActions.back());
		return true;
	}

	render(){
		//内部出现需要跳转到最外层定义的page所以需要保存一下最外部的navigation用于跳转
		NavigationUtil.navigation = this.props.navigation
		return <DynamicTabNavigator/>
	}
}

//订阅
const mapStateToProps = state => ({
	nav:state.nav
})

export default connect(mapStateToProps)(HomePage)