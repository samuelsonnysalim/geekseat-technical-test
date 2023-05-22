import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '@geekseat/technical-test/pages';

interface AppNavigatorProps {
  initialRouteName: string;
}

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export function AppNavigator(props: Partial<AppNavigatorProps>): JSX.Element {
  return (
    <Stack.Navigator initialRouteName={props.initialRouteName}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: 'Star Wars Characters'}}
      />
    </Stack.Navigator>
  );
}

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
