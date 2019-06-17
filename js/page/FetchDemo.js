import React,{ Component } from 'react';
import { StyleSheet, Text, View , Button, TextInput} from 'react-native'

export default class FetchDemo extends Component{
	constructor(props){
		super(props)
		this.state={
			showText:''
		}
	}
	_loadData(){
		let url = `https://api.github.com/search/repositories?q=${this.writeText}`
		fetch(url)
			.then(response => {
				if(response.ok){
					return response.text()
				}
				throw new Error('NetWork response was not ok.')
			})
			.then(responseText => {
				this.setState({
					showText:responseText
				})
			})
			.catch(e=>{
				this.setState({
					showText:e.toString()
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
						style={styles.button}
						title={'查询'}
						onPress = {()=>{
							this._loadData()
						}}
					/>
				</View>
				<Text>{this.state.showText}</Text>
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