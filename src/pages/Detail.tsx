import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {PeopleService} from '@geekseat/technical-test/services';
import {Initial} from '@geekseat/technical-test/components';

type Params = {Detail: Partial<{id: string; name: string}>};
export type DetailNavigationProp = NavigationProp<Params>;
export type DetailRouteProp = RouteProp<Params>;

export default function Detail(): JSX.Element {
  const navigation = useNavigation<DetailNavigationProp>();
  const route = useRoute<DetailRouteProp>();
  const {isLoading, error, data} = useQuery({
    queryKey: ['people', route.params.id],
    queryFn: () => PeopleService.getPeople({params: {id: route.params.id}}),
  });

  useEffect(() => {
    if (route.params.name) {
      navigation.setOptions({
        headerLeft: () => (
          <Initial
            containerStyle={styles.containerInitial}
            name={route.params.name}
          />
        ),
        headerTitle: () => (
          <Text style={styles.textName}>{route.params.name}</Text>
        ),
      });
    }
  }, [route.params.name, navigation]);

  if (isLoading) {
    return <ActivityIndicator style={styles.singleItem} size="large" />;
  } else if (!data && error) {
    return <Text style={styles.singleItem}>{(error as Error).message}</Text>;
  } else {
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  singleItem: {
    margin: 16,
  },
  scrollView: {
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
    minHeight: '100%',
  },
  containerInitial: {
    marginRight: 12,
    marginLeft: Platform.OS === 'android' ? -16 : 0,
  },
  textName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
});
