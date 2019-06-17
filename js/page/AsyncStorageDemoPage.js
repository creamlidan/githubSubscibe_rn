import React,{ Component } from 'react';
import { StyleSheet, Text, View , Button, TextInput} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
const KEY = "save_key";

export default class AsyncStorageDemoPage extends Component{
	constructor(props){
		super(props)
		this.state={
			showText:'111'
		}
	}
	_setData(){
		AsyncStorage.setItem(KEY,this.writeText,error=>{
			error && console.log(error.toString)
		})
	}
	_getData(){
		AsyncStorage.getItem(KEY, (error,value) =>{
			this.setState({
				showText:value
			})
			console.log(value)
			error && console.log(error.toString())
		})
	}

	_removeData(){
		AsyncStorage.removeItem(KEY,error =>{
			error && console.log(error.toString)
		})
	}

	render(){
		return (
			<View>
				<Text>AsyncStorage</Text>
				<View style={styles.input_container}>
					<TextInput
    					style={styles.input}
						onChangeText={(text)=>{
							this.writeText = text
						}}
					/>
					<View>
						<Button
							title={'存储'}
							onPress = {()=>{
								this._setData()
							}}
						/>
						<Button
							title={'查询'}
							onPress = {()=>{
								this._getData()
							}}
						/>
						<Button
							title={'删除'}
							onPress = {()=>{
								this._removeData()
							}}
						/>
					</View>
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