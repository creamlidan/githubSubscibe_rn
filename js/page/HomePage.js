import React,{ Component } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import DynamicTabNavigator from '../navigator/DynamicTabNavigator'
import NavigationUtil from '../navigator/NavigationUtil'

export default class HomePage extends Component{
	render(){
		//内部出现需要跳转到最外层定义的page所以需要保存一下最外部的navigation用于跳转
		NavigationUtil.navigation = this.props.navigation
		return <DynamicTabNavigator/>
	}
}