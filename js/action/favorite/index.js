import Types from '../types'
import DataStore,{FLAG_STORAGE} from '../../expand/dao/DataStore'
import FavoriteDao from '../../expand/dao/FavoriteDao'
import { _projectModels,handleData } from '../ActionUtil'
import ProjectModel from "../../model/ProjectModel";
/*
 * 获取最热数据异步action
 * @param storeName 需要获取数据的name：java/android....
 * @param url 请求的url
 */
export function onLoadRefreshFavorite(flag,isShowLoading){
    return dispatch =>{
        if(isShowLoading){
            dispatch({type:Types.FAVORITE_LOAD_DATA,storeName:flag});
        }
        new FavoriteDao(flag).getAllItems()
            .then(items=>{
                let resultData = [];
                for(let i = 0,len = items.length; i<len; i++){
                    resultData.push(new ProjectModel(items[i],true))
                }
                dispatch({
                    type:Types.FAVORITE_LOAD_SUCCESS,
                    projectModels:resultData,
                    storeName:flag
                })
            })
            .catch(e=>{
                console.log(e)
                dispatch({
                    type:Types.FAVORITE_LOAD_FAIL,
                    error:'no more',
                    storeName:flag,
                })
            })
    }
}
