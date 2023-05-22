import {render, screen, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigator} from '@geekseat/technical-test/App';

jest.useFakeTimers();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: jest.fn().mockReturnValue({
    params: {
      id: '1',
      name: 'Luke Skywalker',
    },
  }),
}));

jest.mock('@geekseat/technical-test/services/PeopleService', () => ({
  PeopleService: {
    getPeople: jest.fn().mockResolvedValue({
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: ['https://swapi.dev/api/films/1/'],
      species: ['https://swapi.dev/api/species/1/'],
      vehicles: ['https://swapi.dev/api/vehicles/14/'],
      starships: ['https://swapi.dev/api/starships/12/'],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.dev/api/people/1/',
    }),
  },
}));

jest.mock('@geekseat/technical-test/services/PlanetService', () => ({
  PlanetService: {
    getPlanet: jest.fn().mockResolvedValue({
      name: 'Tatooine',
    }),
  },
}));

jest.mock('@geekseat/technical-test/services/FilmService', () => ({
  FilmService: {
    getFilm: jest.fn().mockResolvedValue({
      title: 'A New Hope',
      opening_crawl: 'It is a period of civil war.',
    }),
  },
}));

jest.mock('@geekseat/technical-test/services/SpeciesService', () => ({
  SpeciesService: {
    getSpecies: jest.fn().mockResolvedValue({
      name: 'Human',
      classification: 'mammal',
    }),
  },
}));

jest.mock('@geekseat/technical-test/services/VehicleService', () => ({
  VehicleService: {
    getVehicle: jest.fn().mockResolvedValue({
      name: 'Snowspeeder',
      manufacturer: 'Incom corporation',
    }),
  },
}));

jest.mock('@geekseat/technical-test/services/StarshipService', () => ({
  StarshipService: {
    getStarship: jest.fn().mockResolvedValue({
      name: 'X-wing',
      manufacturer: 'Incom corporation',
    }),
  },
}));

const queryClient = new QueryClient();

describe('Detail', () => {
  it('should load page', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <AppNavigator initialRouteName="Detail" />
        </NavigationContainer>
      </QueryClientProvider>,
    );
    await waitFor(() => {
      expect(screen.getByText('LS')).toBeDefined();
      expect(screen.getByText('Luke Skywalker')).toBeDefined();

      expect(screen.getByText('Height')).toBeDefined();
      expect(screen.getByText('172cm')).toBeDefined();

      expect(screen.getByText('Mass')).toBeDefined();
      expect(screen.getByText('77kg')).toBeDefined();

      expect(screen.getByText('Hair Color')).toBeDefined();
      expect(screen.getByText('blond')).toBeDefined();

      expect(screen.getByText('Skin Color')).toBeDefined();
      expect(screen.getByText('fair')).toBeDefined();

      expect(screen.getByText('Eye Color')).toBeDefined();
      expect(screen.getByText('blue')).toBeDefined();

      expect(screen.getByText('Birth Year')).toBeDefined();
      expect(screen.getByText('19BBY')).toBeDefined();

      expect(screen.getByText('Gender')).toBeDefined();
      expect(screen.getByText('male')).toBeDefined();

      expect(screen.getByText('Homeworld')).toBeDefined();
      expect(screen.getByText('Tatooine')).toBeDefined();

      expect(screen.getByText('Films')).toBeDefined();
      expect(screen.getByText('• A New Hope')).toBeDefined();
      expect(screen.getByText('It is a period of civil war.')).toBeDefined();

      expect(screen.getByText('Species')).toBeDefined();
      expect(screen.getByText('• Human')).toBeDefined();
      expect(screen.getByText('mammal')).toBeDefined();

      expect(screen.getByText('Vehicles')).toBeDefined();
      expect(screen.getByText('• Snowspeeder')).toBeDefined();
      expect(screen.getAllByText('Incom corporation')[0]).toBeDefined();

      expect(screen.getByText('Vehicles')).toBeDefined();
      expect(screen.getByText('• X-wing')).toBeDefined();
      expect(screen.getAllByText('Incom corporation')[1]).toBeDefined();

      expect(screen.getByText('Created At')).toBeDefined();
      expect(screen.getByText('09-12-2014')).toBeDefined();

      expect(screen.getByText('Edited At')).toBeDefined();
      expect(screen.getByText('21-12-2014')).toBeDefined();
    });
  });
});
