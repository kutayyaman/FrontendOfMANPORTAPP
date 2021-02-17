import React from 'react';
import { Col, Alert, Row, Container } from 'react-bootstrap';
import ApplicationsSummaryServerListItem from './ApplicationsSummaryServerListItem';

const ApplicationsSummaryCountryListItem = (props) => {
    const { countryWithServersList } = props;
    const { aserverWithJobsList, highestImpactOfCountry } = countryWithServersList;

    let classOfCountryAlert = 'bg-success text-center';
    if (highestImpactOfCountry === 'LOW') {
        classOfCountryAlert = 'bg-primary text-center';
    } else if (highestImpactOfCountry === 'MEDIUM') {
        classOfCountryAlert = 'bg-warning text-center'
    } else if (highestImpactOfCountry === 'HIGH') {
        classOfCountryAlert = 'bg-danger text-center';
    }

    return (
        <Container>
            <Alert className={classOfCountryAlert}>
                {countryWithServersList.countryName}
            </Alert>

            {
                aserverWithJobsList.map((aServerWithJobs, index) => {
                    return (
                        <ApplicationsSummaryServerListItem aServerWithJobs={aServerWithJobs} />
                    )
                })

            }

        </Container>

    );
}

export default ApplicationsSummaryCountryListItem;