import React from 'react';
import { Col, Row, Alert } from 'react-bootstrap';

const JobWithIssuesComponent = (props) => {
    const { jobWithIssues } = props;
    const { highestImpactOfJob } = jobWithIssues;

    let classOfJob = 'container bg-success';
    if (highestImpactOfJob === 'LOW') {
        classOfJob = 'container bg-primary';
    } else if (highestImpactOfJob === 'MEDIUM') {
        classOfJob = 'container bg-warning'
    } else if (highestImpactOfJob === 'HIGH') {
        classOfJob = 'container bg-danger';
    }

    return (
        <Col xs={4} className="container text-white" >
            <div className={classOfJob}>
                <Alert className="text-center">
                    {jobWithIssues.jobName}
                </Alert>
            </div>

        </Col>
    )

}
export default JobWithIssuesComponent;