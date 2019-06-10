import React,{ Component } from 'react';
import { StyleSheet, Text, View , Button, TextInput} from 'react-native'
import DataStore from '../expand/dao/DataStore'

export default class DateStoreDemoPage extends Component{
	constructor(props){
		super(props)
		this.state={
			showData:''
		}
		this.DataStore = new DataStore()
	}
	_loadData(){
		let url = `https://api.github.com/search/repositories?q=${this.writeText}`
		this.DataStore.fetchData(url)
		.then(data=>{
			let showData = `初次加载时间:${new Date(data.timestamp)}\n${JSON.stringify(data.data)}`
			this.setState({
				showData
			})
		})
	}
	render(){
		return (
			<View>
				<Text>FetchDemo</Text>
				<View style={styles.input_container}>
					<TextInput
    					style={styles.input}
						onChangeText={(text)=>{
							this.writeText = text
						}}
					/>
					<Button
						title={'查询'}
						onPress = {()=>{
							this._loadData()
						}}
					/>
				</View>
				<Text>{this.state.showData}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	input:{
		height:30,
	    borderWidth: 1,
	    borderColor: '#0f0f0f',
	    fontSize: 13,
	    paddingVertical:0
	},
	button:{
		width:100
	}
})