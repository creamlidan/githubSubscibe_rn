import Types from '../../action/types'
import Variates from '../../common/Variate'

//默认
const defaultState = {
	theme:Variates.THEME_COLOR
}
export default function onAction(state = defaultState,action){
	switch(action.type){
		case Types.THEME_CHANGE:
			return {
				...state,
				theme: action.theme
			};
		default:
			return state;
	}
}