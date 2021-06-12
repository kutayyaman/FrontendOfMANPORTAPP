import React, { useState, useEffect } from 'react';
import { getApplicationsSummary } from '../../api/appApiCalls';
import { useTranslation } from 'react-i18next';
import ApplicationsSummaryListItem from './ApplicationsSummaryListItem';
import { useApiProgress } from '../../shared/ApiProgress';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Spinner from '../Spinner';
import SockJS from 'sockjs-client';
import Alarm from '../../audio/Alarm.mp3';
import {Howl, Howler} from "howler";

const ApplicationsSummaryList = () => {
    const [summaries, setsummaries] = useState([]);
    const [loadFailure, setloadFailure] = useState(false);

    const pendingApiCall = useApiProgress('/api/applicationsummary'); //bu useEffect'den once yazilmali yoksa calismaz cunku useEffect'in altinda bir yere yazsaydik istek atildiktan sonra bu calisirdi ve gec kalmis olurduk
    const { t } = useTranslation();

    var stompClient = null;
    var baseAddress = 'http://localhost:8080';
    var Stomp = require('stompjs');

    useEffect(async () => {
        try {
            setloadFailure(false);
            const response = await getApplicationsSummary();
            setsummaries(response.data.applicationsSummary);
            connect();
        } catch (error) {
            setloadFailure(true);
            disconnect();
        }
    }, []);

    const connect = async () => {
            var socket = new SockJS(baseAddress + '/issueTracking');
            stompClient = Stomp.over(socket);
            stompClient.connect({}, function(frame) {
                console.log('Connected: ' + frame);
                stompClient.subscribe('/issueTrackingBroker', function (message) {
                    console.log(message);
                    if(JSON.parse(message.body).lineStopRisk===true){
                        if(JSON.parse(message.body).impact==='MEDIUM' || JSON.parse(message.body).impact==='HIGH'){
                            const sound = new Howl({
                                src: [Alarm]
                            })
                            sound.play();
                            console.log("girdiiii")
                        }
                    }
                    handleReceivedMessage(JSON.parse(message.body));
                });
            });
    }

    const disconnect = async () => {
        if(stompClient != null) {
            stompClient.disconnect();
        }
        console.log("Disconnected")
   }

    const handleReceivedMessage = async (message) => {
        try {
            setloadFailure(false);
            const response = await getApplicationsSummary();
            setsummaries(response.data.applicationsSummary);
            connect();
        } catch (error) {
            setloadFailure(true);
            disconnect();
        }
        console.log(message);
    }




    let returnView;
    returnView =
        <div>
            {summaries.map((summary, index) => {
                return (
                    <ApplicationsSummaryListItem summary={summary} key={summary.appId} />
                )
            })}
            <div className="container text-center mt-2">
                {pendingApiCall && //conditional rendering deniyor buna pendingApiCall dogruysa devamindaki calisir
                    <Spinner></Spinner>
                }
                {loadFailure == true &&
                    <div className="text-center text-danger">{t('Something Went Wrong')}</div>}
            </div>
        </div>

    Howler.volume(1)
    return (
        <div>
            {returnView}
        </div>
    )
}

export default ApplicationsSummaryList;