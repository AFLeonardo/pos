import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import DashboardScreen from '../screens/DashboardScreen';
import VentasScreen from '../screens/VentasScreen';
import ResumenCheckoutScreen from '../screens/ResumenCheckoutScreen';
import CocinaScreen from '../screens/CocinaScreen'; // Si creas la vista de cocina

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack para el flujo de ventas -> checkout
function VentasStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VentasMain" component={VentasScreen} />
      <Stack.Screen name="ResumenCheckout" component={ResumenCheckoutScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      {/* initialRouteName define qué pantalla abre la app por defecto */}
      <Tab.Navigator 
        initialRouteName="Productos" 
        screenOptions={{ headerShown: false }}
      >
        {/* La primera pantalla definida en la lista será la vista inicial */}
        <Tab.Screen name="Ventas" component={VentasStack} />
        
        {/* Esta es tu pantalla con el resumen/dashboard general */}
        <Tab.Screen name="Productos" component={DashboardScreen} />
        
        <Tab.Screen name="Cocina" component={CocinaScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}