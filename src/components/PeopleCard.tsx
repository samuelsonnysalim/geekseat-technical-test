import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Initial from './Initial';

interface Props {
  name: string;
}

export default function PeopleCard(props: Partial<Props>): JSX.Element {
  return (
    <View style={styles.container}>
      <Initial containerStyle={styles.containerInitial} name={props.name} />
      <Text style={styles.textName}>{props.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'row',
  },
  containerInitial: {
    marginRight: 12,
  },
  textName: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 48,
    color: '#2c3e50',
  },
});
