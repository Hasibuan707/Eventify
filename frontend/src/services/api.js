import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Tambahkan interceptor jika perlu token:
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const fetchEvents = (params) => API.get("/events", { params });
export const fetchEventById = (id) => API.get(`/events/${id}`);
export const createEvent = (data) => API.post("/events", data);
export const buyTicket = (id, data) => API.post(`/events/${id}/buy`, data);
export const reviewEvent = (id, data) => API.post(`/events/${id}/review`, data);
