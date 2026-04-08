// importamos el cliente de Supabase para interactuar con la base de datos
// este cliente ya está configurado con la URL y la clave de acceso a nuestra instancia de Supabase
import { supabase } from "./supabase.js";

//****************************************
// Referencias a elementos del DOM
//****************************************
// Botones
const btnClear = document.getElementById("btnClear");
const btnAdd = document.getElementById("btnAdd");
const btnCancel = document.getElementById("btnCancel");
const btnLoad = document.getElementById("btnLoad");
const tituloForm = document.getElementById("tituloForm");

//Formulario
const txtId = document.getElementById("txtId");
const pasajero = document.getElementById("pasajero");
const correo = document.getElementById("correo");
const ruta = document.getElementById("ruta");
const fecha_llegada = document.getElementById("fecha_llegada");
const fecha_salida = document.getElementById("fecha_salida");
const asiento = document.getElementById("asiento");

// Tabla
const tbody = document.getElementById("tbodyReservas");

//****************************************
//Eventos
//****************************************

// Consultar reservas
const consultarReservas = async () => {
  const { data, error } = await supabase
    .from("reservas")
    .select("id,pasajero,correo,ruta,fecha_salida, fecha_llegada,asiento");

  if (error) {
    console.error(error);
    alert("Error cargando reservas");
    return;
  }

  tbody.innerHTML = "";
  data.forEach((r) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.pasajero}</td>
      <td>${r.correo}</td>
      <td>${r.ruta}</td>
      <td>${r.fecha_llegada}</td>
      <td>${r.fecha_salida}</td>
      <td>${r.asiento ?? ""}</td>
      <td>
        <button class="btnEditar" data-id="${r.id}">Editar</button>
        <button class="btnEliminar" data-id="${r.id}">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
};

// Guardar reserva
const guardarReserva = async () => {
  const reserva = {
    pasajero: pasajero.value.trim(),
    correo: correo.value.trim(),
    ruta: ruta.value.trim(),
    fecha_salida: fecha_salida.value,
    fecha_llegada: fecha_llegada.value,
    asiento: asiento.value.trim(),
  };

  if (
    !reserva.pasajero ||
    !reserva.correo ||
    !reserva.ruta ||
    !reserva.fechaSalida ||
    !reserva.fechaLlegada
  ) {
    alert("Por favor, complete todos los campos obligatorios");
    return;
  }

  if (txtId.value) {
    const { error } = await supabase
      .from("reservas")
      .update([reserva])
      .eq("id", txtId.value);
    if (error) {
      console.error(error);
      alert("Error actualizando reserva");
      return;
    }
  } else {
    const { error } = await supabase.from("reservas").insert([reserva]);
    if (error) {
      console.error(error);
      alert("Error guardando reserva");
      return;
    }
  }

  alert("Reserva guardada exitosamente");
  limpiarFormulario();
  consultarReservas();
};

// Eliminar reserva
const eliminarReserva = async (id) => {
  if (!confirm("¿Está seguro de eliminar esta reserva?")) return;
  const { error } = await supabase.from("reservas").delete().eq("id", id);

  if (error) {
    console.error(error);
    alert("Error al eliminar");
  } else {
    consultarReservas();
  }
};

// Limpiar formulario
const limpiarFormulario = () => {
  txtId.value = "";
  pasajero.value = "";
  correo.value = "";
  ruta.value = "";
  fecha_llegada.value = "";
  fecha_salida.value = "";
  asiento.value = "";
  btnAdd.textContent = "Confirmar Reserva";
  tituloForm.textContent = "Formulario de Reserva";
};

// Eventos
window.onload = () => consultarReservas();
btnLoad.addEventListener("click", async () => consultarReservas());
btnAdd.addEventListener("click", async () => guardarReserva());
btnClear.addEventListener("click", async () => consultarReservas());
btnCancel.addEventListener("click", async () => limpiarFormulario());

tbody.addEventListener("click", async (event) => {
  const target = event.target;

  if (target.classList.contains("btnEliminar")) {
    const id = target.getAttribute("data-id");
    await eliminarReserva(id);
  }

  if (target.classList.contains("btnEditar")) {
    const id = target.getAttribute("data-id");
    const { data, error } = await supabase
      .from("reservas")
      .select("id,pasajero,correo,ruta,fecha,asiento")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      alert("Error al cargar reserva");
      return;
    }

    txtId.value = data.id;
    pasajero.value = data.pasajero;
    correo.value = data.correo;
    ruta.value = data.ruta;
    fecha_llegada.value = data.fecha_llegada;
    fecha_salida.value = data.fecha_salida;
    asiento.value = data.asiento;

    btnAdd.textContent = "Actualizar";
    tituloForm.textContent = "Editar Reserva";
  }
});
