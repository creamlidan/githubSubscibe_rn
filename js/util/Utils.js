export default class Utils{
    /*
    * ���Item�Ƿ��ղ�
    * **/
    static checkFavorite(item,keys=[]){
        if(!keys) return false;
        for(let i = 0,len = keys.length; i < len; i++){
            let id = item.id?item.id:item.fullName
            if(id.toString() === keys[i].toString()){
                return true;
            }
        }
        return false;
    }
}