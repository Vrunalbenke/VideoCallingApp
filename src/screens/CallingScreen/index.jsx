import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import CallActionBox from '../../components/CallActionBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Voximplant} from 'react-native-voximplant';
import Toast from 'react-native-simple-toast';

const permissions = [
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.CAMERA,
];

const Calling = ({route, navigation}) => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [callState, setCallState] = useState('Calling...');
  const {name, number, call: inComingCall, isIncomingCall} = route?.params;
  const voximplant = Voximplant.getInstance();
  const call = useRef(inComingCall);

  const goBack = () => {
    navigation.pop();
  };

  useEffect(() => {
    const requestPermissions = async () => {
      const granted = await PermissionsAndroid.requestMultiple(permissions);
      const recordAudioGranted =
        granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] !== 'granted';
      const cameraGranted =
        granted[PermissionsAndroid.PERMISSIONS.CAMERA] !== 'granted';
      if (!cameraGranted || !recordAudioGranted) {
        Alert.alert('Permissions not granted');
      } else {
        setPermissionGranted(true);
      }
    };

    if (Platform.OS === 'android') {
      requestPermissions();
    } else {
      setPermissionGranted(true);
    }
  }, []);

  useEffect(() => {
    if (!permissionGranted) {
      return;
    }

    const callSetting = {
      video: {
        sendVideo: true,
        receiveVideo: true,
      },
    };

    const makeCall = async () => {
      call.current = await voximplant.call(name, callSetting);
      subscribeToCallEvent();
    };

    const acceptCall = async () => {
      subscribeToCallEvent();
      call.current.answer(callSetting);
    };

    const subscribeToCallEvent = () => {
      call.current.on(Voximplant.CallEvents.Failed, callEvent => {
        showCallError(callEvent.reason);
      });

      call.current.on(Voximplant.CallEvents.ProgressToneStart, callEvent => {
        setCallState('Ringing!!...');
      });

      call.current.on(Voximplant.CallEvents.Connected, callEvent => {
        setCallState('Connected');
      });

      call.current.on(Voximplant.CallEvents.Disconnected, callEvent => {
        navigation.navigate('Contacts');
      });
    };

    const showCallError = reason => {
      // Alert.alert(
      //     "Call failed",
      //     `Reason:${reason}`,
      //     [{
      //         text: 'Ok',
      //
      //     }]
      // )
      let message;
      if (reason == 'Decline') {
        message = `Call ${reason}d`;
      } else if (reason == 'Not Found') {
        message = `User ${reason}`;
      } else {
        message = reason;
      }

      Toast.show(message, Toast.BOTTOM, {padding: 100});
      navigation.navigate('Contacts');
    };

    if (isIncomingCall) {
      acceptCall();
    } else {
      makeCall();
    }

    return () => {
      call.current.off(Voximplant.CallEvents.Failed);
      call.current.off(Voximplant.CallEvents.ProgressToneStart);
      call.current.off(Voximplant.CallEvents.Connected);
      call.current.off(Voximplant.CallEvents.Disconnected);
    };
  }, [permissionGranted]);

  const onHangupPress = () => {
    call.current.hangup();
  };

  return (
    <View style={styles.rootCalling}>
      <TouchableOpacity style={styles.backTOP} onPress={goBack}>
        <Ionicons name="chevron-back-outline" size={30} />
      </TouchableOpacity>
      <View style={styles.CallPreview}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phone}>
          {callState} +91-{number}
        </Text>
      </View>

      <CallActionBox onHangupPress={onHangupPress} />
    </View>
  );
};

export default Calling;

const styles = StyleSheet.create({
  rootCalling: {
    flex: 1,
    backgroundColor: '#acd2f6',
    position: 'relative',
  },
  CallPreview: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    paddingTop: '20%',
  },
  name: {
    fontSize: 35,
    fontWeight: '600',
  },
  phone: {
    fontSize: 20,
  },
  backTOP: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
  },
});
