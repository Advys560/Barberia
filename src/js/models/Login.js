document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const correo = document.getElementById("correo").value;
  const password = document.getElementById("password").value;

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuario = usuarios.find(
    (usuario) => usuario.correo === correo && usuario.password === password,
  );

  if (usuario) {
    document.getElementById("resultado").textContent =
      `Bienvenido ${usuario.nombre}`;

    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
  } else {
    document.getElementById("resultado").textContent =
      "Correo o contraseña incorrectos";
  }
});
console.log(JSON.parse(localStorage.getItem("usuarios")));
