import React from 'react';
import { Accordion, Card, Container, Row, Col } from 'react-bootstrap';
import ApplicationsSummaryCountryListItem from './ApplicationsSummaryCountryListItem';
import '../../myCssFiles/breathingStyle.css';

const ApplicationsSummaryListItem = (props) => {
    const { summary } = props;
    const { acountryWithServersList, highestImpactOfApp, lineStopRisk } = summary; //burda uygulamanin bulundugu ulkelerin bulundugu liste
    let classOfAppAlert = 'border border-success text-center';
    if (highestImpactOfApp === 'LOW') {
        classOfAppAlert = 'border border-primary text-center';
    } else if (highestImpactOfApp === 'MEDIUM') {
        classOfAppAlert = 'border border-warning text-center'
        if (lineStopRisk == true) {
            classOfAppAlert += ' anim-circle';
        }
    } else if (highestImpactOfApp === 'HIGH') {
        classOfAppAlert = 'border border-danger text-center';
        if (lineStopRisk == true) {
            classOfAppAlert += ' anim-circle';
        }
    }

    let isTheAppHasAnIssue = false;
    if (highestImpactOfApp) {
        isTheAppHasAnIssue = true;
    }

    return (
        summary.acountryWithServersList.length > 0 && <Accordion defaultActiveKey={isTheAppHasAnIssue ? "0" : "1"}>
            <div>
                <Card className="m-5">
                    <Accordion.Toggle className={classOfAppAlert} as={Card.Header} eventKey="0">
                        {summary.appName}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Container className="text-white">
                                <Row>
                                    {acountryWithServersList.map((countryWithServersList, index) => {
                                        return (
                                            <Col key={countryWithServersList.countryId}>
                                                <ApplicationsSummaryCountryListItem countryWithServersList={countryWithServersList} />
                                            </Col>
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