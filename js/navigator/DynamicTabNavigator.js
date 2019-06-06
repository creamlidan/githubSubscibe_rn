import React,{ Component } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { createAppContainer,createBottomTabNavigator } from 'react-navigation'
import { BottomTabBar } from 'react-navigation-tabs'

import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'

import PopularPage from '../page/PopularPage'
import TrendingPage from '../page/TrendingPage'
import FavoritePage from '../page/FavoritePage'
import MyPage from '../page/MyPage'

import { connect } from 'react-redux'

const TABS = {
	PopularPage:{
		screen:PopularPage,
		navigationOptions:{
			tabBarLabel:'最热',
			tabBarIcon:({tintColor,focused})=>{
				return (
					<MaterialIcons
						name='whatshot'
						size={26}
						style={{color:tintColor}}
					/>
				)
			}
		}
	},
	TrendingPage:{
		screen:TrendingPage,
		navigationOptions:{
			tabBarLabel:'趋势',
			tabBarIcon:({tintColor,focused})=>{
				return (
					<Ionicons
						name='md-trending-up'
						size={26}
						style={{color:tintColor}}
					/>
				)
			}
		}
	},
	FavoritePage:{
		screen:FavoritePage,
		navigationOptions:{
			tabBarLabel:'收藏',
			tabBarIcon:({tintColor,focused})=>{
				return (
					<MaterialIcons
						name='favorite'
						size={26}
						style={{color:tintColor}}
					/>
				)
			}
		}
	},
	MyPage:{
		screen:MyPage,
		navigationOptions:{
			tabBarLabel:'我的',
			tabBarIcon:({tintColor,focused})=>{
				return (
					<Entypo
						name='user'
						size={26}
						style={{color:tintColor}}
					/>
				)
			}
		}
	}
} 

class DynamicTabNavigator extends Component{
	constructor(props) {
        super(props);
        console.disableYellowBox = true;
    }
	_tabNavigator(){
		if(this.Tabs){
			return this.Tabs
		}
		const { PopularPage, TrendingPage, FavoritePage,MyPage} = TABS
		const tabs = { PopularPage, TrendingPage, FavoritePage, MyPage}
		//修改静态配置
		//PopularPage.navigationOptions.tabBarLabel = '最新'

/*		不需要动态改变tabbar颜色的使用下面即可
		const BottomTabNavigator = createBottomTabNavigator(tabs)*/

	/*	const BottomTabNavigator = createBottomTabNavigator(tabs,{
			tabBarComponent:TabBarComponent
		})*/

		/*
		* 这里每次订阅修改的时候都会重新创建tabbar,会出现第一次点击的时候返回到首页面
		* 修复:将tab保存起来 如果存在就不重新创建
		*/
		return this.Tabs = createAppContainer(createBottomTabNavigator(tabs,{
			tabBarComponent:props=>{
				return <TabBarComponent theme={this.props.theme} {...props}/>
			}
		}))
		
	}
	render(){
		const BottomTabBar = this._tabNavigator();
		return <BottomTabBar/>
	}
}
//重置tabbar主题颜色
class TabBarComponent extends Component{
	constructor(props){
		super(props);
		this.theme = {
			tintColor:props.activeTintColor,
			updateTime:new Date().getTime(),
		}
	}
	render(){
		const { routes,index } = this.props.navigation.state
		//判断当前路由中的params是否存在
		if(routes[index].params){
			const { theme } = routes[index].params
			//以最新更新的时间为主
			if( theme && theme.updateTime > this.theme.updateTime ){
				this.theme = theme
			}
		} 
		return (
/*			<BottomTabBar
				{...this.props}
				activeTintColor = {this.theme.tintColor || this.props.activeTintColor}
			/>*/
			<BottomTabBar
				{...this.props}
				activeTintColor = {this.props.theme}
			/>
		)
	}
}

const mapStateToProps = state => ({
	theme: state.theme.theme
})

export default connect(mapStateToProps)(DynamicTabNavigator);
