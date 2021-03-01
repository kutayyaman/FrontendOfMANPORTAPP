import axios from 'axios';

export const getUsersByTeamId = (teamId) => {
    return axios.get(`/api/users/getByTeam/${teamId}`);
}