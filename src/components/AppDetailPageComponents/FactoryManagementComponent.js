import React, { useState, useEffect } from 'react';
import { getManagementFactoriesByAppId, changeAliveByAppIdAndCountryId, changeTrackByAppIdAndCountryId } from '../../api/applicationCountryApiCalls';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { useApiProgress } from '../../shared/ApiProgress';
import Spinner from '../../components/Spinner';
import { useTranslation } from 'react-i18next';

const FactoryManagementComponent = props => {
    const { id, disabled } = props;

    const [managementFactories, setManagementFactories] = useState([]);
    const [errorMessage, seterrorMessage] = useState();
    const [successMessage, setsuccessMessage] = useState();
    const [checkboxChanged, setCheckboxChanged] = useState(false);
    const [trackChanged, setTrackChanged] = useState(false);

    const { t } = useTranslation();

    const getManagementFactoriesAppByIdFunc = async (id) => {
        try {
            const result = await getManagementFactoriesByAppId(id);
            setManagementFactories(result.data);
        } catch (error) {
            seterrorMessage(t('Something Went Wrong'));
        }
    }

    const pendingApiCall = useApiProgress('/api/applicationCountry/getManagementFactoriesByAppId', 'get'); //bu useEffect'den once yazilmali yoksa calismaz cunku useEffect'in altinda bir yere yazsaydik istek atildiktan sonra bu calisirdi ve gec kalmis olurduk

    useEffect(() => {
        getManagementFactoriesAppByIdFunc(id);
    }, [id, checkboxChanged, trackChanged])


    const changeAliveByAppIdAndCountryIdFunc = async (appId, countryId) => {
        try {
            const result = await changeAliveByAppIdAndCountryId({ appId: appId, countryId: countryId });
            setCheckboxChanged(!checkboxChanged);
        } catch (error) {
            seterrorMessage(t('Something Went Wrong'));
        }

    }

    const changeTrackByAppIdAndCountryIdFunc = async (appId, countryId) => {
        try {
            const result = await changeTrackByAppIdAndCountryId({ appId: appId, countryId: countryId });
            setTrackChanged(!trackChanged);
        } catch (error) {
            seterrorMessage(t('Something Went Wrong'));
        }
    }

    if (pendingApiCall) {
        return (<Spinner></Spinner>)
    }
    if (errorMessage) {
        return (<div className="text-center alert-danger">{errorMessage}</div>)
    }
    return (
        <div className="container">
            <h2>Factory Management</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Alive</th>
                        <th scope="col">Track</th>
                    </tr>
                </thead>
                <tbody>
                    {managementFactories.map((managementFactory, index) => {
                        return (
                            <tr key={managementFactory.countryDTO.id}>
                                <td>
                                    <div className="row">
                                        <div className="form-check">
                                            <input disabled={disabled} name='alive' className="form-check-input" type="checkbox" checked={managementFactory.alive} id="flexCheckDefault" value={managementFactory.alive} onChange={(event) => { changeAliveByAppIdAndCountryIdFunc(id, managementFactory.countryDTO.id); }} />
                                        </div>
                                        {managementFactory.countryDTO.name}
                                    </div>
                                </td>
                                <td><BootstrapSwitchButton
                                    onChange={(event) => { changeTrackByAppIdAndCountryIdFunc(id, managementFactory.countryDTO.id); }}
                                    checked={managementFactory.track}
                                    onlabel='ON'
                                    offlabel='OFF'
                                    onstyle="success"
                                    disabled={disabled}
                                /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
};
export default FactoryManagementComponent;