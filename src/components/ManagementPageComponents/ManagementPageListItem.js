import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { Link } from 'react-router-dom';
import { changeLineStopRiskById, changeTrackById, deleteApplicationById } from '../../api/appApiCalls';


const ManagementPageListItem = (props) => {
    const { t } = useTranslation();
    const { app } = props;
    let { id, shortName, businessAreaType, livePlants, lineStopRisk, track } = app;
    const [lineStopRiskState, setlineStopRiskState] = useState(lineStopRisk)
    const [trackState, setTrackState] = useState(track);

    const [errorMessage, seterrorMessage] = useState(undefined)
    const [infoMessage, setInfoMessage] = useState(undefined);

    const changeLineStopRiskByIdFunc = async (id) => {
        try {
            const result = await changeLineStopRiskById(id);
            setlineStopRiskState(!lineStopRiskState);
        } catch (error) {

        }

    }

    const changeTrackByIdFunc = async (id) => {
        try {
            const result = await changeTrackById(id);
            setTrackState(!trackState);
        } catch (error) {

        }
    }

    const deleteButtonClicked = async () => {
        setInfoMessage(undefined);
        seterrorMessage(undefined);
        if (window.confirm(`Do you want to delete ${shortName}?`)) {
            try {
                const response = await deleteApplicationById(id);;
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
                <td>{shortName}</td>
                <td>{businessAreaType}</td>
                <td>{livePlants}</td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" checked={lineStopRiskState} id="flexCheckDefault" value={lineStopRiskState} onChange={(event) => { changeLineStopRiskByIdFunc(id); }} />
                    </div>
                </td>
                <td>
                    <div className="row">
                        <div className="col-3 ">
                            <Link to={{ pathname: `/app/${id}/${true}` }}>
                                <FontAwesomeIcon icon={faEye} />
                            </Link>
                        </div>
                        <div className="col-3 ">
                            <Link to={{ pathname: `/app/${id}/${false}` }}>
                                <FontAwesomeIcon icon={faEdit} />
                            </Link>
                        </div>
                        <button className="btn button-small btn-danger col-3" onClick={() => { deleteButtonClicked(); }}>
                            <FontAwesomeIcon className="hover-overlay" icon={faTrashAlt} />
                        </button>
                        <div className="col-3">
                            <BootstrapSwitchButton
                                onChange={(event) => { changeTrackByIdFunc(id); }}
                                checked={trackState}
                                onlabel='ON'
                                offlabel='OFF'
                                onstyle="success"
                            />
                        </div>
                    </div>
                </td>
            </tr>
        )
    }


};

export default ManagementPageListItem;