// importamos el cliente de Supabase para interactuar con la base de datos
// este cliente ya está configurado con la URL y la clave de acceso a nuestra instancia de Supabase
import { supabase } from "./supabase.js";

//****************************************
// Referencias a elementos del DOM
//****************************************
// Botones
const btnLoadDestinos = document.getElementById("btnLoadDestinos");
const tbodyDestinos = document.getElementById("tbodyDestinos");

//****************************************
//Eventos
//****************************************

// Consulta de destinos
const consultarDestinos = async () => {
  const { data, error } = await supabase
    .from("destinos")
    .select("id,nombre,pais,costo,fecha");

  if (error) {
    console.error(error);
    alert("Error cargando destinos");
    return;
  }

  tbodyDestinos.innerHTML = "";
  data.forEach((d) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${d.nombre}</td>
      <td>${d.pais}</td>
      <td>${d.costo}</td>
      <td>${d.fecha}</td>
    `;
    tbodyDestinos.appendChild(tr);
  });
};

window.onload = consultarDestinos;
