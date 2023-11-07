import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import dummyContact from '../../asset/Data/contact.json';
import {APP_NAME,ACC_NAME, storage } from '../../constant';
import {Voximplant} from 'react-native-voximplant';

const {width} = Dimensions.get('screen');

const Contacts = ({ navigation }) => {
    const voximplant = Voximplant.getInstance();
    (async()=>{
        const username = storage.getString('username');
        const password = storage.getString('password');
   
        const status = await voximplant.getClientState();
        if (status === Voximplant.ClientState.DISCONNECTED){
            await voximplant.connect();
            const FQUsername = `${username}@${APP_NAME}.${ACC_NAME}.voximplant.com`
            await voximplant.login(FQUsername, password);
        }
    })();
    
    const [searchTerm, setSearchTerm] = useState('');
    const [filterContacts, setFilterContacts] = useState(dummyContact);
    const SearchPlaceholder = `${dummyContact.length} contacts`;

    useEffect(() => {
        const newContact = dummyContact.filter((contact) => contact.user_display_name.toLowerCase().includes(searchTerm.toLowerCase()))
        setFilterContacts(newContact);
    }, [searchTerm])

    const CallProps = (contactName,contactNumber) => {
        navigation.navigate('Calling',{
            name: contactName,
            number: contactNumber

        })
    }

    useEffect(() => {
        voximplant.on(Voximplant.ClientEvents.IncomingCall, incomingCallEvent => {
            navigation.navigate("IncomingCall", {call : incomingCallEvent.call});
        });

        return () => {
            voximplant.off(Voximplant.ClientEvents.IncomingCall);
        };
    },[])

    return (
        <View style={styles.ParentCont}>
            <TouchableOpacity style={styles.TOP}
                onPress={ async () => {
                    storage.set('logged_in',false);
                    await voximplant.disconnect();
                    navigation.reset({
                        index:0,
                        routes:[{
                            name:'Login'
                        }]
                    })
                }}
            >
                <Text style={styles.BTNText}>Logout</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.Searchbar}
                placeholder={SearchPlaceholder}
                placeholderTextColor="#625f5f"
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={filterContacts}
                renderItem={({ item }) => {
                    return (
                    <TouchableOpacity
                        onPress={() => {
                            CallProps(item.user_display_name,item.user_phone_number)
                            }}>
                            <Text style={styles.contactNames}>{item.user_display_name}</Text>
                    </TouchableOpacity>)}
                }
                ItemSeparatorComponent = {() => <View style={styles.separator}></View> }
                style = { styles.contactFlatlist }
                ListFooterComponent = {()=> <View style={styles.footer}></View>}
                // bounces={false}
/>
        </View >
    );
}

export default Contacts;

const styles = StyleSheet.create({
    ParentCont: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 25
    },
    Searchbar: {
        backgroundColor: '#e2e2e2',
        padding: 10,
        borderRadius: 10,
        height: 45,
        fontSize: 20,
        paddingLeft: 20
    },
    contactFlatlist: {
        paddingTop: 10,
        marginLeft: 20
    },
    contactNames: {
        marginVertical: 10,
        fontSize: 20,
    },
    separator: {
        height: 15,
        width: "100%",
        borderTopWidth: 1,
        borderColor: '#e2e2e2'
    },
    footer: {
        height: 12,
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

