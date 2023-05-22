import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Detail, Home} from '@geekseat/technical-test/pages';

interface AppNavigatorProps {
  initialRouteName: string;
}

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export function AppNavigator(props: Partial<AppNavigatorProps>): JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName={props.initialRouteName}
      screenOptions={{
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#2c3e50',
        },
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: 'Star Wars Characters'}}
      />
      <Stack.Screen name="Detail" component={Detail} />
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
