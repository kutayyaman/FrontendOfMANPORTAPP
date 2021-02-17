import React from 'react';
import { Col, Alert } from 'react-bootstrap';
import JobWithIssuesComponent from './JobWithIssuesComponent';

const ApplicationsSummaryServerListItem = (props) => {
    const { aServerWithJobs } = props;
    const { jobAndIssues: jobsAndIssues, highestImpactOfServer } = aServerWithJobs;

    let classOfServerAlert = 'container bg-success text-center';
    if (highestImpactOfServer === 'LOW') {
        classOfServerAlert = 'container bg-primary text-center';
    } else if (highestImpactOfServer === 'MEDIUM') {
        classOfServerAlert = 'container bg-warning text-center'
    } else if (highestImpactOfServer === 'HIGH') {
        classOfServerAlert = 'container bg-danger text-center';
    }

    return (
        <div className="container">
            <div className="contaier">
                <Col >
                    <Alert className={classOfServerAlert}>
                        {aServerWithJobs.serverName}
                    </Alert>
                </Col>
            </div>

            {jobsAndIssues.map((jobWithIssues, index) => {
                return <JobWithIssuesComponent jobWithIssues={jobWithIssues} />
            })}
        </div>

    )
}
export default ApplicationsSummaryServerListItem;