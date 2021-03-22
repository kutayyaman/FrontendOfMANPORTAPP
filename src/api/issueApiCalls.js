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

export const getIssueById = (id) => {
    return axios.get(`/api/issue/${id}`);
}

export const getImpactTypes = () => {
    return axios.get('/api/issue/impactTypes');
}

export const updateIssue = (updatedValues) => {
    return axios.put('/api/issue', updatedValues);
}

export const deleteIssueById = (id) => {
    return axios.delete(`/api/issue/${id}`)
}

export const changeIssueStatusById = (status, id) => {
    return axios.put(`/api/issue/changeStatus/${id}`, status)
}

export const changeIssueTrackById = (track, id) => {
    return axios.put(`/api/issue/changeTrack/${id}`, track)
}

export const getIssuesByAppId = (appId, page = 0, size = 5) => {
    return axios.get(`/api/issue/getByAppId/${appId}?page=${page}&size=${size}`);
}

export const getIssuesByJobImplementId = (jobImplementId, page = 0, size = 5) => {
    return axios.get(`/api/issue?jobImplementId=${jobImplementId}&page=${page}&size=${size}`);
}