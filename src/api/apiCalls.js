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

export const getTop3Issues = () => {
    return axios.get('/api/issue/top3');
}

export const setAuthorizationHeader = ({ mail, password, isLoggedIn }) => { //bunu kullanici basariyla giris yaptiktan sonra cagralimki her yolladigimiz istege Authorization parametreleri eklemek zorunda kalmayalim.
    if (isLoggedIn) {
        const authorizationHeaderValue = `Basic ${btoa(mail + ':' + password)}` //btoa dedigimiz sey base64'e ceviriyor bunu
        axios.defaults.headers['Authorization'] = authorizationHeaderValue;
    } else {
        delete axios.defaults.headers['Authorization'];
    }

}

export const getApplicationsSummary = () => {
    return axios.get('/api/applicationsummary');
}
