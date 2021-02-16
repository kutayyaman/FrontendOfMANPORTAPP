import React, { useState, useEffect } from 'react';
import { getTop3Issues } from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import Top3IssueLıstItem from './Top3IssueLıstItem';

const Top3IssuesLıst = () => { //bu bir hook oldu artik
    const [issues, setissues] = useState([]);

    useEffect(() => {
        getTop3Issues().then(response => {
            setissues(response.data);
        })
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
            </div>
        </div>
    )
}

export default Top3IssuesLıst;