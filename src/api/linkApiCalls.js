import axios from 'axios';

export const getLinksByAppIdForManagementPage = (appId) => {
    return axios.get(`/api/link/${appId}`);
}