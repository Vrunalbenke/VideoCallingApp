import React from 'react';
import {View,Text, StyleSheet, TouchableOpacity} from 'react-native';
import CallActionBox from '../../components/CallActionBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Calling = ({route,navigation}) => {
    
    const {name,number} = route?.params;

    const goBack = () => {
        navigation.pop();
    }

    return(
        <View style={styles.rootCalling}>
            <TouchableOpacity style={styles.backTOP}
            onPress={goBack}
            >
                <Ionicons name='chevron-back-outline'  size={30} />
            </TouchableOpacity>
            <View style={styles.CallPreview}> 
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.phone}>ringing +91-{number}</Text>
            </View>
            
            <CallActionBox/>            
        </View>
    )
}

export default Calling;


const styles = StyleSheet.create({
    rootCalling:{
        flex:1,
        backgroundColor:'#acd2f6',
        position:'relative'
    },
    CallPreview:{
        flex:1,
        backgroundColor:'lightblue',
        justifyContent:'flex-start',
        alignItems:'center',
        gap:10,
        paddingTop:'20%'
    },
    name:{
        fontSize:35,
        fontWeight:'600'
    },
    phone:{
        fontSize:20
    },
    backTOP:{
        position:'absolute',
        top:20,
        left:10,
        zIndex:1
    },
});