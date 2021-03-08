import React, { useState, useEffect } from 'react';
import { useApiProgress } from '../../shared/ApiProgress';
import Spinner from '../../components/Spinner';
import { getIssuesByAppId } from '../../api/issueApiCalls';
import { useTranslation } from 'react-i18next';
import IssueManagementByAppCardListItem from './IssueManagementByAppCardListItem';


const IssueManagementByAppCard = props => {
    const { id, disabled } = props;

    const [page, setPage] = useState({
        content: [],
        first: undefined,
        last: undefined,
        number: undefined
    });

    const [loadFailure, setLoadFailure] = useState(false);
    const pendingApiCall = useApiProgress(`/api/issue/getByAppId/${id}`); //useEffect'ten sonra tanimlanirsa calismaz cunku sonrasin aldigimiz zaman o esnada artik request atilmis oluyo ve biz ondan sonra dinlemeye basliyoruz yani gec kalmis oluyoruz.
    const { t } = useTranslation();

    useEffect(() => {
        loadIssues(id);
    }, [id])

    const loadIssues = async (appId, page = 0) => {
        try {
            const response = await getIssuesByAppId(appId, page, 3);
            setLoadFailure(false);
            const { data } = response;
            setPage(data);
        } catch (error) {
            setLoadFailure(true);
        }

    };

    const onClickNext = () => {
        const nextPage = page.number + 1;
        loadIssues(id, nextPage);
    }

    const onClickPrevious = () => {
        const previousPage = page.number - 1;
        loadIssues(id, previousPage);
    }


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
        <div className="container my-4">
            <div className="card">
                <h2 className="card-header text-center">{t('Issues Management')}</h2>
                <div className="list-group-flush">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">{t('Job Name')}</th>
                                <th scope="col">{t('Impact')}</th>
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
                                            {t('Track')}
                                        </div>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {issues.map((issue, index) => {
                                return (
                                    <IssueManagementByAppCardListItem key={issue.id} issue={issue} />
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
export default IssueManagementByAppCard;