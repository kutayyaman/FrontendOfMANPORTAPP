import axios from 'axios';

export const getCountries = () => {
    return axios.get('/api/country');
}

export const getCountriesByAppId = (appId) => {
    return axios.get('/api/country/getByAppId', { params: { appId: appId } });
}