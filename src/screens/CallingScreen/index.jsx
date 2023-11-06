import React from 'react';
import {View,Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Calling = () => {


    return(
        <View style={styles.rootCalling}>
            <View style={styles.CallPreview}> 
            <Text style={styles.name}>Vrunal</Text>
            <Text style={styles.phone}>ringing +91-7972068752</Text>
            </View>

            <View style={styles.bottomContainer}>

                <View style={styles.slideUpContainer}>

                    <TouchableOpacity style={styles.slideUp}>
                        <Ionicons name="chevron-up-outline" size={30} color={"#fff"}/>
                    </TouchableOpacity>

                </View>

                <View style={styles.buttonsContainer}>

                    <TouchableOpacity style={styles.iconContainer}>
                        <Ionicons name="camera-reverse-outline" size={42} color={'#fff'}></Ionicons>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconContainer}>
                        <Ionicons name="mic-off-outline" size={40} color={'#fff'}></Ionicons>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconContainer}>
                        <Ionicons name="videocam-off-outline" size={40} color={'#fff'}></Ionicons>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.iconContainer,{backgroundColor:"rgb(213, 43, 43)"}]}>
                        <MaterialIcon  name="call-end" size={40} color={'#fff'}/>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

export default Calling;


const styles = StyleSheet.create({
    rootCalling:{
        flex:1,
        backgroundColor:'#acd2f6',
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
    bottomContainer:{
        backgroundColor:'#333333',
        paddingHorizontal:30,
        paddingBottom:30,
        paddingTop:10,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
    },
    slideUpContainer:{
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:10,
        width:"100%",
    },
    slideUp:{
        width:80,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonsContainer:{
       
        flexDirection:'row',
        justifyContent:'space-between'
    },
    iconContainer:{
        backgroundColor:'#3e3e3e',
        padding:8,
        borderRadius:30
    },
    // micOff:{
    //     backgroundColor:'#3e3e3e',
    //     padding:8,
    //     borderRadius:30
    // },
    // cameraOff:{
    //     backgroundColor:'#3e3e3e',
    //     padding:8,
    //     borderRadius:30
    // },
    // callEnd:{
    //     padding:8,
    //     borderRadius:30,
    //     backgroundColor:'rgb(213, 43, 43)',
    // },
});