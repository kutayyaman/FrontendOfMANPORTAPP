import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getApplicationById, changeLineStopRiskById, getBusinessAreaTypes, updateApplication } from '../../api/appApiCalls';
import { getAllTeams } from '../../api/teamApiCalls';
import { getUsersByTeamId } from '../../api/userApiCalls';
import { getBackends } from '../../api/backendApiCalls';
import { getFrontends } from '../../api/frontendApiCalls';
import { getDatabases } from '../../api/databaseApiCalls';
import { useTranslation } from 'react-i18next';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const AppDetailsCard = props => {
    const { id } = useParams();
    var { disabled } = useParams();
    disabled = disabled == 'true';

    const { t } = useTranslation();

    const [app, setApp] = useState({});
    const [errorMessage, seterrorMessage] = useState();
    const [successMessage, setsuccessMessage] = useState();
    const [businessAreaTypes, setbusinessAreaTypes] = useState([]);
    const [users, setusers] = useState([]);
    const [teams, setteams] = useState([]);
    const [backends, setbackends] = useState([]);
    const [frontends, setfrontends] = useState([]);
    const [databases, setdatabases] = useState([]);


    const getAppById = async (id) => {
        try {
            const result = await getApplicationById(id);
            setApp(result.data);
        } catch (error) {
            seterrorMessage(error.response.data.message);
        }
    }

    const getBusinessAreaTypesFunc = async () => {
        try {
            const result = await getBusinessAreaTypes();
            setbusinessAreaTypes(result.data);
        } catch (error) {
            seterrorMessage(error.response.data.message);
        }
    }

    const getAllTeamsFunc = async () => {
        try {
            const result = await getAllTeams();
            setteams(result.data);
        } catch (error) {
            seterrorMessage(error.response.data.message);
        }
    }

    const getUsersByTeamIdFunc = async (teamId) => {
        if (teamId) {
            try {
                const result = await getUsersByTeamId(teamId);
                setusers(result.data);
            } catch (error) {
                seterrorMessage(error.response.data.message);
            }
        }
    }

    /*const getBackendsFunc = async () => {
        try {
            const result = await getBackends();
            setbackends(result.data);
        } catch (error) {
            seterrorMessage(error.response.data.message);
        }
    }

    const getFrontendsFunc = async () => {
        try {
            const result = await getFrontends();
            setfrontends(result.data);
        } catch (error) {
            seterrorMessage(error.response.data.message);
        }
    }

    const getDatabasesFunc = async () => {
        try {
            const result = await getDatabases();
            setdatabases(result.data);
        } catch (error) {
            seterrorMessage(error.response.data.message);
        }
    }*/

    useEffect(() => {
        getAppById(id);
        getBusinessAreaTypesFunc();
        getAllTeamsFunc();
        /*getBackendsFunc();
        getFrontendsFunc();
        getDatabasesFunc();*/
    }, [])
    useEffect(() => {
        getUsersByTeamIdFunc(app.responsibleTeamId);
    }, [app.responsibleTeamId])

    if (app) {
        var { shortName, fullName, lineStopRisk, track, businessAreaType, releaseDate, responsibleUserName, responsibleUserId, responsibleTeamName, responsibleTeamId, backendId, backendName, frontendId, frontendName, databaseId, databaseName, lineOfBackendCode, lineOfFrontendCode } = app;
    }

    const changeLineStopRisk = () => {
        setApp({
            ...app,
            lineStopRisk: !lineStopRisk
        })
    }

    const inputOnChanged = (event) => {
        const { name, value } = event.target;
        if (name == 'responsibleTeamId') {
            setApp({
                ...app,
                [name]: value,
                responsibleUserId: ''
            })

        }
        else {
            setApp({
                ...app,
                [name]: value
            })
        }

    }

    const updateButtonClicked = async () => {
        seterrorMessage(undefined);
        setsuccessMessage(undefined);
        try {
            const response = await updateApplication(app);
            setsuccessMessage(t('Updated Successfully'));
        } catch (error) {
            seterrorMessage(error.response.data.message);
        }
    }


    return (
        <div className="container">
            <div className="card">
                <div className="card-header text-center">
                    <h2 className="">{shortName} - {fullName}</h2>
                    <span>{t('Details')}</span>
                    <hr />
                </div>
                <div className="card-body">

                    <div className="row m-1">

                        <div className="col">
                            <div className="row">
                                <div className="col-3">Short Name:{disabled}</div>
                                <div className="col-9"><input disabled={disabled} className="form-control" name='shortName' onChange={(event) => { inputOnChanged(event); }} defaultValue={shortName} /></div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="row">
                                <div className="col-3">Full Name:</div>
                                <div className="col-9"><input disabled={disabled} className="form-control" name='fullName' onChange={(event) => { inputOnChanged(event); }} defaultValue={fullName} /></div>
                            </div>
                        </div>

                    </div>

                    <div className="row m-1">

                        <div className="col">
                            <div className="row">
                                <div className="col-3">Release Date:</div>
                                <div className="col-9">
                                    <DatePicker className="m-1"
                                        dateFormat="yyyy-MM-dd"
                                        selected={Date.parse(releaseDate)}
                                        onChange={date => {
                                            const copyApp = { ...app };
                                            copyApp.releaseDate = date;
                                            setApp(copyApp);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="row">
                                <div className="col-3">Business Area:</div>
                                <div className="col-9">
                                    <select disabled={disabled} className="form-control" name='businessAreaType' value={app.businessAreaType} onChange={(event) => { inputOnChanged(event); }}>
                                        {businessAreaTypes.map((businesAreaTypeFromApi, index) => {
                                            return (
                                                <option key={index} value={businesAreaTypeFromApi} >{businesAreaTypeFromApi}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row m-1">

                        <div className="col">
                            <div className="row">
                                <div className="col-3">Responsible:</div>
                                <div className="col-9">
                                    <select disabled={disabled} id='responsibleSelectList' className="form-control" name='responsibleUserId' value={app.responsibleUserId} onChange={(event) => { inputOnChanged(event); }}>
                                        <option value=''>{t('Select One')}</option>
                                        {users.map((userFromApi, index) => {
                                            return (
                                                <option key={userFromApi.id} value={userFromApi.id} >{userFromApi.name}</option>
                                            )

                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="row">
                                <div className="col-3">Responsible Team:</div>
                                <div className="col-9">
                                    <select disabled={disabled} className="form-control" name='responsibleTeamId' value={app.responsibleTeamId} onChange={(event) => { inputOnChanged(event); }}>
                                        {teams.map((teamFromApi, index) => {
                                            return (
                                                <option key={teamFromApi.id} value={teamFromApi.id} >{teamFromApi.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row m-1">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-3">Backend:</div>
                                <div className="col-9">
                                    <select disabled={disabled} className="form-control" name='backendId' value={app.backendId} onChange={(event) => { inputOnChanged(event); }}>
                                        {backends.map((backendFromApi, index) => {
                                            return (
                                                <option key={backendFromApi.id} value={backendFromApi.id}>{backendFromApi.name}</option>
                                            )

                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-3">Line Count Of Backend Code:</div>
                                <div className="col-9"><input disabled={disabled} className="form-control" name='lineOfBackendCode' onChange={(event) => { inputOnChanged(event); }} defaultValue={lineOfBackendCode} /></div>
                            </div>
                        </div>
                    </div>

                    <div className="row m-1">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-3">Frontend:</div>
                                <div className="col-9">
                                    <select disabled={disabled} className="form-control" name='frontendId' value={app.frontendId} onChange={(event) => { inputOnChanged(event); }}>
                                        {frontends.map((frontendFromApi, index) => {
                                            return (
                                                <option key={frontendFromApi.id} value={frontendFromApi.id}>{frontendFromApi.name}</option>
                                            )

                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-3">Line Count Of Frontend Code:</div>
                                <div className="col-9"><input disabled={disabled} className="form-control" name='lineOfFrontendCode' onChange={(event) => { inputOnChanged(event); }} defaultValue={lineOfFrontendCode} /></div>
                            </div>
                        </div>
                    </div>

                    <div className="row m-1">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-3">Database:</div>
                                <div className="col-9">
                                    <select disabled={disabled} className="form-control" name='databaseId' value={app.databaseId} onChange={(event) => { inputOnChanged(event); }}>
                                        {databases.map((databaseFromApi, index) => {
                                            return (
                                                <option key={databaseFromApi.id} value={databaseFromApi.id} >{databaseFromApi.name}</option>
                                            )

                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-3">
                                    <div className="form-check">
                                        <input disabled={disabled} name='lineStopRisk' className="form-check-input" type="checkbox" checked={lineStopRisk} id="flexCheckDefault" value={lineStopRisk} onChange={(event) => { changeLineStopRisk(); }} />
                                    </div>
                                </div>
                                <div className="col-9">Line Stop Risk(activate critical issue alarm)</div>
                            </div>
                        </div>
                    </div>
                </div>
                {errorMessage && <div className="alert-danger text-center">{errorMessage}</div>}
                {successMessage && <div className="alert-success text-center">{successMessage}</div>}
                <button hidden={disabled == true} className="btn btn-primary m-1" onClick={() => { updateButtonClicked(); }}>{t('Update')}</button>
            </div>
        </div>
    )
}

export default AppDetailsCard;