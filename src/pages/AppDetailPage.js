import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from '../components/Spinner';
import AppDetailsCard from '../components/AppDetailPageComponents/AppDetailCard';
import AppLinks from '../components/AppDetailPageComponents/AppLinks';
import FactoryManagementComponent from '../components/AppDetailPageComponents/FactoryManagementComponent';
import IssueManagementByAppCard from '../components/AppDetailPageComponents/IssueManagementByAppCard';

const AppDetailPage = props => {
    const [issue, setIssue] = useState({});
    const [notFound, setNotFound] = useState(false);
    const { id, disabled } = useParams();
    return (
        <div>
            <AppDetailsCard id={id} disabled={disabled}></AppDetailsCard>
            <AppLinks id={id} disabled={disabled}></AppLinks>
            <FactoryManagementComponent id={id}></FactoryManagementComponent>
            <IssueManagementByAppCard id={id}></IssueManagementByAppCard>
        </div>
    )

};
export default AppDetailPage;