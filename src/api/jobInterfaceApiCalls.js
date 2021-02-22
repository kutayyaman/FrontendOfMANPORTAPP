import axios from 'axios';

export const getJobsByAppId = (appId) => {
    return axios.get(`/api/jobInterface/${appId}`);
}