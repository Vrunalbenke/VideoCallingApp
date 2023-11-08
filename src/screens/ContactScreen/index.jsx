import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import dummyContact from '../../asset/Data/contact.json';
import {APP_NAME, ACC_NAME, storage} from '../../constant';
import {Voximplant} from 'react-native-voximplant';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from "react-native-linear-gradient";

const {width} = Dimensions.get('screen');

const Contacts = ({navigation}) => {
  const voximplant = Voximplant.getInstance();

  /*** IIFE ***/
  (async () => {
    const username = storage.getString('username');
    const password = storage.getString('password');

    const status = await voximplant.getClientState();
    if (status === Voximplant.ClientState.DISCONNECTED) {
      await voximplant.connect();
      const FQUsername = `${username}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
      await voximplant.login(FQUsername, password);
    }
  })();
  /*** IIFE ***/

  const [searchTerm, setSearchTerm] = useState('');
  const [filterContacts, setFilterContacts] = useState(dummyContact);
  const [modal, setModal] = useState(false);
  const SearchPlaceholder = `${dummyContact.length} contacts`;

  useEffect(() => {
    const newContact = dummyContact.filter(contact =>
      contact.user_display_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
    setFilterContacts(newContact);
  }, [searchTerm]);

  const CallProps = (contactName, contactNumber) => {
    navigation.navigate('Calling', {
      name: contactName,
      number: contactNumber,
    });
  };

  useEffect(() => {
    voximplant.on(Voximplant.ClientEvents.IncomingCall, incomingCallEvent => {
      navigation.navigate('IncomingCall', {call: incomingCallEvent.call});
    });

    return () => {
      voximplant.off(Voximplant.ClientEvents.IncomingCall);
    };
  }, []);

  return (
    <View style={styles.ParentCont}>
      {modal && (
        <Modal visible={modal} animationType="fade" transparent={true}>
          <View style={styles.modalContainer}>
            <LinearGradient colors={['#283c86', '#45a247']} style={styles.Modal}>
              <Text style={styles.ConfirmationText}>
                Are you sure you want to log out?
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                  <TouchableOpacity
                    style={styles.BTNTOP}
                    onPress={() =>   setModal((currentState) => !currentState)}>
                    <Text style={{fontSize: 18, color: '#000'}}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.BTNTOP}
                    onPress={async () => {
                      storage.set('logged_in', false);
                      await voximplant.disconnect();
                      setModal((currentState) => !currentState);
                      navigation.reset({
                        index: 0,
                        routes: [
                          {
                            name: 'Login',
                          },
                        ],
                      });
                    }}>
                    <Text style={{fontSize: 18, color: '#000'}}>Confirm</Text>
                  </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </Modal>
      )}

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>VideoCaller</Text>
        <TouchableOpacity style={styles.TOP} onPress={() => setModal(true)}>
          <Ionicons name="log-out-outline" size={30} color={'#283c86'} />
        </TouchableOpacity>
      </View>
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
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                CallProps(item.user_display_name, item.user_phone_number);
              }}>
              <Text style={styles.contactNames}>{item.user_display_name}</Text>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
        style={styles.contactFlatlist}
        ListFooterComponent={() => <View style={styles.footer}></View>}
        // bounces={false}
      />
    </View>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  ParentCont: {
    flex: 1,
    paddingHorizontal: 15,
    // paddingTop: 25
  },
  Searchbar: {
    backgroundColor: '#e2e2e2',
    padding: 10,
    borderRadius: 10,
    height: 45,
    fontSize: 20,
    paddingLeft: 20,
  },
  contactFlatlist: {
    paddingTop: 10,
    marginLeft: 20,
  },
  contactNames: {
    marginVertical: 10,
    fontSize: 20,
  },
  separator: {
    height: 15,
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#e2e2e2',
  },
  footer: {
    height: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 15,
  },
  headerText: {
    fontSize: 30,
    fontWeight: '600',
    color: '#283c86',
  },
  TOP: {
    padding: 3,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // height: 100,
  },
  Modal: {
    width: '80%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
    borderRadius: 10,
  },
  ConfirmationText: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 30,
  },
  BTNTOP: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
});
