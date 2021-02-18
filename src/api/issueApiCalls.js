import axios from 'axios';

export const getTop3Issues = () => {
    return axios.get('/api/issue/top3');
}

export const getIssues = (page = 0, size = 5) => {
    return axios.get(`/api/issue/issues?page=${page}&size=${size}`);
}