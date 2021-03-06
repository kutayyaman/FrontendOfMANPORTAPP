import React, { useState, useEffect } from 'react';
import { getManagementFactoriesByAppId, changeAliveByAppIdAndCountryId, changeTrackByAppIdAndCountryId } from '../../api/applicationCountryApiCalls';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';


const FactoryManagementComponent = props => {
    const { id } = props;

    const [managementFactories, setManagementFactories] = useState([]);
    const [errorMessage, seterrorMessage] = useState();
    const [successMessage, setsuccessMessage] = useState();
    const [checkboxChanged, setCheckboxChanged] = useState(false);
    const [trackChanged, setTrackChanged] = useState(false);

    const getManagementFactoriesAppByIdFunc = async (id) => {
        try {
            const result = await getManagementFactoriesByAppId(id);
            setManagementFactories(result.data);
        } catch (error) {
            seterrorMessage(error.response.data.message);
        }
    }

    useEffect(() => {
        getManagementFactoriesAppByIdFunc(id);
    }, [id, checkboxChanged, trackChanged])


    const changeAliveByAppIdAndCountryIdFunc = async (appId, countryId) => {
        try {
            const result = await changeAliveByAppIdAndCountryId({ appId: appId, countryId: countryId });
            setCheckboxChanged(!checkboxChanged);
        } catch (error) {
            seterrorMessage(error.response.data.message);
        }

    }

    const changeTrackByAppIdAndCountryIdFunc = async (appId, countryId) => {
        try {
            const result = await changeTrackByAppIdAndCountryId({ appId: appId, countryId: countryId });
            setTrackChanged(!trackChanged);
        } catch (error) {
            seterrorMessage(error.response.data.message);
        }
    }

    return (
        <div className="container">
            <div>
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
                                                <input name='alive' className="form-check-input" type="checkbox" checked={managementFactory.alive} id="flexCheckDefault" value={managementFactory.alive} onChange={(event) => { changeAliveByAppIdAndCountryIdFunc(id, managementFactory.countryDTO.id); }} />
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
                                    /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
};
export default FactoryManagementComponent;