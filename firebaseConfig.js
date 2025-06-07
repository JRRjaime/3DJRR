
// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC-K3tYsha1MvozQrI8O9HgQYceqVA7IvU",
  authDomain: "mi-tienda-3d.firebaseapp.com",
  projectId: "mi-tienda-3d",
  storageBucket: "mi-tienda-3d.firebasestorage.app",
  messagingSenderId: "785872833304",
  appId: "1:785872833304:web:fd4ed144ce4af7585e6c6d",
  measurementId: "G-V8G13YV3QP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
