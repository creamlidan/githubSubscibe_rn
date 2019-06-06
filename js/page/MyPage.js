import React,{ Component } from 'react';
import { StyleSheet, Text, View ,Button} from 'react-native'

import { connect } from 'react-redux'
import actions from '../action/index'

class MyPage extends Component{
	render(){
		return (
			<View>
				<Text>我是Home</Text>
				<Button
				title={'改变主题'}
				onPress={()=>{
					this.props.onThemeChange('#544225')
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