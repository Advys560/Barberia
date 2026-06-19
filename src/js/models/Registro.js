document.getElementById("registro").addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const password = document.getElementById("password").value;
  const telefono = document.getElementById("telefono").value;
  const fecha = document.getElementById("fecha").value;

  // Obtener usuarios guardados
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Validar campos obligatorios
  if (!nombre || !correo || !password || !telefono || !fecha) {
    Swal.fire({
      title: "Faltan datos por completar",
      text: "Por favor complete todos los campos antes de continuar.",
      icon: "warning",
      confirmButtonText: "Aceptar",
      draggable: true,
    });

    return;
  }

  // Verificar si el correo ya existe
  const existe = usuarios.some((usuario) => usuario.correo === correo);

  if (existe) {
    Swal.fire({
      title: "Este correo ya está registrado",
      icon: "error",
      confirmButtonText: "Aceptar",
      draggable: true,
    });
    return;
  }

  // Guardar nuevo usuario
  usuarios.push({
    nombre,
    correo,
    password,
    telefono,
    fecha,
  });

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  Swal.fire({
    title: "Registro exitoso",
    text: "Usuario registrado correctamente",
    icon: "success",
    confirmButtonText: "Aceptar",
    draggable: true,
  });

  document.getElementById("mensaje").textContent =
    "Usuario registrado correctamente";

  e.target.reset();
});
