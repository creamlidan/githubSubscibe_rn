export default class NavigationUtil {
	/**
	* 去页面
	**/
	static goPage(params,$route){
		const navigation = NavigationUtil.navigation
		navigation.navigate($route, {...params})
	}
	/**
	* 返回上一页
	**/
	static goBack(navigation){
		navigation.goBack();
	}
	/**
	* 重置到主页面
	**/
	static resetToHomePage(params){
		const { navigation } = params;
		navigation.navigate('Main')
	}
}