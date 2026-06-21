export class AuthView {
  constructor() {
    this.authLinks = document.getElementById("auth-links");
    this.logoutLink = document.getElementById("logout-link");
  }

  // Verifica si los elementos existen en la página actual
  existeNavbar() {
    return this.authLinks && this.logoutLink;
  }

  // Se encarga puramente del renderizado/diseño
  mostrarInterfazUsuarioLogueado(isLogged) {
    if (isLogged) {
      this.authLinks.style.display = "none";
      this.logoutLink.style.display = "block";
    } else {
      this.authLinks.style.display = "flex";
      this.logoutLink.style.display = "none";
    }
  }

  // Escucha el click de logout, pero delega la acción al controlador
  onLogout(callback) {
    if (this.logoutLink) {
      this.logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        callback();
      });
    }
  }
}
