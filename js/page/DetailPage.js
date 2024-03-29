import React,{ Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, DeviceInfo } from 'react-native'
import { WebView } from 'react-native-webview'
import NavigationBar from '../common/NavigationBar'
import Variates from '../common/Variate'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ViewUtil from '../util/ViewUtil'
import NavigationUtil from '../navigator/NavigationUtil'
const TRENDINT_URL = 'https://github.com/'
import BackPressComponent from '../common/BackPressComponent'
//监听物理键
import { BackHandler } from 'react-native';
import FavoriteDao from "../expand/dao/FavoriteDao"

export default class DetailPage extends Component{
	constructor(props){
		super(props)
		this.params = this.props.navigation.state.params
		//flag标记是从最热还是趋势模块进入的
		const { projectModel,flag } = this.params
		this.favoriteDao = new FavoriteDao(flag);
		const { item } = projectModel
		const {isFavorite} = projectModel
		this.url = item.html_url || TRENDINT_URL + item.fullName
		const title = item.full_name || item.fullName
		this.state = {
			title:title,
			url:this.url,
			canGoBack:false,
			isFavorite:isFavorite
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
	//更改收藏状态
	onFavoriteButtonClick(){
		const { projectModel,callback } = this.params;
		const isFavorite = projectModel.isFavorite = !projectModel.isFavorite
		callback(isFavorite)
		this.setState({
			isFavorite
		})
		let key = projectModel.item.fullName? projectModel.item.fullName:projectModel.item.id.toString()
		if(projectModel.isFavorite){
			this.favoriteDao.saveFavoriteItem(key,JSON.stringify(projectModel))
		}else{
			this.favoriteDao.removeFavoriteItem(key)
		}
	}

	getRightButton(callback){
		return(
			<View style={{flexDirection:'row',alignItems:'center',paddingRight:12}}>
				<TouchableOpacity style={{padding:6,marginRight:6}}
					onPress={()=>this.onFavoriteButtonClick()}
				>
					<AntDesign
						name={this.state.isFavorite?'star':'staro'}
						size={26}
						style={{color:'white'}}/>
				</TouchableOpacity>
				{ViewUtil.getShareButton(()=>{

				})}
			</View>
		)
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
			rightButton ={this.getRightButton()}
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