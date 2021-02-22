import React, { useState, useEffect } from 'react';
import { getTop3Issues } from '../../api/issueApiCalls';
import { useTranslation } from 'react-i18next';
import Top3IssueLıstItem from './Top3IssueLıstItem';
import { useApiProgress } from '../../shared/ApiProgress';
import Spinner from '../Spinner';

const Top3IssuesLıst = () => { //bu bir hook oldu artik
    const [issues, setissues] = useState([]);
    const [loadFailure, setloadFailure] = useState(false);

    const pendingApiCall = useApiProgress('/api/issue/top3'); //bu useEffect'den once yazilmali yoksa calismaz cunku useEffect'in altinda bir yere yazsaydik istek atildiktan sonra bu calisirdi ve gec kalmis olurduk

    useEffect(async () => {
        try {
            setloadFailure(false);
            const response = await getTop3Issues();
            setissues(response.data);
        } catch (error) {
            setloadFailure(true);
        }
    }, []); //ikinci parametresini [] boyle verince componentDidMount gibi calisiyor.

    const { t } = useTranslation();
    return (
        <div className="container">
            <div className="card bg-light w-50 container">
                <h6>
                    {t('Last Issues')}
                </h6>
                {issues.map((issue, index) => { //burada span'in rengi issue'nin sorununun ciddilige gore farklilik gosterecek sekilde ayarlanmali
                    return (
                        <Top3IssueLıstItem issue={issue} key={issue.id} />
                    )
                })}
                <div className="text-center mt-2">
                    {pendingApiCall && //conditional rendering deniyor buna pendingApiCall dogruysa devamindaki calisir
                        <Spinner></Spinner>
                    }
                    {loadFailure == true &&
                        <div className="text-center text-danger">{t('Something Went Wrong')}</div>}
                </div>
            </div>
        </div>
    )
}

export default Top3IssuesLıst;