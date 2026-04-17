import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Switch,
  TouchableOpacity,
} from "react-native";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "./FirebaseConfig";
import { styles } from "./src/styles/GlobalStyles";
import ContactoCard from "./src/components/ContactoCard";
import Formulario from "./src/components/Formulario";

export default function App() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [soloConEmail, setSoloConEmail] = useState(false);

  const agregarContacto = async () => {
    if (!nombre.trim() || !telefono.trim()) {
      alert("Por favor completa nombre y teléfono"); // En web, 'alert' nativo funciona mejor que Alert.alert de React Native
      return;
    }
    setGuardando(true);
    try {
      await addDoc(collection(db, "contactos"), {
        nombre: nombre.trim(),
        telefono: telefono.trim(),
        email: email.trim(),
        fechaCreacion: new Date().toISOString(),
      });
      setNombre("");
      setTelefono("");
      setEmail("");
      obtenerContactos(soloConEmail);
      alert("Contacto guardado correctamente");
    } catch (error) {
      console.error(error);
      alert("Error: No se pudo guardar el contacto. Revisa la consola.");
    } finally {
      setGuardando(false);
    }
  };

  const obtenerContactos = async (filtroEmail = null) => {
    setCargando(true);
    try {
      let q = filtroEmail
        ? query(
            collection(db, "contactos"),
            where("email", "!=", ""),
            orderBy("email", "asc"),
            orderBy("nombre", "asc"),
          )
        : query(collection(db, "contactos"), orderBy("nombre", "asc"));

      const querySnapshot = await getDocs(q);
      const listaContactos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContactos(listaContactos);
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerContactos(soloConEmail);
  }, [soloConEmail]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.titulo}>Contactos Firestore</Text>
        <Text style={styles.subtitulo}>{contactos.length} contactos</Text>
      </View>

      <Formulario
        nombre={nombre}
        setNombre={setNombre}
        telefono={telefono}
        setTelefono={setTelefono}
        email={email}
        setEmail={setEmail}
        guardando={guardando}
        onGuardar={agregarContacto}
      />

      <View style={styles.contenedorLista}>
        <View style={styles.headerLista}>
          <Text style={styles.tituloLista}>Mis Contactos</Text>
          <View style={styles.filtroContainer}>
            <Text style={styles.textoFiltro}>Solo con email</Text>
            <Switch
              value={soloConEmail}
              onValueChange={setSoloConEmail}
              trackColor={{ false: "#E0E0E0", true: "#FFD54F" }}
              thumbColor={soloConEmail ? "#FDB813" : "#f4f3f4"}
            />
          </View>
          <TouchableOpacity onPress={() => obtenerContactos(soloConEmail)}>
            <Text style={styles.textoRecargar}>Recargar</Text>
          </TouchableOpacity>
        </View>

        {cargando ? (
          <View style={styles.centrado}>
            <ActivityIndicator size="large" color="#FDB813" />
            <Text style={styles.textoCargando}>Cargando...</Text>
          </View>
        ) : (
          <FlatList
            data={contactos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ContactoCard item={item} />}
            ItemSeparatorComponent={() => <View style={styles.separador} />}
            ListEmptyComponent={() => (
              <View style={styles.centrado}>
                <Text style={styles.textoVacio}>📇</Text>
                <Text style={styles.textoVacio2}>No hay contactos</Text>
              </View>
            )}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
