import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { Link } from 'react-router-dom';
import { deleteIssueById, changeIssueStatusById } from '../../api/issueApiCalls';
import { useTranslation } from 'react-i18next';


const IssueListItem = (props) => {

    const { t } = useTranslation();
    const { issue } = props;
    const { name, createdDate, appShortName, jobName, impact, countryName, description, status, id } = issue;
    const [errorMessage, seterrorMessage] = useState(undefined)
    const [infoMessage, setInfoMessage] = useState(undefined);

    const deleteButtonClicked = async () => {
        setInfoMessage(undefined);
        seterrorMessage(undefined);
        if (window.confirm(`Do you want to delete ${name}?`)) {
            try {
                const response = await deleteIssueById(id);;
                //setInfoMessage(response.data); burayi yapcan
                setInfoMessage(t('deleted'));
            } catch (error) {
                seterrorMessage(t('An Error Occured While deleting issue'))
            }
        }
    }

    const statusSwitchButtonChanged = async (status) => {
        changeIssueStatusById({ status }, id);
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
                <td>{createdDate}</td>
                <td>{appShortName}</td>
                <td>{jobName}</td>
                <td>{impact}</td>
                <td>{countryName}</td>
                <td>{description}</td>
                <td>
                    <div className="row">
                        <div className="col-3 ">
                            <Link to={{ pathname: `/issue/${id}/${true}` }}>
                                <FontAwesomeIcon icon={faEye} />
                            </Link>
                        </div>
                        <div className="col-3 ">
                            <Link to={{ pathname: `/issue/${id}/${false}` }}>
                                <FontAwesomeIcon icon={faEdit} />
                            </Link>
                        </div>
                        <button className="btn button-small btn-danger col-3" onClick={() => { deleteButtonClicked() }}>
                            <FontAwesomeIcon className="hover-overlay" icon={faTrashAlt} />
                        </button>
                        <div className="col-3">
                            <BootstrapSwitchButton
                                onChange={(event) => { statusSwitchButtonChanged(event) }}
                                checked={status}
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

export default IssueListItem;