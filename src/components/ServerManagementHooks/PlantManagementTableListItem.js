import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { Link } from 'react-router-dom';
import { deleteServerById } from '../../api/serverApiCalls';

const PlantManagementTableListItem = (props) => {
    const { t } = useTranslation();
    const { server } = props;
    let { id, name, shortCode, countryId, countryName, liveAppCount } = server;

    const [errorMessage, seterrorMessage] = useState(undefined)
    const [infoMessage, setInfoMessage] = useState(undefined);

    const deleteButtonClicked = async () => {
        setInfoMessage(undefined);
        seterrorMessage(undefined);
        if (window.confirm(`Do you want to delete ${name}?`)) {
            try {
                const response = await deleteServerById(id);;
                console.log(response.data);
                //setInfoMessage(response.data); burayi yapcan
                setInfoMessage(t('deleted'));
            } catch (error) {
                seterrorMessage(t('An Error Occured While deleting issue'))
            }
        }
    }


    if (infoMessage) {
        return (
            <tr>
                <td colSpan="10" className="alert-info text-center">
                    {infoMessage}
                </td>
            </tr>
        )
    }
    else {
        return (
            <tr>
                <td>{countryName}</td>
                <td>{shortCode}</td>
                <td>{name}</td>
                <td>{liveAppCount}</td>
                <td>
                    <div className="row">
                        <button className="btn button-small btn-danger col-3" onClick={() => { deleteButtonClicked(); }}>
                            <FontAwesomeIcon className="hover-overlay" icon={faTrashAlt} />
                        </button>
                    </div>
                </td>
            </tr>
        )
    }
}

export default PlantManagementTableListItem;