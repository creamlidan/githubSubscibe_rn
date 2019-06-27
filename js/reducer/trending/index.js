import Types from '../../action/types'
const defaultState = {};
/*
* Trending:{
*	java:{
*		item:[],
*		isLoading:false
*	},
*	ios:{
*		item:[],
*		isLoading:false
*	}
* }
* @params state
* @params action
*
*/
export default function onAction(state = defaultState,action){
	switch(action.type){
		//下拉刷新成功
		case Types.TRENDING_REFRESH_SUCCESS:
			return {
				...state,//生成一个state副本
				[action.storeName]:{
					...state[action.storeName],
					items:action.items,//原始数据
					projectModels:action.projectModels,//此次需要加载的数据
					isLoading:false,
					hideLoadingMore: false,
                    pageIndex: action.pageIndex
				}
			};
		//下拉刷新
		case Types.TRENDING_REFRESH:
			return{
				...state,
				[action.storeName]:{
					...state[action.storeName],
					isLoading:true,
					hideLoadingMore: true,
				}
			};
		//下拉刷新失败
		case Types.TRENDING_REFRESH_FAIL:
			return{
				...state,
				[action.storeName]:{
					...state[action.storeName],
					isLoading:false,
				}
			};
		//上拉加载更多
		case Types.TRENDING_LOAD_MORE_SUCCESS:
			return {
				...state,
				[action.storeName]:{
					...state[action.storeName],
					projectModels:action.projectModels,
					hideLoadingMore:false,
					pageIndex:action.pageIndex
				}
			}
		case Types.TRENDING_LOAD_MORE_FAIL:
			return {
				...state,
				[action.storeName]:{
					...state[action.storeName],
					hideLoadingMore:true,
					pageIndex:action.pageIndex
				}
			}
		case Types.FLUSH_TRENDING_FAVORITE:
			return {
				...state,
				[action.storeName]:{
					...state[action.storeName],
					projectModels:action.projectModels,
			}
		}
		default:
			return state;
	}
}