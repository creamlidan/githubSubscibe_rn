import React,{ Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import actions from '../action/index'
class TrendingPage extends Component{
	render(){
		const { navigation } = this.props
		return (
			<View>
				<Text>我是TrendingPage</Text>
				<Button
					title={'改变主题颜色'}
					onPress={()=>{
						/*navigation.setParams({
							theme:{
								tintColor:'red',
								updateTime:new Date().getTime()
							}
						})*/
						this.props.onThemeChange('#096')
					}}
				/>
			</View>
		)
	}
}
//一下三步操作完成就可以在props中使用onThemeChange
const mapTrendingStateToProps = state => ({
	
});
const mapTrendingDispatchToProps = dispatch =>({
	onThemeChange: theme => dispatch(actions.onThemeChange(theme))
})

export default connect(mapTrendingStateToProps,mapTrendingDispatchToProps)(TrendingPage);