import React, { useState, useEffect } from 'react';
import { setupApplicationInAServer, getAppsDropList } from '../../api/appApiCalls';
import { getCountries } from '../../api/countryApiCalls';
import { getServersByCountryId } from '../../api/serverApiCalls';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../../shared/ApiProgress';
import Spinner from '../Spinner';



const SetupApplicationHook = props => {

    const { t } = useTranslation();

    const [errorMessage, seterrorMessage] = useState();
    const [successMessage, setsuccessMessage] = useState();
    const [error, setError] = useState({});

    const pendingApiCall = useApiProgress('/api/application/setup'); //bu useEffect'den once yazilmali yoksa calismaz cunku useEffect'in altinda bir yere yazsaydik istek atildiktan sonra bu calisirdi ve gec kalmis olurduk

    const [apps, setApps] = useState([]);
    const [countries, setCountries] = useState([]);
    const [servers, setServers] = useState([]);
    const [setupApplicationDTO, setSetupApplicationDTO] = useState({});
    const { countryId } = setupApplicationDTO;
    useEffect(() => {
        getAppsDropListFunc();
        getCountriesFunc();
    }, [])

    useEffect(() => {
        getServersByCountryIdFunc(countryId);
    }, [countryId])

    const getAppsDropListFunc = async () => {
        try {
            const response = await getAppsDropList();
            setApps(response.data);
        } catch (backendError) {
            seterrorMessage(t('Something Went Wrong'));
        }
    }

    const getCountriesFunc = async () => {
        try {
            const response = await getCountries();
            setCountries(response.data);
        } catch (backendError) {
            seterrorMessage(t('Something Went Wrong'));
        }
    }

    const getServersByCountryIdFunc = async (countryId) => {
        if (countryId) {
            try {
                const response = await getServersByCountryId(countryId);
                setServers(response.data);
            } catch (backendError) {
                seterrorMessage(t('Something Went Wrong'));
            }
        }
    }

    const inputOnChanged = (event) => {
        const { name, value } = event.target;
        setsuccessMessage(undefined);
        seterrorMessage(undefined);
        setError({
            ...error,
            [name]: undefined
        })
        setSetupApplicationDTO({
            ...setupApplicationDTO,
            [name]: value
        });
    }

    const setUp = async () => {
        try {
            const response = await setupApplicationInAServer(setupApplicationDTO);
            setsuccessMessage('Successfully Installed');
        } catch (errorFromBackend) {
            seterrorMessage(t('Something Went Wrong'));
            setError(errorFromBackend.response.data.validationErrors);
        }

    }

    const { appId: appIdError, countryId: countryIdError, serverId: serverIdError } = error;

    return (
        <div className="container">
            <h2>{t('Setup An Application On A Server')}</h2>
            <hr />
            <div className="row mt-2">
                <div className="col-3">
                    {t('Application Name')}:
                </div>
                <div className="col-9">
                    <select className={appIdError ? "form-control is-invalid" : 'form-control'} name='appId' value={setupApplicationDTO.appId} onChange={(event) => { inputOnChanged(event); }}>
                        <option value=''>{t('Select One')}</option>
                        {apps.map((app, index) => {
                            return (
                                <option key={index} value={app.id} >{app.shortName}</option>
                            )
                        })}
                    </select>
                    <div className="invalid-feedback">
                        {appIdError}
                    </div>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col-3">
                    {t('Country')}:
                </div>
                <div className="col-9">
                    <select className={countryIdError ? "form-control is-invalid" : 'form-control'} name='countryId' value={setupApplicationDTO.countryId} onChange={(event) => { inputOnChanged(event); }}>
                        <option value=''>{t('Select One')}</option>
                        {countries.map((country, index) => {
                            return (
                                <option key={country.id} value={country.id} >{country.name}</option>
                            )
                        })}
                    </select>
                    <div className="invalid-feedback">
                        {countryIdError}
                    </div>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col-3">
                    {t('Server')}:
                </div>
                <div className="col-9">
                    <select className={serverIdError ? "form-control is-invalid" : 'form-control'} name='serverId' value={setupApplicationDTO.serverId} onChange={(event) => { inputOnChanged(event); }}>
                        <option value=''>{t('Select One')}</option>
                        {servers.map((server, index) => {
                            return (
                                <option key={server.id} value={server.id} >{server.name}</option>
                            )
                        })}
                    </select>
                    <div className="invalid-feedback">
                        {serverIdError}
                    </div>
                </div>
            </div>

            <div className="text-center m-2">
                {errorMessage && <div className="alert-danger text-center">{errorMessage}</div>}
                {successMessage && <div className="alert-success text-center">{successMessage}</div>}
                <button disabled={pendingApiCall} type="button" className="btn btn-primary btn-lg btn-block" onClick={() => { setUp() }}>{t('Setup')}</button>
                {pendingApiCall && <Spinner></Spinner>}
            </div>

        </div>
    )
}

export default SetupApplicationHook;