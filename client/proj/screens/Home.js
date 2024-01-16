import React, {useState, useEffect} from 'react';
import {
    FlatList,
    Button,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';

import SharedApi from '../SharedApi';
const OpenapiJsClient = require('openapi-js-client');

function Item({ title }) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

const Home = () => {
    const navigation = useNavigation();
    const [errorMessage, setErrorMessage] = useState("");
    const [users, setUsers] = useState([]);
    const sharedApi = SharedApi.getInstance();

    useEffect(() => {
        console.log("Home useEffect");
        const checkLoggedIn = async () => {
            if (!sharedApi.isLoggedIn()) {
                console.log("Home useEffect: not logged in");
                navigation.navigate("Login");
            }
        }
        checkLoggedIn();
    }, []);

    const Logout = async () => {
        setErrorMessage("");
        setUsers([]);
        sharedApi.setToken(null, null);
        navigation.navigate("Login");
    }

    const getUsers = async () => {
        var api = new OpenapiJsClient.UsersApi(sharedApi.getDefaultClient());
        var callback = function(error, data, response) {
            if (error) {
                setErrorMessage('Get users failed: ' + error.message + ' \nResponse status: ' + response.status);
            } else {
                setUsers([]);
                for (var i = 0; i < data.results.length; i++) {
                    setUsers((users) => [...users, data.results[i]]);
                }
                setErrorMessage("");
            }
        };
        api.usersList(null, callback);
    };

    return (
        <View style={styles.container}>
            <SafeAreaView/>
            <Text style={styles.center}>Home</Text>
            <Button title="Get Users" onPress={getUsers} style={styles.buttonStyle} />
            <FlatList
                data={users}
                renderItem={({ item }) => <Item title={item.username} />}
                keyExtractor={item => item.username}
            />
            <Text>{users.length}</Text>
            <Text>{errorMessage}</Text>
            <Button title="Logout" onPress={Logout} style={styles.buttonStyle} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle: {
        marginTop: 20,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
    },
});

export default Home;