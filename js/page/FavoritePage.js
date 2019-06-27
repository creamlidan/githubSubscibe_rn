import React,{ Component } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl,DeviceInfo} from 'react-native'
import { createAppContainer,createMaterialTopTabNavigator } from 'react-navigation'
import NavigationUtil from '../navigator/NavigationUtil'
import { connect } from 'react-redux'
import actions from '../action/index'
import NavigationBar from '../common/NavigationBar'
import PopularItem from '../common/PopularItem'
import TrendingItem from '../common/TrendingItem'
import Variates from '../common/Variate'
import FavoriteUtil from "../util/FavoriteUtil";
import {FLAG_STORAGE} from "../expand/dao/DataStore";
import FavoriteDao from "../expand/dao/FavoriteDao";
//收藏功能

import EventTypes from '../util/EventTypes';
import EventBus from 'react-native-event-bus'

export default class FavoritePage extends Component{
	constructor(props){
        super(props)
        this.tabNames = ['最热','趋势']
    }
    _topNavigator(){
        const TopTabNavigator = createMaterialTopTabNavigator({
            'Popular':{
                screen: props => <FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_popular}/>,
    			navigationOptions:{
        			title:'最热'
        		}
			},
			'Trending':{
    			screen:props => <FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_trending}/>,
				navigationOptions:{
    				title:'趋势'
				}
			}
		},{
		    tabBarOptions:{
		        tabStyle:styles.tabStyle,
		            upperCaseLabel:false,//是否使用标签大写 默认为true
		            style:{
		            backgroundColor:Variates.THEME_COLOR,
		                height:30
		        },
		        indicatorStyle:styles.indicatorStyle,
		            labelStyle:styles.labelStyle
		    }
		})
		return createAppContainer(TopTabNavigator)
	}
	render(){
	    const TopTabBar = this._topNavigator()
	    let statusBar = {
	        background:Variates.THEME_COLOR,
	        barStyle:'lignt-content',
	    }
	    let navigationBar = <NavigationBar
		    title = {'收藏'}
		    statusBar = {statusBar}
		    style={{backgroundColor:Variates.THEME_COLOR}}
		/>
		return <View style={{flex:1,marginTop:DeviceInfo.isIPhoneX_deprecated ? 30 : 0}}>
				{navigationBar}
				<TopTabBar/>
			</View>
	}
}

class FavoriteTab extends Component{
	constructor(props){
        super(props)
        const { flag } = this.props
        this.storeName = flag
        debugger
        this.favoriteDao = new FavoriteDao(flag);
    }

    componentDidMount(){
        this._loadData(true);
        EventBus.getInstance().addListener(EventTypes.bottom_tab_select,this.listener = data =>{
            if(data.to === 2){
            	this._loadData(false);
        	}
        })
	}
	componentWillMount(){
	    EventBus.getInstance().removeListener(this.listener)
	}
    _loadData(isShowLoading){
	    const { onLoadRefreshFavorite } = this.props;
	    onLoadRefreshFavorite(this.storeName,isShowLoading)
	}
	_store(){
	    const { favorite } = this.props;
	    let store = favorite[this.storeName] || ''
	    if(!store){
	        store = {
	            isLoading:false,
	            projectModels:[],
	            isLoading:true,//默认会隐藏加载更多
	        }
	    }
	    return store;
	}
	_renderItem($data){
    	const item = $data.item;
    	const Item = this.storeName === FLAG_STORAGE.flag_popular ? PopularItem : TrendingItem;
    	return <Item
    		projectModel = {item}
		    onSelect={(callback)=>{
		        NavigationUtil.goPage({
		            projectModel:item,
		            flag:this.storeName,
		            callback
		        },'DetailPage')
		    }}
			onFavorite={(item,isFavorite)=>this.onFavorite(item,isFavorite)}
		/>
	}
	onFavorite(item, isFavorite) {
	    FavoriteUtil.onFavorite(this.favoriteDao, item, isFavorite, this.props.flag);
	    if (this.storeName === FLAG_STORAGE.flag_popular) {
	        EventBus.getInstance().fireEvent(EventTypes.favorite_changed_popular);
	    } else {
	        EventBus.getInstance().fireEvent(EventTypes.favoriteChanged_trending);
	    }
	}
	render(){
    	let store = this._store();
    	return (
        	<View style={styles.container}>
				<FlatList
					data= {store.projectModels}
					renderItem = {data =>this._renderItem(data)}
					keyExtractor={item=>''+ (item.item.id || item.item.fullName)}
					refreshControl = {
    					<RefreshControl
							title={'Loading'}
							titleColor={Variates.THEME_COLOR}
							colors = {[Variates.THEME_COLOR]}
							refreshing = { store.isLoading }
							onRefresh  = {()=>{
    							this._loadData(true);
							}}
						/>
					}
				/>
			</View>
		)

	}
}
const mapPopularStateProps = state=>({
    favorite: state.favorite,
})
//将dispatch创建函数关联到props里的onLoadPopularData
const mapPopularDispatchProps = dispatch =>({
    onLoadRefreshFavorite:(storeName,isShowLoading) => dispatch(actions.onLoadRefreshFavorite(storeName,isShowLoading)),
})

const FavoriteTabPage = connect(mapPopularStateProps,mapPopularDispatchProps)(FavoriteTab);

const styles = StyleSheet.create({
    container: {
        flex: 1
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