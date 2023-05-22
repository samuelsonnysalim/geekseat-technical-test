import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';

interface Props {
  containerStyle: ViewStyle;
  name: string;
}

export default function Initial(props: Partial<Props>): JSX.Element {
  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <Text style={styles.textSmall}>
        {props.name
          ?.replace(/\-/g, ' ')
          ?.split(' ')
          ?.slice(0, 3)
          ?.map(n => n[0])
          ?.join('')
          .toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    backgroundColor: '#eef2f3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  textSmall: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8e9eab',
    lineHeight: 48,
  },
});
