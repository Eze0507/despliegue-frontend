// src/api/cargoApi.jsx
import axios from "axios";

// Instancia de Axios para todas las llamadas al backend
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // usa la variable de entorno
});

// Interceptor para añadir el token JWT a cada petición
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const createCargo = async (cargoData) => {
  try {
    const data = { ...cargoData, sueldo: Number(cargoData.sueldo) };
    const response = await apiClient.post('/cargos/', data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(JSON.stringify(error.response.data));
    }
    throw new Error('Error de conexión al registrar el cargo.');
  }
};

export const updateCargo = async (id, cargoData) => {
  try {
    const data = { ...cargoData, sueldo: Number(cargoData.sueldo) };
    const response = await apiClient.put(`/cargos/${id}/`, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(JSON.stringify(error.response.data));
    }
    throw new Error('Error de conexión al actualizar el cargo.');
  }
};

export const deleteCargo = async (id) => {
  try {
    await apiClient.delete(`/cargos/${id}/`);
  } catch (error) {
    throw new Error('Error al eliminar el cargo.');
  }
};

