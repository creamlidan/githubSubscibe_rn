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
        //����ˢ�³ɹ�
        case Types.FAVORITE_LOAD_SUCCESS:
            return {
                ...state,//����һ��state����
                [action.storeName]:{
                    ...state[action.storeName],
                    projectModels:action.projectModels,//�˴���Ҫ���ص�����
                    isLoading:false,
                }
            };
        //����ˢ��
        case Types.FAVORITE_LOAD_DATA:
            return{
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    isLoading:true
                }
            };
        //����ˢ��ʧ��
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