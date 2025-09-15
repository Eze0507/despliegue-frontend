// src/hooks/useRegister.jsx
import { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const register = async ({ username, email, password, password2 }) => {
    setLoading(true);
    setError("");

    try {
      // Validación básica en el frontend
      if (!username || !email || !password || !password2) {
        setError("Todos los campos son obligatorios");
        return false;
      }

      if (password !== password2) {
        setError("Las contraseñas no coinciden");
        return false;
      }

      if (password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres");
        return false;
      }

      // Enviar datos al backend
      const res = await axios.post(
        `${API_BASE}/api/register/`,
        {
          username: username.trim(),
          email: email.trim(),
          password,
          password2,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Registro exitoso:", res.data);
      return true;
    } catch (err) {
      console.error("❌ Error en registro:", err.response?.data);
      
      // Manejo de errores más específico
      if (err.response?.data) {
        if (typeof err.response.data === "string") {
          setError(err.response.data);
        } else if (err.response.data.detail) {
          setError(err.response.data.detail);
        } else if (err.response.data.error) {
          setError(err.response.data.error);
        } else if (err.response.data.username) {
          setError(`Usuario: ${err.response.data.username[0]}`);
        } else if (err.response.data.email) {
          setError(`Email: ${err.response.data.email[0]}`);
        } else if (err.response.data.password) {
          setError(`Contraseña: ${err.response.data.password[0]}`);
        } else {
          setError(JSON.stringify(err.response.data));
        }
      } else {
        setError("Error de conexión con el servidor");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
}