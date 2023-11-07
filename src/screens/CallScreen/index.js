import React from 'react';
import {View, StyleSheet} from 'react-native';
import CallActionBox from '../../components/CallActionBox';

const CallScreen = () =>{

    return(
        <View style={styles.root}>
            <View style={styles.otherUser}></View>
            <View style={styles.Video}> 
                
            </View>
            <CallActionBox/>
        </View>
    )
};

export default CallScreen;

const styles = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor:'lightblue'
    },
    Video:{
        flex:1,

    },
    otherUser:{
        position:'absolute',
        height:150,
        width:100,
        zIndex:1,
        backgroundColor:'lightpink',
        right:10,
        top:20,
        borderRadius:10
    }
});