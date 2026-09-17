import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  Alert
} from 'react-native';

export default function ProductosScreen({ productos, setProductos }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null = Agregar nuevo, Object = Editando

  // Estado del formulario
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');

  // Abrir modal para crear producto
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setNombre('');
    setPrecio('');
    setCategoria('Raspados');
    setModalVisible(true);
  };

  // Abrir modal para editar producto
  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setNombre(product.name);
    setPrecio(product.price.toString());
    setCategoria(product.category);
    setModalVisible(true);
  };

  // Guardar cambios (Agregar o Editar)
  const handleSave = () => {
    if (!nombre || !precio || !categoria) {
      Alert.alert('Error', 'Por favor llena todos los campos');
      return;
    }

    if (editingProduct) {
      // Editar existente
      setProductos((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? { ...p, name: nombre, price: parseFloat(precio), category: categoria }
            : p
        )
      );
    } else {
      // Agregar nuevo
      const newProd = {
        id: Date.now().toString(),
        name: nombre,
        price: parseFloat(precio),
        category: categoria,
      };
      setProductos((prev) => [...prev, newProd]);
    }

    setModalVisible(false);
  };

  // Obtener categorías únicas dinámicamente
  const categories = Array.from(new Set(productos.map((p) => p.category)));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Productos</Text>

      {/* Botones de acción superiores */}
      <View style={styles.topButtonsRow}>
        <TouchableOpacity style={styles.blackBtn} onPress={handleOpenAdd}>
          <Text style={styles.btnIcon}>👀</Text>
          <Text style={styles.blackBtnText}>Agregar producto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.blackBtn}
          onPress={() => Alert.alert('Editar producto', 'Toca la tarjeta de cualquier producto para modificarlo.')}
        >
          <Text style={styles.btnIcon}>⚙️</Text>
          <Text style={styles.blackBtnText}>Editar producto</Text>
        </TouchableOpacity>
      </View>

      {/* Grid de productos ordenados por categoría */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {categories.map((cat) => (
          <View key={cat} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{cat}</Text>

            <View style={styles.gridContainer}>
              {productos
                .filter((p) => p.category === cat)
                .map((prod) => (
                  <TouchableOpacity
                    key={prod.id}
                    style={styles.card}
                    onPress={() => handleOpenEdit(prod)}
                  >
                    <Text style={styles.cardPrice}>${prod.price}</Text>
                    <Text style={styles.cardName}>{prod.name}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal para Agregar/Editar */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingProduct ? 'Editar Producto' : 'Agregar Producto'}
            </Text>

            <Text style={styles.label}>Nombre:</Text>
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder="Ej. Yuki Grande"
            />

            <Text style={styles.label}>Precio ($):</Text>
            <TextInput
              style={styles.input}
              value={precio}
              onChangeText={setPrecio}
              keyboardType="numeric"
              placeholder="Ej. 80"
            />

            <Text style={styles.label}>Categoría:</Text>
            <TextInput
              style={styles.input}
              value={categoria}
              onChangeText={setCategoria}
              placeholder="Ej. Raspados, Crepas, Fresas con crema"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#757575' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#E53935' }]}
                onPress={handleSave}
              >
                <Text style={styles.modalBtnText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  topButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  blackBtn: {
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    flex: 0.48,
    justifyContent: 'center',
  },
  btnIcon: {
    marginRight: 6,
    fontSize: 14,
  },
  blackBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  scroll: {
    flex: 1,
  },
  categorySection: {
    marginBottom: 25,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 4,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#E53935',
    width: '48%',
    height: 120,
    borderRadius: 20,
    padding: 15,
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  cardPrice: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  cardName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalBtn: {
    flex: 0.48,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});