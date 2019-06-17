
/*
* 数据处理
* @param actionType
* @param dispatch
* @param storeName
* @param data
* @param pageSize
*/
export function handleData(actionType,dispatch,storeName,data,pageSize){
	let fixItems = [];
	if(data && data.data){
		if( Array.isArray(data.data)){
			fixItems = data.data
		}else if(Array.isArray(data.data.items)){
			fixItems = data.data.items
		}
	}
	if(data && data.data && data.data.items){
		fixItems = data.data.items;
	}
	dispatch({
		type:actionType,
		projectModes:pageSize>fixItems.length?fixItems:fixItems.slice(0,pageSize),
		storeName,
		items:fixItems,
		pageIndex:1
	})
}