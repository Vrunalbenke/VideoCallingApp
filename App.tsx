import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Contacts from './src/screens/ContactScreen';
import Calling from './src/screens/CallingScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Calling/>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  root:{
    flex:1,
  }
});
