import axios from 'axios';

export const getFrontends = () => {
    return axios.get(`/api/frontend`);
}