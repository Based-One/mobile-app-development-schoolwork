import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles/GlobalStyles";

export default function ContactoCard({ item }) {
  return (
    <View style={styles.tarjetaContacto}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatar}>{item.nombre.charAt(0).toUpperCase()}</Text>
      </View>
      <View style={styles.infoContacto}>
        <Text style={styles.nombreContacto}>{item.nombre}</Text>
        <Text style={styles.telefonoContacto}>{item.telefono}</Text>
        {item.email ? (
          <Text style={styles.emailContacto}>{item.email}</Text>
        ) : null}
      </View>
    </View>
  );
}
