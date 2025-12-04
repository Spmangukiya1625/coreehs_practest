import axios from "axios";

class HttpClient {
    async get(url, config = {}) {
        const res = await axios.get(url, config);
        return res.data;
    }

    async post(url, data = {}, config = {}) {
        const res = await axios.post(url, data, config);
        return res.data;
    }

    async put(url, data = {}, config = {}) {
        const res = await axios.put(url, data, config);
        return res.data;
    }

    async del(url, config = {}) {
        const res = await axios.delete(url, config);
        return res.data;
    }
}

export const httpClient = new HttpClient();
