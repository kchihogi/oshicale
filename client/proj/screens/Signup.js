import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Button, Icon, Input, NativeBaseProvider } from 'native-base';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SharedApi from '../SharedApi';
const OpenapiJsClient = require('openapi-js-client');

function Signup() {
    const navigation = useNavigation();
    const [errorMessage, setErrorMessage] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [loading, setLoading] = useState(false);
    const sharedApi = SharedApi.getInstance();

    function Login() {
        navigation.navigate("Login");
    }

    function Register() {

        if (!confirmed) {
            setErrorMessage("Passwords do not match");
            return;
        }

        if (loading) {
            return;
        }

        setLoading(true);

        var api = new OpenapiJsClient.SignupApi(sharedApi.getDefaultClient());
        var signup = new OpenapiJsClient.Signup();
        signup.username = username;
        signup.email = email;
        signup.password = password;
        var callback = function(error, data, response) {
            setLoading(false);
            if (error) {
                setErrorMessage('Signup failed: ' + error.message + ' \nResponse status: ' + response.status);
            } else {
                setErrorMessage("");
                navigation.navigate("Login");
            }
        }
        api.signupCreate(signup, callback);
    }

    function ConfirmPassword(confirmPassword) {
        if (password != confirmPassword) {
            setErrorMessage("Passwords do not match");
            setConfirmed(false);
        } else {
            setErrorMessage("");
            setConfirmed(true);
        }
    }

  return (
    <View style={styles.container}>
        <SafeAreaView/>
        <View style={styles.center}>
            <Text style={styles.signupText}>Signup</Text>
        </View>
        <View style={styles.text2}>
            <Text>Already have account? </Text>
            <TouchableOpacity onPress={Login} ><Text style={styles.loginText}> Login </Text></TouchableOpacity>
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
                    as={<MaterialCommunityIcons name="email" />}
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
                placeholder="Email"
                _light={{
                placeholderTextColor: "#ff78909c",
                }}
                _dark={{
                placeholderTextColor: "#ffeceff1",
                }}
                onChangeText={setEmail}
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
                placeholderTextColor: "blueGray.400",
                }}
                _dark={{
                placeholderTextColor: "blueGray.50",
                }}
                onChangeText={setPassword}
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
                placeholder="Confirm Password"
                _light={{
                placeholderTextColor: "#ff78909c",
                }}
                _dark={{
                placeholderTextColor: "#ffeceff1",
                }}
                onChangeText={password => ConfirmPassword(password)}
            />
            </View>
        </View>

        <View style={styles.buttonStyle}>
            <Button style={styles.buttonDesign} onPress={Register}>
                REGISTER NOW
            </Button>
        </View>

        <View style={styles.buttonStyle}>
            { loading ? <ActivityIndicator size="small" color="#0000ff" /> : null }
            { errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null }
        </View>

        <StatusBar style="auto" />
    </View>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
        <Signup />
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  signupText: {
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
  loginText:{
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
