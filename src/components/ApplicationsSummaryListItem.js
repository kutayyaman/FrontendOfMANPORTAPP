import React from 'react';
import { Accordion, Card, Container, Row, Col } from 'react-bootstrap';
import ApplicationsSummaryCountryListItem from './ApplicationsSummaryCountryListItem';

const ApplicationsSummaryListItem = (props) => {
    const { summary } = props;
    const { acountryWithServersList, highestImpactOfApp } = summary; //burda uygulamanin bulundugu ulkelerin bulundugu liste

    let classOfAppAlert = 'container bg-success text-center';
    if (highestImpactOfApp === 'LOW') {
        classOfAppAlert = 'container bg-primary text-center';
    } else if (highestImpactOfApp === 'MEDIUM') {
        classOfAppAlert = 'container bg-warning text-center'
    } else if (highestImpactOfApp === 'HIGH') {
        classOfAppAlert = 'container bg-danger text-center';
    }

    let isTheAppHasAnIssue = false;
    if (highestImpactOfApp) {
        isTheAppHasAnIssue = true;
    }

    return (
        <Accordion defaultActiveKey={isTheAppHasAnIssue ? "0" : "1"}>
            <Card className="m-2">
                <Accordion.Toggle className={classOfAppAlert} as={Card.Header} eventKey="0">
                    {summary.appName}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Container>
                            <Row>
                                {acountryWithServersList.map((countryWithServersList, index) => {
                                    return (
                                        <ApplicationsSummaryCountryListItem countryWithServersList={countryWithServersList} />
                                    )
                                })}
                            </Row>
                        </Container>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
};

export default ApplicationsSummaryListItem;