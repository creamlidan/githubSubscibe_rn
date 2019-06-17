import React,{ Component } from 'react';
import { StyleSheet, Text, View , TouchableOpacity, Image} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

export default class PopularItem extends Component{
	render(){
		const { item } = this.props;
		if(!item || !item.owner) return null;
		let favoriteButton = 
			<TouchableOpacity
				style={{padding:6}}
				onPress={()=>{}}
				underlayColor={'transparent'}>
				<AntDesign
					name={'staro'}
					size={26}
					style={{color:'red'}}/>
			</TouchableOpacity>;
		return (
			<TouchableOpacity
				onPress={()=>this.props.onSelect()}
			>
				<View style={styles.cell_container}>
					<Text style={styles.title}>
						{item.full_name}
					</Text>
					<Text style={styles.description}>
						{item.description}
					</Text>
					<View style={styles.row}>
						<View style={styles.row}>
							<Text style={{marginRight:4}}>Author:</Text>
							<Image style={{height:22,width:22}}
								source={{uri:item.owner.avatar_url}}/>
						</View>
						<View style={{flexDirection:'row',justifyConent:'space-between'}}>
							<Text>Start:</Text>
							<Text>{item.stargazers_count}</Text>
						</View>
						{favoriteButton}
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