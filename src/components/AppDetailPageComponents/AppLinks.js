import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getLinksByAppIdForManagementPage } from '../../api/linkApiCalls';
import { Accordion, Card, Container, Row, Col } from 'react-bootstrap';

const AppLinks = props => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [errorMessage, setErrorMessage] = useState();

    const getJobsByAppIdFunc = async (appId) => {
        try {
            const result = await getLinksByAppIdForManagementPage(appId);
            setData(result.data);
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    }

    useEffect(() => {
        getJobsByAppIdFunc(id);
    }, [])



    return (
        <Accordion defaultActiveKey="0">
            <Card className="m-5">
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    <h2>Links</h2>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        {data.map((specificType) => {
                            return (
                                <Accordion defaultActiveKey="0">
                                    <div>
                                        <Card className="m-5">
                                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                                {specificType.specificTypeName} Links
                                </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>
                                                    {specificType.acountryNameWithEnvironmentTypes.map((country) => {

                                                        return (
                                                            <Accordion defaultActiveKey="0">
                                                                <Card className="m-5">
                                                                    <Accordion.Toggle as={Card.Header} eventKey="0">
                                                                        {country.countryName}
                                                                    </Accordion.Toggle>
                                                                    <Accordion.Collapse eventKey="0">
                                                                        <Card.Body>
                                                                            {
                                                                                country.anEnvironmentTypeWithLinks.map((environmentType) => {
                                                                                    return (
                                                                                        <Accordion defaultActiveKey="0">
                                                                                            <Card className="m-5">
                                                                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                                                                    {environmentType.environmentTypeName}
                                                                                                </Accordion.Toggle>
                                                                                                <Accordion.Collapse eventKey="0">
                                                                                                    <Card.Body>
                                                                                                        {environmentType.linkDTOList.map((link) => {
                                                                                                            return (
                                                                                                                <Row>
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