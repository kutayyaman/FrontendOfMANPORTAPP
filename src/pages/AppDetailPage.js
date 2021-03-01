import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from '../components/Spinner';
import AppDetailsCard from '../components/AppDetailPageComponents/AppDetailCard';

const AppDetailPage = props => {
    const [issue, setIssue] = useState({});
    const [notFound, setNotFound] = useState(false);

    return (
        <div>
            <AppDetailsCard></AppDetailsCard>
        </div>
    )

};
export default AppDetailPage;