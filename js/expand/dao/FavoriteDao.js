import AsyncStorage from '@react-native-community/async-storage';
const FAVORITR_KEY_PREFIX = 'favorite_'
export default class FavoriteDao{
	//flag标识是最热模块的收藏还是趋势模块
	constructor(flag){
		this.favoriteKey = FAVORITR_KEY_PREFIX + flag;
	}

	/*
	* 收藏项目
	* @param key 项目id
	* @param value 收藏的项目
	* @param callback
	*/
	saveFavoriteItem(key,value,callback){
		AsyncStorage.setItem(key,value)
		this.updateFavoriteKeys(key,true);
	}
	/*
	* 更新favorite key集合
	* @param key
	* @param isAdd true添加,false 删除
	*/

	updateFavoriteKeys(key,isAdd){
		AsyncStorage.getItem(this.favoriteKey,(error,result)=>{
			if(!error){
				let favoriteKeys = [];
				if(result){
					favoriteKeys = JSON.parse(result);
				}
				let index = favoriteKeys.indexOf(key)
				if(isAdd){//如果是添加且key不存在则添加到数组
					if(index === -1){
						favoriteKeys.push(key)
					}
				}else{
					if(index !== -1){//如果是添加且key存在则将其从数值中移除
						favoriteKeys.splice(index,1)
					}
				}
				AsyncStorage.setItem(this.favoriteKey,JSON.stringify(favoriteKeys))
			}
		})
	}

	/*
	* removeFavoriteItem(key)
	*
	**/
	removeFavoriteItem(key){
		AsyncStorage.getItem(key,(error,result)=>{
			if(!error){
				this.updateFavoriteKeys(key,false);
			}
		})
	}

/**
 * 获取收藏的Repository对应的key
 * @return {Promise}
 */
	getFavoriteKeys() {
		return new Promise((resolve, reject) => {
			AsyncStorage.getItem(this.favoriteKey, (error, result) => {
				if (!error) {
					try {
						resolve(JSON.parse(result));
					} catch (e) {
						reject(error);
					}
				} else {
					reject(error);
				}
			});
		});
	}

	/**
     * 获取所以收藏的项目
     * @return {Promise}
     */
    getAllItems() {
        return new Promise((resolve, reject) => {
            this.getFavoriteKeys().then((keys) => {
                let items = [];
                if (keys) {
                    AsyncStorage.multiGet(keys, (err, stores) => {
                        try {
                            stores.map((result, i, store) => {
                                // get at each store's key/value so you can work with it
                                let key = store[i][0];
                                let value = store[i][1];
                                if (value) items.push(JSON.parse(value));
                            });
                            resolve(items);
                        } catch (e) {
							reject(e);
                        }
                    });
                } else {
                    resolve(items);
                }
            }).catch((e) => {
                reject(e);
            })
        })
    }
}