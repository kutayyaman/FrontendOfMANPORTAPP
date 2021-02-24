import React, { useState, useEffect } from 'react'
import { getAppsDropList } from '../../api/appApiCalls';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';


const IssueFilter = (props) => {

    const { t } = useTranslation();
    const { loadIssues } = props;
    const [issuesFilter, setIssuesFilter] = useState({
        selectedFromDate: null,
        selectedToDate: null,
        appId: null,
        status: null
    });

    const [isFiltered, setIsFiltered] = useState(false);
    useEffect(() => {
        loadIssues(isFiltered, issuesFilter);
    }, [isFiltered]);

    const [apps, setApps] = useState([]);

    useEffect(() => {
        loadApps();
    }, []); //component didMount gibi calisir bu suan ama egerki 2. parametreye hic bir sey vermeseydik hem didmount hem de didupdate gibi calisirdi yani her degisiklikte calisirdi gibi bir anlama geliyor. ama mesela ikinci parametre olarak [param1,param2] gibi bisey deseydik param1 veya param2 degistigi zaman calis gibi bir anlami olurdu


    const loadApps = async () => {
        try {
            const response = await getAppsDropList();
            const { data } = response;
            setApps(data);
        } catch (error) {

        }
    }

    return (
        <div className="card mb-2">
            <div className="row">
                <div className="col">
                    <span className="mr-2">Application:</span>
                    <select className="form-select form-select-sm" aria-label=".form-select-sm example" defaultValue=''
                        onChange={
                            (event) => {
                                const copyIssuesFilter = { ...issuesFilter };
                                copyIssuesFilter.appId = event.target.value;
                                setIssuesFilter(copyIssuesFilter);
                            }}>
                        <option value=''>All</option>
                        {apps.map((app, index) => {
                            return (
                                <option value={app.id}>{app.shortName}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="col">
                    <span className="mr-2">Status:</span>
                    <select className="form-select form-select-sm" aria-label=".form-select-sm example" defaultValue='' onChange={
                        (event) => {
                            const copyIssuesFilter = { ...issuesFilter };
                            copyIssuesFilter.status = event.target.value;
                            setIssuesFilter(copyIssuesFilter);
                        }}>
                        <option value=''>All</option>
                        <option value="true">On</option>
                        <option value="false">Off</option>
                    </select>
                </div>

            </div>

            <div className="row">
                <div className="col">
                    <span>From:</span>
                    <DatePicker className="m-1"
                        dateFormat="yyyy-MM-dd"
                        selected={issuesFilter.selectedFromDate}
                        onChange={date => {
                            const copyIssuesFilter = { ...issuesFilter };
                            copyIssuesFilter.selectedFromDate = date;
                            setIssuesFilter(copyIssuesFilter);
                        }}
                        maxDate={issuesFilter.selectedToDate}
                    />
                    <FontAwesomeIcon icon={faCalendar} />
                </div>
                <div className="col">
                    <span>To:</span>
                    <DatePicker className="m-1"
                        dateFormat="yyyy-MM-dd"
                        selected={issuesFilter.selectedToDate}
                        onChange={date => {
                            const copyIssuesFilter = { ...issuesFilter };
                            copyIssuesFilter.selectedToDate = date;
                            setIssuesFilter(copyIssuesFilter);
                        }}
                        minDate={issuesFilter.selectedFromDate}
                    />
                    <FontAwesomeIcon icon={faCalendar} />
                </div>
            </div>

            <button type="button" className="btn btn-info" onClick={(event) => {
                setIsFiltered(true);
                loadIssues(isFiltered, issuesFilter);
            }}>{t('Search')}</button>
            <button type="button" className="btn btn-secondary" onClick={(event) => {
                setIsFiltered(false);
                loadIssues(isFiltered, issuesFilter);
            }}>{t('Remove Filter')}</button>
        </div>
    )

}


export default IssueFilter;


