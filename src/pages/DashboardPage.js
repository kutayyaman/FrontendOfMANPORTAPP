import React from 'react';
import Top3IssuesLıst from '../components/Top3IssuesComponents/Top3IssuesLıst';
import ApplicationsSummaryList from '../components/ApplicationsSummaryComponents/ApplicationsSummaryList';

const DashboardPage = () => {
    return (
        <div className="container">
            <Top3IssuesLıst />
            <ApplicationsSummaryList />
        </div>
    );
};

export default DashboardPage;