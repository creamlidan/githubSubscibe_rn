import {FLAG_STORAGE} from '../expand/dao/DataStore'
/*
* favoriteIcon 单机回调函数
* **/
export default class FavoriteUtil{
    debugger
    static onFavorite(favoriteDao,item,isFavorite,flag){
        const key = flag === FLAG_STORAGE.flag_trending?item.fullName:item.id.toString()
        if(isFavorite){
            favoriteDao.saveFavoriteItem(key,JSON.stringify(item))
        }else{
            favoriteDao.removeFavoriteItem(key)
        }
    }
}
