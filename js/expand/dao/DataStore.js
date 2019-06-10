import AsyncStorage from '@react-native-community/async-storage'

export default class DataStore{
	//入口方法
	fetchData(url){
		return new Promise((resolve,reject)=>{
			this.fetchLocalData(url).then((wrapData) =>{
				console.log('wrapData---------'+wrapData)
				console.log('DataStore---------'+DataStore.checkTimeStampValid(wrapData.timestamp))
				if(wrapData && DataStore.checkTimeStampValid(wrapData.timestamp)){
					resolve(wrapData)
				}else{
					this.fetchNetData(url).then((data)=>{
						resolve(this._wrapData(data))
					}).catch((error)=>{
						reject(error)
					})
				}
			}).catch((error)=>{
				this.fetchNetData(url).then((data)=>{
					resolve(this._wrapData(data))
				}).catch((error)=>{
					reject(error)
				})
			})
		})
	}
	/**保存数据**/
	saveData(url, data, callback){
		if(!data || !url) return;
		AsyncStorage.setItem(url,JSON.stringify(this._wrapData(data)),callback)
	}
	//增加时间错
	_wrapData(data) {
		return {data:data,timestamp:new Date().getTime()}
	}
	//读取本地数据
	fetchLocalData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
            	console.log(result)
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                        console.error(e);
                    }
                } else {
                    reject(error);
                    console.error(error);
                }
            })
        })
    }
	//从网络获取数据
	fetchNetData(url){
		return new Promise((resolve,reject)=>{
			fetch(url)
			.then((response)=>{
				if(response.ok){
					return response.json();
				}
				throw new Error('Network response was not ok.')
			})
			.then((responseData)=>{
				this.saveData(url,responseData)
				resolve(responseData)
			})
			.catch((error) =>{
				reject(error)
			})
		})
	}

	/*
	* 检查timestamp是否在有效期内
	* @param timestamp 项目更新时间
	* @return true 不需要更新，false需要更新
	*/
	static checkTimeStampValid(timestamp){
		const currentDate = new Date();
		const targetDate = new Date();
		targetDate.setTime(timestamp);
		if(currentDate.getMonth() !== targetDate.getMonth()) return false;
		if(currentDate.getDate() !== targetDate.getDate()) return false;
		if(currentDate.getHours() - targetDate.getHours() > 4) return false;
		//if(currentDate.getMinutes() - targetDate.getMinutes() > 1 )return false; 
		return true;
	}
}