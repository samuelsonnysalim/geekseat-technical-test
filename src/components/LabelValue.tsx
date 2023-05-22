import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  label: string;
  value: string;
}

export default function LabelValue(props: Partial<Props>): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.textLabel}>{props.label}</Text>
      <Text style={styles.textValue}>{props.value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  textLabel: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 14,
    backgroundColor: '#3f4c6b',
    color: '#fff',
    fontWeight: 'bold',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  textValue: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 18,
    backgroundColor: '#eef2f3',
    color: '#2c3e50',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});
