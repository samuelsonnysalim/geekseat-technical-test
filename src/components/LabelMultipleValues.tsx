import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Values {
  title: string;
  description: string;
}

interface Props {
  label: string;
  values: Partial<Values>[];
}

export default function LabelValue(props: Partial<Props>): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.textLabel}>{props.label}</Text>
      <View style={styles.containerMultipleValues}>
        {(props.values || [])?.length > 0 ? (
          props.values?.map((value, index) => (
            <View key={index} style={styles.containerValue}>
              <Text style={styles.textValueTitle}>• {value.title}</Text>
              <Text style={styles.textValueDescription}>
                {value.description}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.textNoValue}>-</Text>
        )}
      </View>
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
  containerMultipleValues: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#eef2f3',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  containerValue: {
    marginBottom: 12,
  },
  textValueTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  textValueDescription: {
    fontSize: 16,
    color: '#2c3e50',
    paddingLeft: 10,
  },
  textNoValue: {
    fontSize: 18,
    color: '#2c3e50',
  },
});
