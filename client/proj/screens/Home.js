import React from 'react';

import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { useNavigation } from '@react-navigation/native';

import { NativeBaseProvider } from 'native-base';

import Private from './Private';
import Public from './Public';
import Settings from './Settings';

import SharedApi from '../SharedApi';

const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

function HomeTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Public" component={Public} />
            <Tab.Screen name="Private" component={Private} />
        </Tab.Navigator>
    );
}

function DrawerContent(props) {
    const navigation = useNavigation();
    const sharedApi = SharedApi.getInstance();

    const Logout = async () => {
        sharedApi.setToken(null, null);
        navigation.navigate("Login");
    }

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Logout" onPress={Logout} />
        </DrawerContentScrollView>
    );
}

function Home() {
    return (
        <Drawer.Navigator initialRouteName="HomeTabs" drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="HomeTabs" component={HomeTabs} options={{ title: 'Home' }} />
            <Drawer.Screen name="Settings" component={Settings} options={{ title: 'Settings' }} />
        </Drawer.Navigator>
    );
}

export default () => {
    return (
      <NativeBaseProvider>
          <Home />
      </NativeBaseProvider>
    )
}
