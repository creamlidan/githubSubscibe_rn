import React,{ Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native'
import NavigationBar from '../common/NavigationBar'
import Variates from '../common/Variate'
import { connect } from 'react-redux'
import actions from '../action/index'
import AntDesign from 'react-native-vector-icons/AntDesign'
class MyPage extends Component{
	getLeftButton(){
		return(
			<TouchableOpacity style={{padding:8,paddingLeft:12}}>
				<AntDesign
					name={'staro'}
					size={26}
					style={{color:'white'}}/>
			</TouchableOpacity>
		)
	}
	getRightButton(){
		return(
			<TouchableOpacity style={{padding:6,marginRight:6,flexDirection:'row'}}>
				<AntDesign
					name={'staro'}
					size={26}
					style={{color:'white'}}/>
				<AntDesign
					name={'staro'}
					size={26}
					style={{color:'white',marginLeft:6}}/>
			</TouchableOpacity>
		)
	}
	render(){
		let statusBar = {
			background:Variates.THEME_COLOR,
			barStyle:'lignt-content',
		}
		let navigationBar = <NavigationBar
			title = {'我的'}
			statusBar = {statusBar}
			style={{backgroundColor:Variates.THEME_COLOR}}
			leftButton={this.getLeftButton()}
			rightButton={this.getRightButton()}
		/>

		return (
			<View>
				{navigationBar}
				<Text>我是Home</Text>
				<Button
				title={'改变主题'}
				onPress={()=>{
					this.props.onThemeChange('#544225')
				}}/>
				<Text
					onPress={()=>this.props.onSelect}
				>fo to page</Text>
				<Button
					title={'Fatch 使用'}
					onPress={()=>{
						NavigationUtil.goPage({
							navigation:this.props.navigation
						},'FetchDemo')
					}}/>
				<Button
					title={'AsyncStorage 使用'}
					onPress={()=>{
						NavigationUtil.goPage({
							navigation:this.props.navigation
						},'AsyncStorageDemoPage')
					}}/>
				<Button
					title={'离线框架的使用'}
					onPress={()=>{
						NavigationUtil.goPage({
							navigation:this.props.navigation
						},'DataStoreDemoPage')
					}}/>
			</View>
		)
	}
}
const mapTrendingStateToProps = state =>({

})
const mapTrendingDispatchToProps = dispatch =>({
	onThemeChange:theme => dispatch(actions.onThemeChange(theme))
})

export default connect(mapTrendingStateToProps,mapTrendingDispatchToProps)(MyPage)