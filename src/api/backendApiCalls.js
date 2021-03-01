import axios from 'axios';

export const getBackends = () => {
    return axios.get(`/api/backend`);
}