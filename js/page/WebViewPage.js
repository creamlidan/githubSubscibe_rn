import React,{ Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, DeviceInfo } from 'react-native'
import { WebView } from 'react-native-webview'
import NavigationBar from '../common/NavigationBar'
import Variates from '../common/Variate'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ViewUtil from '../util/ViewUtil'
import NavigationUtil from '../navigator/NavigationUtil'
import BackPressComponent from '../common/BackPressComponent'
//监听物理键
import { BackHandler } from 'react-native';

export default class DetailPage extends Component{
	constructor(props){
		super(props)
		this.params = this.props.navigation.state.params
		const { title,url } = this.params;
		this.state = {
			title:title,
			url:url,
			canGoBack:false
		}
		this.backPress = new BackPressComponent({backPress:()=>this.onBackPress()})
	}
	//监听物理键
	componentDidMount(){
		this.backPress.componentDidMount();
	}
	//销毁时移除监听
	componentWillUnmount(){
		this.backPress.componentWillUnmount();
	}
	onBackPress(){
		this.onBack();
		return true;
	}
	onBack(){
		if(this.state.canGoBack){
			this.webView.goBack();
		}else{
			NavigationUtil.goBack(this.props.navigation);
		}
	}
	onNavigationStateChange(navState){
		this.setState({
			canGoBack:navState.canGoBack,
			url:navState.url
		})
	}
	render(){
		let statusBar = {
			background:Variates.THEME_COLOR,
			barStyle:'lignt-content',
		}
		const titleLayoutStyle = {paddingRight:62,paddingLeft:62}
		let navigationBar = <NavigationBar
			title = {this.state.title}
			statusBar = {statusBar}
			titleLayoutStyle={titleLayoutStyle}
			style={{backgroundColor:Variates.THEME_COLOR}}
			leftButton ={ViewUtil.getLeftButton(()=>this.onBack())}
		/>
		return (
			<View style={{flex:1,marginTop:DeviceInfo.isIPhoneX_deprecated ? 30 : 0}}>
				{navigationBar}
				<WebView
                    ref={webView => this.webView = webView}
                    startInLoadingState={true}
                    onNavigationStateChange={e => this.onNavigationStateChange(e)}
                    source={{uri: this.state.url}}
                />
			</View>
		)
	}
}