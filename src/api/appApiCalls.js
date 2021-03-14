import axios from 'axios';

export const getApplicationsSummary = () => {
    return axios.get('/api/applicationsummary');
}

export const getAppsDropList = () => {
    return axios.get('/api/application/droplist');
}

export const getApps = () => {
    return axios.get('/api/application/droplist');
}

export const getAppsForManagementPage = (page = 0, size = 5) => {
    return axios.get(`/api/application/applicationForManagementPage?page=${page}&size=${size}`);
}

export const changeLineStopRiskById = (id) => {
    return axios.post(`/api/application/changeLineStopRisk/${id}`);
}

export const changeTrackById = (id) => {
    return axios.post(`/api/application/changeTrack/${id}`);
}

export const getApplicationById = (id) => {
    return axios.get(`/api/application/${id}`);
}

export const getBusinessAreaTypes = () => {
    return axios.get('/api/application/businessAreaTypes');
}

export const updateApplication = (body) => {
    return axios.put(`/api/application`, body);
}

export const addApplication = (body) => {
    return axios.post(`/api/application`, body);
}

export const setupApplicationInAServer = (body) => {
    return axios.post(`/api/application/setup`, body);
}

export const deleteApplicationById = (id) => {
    return axios.delete(`/api/application/${id}`)
}