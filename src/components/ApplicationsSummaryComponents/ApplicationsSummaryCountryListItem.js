import React from 'react';
import { Col, Alert, Row } from 'react-bootstrap';
import ApplicationsSummaryServerListItem from './ApplicationsSummaryServerListItem';

const ApplicationsSummaryCountryListItem = (props) => {
    const { countryWithServersList } = props;
    const { aserverWithJobsList, highestImpactOfCountry } = countryWithServersList;

    let classOfCountryAlert = 'container bg-success text-center';
    if (highestImpactOfCountry === 'LOW') {
        classOfCountryAlert = 'container bg-primary text-center';
    } else if (highestImpactOfCountry === 'MEDIUM') {
        classOfCountryAlert = 'container bg-warning text-center'
    } else if (highestImpactOfCountry === 'HIGH') {
        classOfCountryAlert = 'container bg-danger text-center';
    }

    return (
        <Col className="container text-white" xs={8}>
            <Alert className={classOfCountryAlert}>
                {countryWithServersList.countryName}
            </Alert>

            {aserverWithJobsList.map((aServerWithJobs, index) => {
                return (
                    <Row>
                        <ApplicationsSummaryServerListItem aServerWithJobs={aServerWithJobs} />
                    </Row>
                )
            })}
        </Col>

    );
}

export default ApplicationsSummaryCountryListItem;