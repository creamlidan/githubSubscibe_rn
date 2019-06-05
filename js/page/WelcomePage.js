import React,{ Component } from 'react';
import { StyleSheet, Text, View ,Button} from 'react-native'
import NavigationUtil from '../navigator/NavigationUtil'

export default class WelcomePage extends Component{
	componentDidMount(){
		this.timer = setTimeout(()=>{
			NavigationUtil.resetToHomePage({
				navigation:this.props.navigation
			})
			const { navigation } = this.props
			navigation.navigate('Main')
		},100)
	}
	//卸载时销毁定时器
	componentWillUnMount(){
		this.timer && clearTimeout(this.timer)
	}
	render(){
		const { navigation } = this.props
		return (
			<View style={styles.container}>
				<Text>我是WelcomePage</Text>
				<Button
					title={'跳过'}
					onPress={()=>{
						navigation.navigate('Main')
					}}></Button>
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
})