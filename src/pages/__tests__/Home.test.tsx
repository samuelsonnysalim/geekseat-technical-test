import {
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigator} from '@geekseat/technical-test/App';

jest.mock('@geekseat/technical-test/services/PeopleService', () => ({
  PeopleService: {
    paginatePeople: jest
      .fn()
      .mockResolvedValueOnce({
        count: 3,
        next: 'https://swapi.dev/api/people/?page=2',
        results: [
          {
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
          },
          {
            name: 'C-3PO',
            height: '167',
            mass: '75',
            hair_color: 'n/a',
            skin_color: 'gold',
            eye_color: 'yellow',
            birth_year: '112BBY',
            gender: 'n/a',
            homeworld: 'https://swapi.dev/api/planets/1/',
            films: [
              'https://swapi.dev/api/films/1/',
              'https://swapi.dev/api/films/2/',
              'https://swapi.dev/api/films/3/',
              'https://swapi.dev/api/films/4/',
              'https://swapi.dev/api/films/5/',
              'https://swapi.dev/api/films/6/',
            ],
            species: ['https://swapi.dev/api/species/2/'],
            vehicles: [],
            starships: [],
            created: '2014-12-10T15:10:51.357000Z',
            edited: '2014-12-20T21:17:50.309000Z',
            url: 'https://swapi.dev/api/people/2/',
          },
        ],
      })
      .mockResolvedValueOnce({
        count: 3,
        next: 'https://swapi.dev/api/people/?page=3',
        results: [
          {
            name: 'R2-D2',
            height: '96',
            mass: '32',
            hair_color: 'n/a',
            skin_color: 'white, blue',
            eye_color: 'red',
            birth_year: '33BBY',
            gender: 'n/a',
            homeworld: 'https://swapi.dev/api/planets/8/',
            films: [
              'https://swapi.dev/api/films/1/',
              'https://swapi.dev/api/films/2/',
              'https://swapi.dev/api/films/3/',
              'https://swapi.dev/api/films/4/',
              'https://swapi.dev/api/films/5/',
              'https://swapi.dev/api/films/6/',
            ],
            species: ['https://swapi.dev/api/species/2/'],
            vehicles: [],
            starships: [],
            created: '2014-12-10T15:11:50.376000Z',
            edited: '2014-12-20T21:17:50.311000Z',
            url: 'https://swapi.dev/api/people/3/',
          },
          {
            name: 'Darth Vader',
            height: '202',
            mass: '136',
            hair_color: 'none',
            skin_color: 'white',
            eye_color: 'yellow',
            birth_year: '41.9BBY',
            gender: 'male',
            homeworld: 'https://swapi.dev/api/planets/1/',
            films: [
              'https://swapi.dev/api/films/1/',
              'https://swapi.dev/api/films/2/',
              'https://swapi.dev/api/films/3/',
              'https://swapi.dev/api/films/6/',
            ],
            species: [],
            vehicles: [],
            starships: ['https://swapi.dev/api/starships/13/'],
            created: '2014-12-10T15:18:20.704000Z',
            edited: '2014-12-20T21:17:50.313000Z',
            url: 'https://swapi.dev/api/people/4/',
          },
        ],
      })
      .mockResolvedValueOnce({
        count: 3,
        next: null,
        results: [
          {
            name: 'Leia Organa',
            height: '150',
            mass: '49',
            hair_color: 'brown',
            skin_color: 'light',
            eye_color: 'brown',
            birth_year: '19BBY',
            gender: 'female',
            homeworld: 'https://swapi.dev/api/planets/2/',
            films: [
              'https://swapi.dev/api/films/1/',
              'https://swapi.dev/api/films/2/',
              'https://swapi.dev/api/films/3/',
              'https://swapi.dev/api/films/6/',
            ],
            species: [],
            vehicles: ['https://swapi.dev/api/vehicles/30/'],
            starships: [],
            created: '2014-12-10T15:20:09.791000Z',
            edited: '2014-12-20T21:17:50.315000Z',
            url: 'https://swapi.dev/api/people/5/',
          },
        ],
      }),
  },
}));

const queryClient = new QueryClient();

describe('Home', () => {
  it('should load page', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </QueryClientProvider>,
    );
    expect(
      screen.UNSAFE_getByProps({title: 'Star Wars Characters'}),
    ).toBeDefined();

    await waitFor(() => {
      expect(screen.getByText('LS')).toBeDefined();
      expect(screen.getByText('Luke Skywalker')).toBeDefined();

      expect(screen.getByText('C3')).toBeDefined();
      expect(screen.getByText('C-3PO')).toBeDefined();
    });
  });

  it('should load more on reaching end of the flatlist', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('LS')).toBeDefined();
      expect(screen.getByText('Luke Skywalker')).toBeDefined();
    });

    fireEvent.scroll(screen.getByTestId('list'), {
      nativeEvent: {
        contentOffset: {
          y: 500,
        },
        contentSize: {
          height: 500,
          width: 100,
        },
        layoutMeasurement: {
          height: 100,
          width: 100,
        },
      },
    });

    await waitFor(() => {
      expect(screen.getByText('RD')).toBeDefined();
      expect(screen.getByText('R2-D2')).toBeDefined();
    });

    fireEvent.scroll(screen.getByTestId('list'), {
      nativeEvent: {
        contentOffset: {
          y: 500,
        },
        contentSize: {
          height: 500,
          width: 100,
        },
        layoutMeasurement: {
          height: 100,
          width: 100,
        },
      },
    });

    await waitFor(() => {
      expect(screen.getByText('LO')).toBeDefined();
      expect(screen.getByText('Leia Organa')).toBeDefined();
    });
  });
});
