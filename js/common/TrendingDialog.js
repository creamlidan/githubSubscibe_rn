import React,{ Component } from 'react';
import { StyleSheet, Text, View , Modal, TouchableOpacity, DeviceInfo} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import TimeSpan from '../model/TimeSpan'

export const TimeSpans = [new TimeSpan('今 天', 'since=daily'),
    new TimeSpan('本 周', 'since=weekly'), new TimeSpan('本 月', 'since=monthly')]
export default class TrendingDialog extends Component{
	constructor(props){
		super(props);
		this.state = {
			visible:false,
		}
	}
	show(){
		this.setState({
			visible:true,
		})
	}
	dismiss(){
		this.setState({
			visible:false,
		})
	}
	render(){
		const { onClose,onSelect } = this.props;
		return (
			<Modal
				transparent = {true}
				visible = { this.state.visible }
				onRequestClose ={ ()=> onClose }
			>
				<TouchableOpacity
					onPress = {()=>this.dismiss()}
					style={styles.container}>
					<AntDesign
						name={'caretup'}
						size={36}
						style={styles.arrow}
					/>
					<View style={styles.content}>
						{TimeSpans.map((item,i)=>{
							return <TouchableOpacity
								onPress={()=>onSelect(item)}
								underlayColor='transparent'
							>
								<View style={styles.text_container}>
									<Text style={styles.text}>{item.showText}</Text>
								</View>
								{
									i!== TimeSpans.length-1?<View
										style={styles.line}
									/>:null
								}
							</TouchableOpacity>
						})}
					</View>
				</TouchableOpacity>
			</Modal>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'rgba(0,0,0,0.6)',
		alignItems:'center',
		paddingTop:DeviceInfo.isIPhoneX_deprecated ? 30 : 0
	},
	arrow:{
		marginTop:40,
		color:'white',
		padding:0,
		margin:-15
	},
	content:{
		borderRadius:4,
		backgroundColor:'white',
		paddingTop:3,
		paddingBottom:3,
		marginRight:3,
	},
	text_container:{
		alignItems:'center',
		flexDirection:'row'
	},
	text:{
		fontSize:16,
		color:'#333',
		fontWeight:'400',
		padding:8,
		paddingLeft:26,
		paddingRight:26
	},
	line:{
		height:1,
		backgroundColor:'#dcdcdc'
	}
})