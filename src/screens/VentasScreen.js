import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function VentasScreen({ navigation, productos = [] }) {
  const [cart, setCart] = useState({});

  const updateQuantity = (id, delta) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const updated = Math.max(0, current + delta);
      return { ...prev, [id]: updated };
    });
  };

  // Agrupar categorías dinámicamente
  const categories = Array.from(new Set(productos.map((p) => p.category)));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ventas</Text>
      <ScrollView style={{ width: '100%' }}>
        {categories.map((cat) => (
          <View key={cat}>
            <Text style={styles.sectionHeader}>{cat}</Text>
            {productos
              .filter((p) => p.category === cat)
              .map((item) => {
                const qty = cart[item.id] || 0;
                return (
                  <View key={item.id} style={styles.productRow}>
                    <View style={styles.priceCard}>
                      <Text style={styles.priceText}>${item.price}</Text>
                      <Text style={styles.productName}>{item.name}</Text>
                      <View style={styles.controls}>
                        <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.btn}>
                          <Text style={styles.btnText}>+</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.btn}>
                          <Text style={styles.btnText}>-</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.qtyBadge}>
                      <Text style={styles.qtyText}>{qty}</Text>
                    </View>
                  </View>
                );
              })}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.closeOrderBtn}
        onPress={() => navigation.navigate('ResumenCheckout', { cart, productos })}
      >
        <Text style={styles.closeOrderText}>Cerrar pedido</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  sectionHeader: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  productRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, width: '100%' },
  priceCard: { flex: 1, backgroundColor: '#FF5252', borderRadius: 15, padding: 15, height: 100, justifyContent: 'space-between' },
  priceText: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  productName: { color: '#FFF', fontSize: 14 },
  controls: { position: 'absolute', right: 10, top: 10, backgroundColor: '#000', borderRadius: 8, padding: 2 },
  btn: { paddingHorizontal: 8, paddingVertical: 2 },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  qtyBadge: { backgroundColor: '#000', width: 60, height: 100, borderRadius: 15, marginLeft: 10, justifyContent: 'center', alignItems: 'center' },
  qtyText: { color: '#FFF', fontSize: 28, fontWeight: 'bold' },
  closeOrderBtn: { backgroundColor: '#000', width: '100%', padding: 15, borderRadius: 20, alignItems: 'center', marginTop: 10 },
  closeOrderText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});