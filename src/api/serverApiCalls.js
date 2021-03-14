import axios from 'axios';

export const getServersByCountryId = (countryId) => {
    return axios.get(`/api/server/${countryId}`);
}

export const findAllForPlantManagementTable = (page = 0, size = 5) => {
    return axios.get(`/api/server/management?page=${page}&size=${size}`);
}

export const deleteServerById = (id) => {
    return axios.delete(`/api/server/${id}`)
}