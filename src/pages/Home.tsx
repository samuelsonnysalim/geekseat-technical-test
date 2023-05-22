import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {PeopleService} from '@geekseat/technical-test/services';

export default function Home(): JSX.Element {
  const {isLoading, error, data} = useQuery({
    queryKey: ['people'],
    queryFn: () => PeopleService.getPeople(),
  });
  if (isLoading) {
    return <ActivityIndicator style={styles.singleItem} size="large" />;
  } else if (error) {
    return <Text style={styles.singleItem}>{(error as Error).message}</Text>;
  } else {
    return (
      <FlatList
        data={data?.results || []}
        renderItem={({item}) => <Text>{item.name}</Text>}
      />
    );
  }
}

const styles = StyleSheet.create({
  singleItem: {
    margin: 16,
  },
});
