import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, StyleSheet } from 'react-native';

export default function ResumenCheckoutScreen({ route, navigation, addOrder }) {
  const { cart = {}, productos = [] } = route.params || {};
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [payAmount, setPayAmount] = useState('');

  const itemsInCart = productos.filter((p) => cart[p.id] > 0);
  const total = itemsInCart.reduce((sum, p) => sum + p.price * cart[p.id], 0);
  const change = parseFloat(payAmount) ? Math.max(0, parseFloat(payAmount) - total) : 0;

  const handleConfirmOrder = () => {
    const newOrder = {
      id: Math.floor(1000 + Math.random() * 9000), // Genera ID de 4 dígitos
      items: itemsInCart.map((p) => ({
        id: p.id,
        name: p.name,
        quantity: cart[p.id],
        category: p.category,
      })),
      total: total,
      method: paymentMethod,
      status: 'pendiente', // 'pendiente' -> pasa a 'completado'
      timestamp: new Date().toISOString(),
    };

    addOrder(newOrder);
    setPaymentMethod(null);
    navigation.navigate('VentasMain');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen</Text>

      <View style={styles.summaryList}>
        {itemsInCart.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Text style={styles.itemText}>{cart[item.id]}x {item.name}</Text>
            <Text style={styles.itemText}>${item.price * cart[item.id]}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.totalText}>Total ${total}</Text>

      <View style={styles.methodContainer}>
        <Text style={styles.methodHeader}>Método pago</Text>
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.methodBtn} onPress={() => setPaymentMethod('efectivo')}>
            <Text style={styles.methodBtnText}>💵 Efectivo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.methodBtn} onPress={() => setPaymentMethod('transferencia')}>
            <Text style={styles.methodBtnText}>💳 Transferencia</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal Efectivo */}
      <Modal visible={paymentMethod === 'efectivo'} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={[styles.modalCard, { backgroundColor: '#66BB6A' }]}>
            <Text style={styles.modalTitle}>Efectivo</Text>
            <Text style={styles.inputLabel}>Paga con</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={payAmount} onChangeText={setPayAmount} />
            <Text style={styles.inputLabel}>Cambio de</Text>
            <View style={styles.readOnlyInput}>
              <Text>{change ? `$${change}` : ''}</Text>
            </View>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.actionBtn} onPress={() => setPaymentMethod(null)}>
                <Text>Atrás</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn} onPress={handleConfirmOrder}>
                <Text>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Transferencia */}
      <Modal visible={paymentMethod === 'transferencia'} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={[styles.modalCard, { backgroundColor: '#FB8C00' }]}>
            <Text style={styles.modalTitle}>Transferencia</Text>
            <Text style={styles.clabeText}>XXXX{"\n"}XXXX{"\n"}XXXX{"\n"}XXXX</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.actionBtn} onPress={() => setPaymentMethod(null)}>
                <Text>Atrás</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn} onPress={handleConfirmOrder}>
                <Text>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  summaryList: { flex: 1 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  itemText: { fontSize: 16 },
  totalText: { fontSize: 20, fontWeight: 'bold', color: '#3F51B5', textAlign: 'right', marginVertical: 20 },
  methodContainer: { borderTopWidth: 1, paddingTop: 15, alignItems: 'center' },
  methodHeader: { fontWeight: 'bold', marginBottom: 10 },
  btnRow: { flexDirection: 'row' },
  methodBtn: { backgroundColor: '#000', padding: 10, borderRadius: 20, marginHorizontal: 5 },
  methodBtnText: { color: '#FFF' },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalCard: { width: 260, padding: 20, borderRadius: 20, alignItems: 'center' },
  modalTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  inputLabel: { color: '#000', alignSelf: 'flex-start', marginVertical: 4 },
  input: { backgroundColor: '#FFF', width: '100%', height: 35, borderRadius: 10, paddingHorizontal: 10 },
  readOnlyInput: { backgroundColor: '#FFF', width: '100%', height: 35, borderRadius: 10, justifyContent: 'center', paddingHorizontal: 10 },
  clabeText: { color: '#000', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, letterSpacing: 2 },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 20 },
  actionBtn: { backgroundColor: '#FFF', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 15 }
});