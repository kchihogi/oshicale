import { Button, NativeBaseProvider } from 'native-base';
import React from 'react';
import { Text, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

function Settings( { navigation } ) {
    return (
        <View>
            <SafeAreaView/>
            <Text>Settings</Text>
            <Button onPress={() => navigation.navigate("HomeTabs")}>Home</Button>
        </View>
    );
}

export default ({ navigation }) => {
    return (
        <NativeBaseProvider>
            <Settings navigation={navigation} />
        </NativeBaseProvider>
    )
}
