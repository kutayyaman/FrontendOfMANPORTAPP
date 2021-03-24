import React from 'react';
import IssueList from '../components/IssueComponents/IssueList';
import { Link } from 'react-router-dom'; //a etiketi yerine Link kullanma sebebimiz HashRouter yerine BrowserRouter kullanmak istersek ilerde sorun yasamamk icin yani hashrouter /# gibi bir etiket ekliyor cunku


const Issues = (props) => {
    const { aboutProps } = props.location;
    const jobImplementId = aboutProps ? aboutProps.jobImplementId : undefined;


    return (
        <div className="container">
            <IssueList jobImplementId={jobImplementId} />
            <Link className="nav-link" to={{
                pathname: `/issue/add`
            }}>
                <button type="button" className="btn btn-primary btn-lg btn-block">Add An Issue</button>
            </Link>
        </div>
    );
};

export default Issues;