import React,{ Component } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import DynamicTabNavigator from '../navigator/DynamicTabNavigator'
import NavigationUtil from '../navigator/NavigationUtil'
import BackPressComponent from '../common/BackPressComponent'

import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

class HomePage extends Component{
	constructor(props){
		super(props)
		this.backPress = new BackPressComponent({backPress:this.onBackPress()})
	}
	//监听物理键
	componentDidMount(){
		this.backPress.componentDidMount();
	}
	//销毁时移除监听
	componentWillUnmount(){
		this.backPress.componentWillUnmount();
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