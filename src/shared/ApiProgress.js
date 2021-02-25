import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

export const useApiProgress = (apiPath, apiMethod = undefined) => { //buda bir hook artik
    const [pendingApiCall, setpendingApiCall] = useState(false);

    useEffect(() => { // bu hook yuklendigi zaman calisacak.
        let requestInterceptor, responseInterceptor;

        const updateApiCallFor = (url, inProgress, method) => {
            if (url.startsWith(apiPath)) {
                if (apiMethod !== undefined) {
                    if (method === apiMethod) {
                        setpendingApiCall(inProgress)
                    }
                }
                else {
                    setpendingApiCall(inProgress)
                }
            }
        }

        const registerInterceptors = () => {
            requestInterceptor = axios.interceptors.request.use((request) => {
                const { url, method } = request;
                updateApiCallFor(url, true, method);
                return request;
            });

            responseInterceptor = axios.interceptors.response.use((response) => {
                const { url, method } = response.config;
                updateApiCallFor(url, false, method);

                return response;
            }, (error) => {
                const { url, method } = error.config;
                updateApiCallFor(url, false, method);
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
    }, [apiPath, apiMethod]); //ikinci parametreyi dizi olarak vermeseydim sadece yuklendiginde degil sayfada her degisim oldugunda calisirdi mesela kullanici adini girdigimde her harfe bastigimda calisirdi

    return pendingApiCall;
}