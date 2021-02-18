import React, { useState, useEffect } from 'react'
import { getIssues } from '../../api/issueApiCalls';
import { useTranslation } from 'react-i18next';
import IssueListItem from './IssueListItem';
import { useApiProgress } from '../../shared/ApiProgress';

const IssueList = () => {
    const [page, setPage] = useState({
        content: [],
        first: undefined,
        last: undefined,
        number: undefined
    });

    const [loadFailure, setLoadFailure] = useState(false);


    const pendingApiCall = useApiProgress('/api/issue/issues'); //useEffect'ten sonra tanimlanirsa calismaz cunku sonrasin aldigimiz zaman o esnada artik request atilmis oluyo ve biz ondan sonra dinlemeye basliyoruz yani gec kalmis oluyoruz.

    useEffect(() => {
        loadIssues();
    }, []); //component didMount gibi calisir bu suan ama egerki 2. parametreye hic bir sey vermeseydik hem didmount hem de didupdate gibi calisirdi yani her degisiklikte calisirdi gibi bir anlama geliyor. ama mesela ikinci parametre olarak [param1,param2] gibi bisey deseydik param1 veya param2 degistigi zaman calis gibi bir anlami olurdu

    const onClickNext = () => {
        const nextPage = page.number + 1;
        loadIssues(nextPage);
    }

    const onClickPrevious = () => {
        const previousPage = page.number - 1;
        loadIssues(previousPage);
    }

    const loadIssues = async (page) => {
        try {
            const response = await getIssues(page);
            setLoadFailure(false);
            const { data } = response;
            setPage(data);
        } catch (error) {
            setLoadFailure(true);
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
            <div className="text-center mt-2">
                <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        )
    }

    return (
        <div className="card">
            <h2 className="card-header text-center">{t('Issues')}</h2>
            <div className="list-group-flush">
                {issues.map((issue, index) => {
                    return (
                        <IssueListItem issue={issue} key={issue.id} />
                    )
                })}
            </div>
            {buttonsOrProgressBarDiv}
            {loadFailure == true &&
                <div className="text-center text-danger">{t('Something Went Wrong')}</div>}
        </div>
    )
}

export default IssueList;