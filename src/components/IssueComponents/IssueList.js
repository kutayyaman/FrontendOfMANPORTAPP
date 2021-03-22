import React, { useState } from 'react'
import { getIssues, getIssuesByJobImplementId } from '../../api/issueApiCalls';
import { useTranslation } from 'react-i18next';
import IssueListItem from './IssueListItem';
import { useApiProgress } from '../../shared/ApiProgress';
import "react-datepicker/dist/react-datepicker.css";
import Spinner from '../Spinner';
import IssueFilter from './IssueFilter';

const IssueList = (props) => {

    const { jobImplementId } = props;

    const [page, setPage] = useState({
        content: [],
        first: undefined,
        last: undefined,
        number: undefined
    });

    const [isFilteredFromFilter, setIsFilteredFromFilter] = useState(false);
    const [issuesFilterFromFilter, setIssuesFilterFromFilter] = useState({
        selectedFromDate: null,
        selectedToDate: null,
        appId: null,
        status: null
    });

    const [loadFailure, setLoadFailure] = useState(false);

    const pendingApiCall = useApiProgress('/api/issue/issues'); //useEffect'ten sonra tanimlanirsa calismaz cunku sonrasin aldigimiz zaman o esnada artik request atilmis oluyo ve biz ondan sonra dinlemeye basliyoruz yani gec kalmis oluyoruz.

    const onClickNext = () => {
        const nextPage = page.number + 1;
        loadIssues(isFilteredFromFilter, issuesFilterFromFilter, nextPage);
    }

    const onClickPrevious = () => {
        const previousPage = page.number - 1;
        loadIssues(isFilteredFromFilter, issuesFilterFromFilter, previousPage);
    }

    const loadIssues = async (isFiltered = isFilteredFromFilter, filteredValues = issuesFilterFromFilter, page = 0) => {
        if (jobImplementId && !isFiltered) {
            try {
                let response;
                response = await getIssuesByJobImplementId(jobImplementId, page, 5);
                setLoadFailure(false);
                const { data } = response;
                setPage(data);
            } catch (error) {
                setLoadFailure(true);
            }
        }

        else {
            try {
                let response;
                if (isFiltered === false) {
                    response = await getIssues(page, 5, undefined);
                }
                else {
                    response = await getIssues(page, 5, filteredValues);
                }
                setLoadFailure(false);
                const { data } = response;
                setPage(data);
            } catch (error) {
                setLoadFailure(true);
            }
            if (isFiltered) {
                setIsFilteredFromFilter(isFiltered);
            }
            if (filteredValues) {
                setIssuesFilterFromFilter({ ...filteredValues });
            }
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
            <IssueFilter loadIssues={loadIssues}></IssueFilter>

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