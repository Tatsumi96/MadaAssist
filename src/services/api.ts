import axios from 'axios';

// Pour le développement, l'IP locale est nécessaire pour Expo Go sur un appareil physique.
// En cas d'erreur de réseau, vérifiez que l'IP ci-dessous correspond bien à l'IP de votre machine.
const BASE_URL = 'http://192.168.0.103:8000/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.message);
    if (error.code === 'ERR_NETWORK') {
      console.error('Erreur réseau : Vérifiez que le backend est lancé et que l\'IP est correcte.');
    }
    return Promise.reject(error);
  }
);

export const getHealthStatus = async () => {
  const response = await api.get('/health-check/');
  return response.data;
};

export const getWeather = async (city = 'Antananarivo') => {
  const response = await api.get(`/weather/current/?city=${city}`);
  return response.data;
};

export const getAgriTips = async () => {
  const response = await api.get('/agri/');
  return response.data;
};

export const sendChatMessage = async (prompt: string, history: any[] = []) => {
  const response = await api.post('/ai/chat/', { prompt, history });
  return response.data;
};

export default api;
