import axios from 'axios';


export const signup = (body) => {
    return axios.post('/api/users', body);
};

export const login = creds => {
    return axios.post('/api/auth', {}, { auth: creds });
}

export const changeBackendLanguage = language => {
    axios.defaults.headers['accept-language'] = language;
}

export const getTop3Issues = () =>{
    return axios.get('/api/issue/top3');
}