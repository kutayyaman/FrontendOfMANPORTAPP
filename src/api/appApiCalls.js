import axios from 'axios';

export const getAppsDropList = () => {
    return axios.get('/api/application/droplist');
}