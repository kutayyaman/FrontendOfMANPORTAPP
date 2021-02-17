import React from 'react';

const Top3IssueLıstItem = (props) => {
    const { issue } = props;
    const { impactType, createdDate, applicationShortName, countryName, serverName, jobName } = issue;
    let textColorClass = undefined;
    if (impactType === 'HIGH') {
        textColorClass = "text-danger";
    }
    else if (impactType === 'MEDIUM') {
        textColorClass = "text-warning"
    }
    else if (impactType === 'LOW') {
        textColorClass = "text-info"
    }
    return (
        <div>
            {`${createdDate} -->`} <span className={textColorClass}>{`${applicationShortName} - ${countryName} ${serverName}`}</span> {` : ${jobName}`}
        </div>
    );
};

export default Top3IssueLıstItem;