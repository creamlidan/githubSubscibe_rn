import React,{ Component } from 'react';
import { StyleSheet, TouchableOpacity,View,Text } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
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
	/*
	* 获取设置页面的Item
	* @param callback 单击Item的回调
	* @param text 显示文本
	* @param color 图标着色
	* @param Icons 图标组件
	* @param icon 左侧图标
	* @param expandableIco 右侧图标
	* @return {XML}
	**/
	static getSettingItem(callback,text,color,Icons,icon,expandableIco){
		return (
			<TouchableOpacity
				onPress={callback}
				style={styles.setting_item_container}>
				<View style={{alignItems:'center',flexDirection:'row'}}>
					{
						Icons&&icon?
						<Icons
							name={icon}
							size={16}
							style={{color:color,marginRight:10}}
						/>:
						<View style={{opacity:1,width:16,height:16,marginRight:10,}}></View>
					}
					<Text>{text}</Text>
				</View>
				<AntDesign
					name={expandableIco?expandableIco:'right'}
					size={16}
					style={{
						marginRight:10,
						alignSelf:'center',
						color:color||'black',
					}}
				/>
			</TouchableOpacity>
		)
	}
	/**
     * 获取设置页的Item
     * @param callBack 单击item的回调
     * @param menu @MORE_MENU
     * @param color 图标着色
     * @param expandableIco 右侧图标
     * @return {XML}
     */
    static getMenuItem(callBack, menu, color, expandableIco) {
        return ViewUtil.getSettingItem(callBack, menu.name, color, menu.Icons, menu.icon, expandableIco)
    }
}

const styles = StyleSheet.create({
	setting_item_container:{
		backgroundColor:'white',
		padding:10,
		height:60,
		alignItems:'center',
		justifyContent:'space-between',
		flexDirection:'row'
	}
})