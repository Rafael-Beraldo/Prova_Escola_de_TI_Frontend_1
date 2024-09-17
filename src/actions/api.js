import axios from "axios";

const baseUrl = "http://localhost:5023/api/"

export default {
    dCarro(url = baseUrl + 'carro/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: (id) => axios.get(url + id),
            create: (newRecord) => axios.post(url, newRecord, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            update: (id, updateRecord) => axios.put(url + id, updateRecord, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            delete: (id) => axios.delete(url + id)
        }
    }
}
