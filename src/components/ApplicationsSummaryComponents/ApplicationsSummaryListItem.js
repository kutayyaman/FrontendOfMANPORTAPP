import React from 'react';
import { Accordion, Card, Container, Row, Col } from 'react-bootstrap';
import ApplicationsSummaryCountryListItem from './ApplicationsSummaryCountryListItem';

const ApplicationsSummaryListItem = (props) => {
    const { summary } = props;
    const { acountryWithServersList, highestImpactOfApp } = summary; //burda uygulamanin bulundugu ulkelerin bulundugu liste

    let classOfAppAlert = 'container border border-success text-center';
    if (highestImpactOfApp === 'LOW') {
        classOfAppAlert = 'container border border-primary text-center';
    } else if (highestImpactOfApp === 'MEDIUM') {
        classOfAppAlert = 'container border border-warning text-center'
    } else if (highestImpactOfApp === 'HIGH') {
        classOfAppAlert = 'container border border-danger text-center';
    }

    let isTheAppHasAnIssue = false;
    if (highestImpactOfApp) {
        isTheAppHasAnIssue = true;
    }

    return (
        <Accordion defaultActiveKey={isTheAppHasAnIssue ? "0" : "1"}>
            <div>
                <Card className="m-5">
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
            </div>
        </Accordion>
    );
};

export default ApplicationsSummaryListItem;