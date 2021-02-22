import axios from 'axios';

export const getCountries = () => {
    return axios.get('/api/country');
}

