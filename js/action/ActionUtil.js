import ProjectModel from "../model/ProjectModel";
import Utils from "../util/Utils";
/*
* 数据处理
* @param actionType
* @param dispatch
* @param storeName
* @param data
* @param pageSize
*/
export function handleData(actionType,dispatch,storeName,data,pageSize,favoriteDao){
	let fixItems = [];
	if(data && data.data){
		if( Array.isArray(data.data)){
			fixItems = data.data
		}else if(Array.isArray(data.data.items)){
			fixItems = data.data.items
		}
	}
	let showItems = pageSize>fixItems.length?fixItems:fixItems.slice(0,pageSize)
	_projectModels(showItems,favoriteDao,projectModels=>{
		dispatch({
			type:actionType,
			projectModels:projectModels,
			storeName,
			items:fixItems,
			pageIndex:1
		})
	})
}

export async function _projectModels(showItems,favoriteDao,callback){
	let keys=[];
	try{
		keys = await favoriteDao.getFavoriteKeys();
	} catch(e){
		console.log(e)
	}
	let projectModels = [];
	for(let i= 0,len = showItems.length; i < len;i++){
		//Util.checkFavorite遍历当前项是否被收藏
		//ProjectModel 为数据添加isFavorite
		projectModels.push(new ProjectModel(showItems[i],Utils.checkFavorite(showItems[i],keys)))
	}
	if(typeof callback === 'function'){
		callback(projectModels);
	}
}