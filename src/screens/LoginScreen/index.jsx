import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity, Alert } from "react-native";
import GenricsTextInput from "../../components/TextInput";
import LinearGradient from "react-native-linear-gradient";
import { Voximplant } from 'react-native-voximplant';
import { ACC_NAME, APP_NAME, storage } from "../../constant";

const { width, height } = Dimensions.get('screen');
const LoginScreen = ({ navigation }) => {

    const voximplant = Voximplant.getInstance();


    useEffect(() => {
        const connect = async () => {
            const status = await voximplant.getClientState();
            if (status === Voximplant.ClientState.DISCONNECTED) {
                await voximplant.connect();
            }
            else if (status === Voximplant.ClientState.LOGGED_IN) {
                navigation.navigate('Contacts')
            }
        }

        connect();
    }, [])

    const [user, setUser] = useState({
        username: "",
        password: "",
    })

    const handleChange = (value, input) => {
        setUser(currentState => ({ ...currentState, [value]: input }))
    }



    const AuthUser = async () => {
        try {
            const FQUsername = `${user.username}@${APP_NAME}.${ACC_NAME}.voximplant.com`
            await voximplant.login(FQUsername, user.password);

            storage.set('logged_in', true);
            storage.set('username',user.username);
            storage.set('password',user.password);
            navigation.reset({
                index: 0,
                routes: [
                    {
                        name: "Contacts",
                    }
                ]
            })
        }
        catch (e) {
            Alert.alert(e.name, `Error code: ${e.code}`);
        }
    }

    return (
        <LinearGradient colors={['#283c86', '#45a247']} style={styles.root}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>VideoCaller</Text>
            </View>
            <View style={styles.genricContainer}>
                <Text style={styles.LoginText}>Login</Text>
                <Text style={styles.LoginPhrase}>Login to get connect with your closer one</Text>

            </View>

            <View style={styles.UserCredentialContainer}>

                <GenricsTextInput
                    placeholder={"username"}
                    label={"Username"}
                    autocaptilize={"none"}
                    style={{ width: width * 0.8, borderRadius: 10, height: 55, fontSize: 20, }}
                    styleLabel={{ fontSize: 20, fontWeight: '500', color: '#fff' }}
                    placeholderStyle={'#283c86'}
                    // value = {user.username}
                    onHandleChange={(input) => handleChange('username', input)}
                />

                <GenricsTextInput
                    placeholder={"password"}
                    securetext={true}
                    label={"Password"}
                    autocaptilize={"none"}
                    style={{ width: width * 0.8, borderRadius: 10, height: 55, fontSize: 20 }}
                    styleLabel={{ fontSize: 20, fontWeight: '500', color: '#fff' }}
                    placeholderStyle={'#283c86'}
                    // value = {user.password}
                    onHandleChange={(input) => handleChange('password', input)}
                />
            </View>

            <TouchableOpacity style={styles.TOP}
                onPress={AuthUser}
            >
                <Text style={styles.BTNText}>Login</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default LoginScreen;


const styles = StyleSheet.create({
    root: {
        padding: 15,
        flex: 1
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    headerText: {
        fontSize: 40,
        fontWeight: '600',
        color: '#fff'
    },
    genricContainer: {
        margin: 10
    },
    LoginText: {
        fontSize: 25,
        fontWeight: '500',
        color: '#fff',
        marginBottom: 5
    },
    LoginPhrase: {
        fontSize: 18,
        fontWeight: '300',
        color: '#fff',
    },
    UserCredentialContainer: {
        margin: 15,
        gap: 10
    },
    TOP: {
        padding: 10,
        backgroundColor: '#283c86',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: width * 0.8,
        margin: 15
    },
    BTNText: {
        color: '#fff',
        fontSize: 30,
        fontWeight: '500',

    }
});