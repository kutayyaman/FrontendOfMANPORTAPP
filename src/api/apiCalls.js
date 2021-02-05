import axios from 'axios';


export const signup = (body) => {
    return axios.post('/api/users', body);
};

export const changeBackendLanguage = language => {
    axios.defaults.headers['accept-language'] = language;
}