import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../../shared/ApiProgress';
import Spinner from '../Spinner';
import { addJobInterface } from '../../api/jobInterfaceApiCalls';
import { getAppsDropList } from '../../api/appApiCalls';

const AddJobInterfaceHook = props => {
    const { t } = useTranslation();

    const [errorMessage, seterrorMessage] = useState();
    const [successMessage, setsuccessMessage] = useState();
    const [addAJobInterfaceToAnApplicationDTO, setAddAJobInterfaceToAnApplicationDTO] = useState({
        appId: undefined,
        jobInterfaceName: undefined
    });
    const [apps, setApps] = useState([]);

    const pendingApiCall = useApiProgress('/api/jobInterface', 'post'); //bu useEffect'den once yazilmali yoksa calismaz cunku useEffect'in altinda bir yere yazsaydik istek atildiktan sonra bu calisirdi ve gec kalmis olurduk

    useEffect(() => {
        getAppsDropListFunc();
    }, [])

    const addJobInterfaceFunc = async (body) => {
        try {
            const result = await addJobInterface(body);
            setsuccessMessage(t('Job Added Successfully'));
        } catch (backendApiError) {
            seterrorMessage(t('Something Went Wrong'));
        }
    }

    const getAppsDropListFunc = async () => {
        try {
            const response = await getAppsDropList();
            setApps(response.data);
        } catch (backendError) {
            seterrorMessage(t('Something Went Wrong'));
        }
    }

    const inputOnChanged = (event) => {
        const { name, value } = event.target;
        setsuccessMessage(undefined);
        seterrorMessage(undefined);
        setAddAJobInterfaceToAnApplicationDTO({
            ...addAJobInterfaceToAnApplicationDTO,
            [name]: value
        });
    }

    return (
        <div className="container">
            <h2>{t('Add A Job To An App')}</h2>
            <hr />

            <div className="row mt-2">
                <div className="col-3">
                    {t('Application Name')}:
                </div>
                <div className="col-9">
                    <select className='form-control' name='appId' value={addAJobInterfaceToAnApplicationDTO.appId} onChange={(event) => { inputOnChanged(event); }}>
                        <option value=''>{t('Select One')}</option>
                        {apps.map((app, index) => {
                            return (
                                <option key={index} value={app.id} >{app.shortName}</option>
                            )
                        })}
                    </select>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col-3">{t('Job Name')}:</div>
                <div className="col-9"><input className="form-control" name='jobInterfaceName' onChange={(event) => { inputOnChanged(event); }} /></div>
            </div>
            <button disabled={pendingApiCall} type="button" className="btn btn-primary btn-lg btn-block" onClick={() => { addJobInterfaceFunc(addAJobInterfaceToAnApplicationDTO) }}>{t('Add')}</button>
            {pendingApiCall && <Spinner></Spinner>}
        </div>
    );

}

export default AddJobInterfaceHook;