// src/hooks/useAuth.js
import { useState } from "react";
import axios from "axios";

/**
 * Decodifica un token JWT para obtener su payload.
 * No valida la firma, solo decodifica la información.
 * @param {string} token El token JWT.
 * @returns {object|null} El payload del token o null si hay un error.
 */
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Error al decodificar el token:", e);
    return null;
  }
}

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (username, password) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/token/", {
        username,
        password,
      });
      const { access, refresh } = response.data;

      // 1. Guardar tokens en localStorage
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      
      // 2. Guardar el nombre de usuario directamente del input
      localStorage.setItem("username", username);
      console.log(`✅ Nombre de usuario '${username}' guardado en localStorage.`);
      
      // 3. Decodificar el token para obtener el rol si está disponible
      const userData = parseJwt(access);
      console.log("Datos decodificados del token:", userData);
      
      if (userData && userData.role) {
        localStorage.setItem("userRole", userData.role);
      } else if (userData && userData.groups && userData.groups.length > 0) {
        localStorage.setItem("userRole", userData.groups[0]);
      }

      return true; // login exitoso
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
