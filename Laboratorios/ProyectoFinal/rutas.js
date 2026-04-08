// importamos el cliente de Supabase para interactuar con la base de datos
// este cliente ya está configurado con la URL y la clave de acceso a nuestra instancia de Supabase
import { supabase } from "./supabase.js";

//****************************************
// Referencias a elementos del DOM
//****************************************
// Botones
const btnLoadRutas = document.getElementById("btnLoadRutas");
const tbodyRutas = document.getElementById("tbodyRutas");

//****************************************
//Eventos
//****************************************

// Consultar rutas
const consultarRutas = async () => {
  const { data, error } = await supabase
    .from("rutas")
    .select(
      "id,codigo,origen,destino,duracion,fecha_salida,fecha_llegada,aeronave",
    );

  if (error) {
    console.error(error);
    alert("Error cargando rutas");
    return;
  }

  tbodyRutas.innerHTML = "";
  data.forEach((r) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.codigo}</td>
      <td>${r.origen}</td>
      <td>${r.destino}</td>
      <td>${r.duracion}</td>
      <td>${r.fecha_salida}</td>
      <td>${r.fecha_llegada}</td>
      <td>${r.aeronave}</td>
    `;
    tbodyRutas.appendChild(tr);
  });
};

window.onload = consultarRutas;
