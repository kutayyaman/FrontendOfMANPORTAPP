import React from 'react';
import { Col, Row, Alert } from 'react-bootstrap';

const ApplicationsSummaryServerListItem = (props) => {
    const { aServerWithJobList: ServersWithJobList } = props;
    const { jobAndIssues: jobsAndIssues, highestImpactOfServer } = ServersWithJobList;

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
                        {ServersWithJobList.serverName}
                    </Alert>
                </Col>
            </div>

            {jobsAndIssues.map((jobWithIssues, index) => {
                let classOfJob = 'container bg-success';
                const { highestImpactOfJob } = jobWithIssues;
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
            })}
        </div>

    )
}
export default ApplicationsSummaryServerListItem;