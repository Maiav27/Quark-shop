// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Home from './Home';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Favoritos from './Favoritos';
import { AuthProvider } from './store/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carrinho from './Carrinho';






const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
      <AuthProvider>
          <Tab.Navigator initialRouteName='Home'>
                  <Tab.Screen name="Home" component={Home} />
                  <Tab.Screen  name='Favoritos'  component={Favoritos}/>
                  <Tab.Screen  name='Carrinho'  component={Carrinho}/>
          </Tab.Navigator>
      </AuthProvider>
  );
}

function App() {
  return (
    <NavigationContainer>
       <MyTabs/>
    </NavigationContainer>
  );
}

export default App;