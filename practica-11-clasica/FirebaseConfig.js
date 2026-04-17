import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // 1. Importamos Firestore

const firebaseConfig = {
  apiKey: "AIzaSyC4P0zrwm_BNNB9HxtWXRW48NMjj1M1asM",
  authDomain: "practica11-84e6a.firebaseapp.com",
  projectId: "practica11-84e6a",
  storageBucket: "practica11-84e6a.firebasestorage.app",
  messagingSenderId: "728143261625",
  appId: "1:728143261625:web:5d9d3a40f71a8cb5f4d068",
  measurementId: "G-0LLX59B6WY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 2. Inicializamos la base de datos
const db = getFirestore(app);

// 3. Exportamos 'db' para que App.js pueda usarla para guardar
export { db };
