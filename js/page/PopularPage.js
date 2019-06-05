import React,{ Component } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { createAppContainer,createMaterialTopTabNavigator } from 'react-navigation'
import NavigationUtil from '../navigator/NavigationUtil'
export default class PopularPage extends Component{
	_topNavigator(){
		const TopTabNavigator = createMaterialTopTabNavigator({
			PopularTab1:{
				screen:PopularTab,
				navigationOptions:{
					title:'Tab1'
				}
			},
			PopularTab2:{
				screen:PopularTab,
				navigationOptions:{
					title:'Tab2'
				}
			}
		})
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
