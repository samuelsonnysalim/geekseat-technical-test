import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DetailNavigationProp} from '@geekseat/technical-test/pages/Detail';
import Initial from './Initial';

interface Props {
  id: string;
  name: string;
}

export default function PeopleCard(props: Partial<Props>): JSX.Element {
  const navigation = useNavigation<DetailNavigationProp>();
  const showDetail = useCallback(() => {
    navigation.navigate('Detail', {id: props.id, name: props.name});
  }, [props.id, props.name, navigation]);
  return (
    <TouchableOpacity style={styles.container} onPress={showDetail}>
      <Initial containerStyle={styles.containerInitial} name={props.name} />
      <Text style={styles.textName}>{props.name}</Text>
    </TouchableOpacity>
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
