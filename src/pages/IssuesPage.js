import React from 'react';
import IssueList from '../components/IssueComponents/IssueList';

const Issues = (props) => {
    const { aboutProps } = props.location;
    const jobImplementId = aboutProps ? aboutProps.jobImplementId : undefined;


    return (
        <div className="container">
            <IssueList jobImplementId={jobImplementId} />
        </div>
    );
};

export default Issues;