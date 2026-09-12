import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DashboardScreen({ salesData = { raspado: 3, crepa: 2, fresas: 15, total: 12980 } }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kikis</Text>
      <Text style={styles.subtitle}>Ventas del día</Text>

      <View style={styles.metricsRow}>
        <View style={[styles.card, { backgroundColor: '#FFFFFF' }]}>
          <Text style={styles.cardNum}>{salesData.raspado}</Text>
          <Text style={styles.cardLabel}>Raspado</Text>
        </View>
        <View style={[styles.card, { backgroundColor: '#D4E157' }]}>
          <Text style={styles.cardNum}>{salesData.crepa}</Text>
          <Text style={styles.cardLabel}>Crepa</Text>
        </View>
        <View style={[styles.card, { backgroundColor: '#E91E63' }]}>
          <Text style={[styles.cardNum, { color: '#FFF' }]}>{salesData.fresas}</Text>
          <Text style={[styles.cardLabel, { color: '#FFF' }]}>Fresas</Text>
        </View>
      </View>

      <Text style={styles.totalHeader}>Total vendido</Text>
      <View style={styles.totalBox}>
        <Text style={styles.totalText}>${salesData.total}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 50, paddingHorizontal: 20, backgroundColor: '#FFF' },
  title: { fontSize: 28, fontWeight: 'bold' },
  subtitle: { fontSize: 16, color: '#E53935', marginVertical: 10 },
  metricsRow: { flexDirection: 'row', backgroundColor: '#000', borderRadius: 15, padding: 10, marginVertical: 20 },
  card: { width: 80, height: 80, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 },
  cardNum: { fontSize: 28, fontWeight: 'bold' },
  cardLabel: { fontSize: 12, marginTop: 4 },
  totalHeader: { fontSize: 20, fontWeight: 'bold', marginTop: 30 },
  totalBox: { backgroundColor: '#FF5252', paddingVertical: 15, paddingHorizontal: 60, borderRadius: 15, marginTop: 15 },
  totalText: { color: '#FFF', fontSize: 36, fontWeight: 'bold' }
});