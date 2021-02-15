import React, { Component } from 'react';
import { getTop3Issues } from '../api/apiCalls';
import { withTranslation } from 'react-i18next';

class Top3IssuesLıst extends Component {
    state = {
        issues: []
    }

    componentDidMount() {
        getTop3Issues().then(response => {
            this.setState({
                issues: response.data
            })
        })
    }

    render() {
        const { issues } = this.state;
        const { t } = this.props;
        return (
            <div className="container">
                <div className="card bg-light w-50 container">
                    <h6>
                        {t('Last Issues')}
                    </h6>
                    {issues.map((issue, index) => { //burada span'in rengi issue'nin sorununun ciddilige gore farklilik gosterecek sekilde ayarlanmali
                        return (
                            <div key={issue.id}>
                                {`${issue.createdDate} -->`} <span className="text-danger">{`${issue.applicationShortName} - ${issue.applicationFullName}`}</span> {` : ${issue.jobName}`}
                            </div>)
                    })}
                </div>
            </div>
        )
    }
}

export default withTranslation()(Top3IssuesLıst);