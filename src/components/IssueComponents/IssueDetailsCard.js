import React, { useState, useEffect } from 'react';
import { getImpactTypes, updateIssue, addIssue } from '../../api/issueApiCalls';
import { getCountries, getCountriesByAppId } from '../../api/countryApiCalls';
import { getApps } from '../../api/appApiCalls';
import { getJobsByAppId } from '../../api/jobInterfaceApiCalls';
import { getServersByCountryId } from '../../api/serverApiCalls';
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from 'react-i18next';


const IssueDetailsCard = props => {

    const { t } = useTranslation();
    const routeParams = useParams();
    const pathIssueId = routeParams.id;

    var { disabled } = routeParams;
    disabled = disabled == 'true';

    const [issue, setIssue] = useState({});
    const { id, name, description, impact, createdDate, appShortName, jobName, countryName, status, countryId, appId, serverId, serverName, jobInterfaceId } = props.issue;
    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();

    useEffect(() => {
        setIssue({ ...props.issue });
    }, [props.issue])

    const [impactTypes, setImpactTypes] = useState([]);
    const [countries, setCountries] = useState([]);
    const [apps, setApps] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [servers, setServers] = useState([]);
    useEffect(() => {
        loadImpactTypes(); //TODO: ayni istekten ikiser kere gidiyor arastir
        loadCountries();
        loadApps();

    }, [])

    useEffect(() => {
        loadJobs(issue.appId);
        getCountriesByAppIdFunc(issue.appId);
    }, [issue.appId])

    useEffect(() => {
        loadServers(issue.countryId)
    }, [issue.countryId])

    const loadImpactTypes = async () => {
        try {
            const response = await getImpactTypes();
            setImpactTypes(response.data);
        } catch (error) {
        }
    }

    const loadCountries = async () => {
        try {
            const response = await getCountries();
            setCountries(response.data);
        } catch (error) {
        }
    }

    const getCountriesByAppIdFunc = async (id) => {
        try {
            const response = await getCountriesByAppId(id);
            setCountries(response.data);
        } catch (error) {
        }
    }

    const loadApps = async () => {
        try {
            const response = await getApps();
            setApps(response.data);
        } catch (error) {
        }
    }

    const loadJobs = async (appId) => {
        if (appId) {
            try {
                const response = await getJobsByAppId(appId);
                setJobs(response.data);
            } catch (error) {
            }
        }
    }

    const loadServers = async (countryId) => {
        if (countryId) {
            try {
                const response = await getServersByCountryId(countryId);
                setServers(response.data);
            } catch (error) {
            }
        }
    }

    const inputOnChanged = (event) => {
        const { name, value } = event.target;
        if (name == 'appId') {
            setIssue({
                ...issue,
                [name]: value,
                jobInterfaceId: ''
            });
            document.getElementById("jobInterfaceIdSelectList").selectedIndex = 0;
        }
        else if (name == 'countryId') {
            setIssue({
                ...issue,
                [name]: value,
                serverId: ''
            });
            document.getElementById("serverIdSelectList").selectedIndex = 0;
        }
        else {
            setIssue({
                ...issue,
                [name]: value
            });
        }


    }

    const updateButtonClicked = async () => {
        setErrorMessage(undefined);
        setSuccessMessage(undefined);
        if (issue.jobInterfaceId !== '' && issue.serverId !== '') {
            try {
                const response = await updateIssue(issue);
                setSuccessMessage(t('Updated Successfully'));
            } catch (error) {
                setErrorMessage(error.response.data.message);
            }
        }
        else {
            setErrorMessage(t('You Should Fill in the fields'));
        }
    }

    const addButtonClicked = async () => {
        setErrorMessage(undefined);
        setSuccessMessage(undefined);
        if (issue.jobInterfaceId !== '' && issue.serverId !== '' && issue.name && issue.description && issue.impact && issue.appId && issue.countryId && issue.status != '' && issue.status) {
            try {
                const response = await addIssue(issue);
                setSuccessMessage(t('Added Successfully'));
            } catch (error) {
                setErrorMessage(error.response.data.message);
            }
        }
        else {
            setErrorMessage(t('You Should Fill in the fields'));
        }
    }
    return (
        <div className="card">
            <div className="card-header text-center">
                <h2 className="">{name}</h2>
                <span>{t('Details')}</span>
            </div>
            <div className="card-body">

                <div className="row m-1">

                    <div className="col">
                        <div className="row">
                            <div className="col-3">id:</div>
                            <div className="col-9"><input disabled='true' className="form-control" name='id' onChange={(event) => { inputOnChanged(event); }} defaultValue={id} /></div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="row">
                            <div className="col-3">{t('name')}:</div>
                            <div className="col-9"><input disabled={disabled} className="form-control" name='name' onChange={(event) => { inputOnChanged(event); }} defaultValue={name} /></div>
                        </div>
                    </div>

                </div>

                <div className="row m-1">

                    <div className="col">
                        <div className="row">
                            <div className="col-3">{t('Description')}:</div>
                            <div className="col-9"><input disabled={disabled} className="form-control" name='description' onChange={(event) => { inputOnChanged(event); }} defaultValue={description} /></div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="row">
                            <div className="col-3">{t('Impact')}:</div>
                            <div className="col-9">
                                <select disabled={disabled} className="form-control" name='impact' onChange={(event) => { inputOnChanged(event); }}>
                                    <option>{impact}</option>
                                    {impactTypes.map((impactFromApi, index) => {
                                        if (impactFromApi !== impact) {
                                            return (
                                                <option key={index}>{impactFromApi}</option>
                                            )
                                        }

                                    })}
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row m-1">

                    <div className="col">
                        <div className="row">
                            <div className="col-3">{t('App Name')}:</div>
                            <div className="col-9">
                                <select disabled={disabled} className="form-control" name='appId' onChange={(event) => { inputOnChanged(event); }}>
                                    <option value=''>{t('Select One')}</option>
                                    {apps.map((appFromApi, index) => {
                                        return (
                                            <option key={appFromApi.id} value={appFromApi.id} selected={appFromApi.id == appId}>{appFromApi.shortName}</option>
                                        )

                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col-3"> {t('Status')}:</div>
                            <div className="col-9">
                                <select disabled={disabled} className="form-control" name='status' onChange={(event) => { inputOnChanged(event); }}>
                                    {!props.issue.id && <option value=''>{t('Select One')}</option>}
                                    <option>{status == 'false' ? 'false' : 'true'}</option>
                                    {status == true &&
                                        <option value={false}>{false.toString()}</option>
                                    }
                                    {status == false &&
                                        <option value={true}>{true.toString()}</option>
                                    }
                                    {status == undefined &&
                                        <option value={false}>{false.toString()}</option>
                                    }

                                </select></div>
                        </div>
                    </div>

                </div>

                <div className="row m-1">

                    <div className="col">
                        <div className="row">
                            <div className="col-3">{t('Job Name')}:</div>
                            <div className="col-9">
                                <select id="jobInterfaceIdSelectList" disabled={disabled} className="form-control" name='jobInterfaceId' onChange={(event) => { inputOnChanged(event); }}>
                                    <option value=''>{t('Select One')}</option>
                                    {jobs.map((jobFromApi, index) => {
                                        return (
                                            <option key={jobFromApi.id} value={jobFromApi.id} selected={jobFromApi.id == issue.jobInterfaceId}>{jobFromApi.name}</option>
                                        )

                                    })}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="row">
                            <div className="col-3">{t('Country')}:</div>
                            <div className="col-9">
                                <select disabled={disabled} className="form-control" name='countryId' onChange={(event) => { inputOnChanged(event); }}>
                                    <option value=''>{t('Select One')}</option>
                                    {countries.map((countryFromApi, index) => {
                                        return (
                                            <option key={index} value={countryFromApi.id} selected={countryFromApi.id == issue.countryId}>{countryFromApi.name}</option>
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
                            <div className="col-3">{t('Server')}:</div>
                            <div className="col-9">
                                <select id="serverIdSelectList" disabled={disabled} className="form-control" name='serverId' onChange={(event) => { inputOnChanged(event); }}>
                                    <option value=''>{t('Select One')}</option>
                                    {servers.map((serverFromApi, index) => {
                                        return (
                                            <option key={serverFromApi.id} value={serverFromApi.id} selected={serverFromApi.id == issue.serverId}>{serverFromApi.name}</option>
                                        )

                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {errorMessage && <div className="alert-danger text-center">{errorMessage}</div>}
            {successMessage && <div className="alert-success text-center">{successMessage}</div>}
            {props.issue.id ?
                <button hidden={disabled} className="btn btn-warning m-1" onClick={() => { updateButtonClicked() }}>{t('Update')}</button> :
                <button hidden={disabled} className="btn btn-primary m-1" onClick={() => { addButtonClicked() }}>{t('Add')}</button>
            }
        </div>
    )
}

export default IssueDetailsCard;