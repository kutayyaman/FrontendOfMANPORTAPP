import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getLinksByAppIdForManagementPage } from '../../api/linkApiCalls';
import { Accordion, Card, Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../../shared/ApiProgress';
import Spinner from '../../components/Spinner';

const AppLinks = props => {
    const { id } = props;
    const [data, setData] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const { t } = useTranslation();

    const getJobsByAppIdFunc = async (appId) => {
        try {
            const result = await getLinksByAppIdForManagementPage(appId);
            setData(result.data);
        } catch (error) {
            setErrorMessage(t('Something Went Wrong'));
        }
    }

    const pendingApiCall = useApiProgress('/api/link/', 'get'); //bu useEffect'den once yazilmali yoksa calismaz cunku useEffect'in altinda bir yere yazsaydik istek atildiktan sonra bu calisirdi ve gec kalmis olurduk

    useEffect(() => {
        getJobsByAppIdFunc(id);
    }, [id])


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
                    <h2>Links</h2>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        {data.map((specificType) => {
                            if (specificType.acountryNameWithEnvironmentTypes.length <= 0) {
                                return (
                                    <div key={specificType.specificTypeName}>
                                        <h5>{specificType.specificTypeName} Links </h5>
                                        <div className="text-danger">{t('There is no link for this app')}</div>
                                    </div>
                                )
                            }
                            return (
                                <Accordion key={specificType.specificTypeName} defaultActiveKey="0">
                                    <div>
                                        <Card className="m-5">
                                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                                {specificType.specificTypeName} Links
                                </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>
                                                    {specificType.acountryNameWithEnvironmentTypes.map((country) => {

                                                        return (
                                                            <Accordion key={country.countryName} defaultActiveKey="0">
                                                                <Card className="m-5">
                                                                    <Accordion.Toggle as={Card.Header} eventKey="0">
                                                                        {country.countryName}
                                                                    </Accordion.Toggle>
                                                                    <Accordion.Collapse eventKey="0">
                                                                        <Card.Body>
                                                                            {
                                                                                country.anEnvironmentTypeWithLinks.map((environmentType) => {
                                                                                    return (
                                                                                        <Accordion key={environmentType.environmentTypeName} defaultActiveKey="0">
                                                                                            <Card className="m-5">
                                                                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                                                                    {environmentType.environmentTypeName}
                                                                                                </Accordion.Toggle>
                                                                                                <Accordion.Collapse eventKey="0">
                                                                                                    <Card.Body>
                                                                                                        {environmentType.linkDTOList.map((link) => {
                                                                                                            return (
                                                                                                                <Row key={link.name}>
                                                                                                                    <h5 className="text-center mx-1">
                                                                                                                        {link.name}:
                                                                                                                    </h5>
                                                                                                                    <a href={link.url}>{link.url}</a>
                                                                                                                </Row>
                                                                                                            )
                                                                                                        })}
                                                                                                    </Card.Body>
                                                                                                </Accordion.Collapse>
                                                                                            </Card>
                                                                                        </Accordion>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </Card.Body>
                                                                    </Accordion.Collapse>
                                                                </Card>
                                                            </Accordion>
                                                        )

                                                    })}
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

export default AppLinks;

/*
<Accordion defaultActiveKey="0">
                            <Card className="m-5">
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    {specificType.specificTypeName} Links
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>

                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                    </Accordion>
*/