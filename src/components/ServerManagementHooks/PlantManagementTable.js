import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { findAllForPlantManagementTable } from '../../api/serverApiCalls';
import Spinner from '../../components/Spinner';
import { useApiProgress } from '../../shared/ApiProgress';
import { Link } from 'react-router-dom'; //a etiketi yerine Link kullanma sebebimiz HashRouter yerine BrowserRouter kullanmak istersek ilerde sorun yasamamk icin yani hashrouter /# gibi bir etiket ekliyor cunku
import PlantManagementTableListItem from './PlantManagementTableListItem';

const PlantManagementTable = () => {
    const [errorMessage, seterrorMessage] = useState();
    const { t } = useTranslation();
    const [page, setPage] = useState({
        content: [],
        first: undefined,
        last: undefined,
        number: undefined
    });
    const { content: servers, first, last, number } = page;
    const pendingApiCall = useApiProgress('/api/server/management', 'get'); //useEffect'ten sonra tanimlanirsa calismaz cunku sonrasin aldigimiz zaman o esnada artik request atilmis oluyo ve biz ondan sonra dinlemeye basliyoruz yani gec kalmis oluyoruz.

    const onClickNext = () => {
        const nextPage = number + 1;
        loadServers(nextPage);
    }

    const onClickPrevious = () => {
        const previousPage = number - 1;
        loadServers(previousPage);
    }

    const loadServers = async (page = 0) => {
        try {
            const response = await findAllForPlantManagementTable(page, 5);
            const { data } = response;
            setPage(data);
        } catch (error) {
            seterrorMessage(t('Something Went Wrong'));
        }
    }

    useEffect(() => {
        loadServers();
    }, []);

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
                <h2 className="card-header text-center">Plant Management</h2>
                <div className="list-group-flush">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">{t('Country')}</th>
                                <th scope="col">{t('Short Code')}</th>
                                <th scope="col">{t('Full Name')}</th>
                                <th scope="col">{t('Live App Count')}</th>
                                <th scope="col">
                                    <div className="text-center" >{t('Actions')}</div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-3">
                                            {t('Delete')}
                                        </div>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {servers.map((server, index) => {
                                return (
                                    <PlantManagementTableListItem server={server} key={server.id} />
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                {buttonsOrProgressBarDiv}
                {errorMessage && <div className="alert-danger text-center">{errorMessage}</div>}
            </div>
        </div>
    )
}
export default PlantManagementTable;