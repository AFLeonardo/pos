import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';

export default function DashboardScreen({ completedOrders = [] }) {
  // 1. Calcular dinámicamente las ventas totales por CADA categoría existente
  const categoryTotals = {};
  let totalVendidoGeneral = 0;

  completedOrders.forEach((order) => {
    totalVendidoGeneral += order.total;

    order.items.forEach((item) => {
      const cat = item.category || 'Otros';
      if (!categoryTotals[cat]) {
        categoryTotals[cat] = 0;
      }
      categoryTotals[cat] += item.quantity;
    });
  });

  // Convertir las categorías en un array para renderizar los bloques de métricas
  const categoryKeys = Object.keys(categoryTotals);

  // Paleta de colores rotativa para las tarjetas de categorías
  const cardColors = ['#FFFFFF', '#D4E157', '#E91E63', '#FF9800', '#9C27B0', '#00BCD4'];

  // Función para formatear fechas
  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return `${date.toLocaleDateString()} - ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Kikis</Text>
        <Text style={styles.subtitle}>Ventas del día</Text>

        {/* --- SECCIÓN 1: CONTADORES DINÁMICOS DE CATEGORÍAS --- */}
        {categoryKeys.length === 0 ? (
          <View style={styles.emptyCardContainer}>
            <Text style={styles.emptyText}>No hay ventas registradas hoy</Text>
          </View>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScrollView}>
            <View style={styles.metricsRow}>
              {categoryKeys.map((cat, index) => {
                const bgColor = cardColors[index % cardColors.length];
                const isDark = bgColor === '#E91E63' || bgColor === '#9C27B0';
                return (
                  <View key={cat} style={[styles.card, { backgroundColor: bgColor }]}>
                    <Text style={[styles.cardNum, isDark && { color: '#FFF' }]}>
                      {categoryTotals[cat]}
                    </Text>
                    <Text style={[styles.cardLabel, isDark && { color: '#FFF' }]} numberOfLines={1}>
                      {cat}
                    </Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        )}

        {/* --- SECCIÓN 2: TOTAL GENERAL VENDIDO --- */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalHeader}>Total vendido</Text>
          <View style={styles.totalBox}>
            <Text style={styles.totalText}>${totalVendidoGeneral}</Text>
          </View>
        </View>

        {/* --- SECCIÓN 3: HISTORIAL DETALLADO POR NÚMERO DE ORDEN --- */}
        <Text style={styles.historySectionTitle}>Historial de Pedidos</Text>

        {completedOrders.length === 0 ? (
          <Text style={styles.noHistoryText}>Aún no has completado ningún pedido.</Text>
        ) : (
          completedOrders
            .slice()
            .reverse() // Muestra los pedidos más recientes primero
            .map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <Text style={styles.orderIdText}>Orden #{order.id}</Text>
                  <Text style={styles.orderTotalText}>${order.total}</Text>
                </View>

                <View style={styles.orderMetaRow}>
                  <Text style={styles.orderMetaText}>📅 {formatDate(order.timestamp)}</Text>
                  <Text style={styles.orderMetaText}>
                    💳 {order.method ? order.method.toUpperCase() : 'EFECTIVO'}
                  </Text>
                </View>

                <View style={styles.divider} />

                <Text style={styles.productsTitle}>Productos vendidos:</Text>
                {order.items.map((prod, idx) => (
                  <Text key={idx} style={styles.productItemText}>
                    • {prod.quantity}x {prod.name} ({prod.category})
                  </Text>
                ))}
              </View>
            ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#E53935',
    marginVertical: 5,
    textAlign: 'center',
  },
  metricsScrollView: {
    marginVertical: 15,
  },
  metricsRow: {
    flexDirection: 'row',
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
  },
  card: {
    width: 85,
    height: 85,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    padding: 5,
  },
  cardNum: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
  },
  cardLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  emptyCardContainer: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 15,
    marginVertical: 15,
    alignItems: 'center',
  },
  emptyText: {
    color: '#757575',
    fontSize: 14,
  },
  totalContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  totalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalBox: {
    backgroundColor: '#FF5252',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 15,
    marginTop: 8,
  },
  totalText: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  historySectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingBottom: 5,
  },
  noHistoryText: {
    textAlign: 'center',
    color: '#9E9E9E',
    marginVertical: 20,
  },
  orderCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 18,
    padding: 16,
    marginBottom: 15,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderIdText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderTotalText: {
    color: '#D4E157',
    fontSize: 20,
    fontWeight: 'bold',
  },
  orderMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  orderMetaText: {
    color: '#B0BEC5',
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 10,
  },
  productsTitle: {
    color: '#AAA',
    fontSize: 12,
    marginBottom: 4,
  },
  productItemText: {
    color: '#FFF',
    fontSize: 14,
    marginVertical: 2,
  },
});