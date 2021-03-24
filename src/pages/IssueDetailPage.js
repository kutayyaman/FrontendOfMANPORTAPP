import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getIssueById } from '../api/issueApiCalls';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import IssueDetailsCard from '../components/IssueComponents/IssueDetailsCard';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from '../components/Spinner';


const IssueDetailPage = props => {
    const [issue, setIssue] = useState({});
    const [notFound, setNotFound] = useState(false);

    //const { id } = props.match.params; //boyle almaktansa useParams ile almak daha iyi cunku eger App.js'de Route yaparak o hiyerarsiyi vermedigimiz bir yerden almamiz gerekirse bu sekilde aliriz.
    const { id } = useParams();

    const { t } = useTranslation();

    const pendingApiCall = useApiProgress('/api/issue/' + id);

    useEffect(() => {
        loadIssue();
    }, [id]) //id her degistiginde tetiklensin dedik

    useEffect(() => {
        setNotFound(false);
    }, [issue])

    const loadIssue = async () => {
        try {
            const response = await getIssueById(id);
            setIssue(response.data);
        } catch (error) {
            setNotFound(true);
        }
    }

    if (pendingApiCall) {
        return (
            <Spinner></Spinner>
        )
    }

    if (notFound && id != undefined) {
        return (
            <div className="container">
                <div className="alert alert-danger text-center" role="alert">
                    <FontAwesomeIcon className="mr-2" icon={faExclamationTriangle} />
                    {t('Issue Not Found')}
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            {<IssueDetailsCard issue={issue} />}
        </div>
    );
};

export default IssueDetailPage;