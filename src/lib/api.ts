import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:4000"
})

export const getMenu = async () => {
    const { data } = await api.get('/api/menu')
    return data
}

export const getProductData = async (filters?: { produto?: string }) => {
    const { data } = await api.get('/estoque_produtos', {
        params: filters
    })
    return data
}

export const getClientsData = async (filters?: { nome?: string; status?: string }) => {
    const { data } = await api.get('/financeiro_clientes', {
        params: filters
    })
    return data
}