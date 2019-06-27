import React,{ Component } from 'react';
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import {PropTypes} from 'prop-types'
import AntDesign from 'react-native-vector-icons/AntDesign'
export default class BaseItem extends Component {
    static propTypes ={
        projectModel:PropTypes.object,
        onSelect:PropTypes.func,
        onFavorite:PropTypes.func
    }
    constructor(props){
        super(props)
        this.state = {
            isFavorite:this.props.projectModel.isFavorite
        }
    }
    /*
    * componentWillReceiveProps在新版中无法使用
    * @param nextProps
    * @param prevState
    */
    static getDerivedStateFromProps(nextProps,prevState){
        const isFavorite = nextProps.projectModel.isFavorite
        if(prevState.isFavorite !== isFavorite){
            return {
                isFavorite:isFavorite
            }
        }
        return null;
    }

    _favoriteIcon(){
        return <TouchableOpacity
            style={{padding:6}}
            underlayColor='transparent'
            onPress={() => this.onPressFavorite()}>
            <AntDesign
                name={this.state.isFavorite?'star':'staro'}
                size={26}
                style={{color:'red'}}
            />
        </TouchableOpacity>
    }
    onItemClick(){
        //这里会回传一个callback用于在详情页点击收藏后返回列表可以及时更新
        this.props.onSelect(isFavorite =>{
            this.setFavoriteState(isFavorite)
        })
    }
    setFavoriteState(isFavorite){
        this.props.projectModel.isFavorite = isFavorite
        this.setState({
            isFavorite:isFavorite,
        })
    }
    onPressFavorite(){
        this.setFavoriteState(!this.state.isFavorite)
        this.props.onFavorite(this.props.projectModel.item,!this.state.isFavorite)
    }
}