import axios from 'axios';

export const getJobsByAppId = (appId) => {
    return axios.get(`/api/jobInterface/${appId}`);
}

export const addJobInterface = (body) => {
    return axios.post(`/api/jobInterface`, body);
}