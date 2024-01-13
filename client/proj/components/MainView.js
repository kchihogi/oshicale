import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import React, {useState} from 'react';

import Button from './Button';


const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

/**
 * MainView
 * @return {View} The main screen of the app.
 */
export default function MainView() {
  const [artists, setArtists] = useState([]);

  const runAsync = async () => {
    var OpenapiJsClient = require('openapi-js-client');
    var defaultClient = OpenapiJsClient.ApiClient.instance;
    defaultClient.basePath = 'https://4eba-2400-2410-d841-100-1c32-4b65-3758-798e.ngrok-free.app';
    var api = new OpenapiJsClient.ApiApi(defaultClient);
    var tokenObtainPair = new OpenapiJsClient.TokenObtainPair();
    tokenObtainPair.username = "user1";
    tokenObtainPair.password = "user1";
    var callback = function(error, data, response) {
      if (error) {
        console.error(error);
      } else {
        var api2 = new OpenapiJsClient.ArtistsApi(defaultClient);
        // var artist = new OpenapiJsClient.Artist();
        // artist.name = "artist1";
        var callback2 = function(error, data, response) {
          if (error) {
            console.error(error);
          } else {
            setArtists([]);
            for (var i = 0; i < data.results.length; i++) {
              console.log(data.results[i].name);
              setArtists((artists) => [...artists, data.results[i]]);
            }
          }
        };
        api2.artistsList(null, callback2);
      }
    };
    api.apiTokenCreate(tokenObtainPair, callback);
  };

  return (
    <View>
      <View style={styles.mainContainer}>
        <Text>Open up App.js to start working on your app!</Text>
        <FlatList
          data={artists}
          renderItem={({item}) => <Item title={item.name} />}
          keyExtractor={item => item.id}
        />
        <Text>{artists.length}</Text>
      </View>
      <View style={styles.footerContainer}>
        <Button label="GET LIST" onPress={runAsync} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 8,
    width: Dimensions.get('window').width,
    backgroundColor: '#FAA030',
  },
  footerContainer: {
    flex: 2,
    width: Dimensions.get('window').width,
    backgroundColor: '#32B76C',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
