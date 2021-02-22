import axios from 'axios';

export const getServersByCountryId = (countryId) => {
    return axios.get(`/api/server/${countryId}`);
}