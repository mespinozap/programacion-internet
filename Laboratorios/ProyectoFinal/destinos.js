// importamos el cliente de Supabase para interactuar con la base de datos
// este cliente ya está configurado con la URL y la clave de acceso a nuestra instancia de Supabase
import { supabase } from "./supabase.js";

//****************************************
//Eventos
//****************************************

const contenedor = document.getElementById("destinosCards");

const consultarDestinos = async () => {
  const { data, error } = await supabase
    .from("destinos")
    .select("id,nombre,pais,costo,fecha,imagen");

  if (error) {
    console.error(error);
    alert("Error cargando destinos");
    return;
  }

  contenedor.innerHTML = "";
  data.forEach(destino => {
    const card = `
      <div class="col-md-6 mb-3">
        <div class="card h-100 shadow-sm">
          <img src="${destino.imagen}" class="card-img-top" alt="${destino.nombre}">
          <div class="card-body">
            <h5 class="card-title">${destino.nombre}</h5>
            <p class="card-text">País: ${destino.pais}</p>
            <p class="card-text">Costo: ${destino.costo}</p>
            <p class="card-text">Fecha: ${destino.fecha}</p>
          </div>
        </div>
      </div>
    `;
    contenedor.innerHTML += card;
  });
};

window.onload = consultarDestinos;