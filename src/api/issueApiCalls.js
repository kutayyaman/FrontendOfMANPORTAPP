import axios from 'axios';

export const getTop3Issues = () => {
    return axios.get('/api/issue/top3');
}

export const getIssues = (page = 0, size = 5, body = undefined) => {
    if (body !== undefined) {
        return axios.post(`/api/issue/issues?page=${page}&size=${size}`, body);
    }
    return axios.get(`/api/issue/issues?page=${page}&size=${size}`);
}