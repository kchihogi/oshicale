import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { Text, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

function Private() {

    return (
        <View>
            <SafeAreaView/>
            <Text>Private</Text>
        </View>
    );
}

export default () => {
    return (
        <NativeBaseProvider>
            <Private />
        </NativeBaseProvider>
    )
}
