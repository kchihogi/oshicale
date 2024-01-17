import React, { useState } from 'react';
import {
    Button,
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { NativeBaseProvider } from 'native-base';

import { SafeAreaView } from 'react-native-safe-area-context';

import Item from '../components/Item';

import SharedApi from '../SharedApi';
const OpenapiJsClient = require('openapi-js-client');

function Public() {
    const [errorMessage, setErrorMessage] = useState("");
    const [users, setUsers] = useState([]);
    const sharedApi = SharedApi.getInstance();

    useFocusEffect(
        React.useCallback(() => {
            setErrorMessage("");
            setUsers([]);
        }, [])
    );

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
        </View>
    );
}

export default () => {
    return (
      <NativeBaseProvider>
          <Public />
      </NativeBaseProvider>
    )
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
});
