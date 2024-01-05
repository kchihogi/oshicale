import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import React from 'react';
import Buffer from 'buffer';

import Button from './components/Button';

const runAsync = async () => {
  const url = 'https://ngrok/users/';
  const username = '';
  const password = '';

  const headers = new Headers({
    'Accept': 'application/json; indent=4',
    'Authorization': `Basic ${Buffer.Buffer.from(`${username}:${password}`).toString('base64')}`,
  });

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });

    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    alert('Done');
  }
};

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <View style={styles.footerContainer}>
        <Button label="Choose a photo" onPress={runAsync} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  footerContainer: {
    flex: 1 / 2,
    alignItems: 'center',
  },
});
