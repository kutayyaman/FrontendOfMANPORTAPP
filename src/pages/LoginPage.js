import React, { Component } from 'react'
import Input from '../components/input'
import { withTranslation } from 'react-i18next';
import { faEnvelopeSquare, faLock } from '@fortawesome/free-solid-svg-icons';

class LoginPage extends Component {
    state = {
        mail: null,
        password: null
    }

    onChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        const { t } = this.props;
        return (
            <div className="container">
                <div className="card mt-2">
                    <div className="card-body">
                        <h2 className="text-center">{t('Login')}</h2>
                        <form>
                            <Input label={t("Email")} name="mail" iconName={faEnvelopeSquare} onChange={this.onChange} />
                            <Input label={t("Password")} name="password" type="password" iconName={faLock} onChange={this.onChange} />
                            <div className="text-center">
                                <button className="btn btn-primary">{t('Login')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(LoginPage); //Higher Order Component denir buna.