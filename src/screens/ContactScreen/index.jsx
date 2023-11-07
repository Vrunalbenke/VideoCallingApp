import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import dummyContact from '../../asset/Data/contact.json';

const Contacts = ({ navigation }) => {

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

    return (
        <View style={styles.ParentCont}>
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
    }
});

