import Types from '../types'
//action方法必须携带一个type,类型为string
export function onThemeChange(theme){
	return {type:Types.THEME_CHANGE,theme:theme}
}
