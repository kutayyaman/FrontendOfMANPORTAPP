import axios from 'axios';

export const getAllTeams = () => {
    return axios.get('/api/team');
}