import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

const IssueListItem = (props) => {

    const { issue } = props;
    const { name, createdDate, appShortName, jobName, impact, countryName, description, status } = issue;
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
                        <FontAwesomeIcon icon={faEye} />
                    </div>
                    <div className="col-3 ">
                        <FontAwesomeIcon icon={faEdit} />
                    </div>
                    <div className="col-3 ">
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </div>
                    <div className="col-3">
                        <BootstrapSwitchButton
                            checked={status}
                            onlabel='ON'
                            offlabel='OFF'
                            onstyle="success"
                        />
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default IssueListItem;