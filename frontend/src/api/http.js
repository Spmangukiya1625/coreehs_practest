import axios from "axios";
const url = import.meta.env.VITE_BACKEND_URL;

// eslint-disable-next-line no-undef
export const http = axios.create({
    baseURL: `${url}/api`,
});
