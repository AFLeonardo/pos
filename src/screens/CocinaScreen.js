import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function CocinaScreen({ orders = [], onCompleteOrder }) {
  const renderOrderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.orderId}>Orden #{item.id}</Text>
        <Text style={styles.totalText}>Total: ${item.total}</Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.itemsTitle}>Por preparar:</Text>
      {item.items.map((prod, index) => (
        <Text key={index} style={styles.itemDetail}>
          • {prod.quantity}x {prod.name}
        </Text>
      ))}

      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => onCompleteOrder(item.id)}
      >
        <Text style={styles.doneButtonText}>Lista</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cocina - Comandas</Text>
      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay órdenes pendientes 👨‍🍳</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderOrderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', paddingTop: 50, paddingHorizontal: 20 },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#757575', fontWeight: '500' },
  card: {
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderId: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  totalText: { color: '#D4E157', fontSize: 18, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#333', marginVertical: 12 },
  itemsTitle: { color: '#AAA', fontSize: 14, marginBottom: 6 },
  itemDetail: { color: '#FFF', fontSize: 16, marginVertical: 2, fontWeight: '500' },
  doneButton: {
    backgroundColor: '#66BB6A',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  doneButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});