export default class UsuarioView {
  static obtenerDatosFormulario() {
    return {
      nombre: document.getElementById("nombre").value,
      correo: document.getElementById("correo").value,
      password: document.getElementById("password").value,
      telefono: document.getElementById("telefono").value,
      fecha: document.getElementById("fecha").value,
    };
  }

  static mostrarCamposVacios() {
    Swal.fire({
      title: "Faltan datos por completar",
      text: "Por favor complete todos los campos antes de continuar.",
      icon: "warning",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#C5A059",
      background: "#1A1A1A",
      color: "#ffff",
    });
  }

  static mostrarCorreoExistente() {
    Swal.fire({
      title: "Este correo ya está registrado",
      icon: "error",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#C5A059",
      background: "#1A1A1A",
      color: "#ffff",
    });
  }

  static mostrarCorreoInvalido() {
    Swal.fire({
      title: "Correo inválido",
      text: "Por favor ingresa un correo válido que contenga '@' y termine en '.com'.",
      icon: "warning",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#C5A059",
      background: "#1A1A1A",
      color: "#FFFFFF",
    });
  }

  static mostrarRegistroExitoso() {
    return Swal.fire({
      title: "¡Bienvenido a Barber Solutions!",
      text: "Tu cuenta fue creada exitosamente.",
      icon: "success",
      confirmButtonText: "Iniciar sesión",
      confirmButtonColor: "#C5A059",
      background: "#1A1A1A",
      color: "#FFFFFF",
    });
  }

  static limpiarFormulario() {
    document.getElementById("registro").reset();
  }

  static redirigirLogin() {
    window.location.href = "Inicio_Sesion.html";
  }
}
