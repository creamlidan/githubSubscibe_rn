import Types from '../../action/types'

const defaultState = {};

/*
* favorite{
*   popular:{
*       projectModels:[],
*       isLoading:false
*   },
*   trending:{
*       projectModels:[],
*       isLoading:false
*   }
* }
*
*
* ****/
export default function onAction(state = defaultState,action){
    switch(action.type){
        //下拉刷新成功
        case Types.FAVORITE_LOAD_SUCCESS:
            return {
                ...state,//生成一个state副本
                [action.storeName]:{
                    ...state[action.storeName],
                    projectModels:action.projectModels,//此次需要加载的数据
                    isLoading:false,
                }
            };
        //下拉刷新
        case Types.FAVORITE_LOAD_DATA:
            return{
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    isLoading:true
                }
            };
        //下拉刷新失败
        case Types.POPULAR_REFRESH_FAIL:
            return{
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    isLoading:false,
                }
            };
        default:
            return state;
    }
}