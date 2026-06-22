export default class SesionView {
  static obtenerDatosLogin() {
    return {
      correo: document.getElementById("correo").value,
      password: document.getElementById("password").value,
    };
  }

  static mostrarErrorLogin() {
    if (typeof Swal !== "undefined") {
      Swal.fire({
        title: "Acceso denegado",
        text: "Correo o contraseña incorrectos",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#C5A059",
        background: "#1A1A1A",
        color: "#FFFFFF",
      });
      return;
    }
  }

  static mostrarLoginExitoso(nombre) {
    if (typeof Swal !== "undefined") {
      return Swal.fire({
        title: `Bienvenido ${nombre}`,
        text: "Inicio de sesión exitoso",
        icon: "success",
        confirmButtonText: "Continuar",
        confirmButtonColor: "#C5A059",
        background: "#1A1A1A",
        color: "#FFFFFF",
      });
    }

    alert(`Bienvenido ${nombre}. Inicio de sesión exitoso.`);
    return Promise.resolve();
  }

  static limpiarFormulario() {
    const form = document.getElementById("loginForm");
    if (form) form.reset();
  }

  static redirigirInicio(usuario) {
    let role = usuario && usuario.role ? usuario.role : null;

    if (!role) {
      try {
        const stored = JSON.parse(localStorage.getItem("usuarioActivo") || "{}");
        role = stored.role;
      } catch (e) {
        role = null;
      }
    }

    if (role === "barbero") {
      window.location.href = "./barbero.html";
    } else {
      window.location.href = "./ver_citas.html";
    }
  }
}
