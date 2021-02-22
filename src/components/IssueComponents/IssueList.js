import React, { useState, useEffect } from 'react'
import { getIssues } from '../../api/issueApiCalls';
import { getAppsDropList } from '../../api/appApiCalls';
import { useTranslation } from 'react-i18next';
import IssueListItem from './IssueListItem';
import { useApiProgress } from '../../shared/ApiProgress';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../Spinner';

const IssueList = () => {
    const [page, setPage] = useState({
        content: [],
        first: undefined,
        last: undefined,
        number: undefined
    });

    const [apps, setApps] = useState([]);

    const [loadFailure, setLoadFailure] = useState(false);

    const [issuesFilter, setIssuesFilter] = useState({
        selectedFromDate: null,
        selectedToDate: null,
        appId: null,
        status: null
    });

    const [isFiltered, setIsFiltered] = useState(false);
    useEffect(() => {
        loadIssues();
    }, [isFiltered]);

    const pendingApiCall = useApiProgress('/api/issue/issues'); //useEffect'ten sonra tanimlanirsa calismaz cunku sonrasin aldigimiz zaman o esnada artik request atilmis oluyo ve biz ondan sonra dinlemeye basliyoruz yani gec kalmis oluyoruz.

    useEffect(() => {
        //loadIssues(); // TODO: bu aktif oldugu zaman ayni istegi iki kere atiyor arastir
        loadApps();
    }, []); //component didMount gibi calisir bu suan ama egerki 2. parametreye hic bir sey vermeseydik hem didmount hem de didupdate gibi calisirdi yani her degisiklikte calisirdi gibi bir anlama geliyor. ama mesela ikinci parametre olarak [param1,param2] gibi bisey deseydik param1 veya param2 degistigi zaman calis gibi bir anlami olurdu

    const onClickNext = () => {
        const nextPage = page.number + 1;
        loadIssues(nextPage);
    }

    const onClickPrevious = () => {
        const previousPage = page.number - 1;
        loadIssues(previousPage);
    }

    const loadIssues = async (page = 0) => {
        try {
            let response;
            if (isFiltered === false) {
                response = await getIssues(page, 5, undefined);
            }
            else {
                response = await getIssues(page, 5, issuesFilter);
            }
            setLoadFailure(false);
            const { data } = response;
            setPage(data);
        } catch (error) {
            setLoadFailure(true);
        }
    }

    const loadApps = async () => {
        try {
            const response = await getAppsDropList();
            const { data } = response;
            setApps(data);
        } catch (error) {

        }
    }


    const { t } = useTranslation();
    const { content: issues, first, last } = page;

    let buttonsOrProgressBarDiv = (
        <div>
            {first === false && <button className="btn btn-sm btn-dark" onClick={onClickPrevious}>{t('Previous')}</button>}
            {last === false && <button className="btn btn-sm btn-dark float-right" onClick={onClickNext}>{t('Next')}</button>}
        </div>)

    if (pendingApiCall) {
        buttonsOrProgressBarDiv = (
            <Spinner></Spinner>
        )
    }

    return (
        <div>
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
                    loadIssues();
                    setIsFiltered(true);
                }}>{t('Search')}</button>
                <button type="button" className="btn btn-secondary" onClick={(event) => {
                    loadIssues();
                    setIsFiltered(false);
                }}>{t('Remove Filter')}</button>
            </div>


            <div className="card">
                <h2 className="card-header text-center">{t('Issues')}</h2>
                <div className="list-group-flush">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">{t('Date')}</th>
                                <th scope="col">{t('App Name')}</th>
                                <th scope="col">{t('Job Name')}</th>
                                <th scope="col">{t('Impact')}</th>
                                <th scope="col">{t('Country')}</th>
                                <th scope="col">{t('Description')}</th>
                                <th scope="col">
                                    <div >{t('Actions')}</div>
                                    <div className="row">
                                        <div className="col-3">
                                            {t('View')}
                                        </div>
                                        <div className="col-3">
                                            {t('Edit')}
                                        </div>
                                        <div className="col-3">
                                            {t('Delete')}
                                        </div>
                                        <div className="col-3">
                                            {t('Status')}
                                        </div>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {issues.map((issue, index) => {
                                return (
                                    <IssueListItem issue={issue} key={issue.id} />
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                {buttonsOrProgressBarDiv}
                {loadFailure == true &&
                    <div className="text-center text-danger">{t('Something Went Wrong')}</div>}
            </div>
        </div>
    )
}

export default IssueList;