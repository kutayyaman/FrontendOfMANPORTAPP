import React from 'react';

const IssueListItem = (props) => {

    const { issue } = props;
    const { name } = issue;
    return (
        <div className="list-group-item list-group-item-action">
            {name}
        </div>
    );
};

export default IssueListItem;