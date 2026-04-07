import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CreateEmployeeScreen from './component/CreateEmployeeScreen';
import ShowAllEmployeeScreen from './component/ShowAllEmployeeScreen';
import { ApiModeProvider } from './src/context/ApiModeContext';
import type { ApiMode } from './src/services/employeeApi';

const Tab = createBottomTabNavigator();

function App() {
  const [apiMode, setApiMode] = useState<ApiMode>('rest');

  return (
    <ApiModeProvider value={{ apiMode, setApiMode }}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: { backgroundColor: '#f6f1ea', borderTopColor: '#eadfd3' },
            tabBarActiveTintColor: '#2b2420',
            tabBarInactiveTintColor: '#7d746b',
          }}
        >
          <Tab.Screen
            name="Employees"
            component={ShowAllEmployeeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account-group" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Create"
            component={CreateEmployeeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account-plus" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ApiModeProvider>
  );
}

export default App;
