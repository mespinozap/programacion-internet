// importamos el cliente de Supabase para interactuar con la base de datos
// este cliente ya está configurado con la URL y la clave de acceso a nuestra instancia de Supabase
import { supabase } from "./supabase.js";

//****************************************
// Referencias a elementos del DOM
//****************************************

const btnLogout = document.getElementById("btnLogout");

//****************************************
//Eventos
//****************************************

const cerrarSesion = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    alert("Error al cerrar sesión");
  } else {
    alert("Sesión cerrada correctamente");
    window.location.href = "login.html"; // Redirige al login después de cerrar sesión
  }
};

if (btnLogout) {
  btnLogout.onclick = cerrarSesion;
}