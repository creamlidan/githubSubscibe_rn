import React,{ Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList, RefreshControl, TouchableOpacity, ActivityIndicator,DeviceInfo} from 'react-native'
import { createAppContainer,createMaterialTopTabNavigator } from 'react-navigation'
import NavigationUtil from '../navigator/NavigationUtil'
import { connect } from 'react-redux'
import actions from '../action/index'
import Toast from 'react-native-easy-toast'
import NavigationBar from '../common/NavigationBar'
import PopularItem from '../common/PopularItem'
const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars' //排序方式默认是star
import Variates from '../common/Variate'
import FavoriteUtil from "../util/FavoriteUtil";
import {FLAG_STORAGE} from "../expand/dao/DataStore";
const PAGESIZE = 10
//收藏功能
import FavoriteDao from "../expand/dao/FavoriteDao";
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);

//监听总线通知
import EventTypes from '../util/EventTypes';
import EventBus from 'react-native-event-bus'

export default class PopularPage extends Component{
	constructor(props){
		super(props)
		this.tabNames = ['Java','Android','iOS','React','React Native','PHP']
	}
	//循环生成tab
	_renderTabs(){
		const tabs = {}
		this.tabNames.map((item,i)=>{
/*			tabs[`tab${i}`] = {
				screen:PopularTab,
				navigationOptions:{
					title:`${item}`
				}
			}*/
			//如果需要传递参数
			tabs[`tab${i}`] = {
				screen: props => <PopularTabPage {...props} tabLabel={item}/>,
				navigationOptions:{
					title:`${item}`
				}
			}
		})
		return tabs
	}

	_topNavigator(){
		const TopTabNavigator = createMaterialTopTabNavigator(
			this._renderTabs(),{
				tabBarOptions:{
					tabStyle:styles.tabStyle,
					upperCaseLabel:false,//是否使用标签大写 默认为true
					scrollEnabled:true,//是否支持选项卡滚动 默认为false
					style:{
						backgroundColor:Variates.THEME_COLOR,
						height:30
					},
					indicatorStyle:styles.indicatorStyle,
					labelStyle:styles.labelStyle
				}
			}
		)
		return createAppContainer(TopTabNavigator)
	}
	render(){
		const TopTabBar = this._topNavigator()
		let statusBar = {
			background:Variates.THEME_COLOR,
			barStyle:'lignt-content',
		}
		let navigationBar = <NavigationBar
			title = {'最热'}
			statusBar = {statusBar}
			style={{backgroundColor:Variates.THEME_COLOR}}
		/>
		return <View style={{flex:1,marginTop:DeviceInfo.isIPhoneX_deprecated ? 30 : 0}}>
			{navigationBar}
			<TopTabBar/>
		</View>
	}
}

class PopularTab extends Component{
	constructor(props){
		super(props)
		const { tabLabel } = this.props
		this.storeName = tabLabel
		//默认收藏页面时没有发送收藏取消通知
		this.isFavoriteChanged = false
	}
	componentDidMount(){
		this._loadData()
		EventBus.getInstance().addListener(EventTypes.favorite_changed_popular,this.favoriteChangeListener  = data =>{
			this.isFavoriteChanged = true
		})
		EventBus.getInstance().addListener(EventTypes.bottom_tab_select,this.bottomTabSelectListener = (data)=>{
			if(data.to === 0 && this.isFavoriteChanged){
				this._loadData(null,true)
			}
		})
	}
	componentWillUnmount() {
		EventBus.getInstance().removeListener(this.favoriteChangeListener);
		EventBus.getInstance().removeListener(this.bottomTabSelectListener);
	}
	_loadData(loadMore,refreshFavorite){
		const { onLoadRefreshPopular,onLoadMorePopular,onFlushPopularFavorite } = this.props;
		const store = this._store();
		let url = this._getFatchUrl(this.storeName)
		if(loadMore){
			onLoadMorePopular(this.storeName,++store.pageIndex,PAGESIZE,store.items,favoriteDao,callback =>{
				this.refs.toast.show('没有更多了~');
			})
		}else if(refreshFavorite){
			onFlushPopularFavorite(this.storeName,store.pageIndex,PAGESIZE,store.items,favoriteDao)
		}else{
			onLoadRefreshPopular(this.storeName, url, PAGESIZE, favoriteDao)
		}
		
	}
	_getFatchUrl(key){
		return URL + key + QUERY_STR; 
	}
	_renderItem($data){
		const item = $data.item;
		return <PopularItem
			projectModel = {item}
			onSelect={(callback)=>{
				NavigationUtil.goPage({
					projectModel:item,
					flag:FLAG_STORAGE.flag_popular,
					callback
				},'DetailPage')
			}}
			onFavorite={(item,isFavorite)=>FavoriteUtil.onFavorite(favoriteDao,item,isFavorite,FLAG_STORAGE.flag_popular)}
		/>
	}
	_store(){
		const { popular } = this.props;
		let store = popular[this.storeName] || ''
		if(!store){
			store = {
				items:[],
				isLoading:false,
				pageIndex:1,
				projectModels:[],
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
	render(){
		let store = this._store();
		return (
			<View style={styles.container}>
				<FlatList
					data= {store.projectModels}
					renderItem = {data =>this._renderItem(data)}
					keyExtractor={item=>''+item.item.id}
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

const mapPopularStateProps = state=>({
	popular:state.popular
})
//将dispatch创建函数关联到props里的onLoadPopularData
const mapPopularDispatchProps = dispatch =>({
	onLoadRefreshPopular:(storeName,url,pageSize,favoriteDao) => dispatch(actions.onLoadRefreshPopular(storeName,url,pageSize,favoriteDao)),
	onLoadMorePopular:(storeName,pageIndex,pageSize,items,favoriteDao,callback) => dispatch(actions.onLoadMorePopular(storeName,pageIndex,pageSize,items,favoriteDao,callback)),
	onFlushPopularFavorite:(storeName,pageIndex,pageSize,items,favoriteDao) => dispatch(actions.onLoadMorePopular(storeName,pageIndex,pageSize,items,favoriteDao))
})

const PopularTabPage = connect(mapPopularStateProps,mapPopularDispatchProps)(PopularTab);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	tabStyle:{
		padding:0
	},
	indicatorStyle:{
		height:2,
		backgroundColor:'white',
	},
	labelStyle:{
		fontSize:13,
		fontWeight:'bold',
		margin:0
	},
	indicatorContainer:{
		alignItems:'center',
		marginBottom:10,
	},
	indicator:{
		marginTop:10,
	}
});
