// importamos el cliente de Supabase para interactuar con la base de datos
// este cliente ya está configurado con la URL y la clave de acceso a nuestra instancia de Supabase
import { supabase } from "./supabase.js";

//****************************************
// Referencias a elementos del DOM
//****************************************
// Botones
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

//****************************************
//Eventos
//****************************************

// Registro de usuario
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correoRegistro").value.trim();
  const password = document.getElementById("passwordRegistro").value.trim();

  // Validación
  if (!nombre || !correo || !password) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  // Registro en Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email: correo,
    password: password,
    options: {
      data: { nombre }
    }
  });

  if (error) {
    alert("Error en el registro: " + error.message);
  } else {
    alert("Registro exitoso. Revisa tu correo para confirmar la cuenta.");
    registerForm.reset();
  }
});

// Inicio de sesión
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const correo = document.getElementById("correo").value.trim();
  const password = document.getElementById("password").value.trim();

  // Login en Supabase Auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email: correo,
    password: password,
  });

  if (error) {
    alert("Error al iniciar sesión: " + error.message);
  } else {
    alert("Inicio de sesión exitoso. Bienvenido " + correo);
    // Redirige a index.html 
    window.location.href = "index.html";
  }
});