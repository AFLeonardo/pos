import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import DashboardScreen from '../screens/DashboardScreen';
import VentasScreen from '../screens/VentasScreen';
import ResumenCheckoutScreen from '../screens/ResumenCheckoutScreen';
import CocinaScreen from '../screens/CocinaScreen';
import ProductosScreen from '../screens/ProductosScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const PRODUCTOS_INICIALES = [
  { id: '1', name: 'Yuki Chico', price: 40, category: 'Raspados' },
  { id: '2', name: 'Yuki medio', price: 50, category: 'Raspados' },
  { id: '3', name: 'Yuki grande', price: 80, category: 'Raspados' },
  { id: '4', name: 'Crepa 2 toppings', price: 70, category: 'Crepas' },
  { id: '5', name: 'Crepa 3 toppings', price: 80, category: 'Crepas' },
  { id: '6', name: 'Fresas chicas', price: 60, category: 'Fresas con crema' },
  { id: '7', name: 'Fresas medias', price: 80, category: 'Fresas con crema' },
];

function VentasStack({ productos, addOrder }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VentasMain">
        {(props) => <VentasScreen {...props} productos={productos} />}
      </Stack.Screen>
      <Stack.Screen name="ResumenCheckout">
        {(props) => <ResumenCheckoutScreen {...props} addOrder={addOrder} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const [productos, setProductos] = useState(PRODUCTOS_INICIALES);
  const [activeOrders, setActiveOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  // Agregar nueva orden enviada desde Ventas/Resumen
  const addOrder = (newOrder) => {
    setActiveOrders((prev) => [...prev, newOrder]);
  };

  // Marcar orden como "Lista" en la Cocina
  const handleCompleteOrder = (orderId) => {
    const orderToComplete = activeOrders.find((o) => o.id === orderId);
    if (orderToComplete) {
      setActiveOrders((prev) => prev.filter((o) => o.id !== orderId));
      setCompletedOrders((prev) => [...prev, { ...orderToComplete, status: 'completado' }]);
    }
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Ventas"
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#E53935',
          tabBarInactiveTintColor: '#757575',
          tabBarLabelStyle: styles.tabLabel,
        }}
      >
        {/* Pestaña Ventas */}
        <Tab.Screen
          name="Ventas"
          options={{
            tabBarLabel: 'Ventas',
            tabBarIcon: ({ focused }) => (
              <Text style={[styles.tabIcon, focused && styles.focusedIcon]}>💵</Text>
            ),
          }}
        >
          {(props) => <VentasStack {...props} productos={productos} addOrder={addOrder} />}
        </Tab.Screen>

        {/* Pestaña Productos */}
        <Tab.Screen
          name="Productos"
          options={{
            tabBarLabel: 'Productos',
            tabBarIcon: ({ focused }) => (
              <Text style={[styles.tabIcon, focused && styles.focusedIcon]}>📦</Text>
            ),
          }}
        >
          {(props) => <ProductosScreen {...props} productos={productos} setProductos={setProductos} />}
        </Tab.Screen>

        {/* Pestaña Cocina */}
        <Tab.Screen
          name="Cocina"
          options={{
            tabBarLabel: 'Cocina',
            tabBarIcon: ({ focused }) => (
              <Text style={[styles.tabIcon, focused && styles.focusedIcon]}>👨‍🍳</Text>
            ),
          }}
        >
          {(props) => (
            <CocinaScreen
              {...props}
              orders={activeOrders}
              onCompleteOrder={handleCompleteOrder}
            />
          )}
        </Tab.Screen>

        {/* Pestaña Historial */}
        <Tab.Screen
          name="Historial"
          options={{
            tabBarLabel: 'Historial',
            tabBarIcon: ({ focused }) => (
              <Text style={[styles.tabIcon, focused && styles.focusedIcon]}>📊</Text>
            ),
          }}
        >
          {(props) => <DashboardScreen {...props} completedOrders={completedOrders} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    height: 65,
    paddingBottom: 8,
    paddingTop: 6,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  tabIcon: {
    fontSize: 20,
    opacity: 0.7,
  },
  focusedIcon: {
    opacity: 1,
    transform: [{ scale: 1.15 }],
  },
});