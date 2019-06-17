import React,{ Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
export default class ViewUtil {
	/*
	* 获取左边返回按钮
	* @param callback
	*/
	static getLeftButton(callBack){
		return <TouchableOpacity style={{padding:8,paddingLeft:12}}
			onPress={callBack}>
			<AntDesign
				name={'left'}
				size={26}
				style={{color:'white'}}/>
		</TouchableOpacity>
	}
	/*
	* 获取分享按钮
	* @param callback
	*/
	static getShareButton(callBack){
		return <TouchableOpacity
			underlayColor={'transparent'}
			onPress={callBack}
			>
				<AntDesign
					name={'sharealt'}
					size={26}
					style={{color:'white'}}/>
			</TouchableOpacity>
	}
}