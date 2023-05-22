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
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/2/',
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/6/',
      ],
      species: [],
      vehicles: [
        'https://swapi.dev/api/vehicles/14/',
        'https://swapi.dev/api/vehicles/30/',
      ],
      starships: [
        'https://swapi.dev/api/starships/12/',
        'https://swapi.dev/api/starships/22/',
      ],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.dev/api/people/1/',
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
      expect(screen.getByText('Luke Skywalker')).toBeDefined();
    });
  });
});
