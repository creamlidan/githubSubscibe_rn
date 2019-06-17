import Types from '../types'
import DataStore,{FLAG_STORAGE} from '../../expand/dao/DataStore'
import { handleData } from '../ActionUtil'
/*
* 获取最热数据异步action
* @param storeName 需要获取数据的name：java/android....
* @param url 请求的url
*/

export function onLoadRefreshTrending(storeName,url,pageSize,){
	return dispatch =>{
		dispatch({type:Types.TRENDING_REFRESH,storeName:storeName});
		let dataStore = new DataStore();
		dataStore.fetchData(url,FLAG_STORAGE.flag_trending)
			.then(data=>{
				handleData(Types.TRENDING_REFRESH_SUCCESS,dispatch,storeName,data,pageSize);
			})
			.catch(error=>{
				console.log(error);
				dispatch({
					type:Types.TRENDING_REFRESH_FAIL,
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

export function onLoadMoreTrending(storeName,pageIndex,pageSize,dataArray = [],callback){
	return dispatch =>{
		setTimeout(()=>{
			if((pageIndex-1) * pageSize >= dataArray.length){
				//已经记载完成了
				if(typeof callback === 'function'){
					callback('no more')
				}
				dispatch({
					type:Types.TRENDING_LOAD_MORE_FAIL,
					error:'no more',
					storeName:storeName,
					pageIndex:--pageIndex,
					projectModes:dataArray
				})
			}else{
				//本次和载入的最大数量
				let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
				dispatch({
					type:Types.TRENDING_LOAD_MORE_SUCCESS,
					storeName,
					pageIndex,
					projectModes:dataArray.slice(0,max)
				})
			}
		},500)
	}
}
