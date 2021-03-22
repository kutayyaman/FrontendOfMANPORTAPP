import React from 'react';
import { Col, Row, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom'; //a etiketi yerine Link kullanma sebebimiz HashRouter yerine BrowserRouter kullanmak istersek ilerde sorun yasamamk icin yani hashrouter /# gibi bir etiket ekliyor cunku


const JobWithIssuesComponent = (props) => {
    const { jobWithIssues } = props;
    const { highestImpactOfJob, jobId } = jobWithIssues;

    let classOfJob = 'container bg-success';
    if (highestImpactOfJob === 'LOW') {
        classOfJob = 'container bg-primary';
    } else if (highestImpactOfJob === 'MEDIUM') {
        classOfJob = 'container bg-warning'
    } else if (highestImpactOfJob === 'HIGH') {
        classOfJob = 'container bg-danger';
    }

    return (
        <Link className="nav-link" to={{
            pathname: "/issues",
            aboutProps: {
                jobImplementId: jobId
            }
        }}>
            <Col xs={4} className="container text-white" >
                <div className={classOfJob}>
                    <Alert className="text-center text-wrap">
                        {jobWithIssues.jobName}
                    </Alert>
                </div>
            </Col>
        </Link>
    )

}
export default JobWithIssuesComponent;