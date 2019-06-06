import React,{ Component } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { createAppContainer,createMaterialTopTabNavigator } from 'react-navigation'
import NavigationUtil from '../navigator/NavigationUtil'
export default class PopularPage extends Component{
	constructor(props){
		super(props)
		this.tabNames = ['Java','Android','iOS','React','React Native','PHP']
	}
	//循环生成tab
	_renderTabs(){
		const tabs = {}
		this.tabNames.map((item,i)=>{
/*			tabs[`tab${i}`] = {
				screen:PopularTab,
				navigationOptions:{
					title:`${item}`
				}
			}*/
			//如果需要传递参数
			tabs[`tab${i}`] = {
				screen:props => <PopularTab tabLabel={item}/>,
				navigationOptions:{
					title:`${item}`
				}
			}
		})
		return tabs
	}

	_topNavigator(){
		const TopTabNavigator = createMaterialTopTabNavigator(
			this._renderTabs(),{
				tabBarOptions:{
					tabStyle:{
						width:100
					},
					upperCaseLabel:false,//是否使用标签大写 默认为true
					scrollEnabled:true,//是否支持选项卡滚动 默认为false
					style:{
						backgroundColor:'#ff9500'
					},
					indicatorStyle:styles.indicatorStyle,
					labelStyle:styles.labelStyle
				}
			}
		)
		return createAppContainer(TopTabNavigator)
	}
	render(){
		const TopTabBar = this._topNavigator()
		return <TopTabBar/>
	}
}

class PopularTab extends Component{
	render(){
		const { tabLabel } = this.props;
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>{tabLabel}</Text>
				<Text
					onPress={()=>{
						NavigationUtil.goPage({
							navigation:this.props.navigation
						},'DetailsPage')
					}}
				>fo to page</Text>
			</View>
		)

	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	tabStyles:{
		width:50,
	},
	indicatorStyle:{
		height:2,
		backgroundColor:'white',
	},
	labelStyle:{
		fontSize:13,
		fontWeight:'bold'
	}
});
