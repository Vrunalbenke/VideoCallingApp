import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

const GenricsTextInput = ({
    placeholder,
    style,
    securetext,
    label,
    styleLabel,
    autocaptilize,
    placeholderStyle,
    value,
    onHandleChange
    }) => {
    return (
        <>
        <Text style={[styles.userLabel,{...styleLabel,}]}>{label}</Text>
        <TextInput 
        style={[styles.TextInput,{...style}]}
        placeholder= {placeholder}
        secureTextEntry={securetext}
        autoCapitalize={autocaptilize}
        placeholderTextColor={placeholderStyle}
        // value={value}
        onChangeText={onHandleChange}
        />
        </>
    )
};

export default GenricsTextInput;

const styles = StyleSheet.create({
    TextInput:{
        backgroundColor:'#e3e3e3',
        padding:10,
        shadowColor:'#000',
        shadowOffset:{
            width:1,
            height:1
        },
        shadowOpacity:0.3,
        elevation:4
    }
});