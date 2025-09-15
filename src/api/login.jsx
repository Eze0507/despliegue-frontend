import axios from "axios";

async function login(username, password) {
  try {
    const res = await axios.post("http://127.0.0.1:8000/api/auth/token/", {
      username,
      password,
    });

    const { access, refresh } = res.data;

    // Guardar tokens
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);

    // Configurar axios para futuras peticiones
    axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

    console.log("Login correcto ✅");
    return true;
  } catch (err) {
    console.error("Error login ❌:", err.response?.data);
    return false;
  }
}
