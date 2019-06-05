import React,{ Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native'

export default class TrendingPage extends Component{
	render(){
		const { navigation } = this.props
		return (
			<View>
				<Text>我是TrendingPage</Text>
				<Button
					title={'改变主题颜色'}
					onPress={()=>{
						navigation.setParams({
							theme:{
								tintColor:'red',
								updateTime:new Date().getTime()
							}
						})
					}}
				/>
			</View>
		)
	}
}