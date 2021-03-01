import axios from 'axios';

export const getDatabases = () => {
    return axios.get(`/api/database`);
}