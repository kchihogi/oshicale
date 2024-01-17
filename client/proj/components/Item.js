import { StyleSheet, Text, View } from 'react-native';

function Item({ title }) {
  return (
      <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
      </View>
  );
}

export default Item;

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
    },
    title: {
        fontSize: 32,
    },
});
