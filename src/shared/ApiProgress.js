import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

export const useApiProgress = (apiPath) => { //buda bir hook artik
    const [pendingApiCall, setpendingApiCall] = useState(false);

    useEffect(() => { // bu hook yuklendigi zaman calisacak.
        let requestInterceptor, responseInterceptor;
        const updateApiCallFor = (url, inProgress) => {
            if (url.startsWith(apiPath)) {
                setpendingApiCall(inProgress)
            }
        }
        const registerInterceptors = () => {
            requestInterceptor = axios.interceptors.request.use((request) => {
                updateApiCallFor(request.url, true);
                return request;
            });

            responseInterceptor = axios.interceptors.response.use((response) => {
                updateApiCallFor(response.config.url, false);

                return response;
            }, (error) => {
                updateApiCallFor(error.config.url, false);
                throw error;
            })
        }
        const unregisterInterceptors = () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        }

        registerInterceptors();

        return function unmount() {
            unregisterInterceptors();
        }
    }, [apiPath]); //ikinci parametreyi dizi olarak vermeseydim sadece yuklendiginde degil sayfada her degisim oldugunda calisirdi mesela kullanici adini girdigimde her harfe bastigimda calisirdi

    return pendingApiCall;
}