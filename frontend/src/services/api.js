import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchEvents = (params) => API.get("/events", { params });
export const fetchEventById = (id) => API.get(`/events/${id}`);
