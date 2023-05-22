import {render, screen} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigator} from '@geekseat/technical-test/App';

const queryClient = new QueryClient();

describe('Home', () => {
  it('should load page', () => {
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
  });
});
