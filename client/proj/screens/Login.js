import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import SharedApi from '../SharedApi';
const OpenapiJsClient = require('openapi-js-client');

function Login() {
    const navigation = useNavigation();
    const [errorMessage, setErrorMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const sharedApi = SharedApi.getInstance();

    function Signup() {
        navigation.navigate("Signup");
    }

    function Login() {
        var api = new OpenapiJsClient.ApiApi(sharedApi.getDefaultClient());
        var tokenObtainPair = new OpenapiJsClient.TokenObtainPair();
        tokenObtainPair.username = username;
        tokenObtainPair.password = password;
        var callback = function(error, data, response) {
            if (error) {
                setErrorMessage('Login failed: ' + error.message + ' \nResponse status: ' + response.status);
            } else {
                sharedApi.setToken(data.access, data.refresh);
                setErrorMessage("");
                navigation.navigate("Home");
            }
        }
        api.apiTokenCreate(tokenObtainPair, callback);
    }

  return (
    <View style={styles.container}>
        <SafeAreaView/>
        <View style={styles.center}>
            <Text style={styles.loginText}>Login</Text>
        </View>
        <View style={styles.text2}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={Signup} ><Text style={styles.signupText}> Sign up</Text></TouchableOpacity>
        </View>

        <View style={styles.buttonStyle}>
            <View style={styles.input}>
            <Input
                InputLeftElement={
                <Icon
                    as={<FontAwesome5 name="user-secret" />}
                    size="sm"
                    m={2}
                    _light={{
                    color: "#000000",
                    }}
                    _dark={{
                    color: "#dee2e6",
                    }}
                />
                }
                variant="outline"
                placeholder="Username"
                _light={{
                placeholderTextColor: "#ff78909c",
                }}
                _dark={{
                placeholderTextColor: "#ffeceff1",
                }}
                onChangeText={setUsername}
            />
            </View>
        </View>

        <View style={styles.buttonStyleX}>
            <View style={styles.input}>
            <Input
                InputLeftElement={
                <Icon
                    as={<FontAwesome5 name="key" />}
                    size="sm"
                    m={2}
                    _light={{
                    color: "#000000",
                    }}
                    _dark={{
                    color: "#dee2e6",
                    }}
                />
                }
                variant="outline"
                secureTextEntry={true}
                placeholder="Password"
                _light={{
                placeholderTextColor: "#ff78909c",
                }}
                _dark={{
                placeholderTextColor: "#ffeceff1",
                }}
                onChangeText={setPassword}
            />
            </View>
        </View>

        <View style={styles.buttonStyle}>
            <Button style={styles.buttonDesign} onPress={Login}>
                LOGIN
            </Button>
        </View>

        <View style={styles.buttonStyle}>
            { errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null }
        </View>

        <StatusBar style="auto" />
    </View>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
        <Login />
    </NativeBaseProvider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loginText: {
    marginTop:100,
    fontSize:30,
    fontWeight:'bold',
  },
  center:{
    alignItems:'center',
    justifyContent:'center',
  },
  text2:{
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:5
  },
  signupText:{
    fontWeight:'bold'
  },
  input:{
    marginTop:10,
    marginRight:5
  },
  buttonStyle:{
    marginTop:30,
    marginLeft:15,
    marginRight:15
  },
  buttonStyleX:{
    marginTop:12,
    marginLeft:15,
    marginRight:15
  },
  buttonDesign:{
    backgroundColor:'#026efd'
  },
    errorText: {
      color: 'red',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
});
