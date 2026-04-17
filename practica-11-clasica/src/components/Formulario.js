import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { styles } from "../styles/GlobalStyles";

export default function Formulario({
  nombre,
  setNombre,
  telefono,
  setTelefono,
  email,
  setEmail,
  guardando,
  onGuardar,
}) {
  return (
    <View style={styles.formulario}>
      <Text style={styles.labelFormulario}>Agregar Nuevo Contacto</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Email (opcional)"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="#999"
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={[styles.boton, guardando && styles.botonDeshabilitado]}
        onPress={onGuardar}
        disabled={guardando}
      >
        {guardando ? (
          <View style={styles.botonCargando}>
            <ActivityIndicator color="#1A1A1A" size="small" />
            <Text style={styles.textoBotonCargando}>Guardando...</Text>
          </View>
        ) : (
          <Text style={styles.textoBoton}>Guardar Contacto</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
