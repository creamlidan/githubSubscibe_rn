import Types from '../types'
import DataStore,{FLAG_STORAGE} from '../../expand/dao/DataStore'
import { _projectModels,handleData } from '../ActionUtil'
/*
* 获取最热数据异步action
* @param storeName 需要获取数据的name：java/android....
* @param url 请求的url
*/
export function onLoadRefreshPopular(storeName,url,pageSize,favoriteDao){
	return dispatch =>{
		dispatch({type:Types.POPULAR_REFRESH,storeName:storeName});
		let dataStore = new DataStore();
		dataStore.fetchData(url,FLAG_STORAGE.flag_popular)
			.then(data=>{
				handleData(Types.POPULAR_REFRESH_SUCCESS,dispatch,storeName,data,pageSize,favoriteDao);
			})
			.catch(error=>{
				console.log(error);
				dispatch({
					type:Types.POPULAR_REFRESH_FAIL,
					error,
					storeName,
				})
			})
	}
}

/**
* 加载更多
* pageIndex 第几页
* pageSize 一次多少条
* @ dataArray:元素数据
* @ callback 回调函数,可以通过回调函数来向调用页面通信：比如异常信息展示，节省等待时长
*/

export function onLoadMorePopular(storeName,pageIndex,pageSize,dataArray = [],favoriteDao,callback){
	return dispatch =>{
		setTimeout(()=>{
			if((pageIndex-1) * pageSize >= dataArray.length){
				//已经记载完成了
				if(typeof callback === 'function'){
					callback('no more')
				}
				dispatch({
					type:Types.POPULAR_LOAD_MORE_FAIL,
					error:'no more',
					storeName:storeName,
					pageIndex:--pageIndex,
					projectModels:dataArray
				})
			}else{
				//本次和载入的最大数量
				let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
				_projectModels(dataArray.slice(0,max),favoriteDao,(data)=>{
					dispatch({
						type:Types.POPULAR_LOAD_MORE_SUCCESS,
						storeName,
						pageIndex,
						projectModels:data
					})
				})
			}
		},500)
	}
}

/**
 * 刷新收藏
 * ****/
export function onFlushPopularFavorite(storeName,pageIndex,pageSize,dataArray = [],favoriteDao){
	return dispatch=>{
		let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
		_projectModels(dataArray.slice(0,max),favoriteDao,(data)=>{
			dispatch({
				type:Types.FLUSH_POPULAR_FAVORITE,
				storeName,
				pageIndex,
				projectModels:data
			})
		})
	}
}
