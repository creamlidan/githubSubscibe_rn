import React,{ Component } from 'react';
import { StyleSheet, Text, View } from 'react-native'
//监听物理键
import { BackHandler } from 'react-native';
export default class BackPressComponent {
	constructor(props){
		this._hardwareBackPress = this.onHardwareBackPress.bind(this);
		this.props = props;
	}
	componentDidMount() {
        if (this.props.backPress) BackHandler.addEventListener('hardwareBackPress', this._hardwareBackPress);
    }

    componentWillUnmount() {
        if (this.props.backPress) BackHandler.removeEventListener('hardwareBackPress', this._hardwareBackPress);
    }

    onHardwareBackPress(e) {
        return this.props.backPress(e);
    }

}