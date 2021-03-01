import React, { useState, useEffect } from 'react';
import { getApplicationsSummary } from '../../api/appApiCalls';
import { useTranslation } from 'react-i18next';
import ApplicationsSummaryListItem from './ApplicationsSummaryListItem';
import { useApiProgress } from '../../shared/ApiProgress';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Spinner from '../Spinner';


const ApplicationsSummaryList = () => {
    const [summaries, setsummaries] = useState([]);
    const [loadFailure, setloadFailure] = useState(false);

    const pendingApiCall = useApiProgress('/api/applicationsummary'); //bu useEffect'den once yazilmali yoksa calismaz cunku useEffect'in altinda bir yere yazsaydik istek atildiktan sonra bu calisirdi ve gec kalmis olurduk
    const { t } = useTranslation();

    useEffect(async () => {
        try {
            setloadFailure(false);
            const response = await getApplicationsSummary();
            setsummaries(response.data.applicationsSummary);
        } catch (error) {
            setloadFailure(true);
        }
    }, []);

    let returnView;
    returnView =
        <div>
            {summaries.map((summary, index) => {
                return (
                    <ApplicationsSummaryListItem summary={summary} key={summary.appId} />
                )
            })}
            <div className="container text-center mt-2">
                {pendingApiCall && //conditional rendering deniyor buna pendingApiCall dogruysa devamindaki calisir
                    <Spinner></Spinner>
                }
                {loadFailure == true &&
                    <div className="text-center text-danger">{t('Something Went Wrong')}</div>}
            </div>
        </div>


    return (
        <div>
            {returnView}
        </div>
    )
}

export default ApplicationsSummaryList;