import React,{ Component } from 'react';
import { StyleSheet, 
	Text, 
	View, 
	Button, 
	FlatList,
	RefreshControl,
	ActivityIndicator,
	DeviceInfo,
	TouchableOpacity,
	DeviceEventEmitter
} from 'react-native'
import { createAppContainer,createMaterialTopTabNavigator } from 'react-navigation'
import Toast from 'react-native-easy-toast'
import { connect } from 'react-redux'
import actions from '../action/index'
import TrendingItem from '../common/TrendingItem'
import NavigationBar from '../common/NavigationBar'
import Variates from '../common/Variate'
import NavigationUtil from '../navigator/NavigationUtil'
import AntDesign from 'react-native-vector-icons/AntDesign'

import TrendingDialog ,{ TimeSpans }from '../common/TrendingDialog'
const URL = 'https://github.com/trending/';
const PAGESIZE = 10
const EVENT_TYPE_TIME_SPAN_CHANGE = 'EVENT_TYPE_TIME_SPAN_CHANGE'
import FavoriteUtil from "../util/FavoriteUtil";
import {FLAG_STORAGE} from "../expand/dao/DataStore";
//收藏功能
import FavoriteDao from "../expand/dao/FavoriteDao";
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_trending);

//监听总线通知
import EventTypes from '../util/EventTypes';
import EventBus from 'react-native-event-bus'

export default class TrendingPage extends Component{
	constructor(props){
		super(props)
		this.tabNames = ['All','C','C#','PHP','JavaScript'],
		this.state = {
			timeSpan:TimeSpans[0]
		}
	}
	_renderTabs(){
		const tabs = {}
		this.tabNames.map((item,i)=>{
			tabs[`tab${i}`] = {
				screen: props => <TrendingTabPage {...props} timeSpan={this.state.timeSpan} tabLabel={item}/>,
				navigationOptions:{
					title:`${item}`
				}
			}
		})
		return tabs
	}
	_topNavigator(){
		/*
		* 为了避免每次切换点击timespan都刷新tabNav所以将tabNav保存起来
		* 保存起来会导致点击不刷新下面列表所以需要注册监听一个方法
		*/
		if(!this.TopTabNavigator){
			this.TopTabNavigator = createAppContainer(createMaterialTopTabNavigator(
				this._renderTabs(),{
					tabBarOptions:{
						tabStyle:styles.tabStyle,
						upperCaseLabel:false,//是否使用标签大写 默认为true
						scrollEnabled:true,//是否支持选项卡滚动 默认为false
						style:{
							backgroundColor:Variates.THEME_COLOR,
							height:30// flx 开启scrollEnabled后在安卓上初次加载闪烁
						},
						indicatorStyle:styles.indicatorStyle,
						labelStyle:styles.labelStyle
					}
				}
			))
		}
		return this.TopTabNavigator
	}
	_renderTitleView(){
		return <TouchableOpacity
				underlayColor='transparent'
				onPress={()=>{this.dialog.show()}}
			>
				<View style={{flexDirection:'row',alignItems:'center'}}>
					<Text style={{
						fontSize:18,
						color:'white',
						fontWeight:'400'
					}}
					>趋势  {this.state.timeSpan.showText}</Text>
					<AntDesign
						name={'caretdown'}
						fontSize={22}
						style={{color:'white',marginLeft:4}}
					/>
				</View>
		</TouchableOpacity>
	}
	_renderTrendingDialog(){
		return <TrendingDialog
			ref={dialog => this.dialog = dialog}
			onSelect={tab=>this.onSelectTimeSpan(tab)}
		/>
	}
	onSelectTimeSpan(tab){
		this.dialog.dismiss();
		this.setState({
			timeSpan:tab
		})
		//当用户点击的时候发送一个指令
		DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE,tab)
	}
	render(){
		let statusBar = {
			background:Variates.THEME_COLOR,
			barStyle:'lignt-content',
		}
		let navigationBar = <NavigationBar
			titleView = {this._renderTitleView()}
			statusBar = {statusBar}
			style={{backgroundColor:Variates.THEME_COLOR}}
		/>
		const TopTabBar = this._topNavigator()
		return <View style={{flex:1,marginTop:DeviceInfo.isIPhoneX_deprecated ? 30 : 0}}>
			{navigationBar}
			<TopTabBar/>
			{this._renderTrendingDialog()}
		</View>
	}
}

class TrendingTab extends Component{
	constructor(props){
		super(props)
		const { tabLabel,timeSpan } = this.props
		this.storeName = tabLabel
		this.timeSpan = timeSpan
	}
	componentDidMount(){
		this._loadData()
		//当装载完成组件的时候监听EVENT_TYPE_TIME_SPAN_CHANGE
		this.timeSpanChangeListener = DeviceEventEmitter.addListener(EVENT_TYPE_TIME_SPAN_CHANGE,(timeSpan)=>{
			this.timeSpan = timeSpan
			this._loadData()
		})
		EventBus.getInstance().addListener(EventTypes.favoriteChanged_trending, this.favoriteChangeListener = () => {
            this.isFavoriteChanged = true;
        });
        EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.bottomTabSelectListener = (data) => {
            if (data.to === 1 && this.isFavoriteChanged) {
                this._loadData(null, true);
            }
        })
	}
	//当卸载组件的时候移除监听EVENT_TYPE_TIME_SPAN_CHANGE
	componentWillUnmount(){
		if(this.timeSpanChangeListener){
			this.timeSpanChangeListener.remove();
		}
		EventBus.getInstance().removeListener(this.favoriteChangeListener);
        EventBus.getInstance().removeListener(this.bottomTabSelectListener);
	}
	_loadData(loadMore,refreshFavorite){
		const { onLoadRefreshTrending,onLoadMoreTrending,onFlushTrendingFavorite } = this.props;
		const store = this._store();
		let url = this._getFatchUrl(this.storeName)
		if(loadMore){
			onLoadMoreTrending(this.storeName,++store.pageIndex,PAGESIZE,store.items,favoriteDao,callback =>{
				this.refs.toast.show('没有更多了~');
			})
		}else if(refreshFavorite){
			debugger
			onFlushTrendingFavorite(this.storeName,store.pageIndex,PAGESIZE,store.items,favoriteDao)
			this.isFavoriteChanged = false;
		}else{
			onLoadRefreshTrending(this.storeName,url,PAGESIZE,favoriteDao)
		}
		
	}
	_getFatchUrl(key){
		return URL + key + '?' + this.timeSpan.searchText;
	}
	_store(){
		const { trending } = this.props;
		let store = trending[this.storeName] || ''
		if(!store){
			store = {
				items:[],
				isLoading:false,
				pageIndex:1,
				projectModes:[],
				hideLoadingMore:true,//默认会隐藏加载更多
			}
		}
		return store;
	}
	_createListFooter(){
		return (
			this._store().hideLoadingMore?null:
			<View style={styles.indicatorContainer}>
				<ActivityIndicator
					style={styles.indicator}
					size = 'small'
					animating = {true}
					color ='red'
				/>
				<Text>加载更多...</Text>
			</View>
		)
	}
	_renderItem($data){
		const item = $data.item;
		return <TrendingItem
			projectModel = {item}
			onSelect={(callback)=>{
				NavigationUtil.goPage({
					projectModel:item,
					flag:FLAG_STORAGE.flag_trending,
					callback
				},'DetailPage')
			}}
			onFavorite={(item,isFavorite)=>FavoriteUtil.onFavorite(favoriteDao,item,isFavorite,FLAG_STORAGE.flag_trending)}
		/>
	}
	render(){
		let store = this._store();
		return(
			<View style={styles.container}>
				<FlatList
					data= {store.projectModels}
					renderItem = {data =>this._renderItem(data)}
					keyExtractor={item=>'trengding'+(item.item.id || item.item.fullName)}
					refreshControl = {
						<RefreshControl
							title={'Loading'}
							titleColor={Variates.THEME_COLOR}
							colors = {[Variates.THEME_COLOR]}
							refreshing = { store.isLoading }
							onRefresh  = {()=>{
								this._loadData();
							}}
						/>
					}
					ListFooterComponent = {()=> this._createListFooter()}
					onEndReached ={()=>{
						//为避免onMomentumScrillBegin方法在莫名原因下后只需导致一直显示加载
						setTimeout(()=>{
							if(this.canLoadMore){
								this._loadData(true);
								this.canLoadMore = false;
							}
						},100)
					}}
					onEndReachedThreshold={0.1}
					onMomentumScrollBegin ={()=>{
						//配置此方法防止多次触底
						this.canLoadMore = true;
					}}
				/>
				<Toast ref={'toast'}
					position={'center'}
				/>
			</View>
		)
	}
}

const mapTrendingStateProps = state=>({
	trending:state.trending
})

const mapTrendingDispatchProps = dispatch =>({
	onLoadRefreshTrending:(storeName,url,pageSize,favoriteDao) => dispatch(actions.onLoadRefreshTrending(storeName,url,pageSize,favoriteDao)),
	onLoadMoreTrending:(storeName,pageIndex,pageSize,items,favoriteDao,callback) => dispatch(actions.onLoadMoreTrending(storeName,pageIndex,pageSize,items,favoriteDao,callback)),
	onFlushTrendingFavorite:(storeName,pageIndex,pageSize,items,favoriteDao) => dispatch(actions.onFlushTrendingFavorite(storeName,pageIndex,pageSize,items,favoriteDao))
})
const TrendingTabPage = connect(mapTrendingStateProps,mapTrendingDispatchProps)(TrendingTab);
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	tabStyles:{
		padding:0,
	},
	indicatorStyle:{
		height:2,
		backgroundColor:'white',
	},
	labelStyle:{
		fontSize:13,
		fontWeight:'bold',
		margin:0,
	},
	indicatorContainer:{
		alignItems:'center',
		marginBottom:10,
	},
	indicator:{
		marginTop:10,
	}
});