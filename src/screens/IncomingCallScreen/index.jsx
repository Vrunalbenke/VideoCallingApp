import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, StyleSheet, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Voximplant} from 'react-native-voximplant';
import LottieView from 'lottie-react-native';

const IncomingCall = ({route, navigation}) => {
  const [caller, setCaller] = useState('');
  const {call} = route.params;
  const voximplant = Voximplant.getInstance();

  useEffect(() => {
    setCaller(call.getEndpoints()[0].displayName);
    call.on(Voximplant.CallEvents.Disconnected, callEvents => {
      navigation.navigate('Contacts');
    });

    return () => {
      call.off(Voximplant.CallEvents.Disconnected);
    };
  });
  const onDecline = () => {
    call.decline();
  };

  const onAccept = () => {
    navigation.navigate('Calling',{
        call,
        isIncomingCall:true,
    })
  };

  return (
    <LinearGradient
      colors={['#aa4b6b', '#6b6b83', '#3b8d99']}
      style={styles.linearGradient}>
      <View style={styles.CallPreview}>
        <Text style={styles.name}>{caller}</Text>
        <Text style={styles.phone}>ringing +91-7972068752</Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.secondContainer}>
          <View style={styles.remindMeContainer}>
            <Ionicons name="alarm" size={30} color={'#fff'} />
            <Text style={styles.remindMe}>Remind me</Text>
          </View>
          <View style={styles.messageContainer}>
            <Ionicons name="chatbubbles" size={30} color={'#fff'} />
            <Text style={styles.message}>Message</Text>
          </View>
        </View>

        <View style={styles.BottomContainer}>
          <Pressable onPress={onDecline} style={styles.declineContainer}>
            <View style={styles.declineIcon}>
              {/* <Ionicons name="close" size={60} color={"#fff"} /> */}
              <LottieView
                source={require('../../asset/Animation/DeclineCall.json')}
                autoPlay
                loop
                style={styles.Lottie}
              />
            </View>
            <Text style={styles.decline}>Decline</Text>
          </Pressable>
          <Pressable onPress={onAccept} style={styles.acceptContainer}>
            <View style={styles.acceptIcon}>
              {/* <Ionicons name="checkmark" size={60} color={"#fff"} /> */}
              {/* <MaterialIcon name="check" size={60} color={"#fff"}/> */}
              <LottieView
                source={require('../../asset/Animation/AcceptCall.json')}
                autoPlay
                loop
                style={styles.Lottie}
              />
            </View>
            <Text style={styles.accept}>Accept</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

export default IncomingCall;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  CallPreview: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    paddingTop: '20%',
  },
  name: {
    fontSize: 35,
    fontWeight: '600',
    color: '#fff',
  },
  phone: {
    fontSize: 20,
    color: '#fff',
  },
  mainContainer: {
    paddingTop: 30,
    gap: 60,
    paddingHorizontal: 30,
  },
  secondContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  remindMeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  remindMe: {
    color: '#fff',
  },
  messageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  message: {
    color: '#fff',
  },
  BottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 80,
  },
  declineContainer: {
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  declineIcon: {
    backgroundColor: 'rgb(213, 43, 43)',
    padding: 5,
    borderRadius: 40,
  },
  decline: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
  acceptContainer: {
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptIcon: {
    backgroundColor: '#2e6bff',
    // backgroundColor:'#3ea6ff',
    padding: 5,
    borderRadius: 40,
  },
  accept: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
  Lottie: {
    width: 60,
    height: 60,
  },
});
