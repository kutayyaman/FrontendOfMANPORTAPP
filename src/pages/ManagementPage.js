import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { getAppsForManagementPage } from '../api/appApiCalls';
import ManagementPageListItem from '../components/ManagementPageComponents/ManagementPageListItem';
import Spinner from '../components/Spinner';
import { useApiProgress } from '../shared/ApiProgress';
import { Link } from 'react-router-dom'; //a etiketi yerine Link kullanma sebebimiz HashRouter yerine BrowserRouter kullanmak istersek ilerde sorun yasamamk icin yani hashrouter /# gibi bir etiket ekliyor cunku



const ManagementPage = () => {
    const [errorMessage, seterrorMessage] = useState();
    const { t } = useTranslation();
    const [page, setPage] = useState({
        content: [],
        first: undefined,
        last: undefined,
        number: undefined
    });
    const { content: apps, first, last, number } = page;
    const pendingApiCall = useApiProgress('/api/application/applicationForManagementPage', 'get'); //useEffect'ten sonra tanimlanirsa calismaz cunku sonrasin aldigimiz zaman o esnada artik request atilmis oluyo ve biz ondan sonra dinlemeye basliyoruz yani gec kalmis oluyoruz.

    const onClickNext = () => {
        const nextPage = number + 1;
        loadApps(nextPage);
    }

    const onClickPrevious = () => {
        const previousPage = number - 1;
        loadApps(previousPage);
    }

    const loadApps = async (page = 0) => {
        try {
            const response = await getAppsForManagementPage(page, 5);
            const { data } = response;
            setPage(data);
        } catch (error) {
            seterrorMessage(t('Something Went Wrong'));
        }
    }

    useEffect(() => {
        loadApps(number);
    }, [number]);


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
        <div className="container">
            <div className="card">
                <h2 className="card-header text-center">{t('Management')}</h2>
                <div className="list-group-flush">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">{t('Application Name')}</th>
                                <th scope="col">{t('Business Area')}</th>
                                <th scope="col">{t('Live Plants')}</th>
                                <th scope="col">{t('Line Stop Risk')}</th>
                                <th scope="col">
                                    <div className="text-center" >{t('Actions')}</div>
                                    <hr />
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
                            {apps.map((app, index) => {
                                return (
                                    <ManagementPageListItem app={app} key={app.id} />
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                {buttonsOrProgressBarDiv}
                {errorMessage && <div className="alert-danger text-center">{errorMessage}</div>}
            </div>

            <div className="text-center m-2">
                <Link className="nav-link" to={`/app/add`}>
                    <button type="button" className="btn btn-primary">{t('Add New App')}</button>
                </Link>
                <Link className="nav-link" to={`/app/setup`}>
                    <button type="button" className="btn btn-primary">{t('Setup An Application On A Server')}</button>
                </Link>
            </div>

        </div>
    );
};

export default ManagementPage;