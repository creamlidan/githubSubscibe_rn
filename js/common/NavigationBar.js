import React,{ Component } from 'react';
import { ViewPropTypes, Text, View, StatusBar, StyleSheet, Platform} from 'react-native'
import {PropTypes} from 'prop-types'

const NAV_BAR_HEIGHT_IOS = 44,
	NAV_BAR_HEIGHT_ANDROID = 50,
	STATUS_BAR_HEIGHT = 20;

const StatusBarShape = {
	borStyle:PropTypes.oneOf(['light-content','default',]),
	hidden:PropTypes.bool,
	backgroundColor:PropTypes.string,
}
			
export default class NavigationBar extends Component{
	//类型检查
	static proTypes ={
		style:ViewPropTypes.style,
		title:PropTypes.string,
		titleView:PropTypes.element,
		titleLayoutStyle:ViewPropTypes.style,
		hide:PropTypes.bool,
		statusBar:PropTypes.shape(StatusBarShape),
		rightButton:PropTypes.element,
		leftButton:PropTypes.element,
	}
	render(){
		//statusBar为信息栏, 主要是用来设置信息的样式
		let statusBar = !this.props.statusBar.hidden ?<View style={styles.statusBar}>
				<StatusBar {...this.props.statusBar}/>
			</View>:null;
		/*
		*如果用户没有自定义title就显示一个文本ellipsizeMode:head在文字多的情况下会在前面显示省略号
		* middle：中间显示省略号
		* tail:末尾显示省略号
		* clip：裁剪不显示省略号
		*/
		let titleView = this.props.titleView ? this.props.titleView :
			<Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>{this.props.title}</Text>;
		let content = this.props.hide ? null :
			<View style={styles.navBar}>
				{this.getButtonElement(this.props.leftButton)}
				<View style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>
					{titleView}
				</View>
				{this.getButtonElement(this.props.rightButton)}
			</View>;
		return (
			<View style={styles.container,this.props.style}>
				{ statusBar }
				{ content }
			</View>
		)
	}
	getButtonElement(data){
		return(
			<View style={styles.navBarButton}>
				{data?data:null}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	navBarButton:{
		alignItems:'center'
	},
	navBar:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between',
		height:Platform.OS === 'ios'?NAV_BAR_HEIGHT_IOS:NAV_BAR_HEIGHT_ANDROID
	},
	navBarTitleContainer:{
		alignItems:'center',
		justifyContent:'center',
		position:'absolute',
		left:40,
		right:40,
		top:0,
		bottom:0,
	},
	container:{
		backgroundColor:'#ff9500',
	},
	title:{
		fontSize:20,
		color:'white',
	},
	statusBar:{
		height:Platform.OS === 'ios'?STATUS_BAR_HEIGHT:0,//安卓系统自身保留了高度所以只需要设置ios高度
	}
})