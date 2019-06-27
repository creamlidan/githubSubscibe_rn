import React,{ Component } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import NavigationUtil from "../../navigator/NavigationUtil";
import {MORE_MENU} from "../../common/MORE_MENU";
import ViewUtil from "../../util/ViewUtil";
import Variates from '../../common/Variate'
import AboutCommon from "./AboutCommon";
import config from '../../res/data/config'
import GlobalStyles from "../../res/styles/GlobalStyles";
export default class AboutPage extends Component{
	constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.aboutCommon = new AboutCommon({
                ...this.params,
                navigation: this.props.navigation,
                flagAbout: 'about',
            }, data => this.setState({...data})
        );
        this.state = {
            data: config,
        }
    }
    componentDidMount() {
        this.aboutCommon.componentDidMount();
    }

    componentWillUnmount() {
        this.aboutCommon.componentWillUnmount();
    }
    getItem(menu) {
        return ViewUtil.getMenuItem(() => this.onClick(menu), menu, Variates.THEME_COLOR);
    }
    render() {
        const content = <View>
            {this.getItem(MORE_MENU.Tutorial)}
            <View style={GlobalStyles.line}/>
            {this.getItem(MORE_MENU.About_Author)}
            <View style={GlobalStyles.line}/>
            {this.getItem(MORE_MENU.Feedback)}
        </View>;
        return this.aboutCommon.render(content, this.state.data.app);
    }

}