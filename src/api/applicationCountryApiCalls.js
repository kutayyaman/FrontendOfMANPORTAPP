import axios from 'axios';

export const getManagementFactoriesByAppId = (appId) => {
    return axios.get('/api/applicationCountry/getManagementFactoriesByAppId', { params: { appId: appId } });
}

export const changeAliveByAppIdAndCountryId = (body) => {
    return axios.put(`/api/applicationCountry/changeAlive`, body);
}

export const changeTrackByAppIdAndCountryId = (body) => {
    return axios.put(`/api/applicationCountry/changeTrack`, body);
}