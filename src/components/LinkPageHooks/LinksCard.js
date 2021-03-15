import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../../shared/ApiProgress';
import Spinner from '../Spinner';
import { getLinksGroupedByApplications } from '../../api/linkApiCalls';
import { Accordion, Card, Container, Row, Col } from 'react-bootstrap';
import AppLinks from '../AppDetailPageComponents/AppLinks';

const LinksCard = props => {
    const { t } = useTranslation();

    const [errorMessage, seterrorMessage] = useState(undefined);
    const [successMessage, setsuccessMessage] = useState(undefined);

    const [datas, setDatas] = useState([]);

    const pendingApiCall = useApiProgress('/api/link/', 'get'); //bu useEffect'den once yazilmali yoksa calismaz cunku useEffect'in altinda bir yere yazsaydik istek atildiktan sonra bu calisirdi ve gec kalmis olurduk

    useEffect(() => {
        getLinksGroupedByApplicationsFunc();
    }, [])

    const getLinksGroupedByApplicationsFunc = async () => {
        try {
            const response = await getLinksGroupedByApplications();
            console.log(response);
            setDatas(response.data);
        } catch (backendError) {
            seterrorMessage(t('Something Went Wrong'));
        }
    }

    if (pendingApiCall) {
        return (<Spinner></Spinner>)
    }
    if (errorMessage) {
        return (<div className="text-center alert-danger">{errorMessage}</div>)
    }
    return (
        <Accordion defaultActiveKey="0">
            <Card className="m-5">
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    <h2>Application Links</h2>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        {datas.map((data) => {
                            return (
                                <Accordion key={data.appShortName} defaultActiveKey="0">
                                    <div>
                                        <Card className="m-5">
                                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                                {data.appShortName}
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>
                                                    <AppLinks aspecificTypeWithCountriesAndEnvironments={data.aspecificTypeWithCountriesAndEnvironments}></AppLinks>

                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </div>
                                </Accordion>
                            )
                        })}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>

        </Accordion>
    );
}

export default LinksCard;