import React,{ Component } from 'react';
import { StyleSheet, Text, View , TouchableOpacity, Image} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import HTMLView from 'react-native-htmlview'
import BaseItem from './BaseItem'

export default class TrendingItem extends BaseItem{
	render(){
		const {projectModel } = this.props;
		const { item } = projectModel
		if(!item) return null;
		let description = '<p>' + item.description + '</p>'
		return (
			<TouchableOpacity
				onPress={()=>this.onItemClick()}
			>
				<View style={styles.cell_container}>
					<Text style={styles.title}>
						{item.fullName}
					</Text>
					<HTMLView 
						value={description}
						stylesheet={{
							p:styles.description,
							a:styles.description,
						}}
						onLinkPress={(url)=>{

						}}
					/>
					<View style={styles.row}>
						<View style={styles.row}>
							<Text style={{marginRight:4}}>Built By:</Text>
							{
								item.contributors.map((result,i,arr)=>{
									return <Image 
										style={{height:22,width:22,margin:2}}
										source={{uri:arr[i]}}
										key={i}
									/>
								})
							}

						</View>
						<View style={{flexDirection:'row',justifyConent:'space-between'}}>
							<Text>Start:</Text>
							<Text>{item.starCount}</Text>
						</View>
						{this._favoriteIcon()}
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}
const styles = StyleSheet.create({
	cell_container:{
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {width: 1, height: 5},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2
    },
    row:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title:{
        fontSize: 16,
        marginBottom: 2,
        color: '#212121',
    },
    description:{
        fontSize: 14,
        marginBottom: 2,
        color: '#757575',
    }
})