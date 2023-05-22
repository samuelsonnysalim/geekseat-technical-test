import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import moment from 'moment';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useQueries, useQuery} from '@tanstack/react-query';
import {
  FilmService,
  PeopleService,
  PlanetService,
  SpeciesService,
  StarshipService,
  VehicleService,
} from '@geekseat/technical-test/services';
import {
  Initial,
  LabelMultipleValues,
  LabelValue,
} from '@geekseat/technical-test/components';

type Params = {Detail: Partial<{id: string; name: string}>};
export type DetailNavigationProp = NavigationProp<Params>;
export type DetailRouteProp = RouteProp<Params>;

const useQueryForMultipleValues = <S extends (options: any) => Promise<any>>(
  urls: string[],
  path: string,
  service: S,
) => {
  return useQueries({
    queries:
      urls.map(url => {
        const filmId = url.substring(
          url.indexOf(`${path}/`) + `${path}/`.length,
          url.length - 1,
        );
        return {
          queryKey: [path, filmId],
          queryFn: () => service({params: {id: filmId}}),
        };
      }) || [],
  });
};

export default function Detail(): JSX.Element {
  const navigation = useNavigation<DetailNavigationProp>();
  const route = useRoute<DetailRouteProp>();
  const {
    isLoading: isPeopleLoading,
    error: peopleError,
    data: peopleData,
  } = useQuery({
    queryKey: ['people', route.params.id],
    queryFn: () => PeopleService.getPeople({params: {id: route.params.id}}),
  });

  const planetId = peopleData?.homeworld.substring(
    peopleData?.homeworld.indexOf('planets/') + 'planets/'.length,
    peopleData?.homeworld.length - 1,
  );
  const {isLoading: isPlanetLoading, data: planetData} = useQuery({
    queryKey: planetId ? ['planets', planetId] : [],
    queryFn: () =>
      planetId ? PlanetService.getPlanet({params: {id: planetId}}) : {name: ''},
  });

  const filmResults = useQueryForMultipleValues(
    peopleData?.films || [],
    'films',
    FilmService.getFilm,
  );

  const speciesResults = useQueryForMultipleValues(
    peopleData?.species || [],
    'species',
    SpeciesService.getSpecies,
  );

  const vehicleResults = useQueryForMultipleValues(
    peopleData?.vehicles || [],
    'vehicles',
    VehicleService.getVehicle,
  );

  const starshipResults = useQueryForMultipleValues(
    peopleData?.starships || [],
    'starships',
    StarshipService.getStarship,
  );

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

  if (isPeopleLoading && isPlanetLoading) {
    return <ActivityIndicator style={styles.singleItem} size="large" />;
  } else if (!peopleData && peopleError) {
    return (
      <Text style={styles.singleItem}>{(peopleError as Error).message}</Text>
    );
  } else {
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <LabelValue label="Height" value={`${peopleData?.height}cm`} />
          <LabelValue label="Mass" value={`${peopleData?.mass}kg`} />
          <LabelValue label="Hair Color" value={peopleData?.hair_color} />
          <LabelValue label="Skin Color" value={peopleData?.skin_color} />
          <LabelValue label="Eye Color" value={peopleData?.eye_color} />
          <LabelValue label="Birth Year" value={peopleData?.birth_year} />
          <LabelValue label="Gender" value={peopleData?.gender} />
          <LabelValue label="Homeworld" value={planetData?.name} />
          <LabelMultipleValues
            label="Films"
            values={filmResults.map(result => ({
              title: result.data?.title,
              description: result.data?.opening_crawl,
            }))}
          />
          <LabelMultipleValues
            label="Species"
            values={speciesResults.map(result => ({
              title: result.data?.name,
              description: result.data?.classification,
            }))}
          />
          <LabelMultipleValues
            label="Vehicles"
            values={vehicleResults.map(result => ({
              title: result.data?.name,
              description: result.data?.manufacturer,
            }))}
          />
          <LabelMultipleValues
            label="Starship"
            values={starshipResults.map(result => ({
              title: result.data?.name,
              description: result.data?.manufacturer,
            }))}
          />
          <LabelValue
            label="Created At"
            value={moment(peopleData?.created).format('DD-MM-YYYY')}
          />
          <LabelValue
            label="Edited At"
            value={moment(peopleData?.edited).format('DD-MM-YYYY')}
          />
        </View>
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
