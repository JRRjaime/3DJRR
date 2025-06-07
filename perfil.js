
import { auth, db } from './firebaseConfig.js';
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

window.addEventListener('DOMContentLoaded', () => {
  const rolImpresor = document.getElementById('rol-impresor');
  const contenedorImpresora = document.getElementById('impresora-container');
  const inputModelo = document.getElementById('impresora-modelo');

  rolImpresor.addEventListener('change', () => {
    contenedorImpresora.style.display = rolImpresor.checked ? 'block' : 'none';
  });

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const data = snap.data();
        inputModelo.value = data.impresoraModelo || "";
        document.getElementById('rol-creador').checked = data.roles?.includes("creador") || false;
        document.getElementById('rol-usuario').checked = data.roles?.includes("usuario") || false;
        document.getElementById('rol-impresor').checked = data.roles?.includes("impresor") || false;
        contenedorImpresora.style.display = data.roles?.includes("impresor") ? 'block' : 'none';
      }
    }
  });
});

window.guardarCambios = async function guardarCambios() {
  const user = auth.currentUser;
  if (!user) return;

  const roles = [];
  if (document.getElementById('rol-creador').checked) roles.push("creador");
  if (document.getElementById('rol-usuario').checked) roles.push("usuario");
  if (document.getElementById('rol-impresor').checked) roles.push("impresor");

  const impresoraModelo = document.getElementById('impresora-modelo').value;

  await setDoc(doc(db, "users", user.uid), {
    roles,
    impresoraModelo: roles.includes("impresor") ? impresoraModelo : ""
  }, { merge: true });

  alert("Perfil actualizado");
};
