import React from 'react';
import { Col, Alert, Row } from 'react-bootstrap';
import JobWithIssuesComponent from './JobWithIssuesComponent';

const ApplicationsSummaryServerListItem = (props) => {
    const { aServerWithJobs } = props;
    const { jobAndIssues: jobsAndIssues, highestImpactOfServer } = aServerWithJobs;

    let classOfServerAlert = 'bg-success text-center';
    if (highestImpactOfServer === 'LOW') {
        classOfServerAlert = 'bg-primary text-center';
    } else if (highestImpactOfServer === 'MEDIUM') {
        classOfServerAlert = 'bg-warning text-center'
    } else if (highestImpactOfServer === 'HIGH') {
        classOfServerAlert = 'bg-danger text-center';
    }

    return (
        <div className="container">
            <Col >
                <Alert className={classOfServerAlert}>
                    {aServerWithJobs.serverName}
                </Alert>
            </Col>

            {jobsAndIssues.map((jobWithIssues, index) => {
                return (
                    <JobWithIssuesComponent jobWithIssues={jobWithIssues} key={jobWithIssues.jobId} />
                )
            })}
        </div>

    )
}
export default ApplicationsSummaryServerListItem;