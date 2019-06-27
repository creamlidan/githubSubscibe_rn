import React,{ Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity,ScrollView} from 'react-native'
import NavigationBar from '../common/NavigationBar'
import Variates from '../common/Variate'
import { connect } from 'react-redux'
import actions from '../action/index'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {MORE_MENU} from '../common/MORE_MENU'
import GlobalStyles from "../res/styles/GlobalStyles";
import ViewUtil from '../util/ViewUtil'
import NavigationUtil from '../navigator/NavigationUtil'
class MyPage extends Component{
	_getItem(menu){
		return ViewUtil.getMenuItem(()=>this.onClickItem(menu),menu,Variates.THEME_COLOR)
	}
	onClickItem(menu){
		let RouteName,params = {}
		switch (menu) {
            case MORE_MENU.Tutorial:
                RouteName = 'WebViewPage';
                params.title = '教程';
                params.url = 'https://coding.m.imooc.com/classindex.html?cid=304';
                break;
            case MORE_MENU.About:
                RouteName = 'AboutPage';
                break;
            case MORE_MENU.Custom_Theme:
                const {onShowCustomThemeView} = this.props;
                onShowCustomThemeView(true);
                break;
            case MORE_MENU.CodePush:
                RouteName = 'CodePushPage';
                break;
            case MORE_MENU.Sort_Key:
                RouteName = 'SortKeyPage';
                params.flag = FLAG_LANGUAGE.flag_key;
                break;
            case MORE_MENU.Sort_Language:
                RouteName = 'SortKeyPage';
                params.flag = FLAG_LANGUAGE.flag_language;
                break;
            case MORE_MENU.Custom_Key:
            case MORE_MENU.Custom_Language:
            case MORE_MENU.Remove_Key:
                RouteName = 'CustomKeyPage';
                RouteName = 'CustomKeyPage';
                params.isRemoveKey = menu === MORE_MENU.Remove_Key;
                params.flag = menu !== MORE_MENU.Custom_Language ? FLAG_LANGUAGE.flag_key : FLAG_LANGUAGE.flag_language;
                break;
            case MORE_MENU.About_Author:
                RouteName = 'AboutMePage';
                break;
        }
        if (RouteName) {
            NavigationUtil.goPage(params, RouteName);
        }
	}
	render(){
		let statusBar = {
			background:Variates.THEME_COLOR,
			barStyle:'lignt-content',
		}
		let navigationBar = <NavigationBar
			title = {'我的'}
			statusBar = {statusBar}
			style={{backgroundColor:Variates.THEME_COLOR}}
		/>
		return (
			<View style={GlobalStyles.root_container}>
				{navigationBar}
				<ScrollView>
					<TouchableOpacity 
						onPress={()=>this.onClickItem(MORE_MENU.About)}
						style={styles.item}>
						<View style={styles.about_left}>
							<AntDesign
								name={MORE_MENU.About.icon}
								size={40}
								style={{
									marginRight:10,
									color:Variates.THEME_COLOR
								}}
							/>
							<Text>GitHub Popular</Text>
						</View>
						<AntDesign
							name={'right'}
							size={16}
							style={{
								marginRight:10,
								alignSelf:'center',
								color:Variates.THEME_COLOR,
							}}
						/>
					</TouchableOpacity>
					<View style={GlobalStyles.line}/>
                    {this._getItem(MORE_MENU.Tutorial)}
                    {/*趋势管理*/}
                    <Text style={styles.groupTitle}>趋势管理</Text>
                    {/*自定义语言*/}
                    {this._getItem(MORE_MENU.Custom_Language)}
                    {/*语言排序*/}
                    <View style={GlobalStyles.line}/>
                    {this._getItem(MORE_MENU.Sort_Language)}

                    {/*最热管理*/}
                    <Text style={styles.groupTitle}>最热管理</Text>
                    {/*自定义标签*/}
                    {this._getItem(MORE_MENU.Custom_Key)}
                    {/*标签排序*/}
                    <View style={GlobalStyles.line}/>
                    {this._getItem(MORE_MENU.Sort_Key)}
                    {/*标签移除*/}
                    <View style={GlobalStyles.line}/>
                    {this._getItem(MORE_MENU.Remove_Key)}

                    {/*设置*/}
                    <Text style={styles.groupTitle}>设置</Text>
                    {/*自定义主题*/}
                    {this._getItem(MORE_MENU.Custom_Theme)}
                    {/*关于作者*/}
                    <View style={GlobalStyles.line}/>
                    {this._getItem(MORE_MENU.About_Author)}
                    <View style={GlobalStyles.line}/>
                    {/*反馈*/}
                    {this._getItem(MORE_MENU.Feedback)}
                    <View style={GlobalStyles.line}/>
                    {this._getItem(MORE_MENU.CodePush)}
				</ScrollView>
			</View>
		)
	}
}
const mapTrendingStateToProps = state =>({

})
const mapTrendingDispatchToProps = dispatch =>({
	onThemeChange:theme => dispatch(actions.onThemeChange(theme))
})

export default connect(mapTrendingStateToProps,mapTrendingDispatchToProps)(MyPage)

var styles = StyleSheet.create({
	about_left:{
		alignItems:'center',
		flexDirection:'row'
	},
	item:{
		height:90,
		backgroundColor:'white',
		padding:10,
		alignItems:'center',
		justifyContent:'space-between',
		flexDirection:'row'
	},
	groupTitle:{
		color:'gray',
		fontSize:12,
		marginLeft:10,
		marginTop:10,
		marginBottom:5,
	}
})