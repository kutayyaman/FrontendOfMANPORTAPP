import React, { Component } from 'react'
import axios from 'axios';

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function withApiProgress(WrappedComponent, apiPath) {
    return class extends Component {
        //static displayName = 'ApiProgress('+getDisplayName(WrappedComponent)+')';
        static displayName = `ApiProgress(${getDisplayName(WrappedComponent)})`;
        state = {
            pendingApiCall: null
        }

        componentDidMount() {//component ilk yuklendigi zaman calisan bir methoddur yani LoginPage componenti yuklenirken
            this.requestInterceptor = axios.interceptors.request.use((request) => {
                this.updateApiCallFor(request.url, true);
                return request;
            });

            this.responseInterceptor = axios.interceptors.response.use((response) => {
                this.updateApiCallFor(response.config.url, false);

                return response;
            }, (error) => {
                this.updateApiCallFor(error.config.url, false);
                throw error;
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        updateApiCallFor = (url, inProgress) => {
            if (url === apiPath) {
                this.setState({ pendingApiCall: inProgress });
            }
        }

        render() {
            const { pendingApiCall } = this.state;
            return <WrappedComponent pendingApiCall={pendingApiCall} {...this.props}></WrappedComponent> //pendingApiCall degiskenini bizim sarmalayacagimiz componente parametre olarak verdik.
        }                                                                                                 //{..this.props} yaparak bu componentteki butun propslarin kopyasini sarmalanan componente kopyalanmis halini gondermis olduk
    }
}