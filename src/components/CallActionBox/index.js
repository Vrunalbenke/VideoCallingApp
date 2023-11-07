import { StyleSheet, Switch, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const CallActionBox = () => {
    const navigation = useNavigation();
    const [toggleCamera, setToggleCamera] = useState(false);
    const [toggleMic, setToggleMic] = useState(false);

    const SwitchCamera = () => {
        console.log("SwitchCamera")
    }
    const ToggleMic = () => {
        console.log("ToggleMic")
        setToggleMic((currentValue) => !currentValue)
    }
    const ToggleCamera = () => {
        console.log("ToggleCamera")
        setToggleCamera((currentValue) => !currentValue)
    }
    const EndCall = () => {
        navigation.pop();
    }

    return (
        <View style={styles.bottomContainer}>

            <View style={styles.slideUpContainer}>

                <TouchableOpacity style={styles.slideUp}>
                    <Ionicons name="chevron-up-outline" size={30} color={"#fff"} />
                </TouchableOpacity>

            </View>

            <View style={styles.buttonsContainer}>

                <TouchableOpacity onPress={SwitchCamera} style={styles.iconContainer}>
                    <Ionicons name="camera-reverse-outline" size={42} color={'#fff'}></Ionicons>
                </TouchableOpacity>

                <TouchableOpacity onPress={ToggleMic} style={styles.iconContainer}>
                    <Ionicons name={toggleMic ? "mic-outline" : "mic-off-outline"} size={40} color={'#fff'}></Ionicons>
                </TouchableOpacity>

                <TouchableOpacity onPress={ToggleCamera} style={styles.iconContainer}>
                    <Ionicons name={toggleCamera ? "videocam-outline" : "videocam-off-outline"} size={40} color={'#fff'}></Ionicons>
                </TouchableOpacity>

                <TouchableOpacity onPress={EndCall} style={[styles.iconContainer, { backgroundColor: "rgb(213, 43, 43)" }]}>
                    <MaterialIcon name="call-end" size={40} color={'#fff'} />
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default CallActionBox

const styles = StyleSheet.create({
    bottomContainer: {
        backgroundColor: '#333333',
        paddingHorizontal: 30,
        paddingBottom: 30,
        paddingTop: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    slideUpContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        width: "100%",
    },
    slideUp: {
        width: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonsContainer: {

        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconContainer: {
        backgroundColor: '#4e4e4e',
        padding: 8,
        borderRadius: 30
    },
})