import React, { Component } from 'react'
import Input from '../components/input'
import { withTranslation } from 'react-i18next';
import { faEnvelopeSquare, faLock } from '@fortawesome/free-solid-svg-icons';
import { login } from '../api/apiCalls'

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

    onClickLogin = event => {
        event.preventDefault();
        const { mail, password } = this.state;
        const creds = {
            username: mail, //basic auth username ve password olarak iki parametre alir yani maili username olarak verdim backendde username diye alacagimiz veri aslinda mail olacak
            password: password
        }
        login(creds);
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
                                <button className="btn btn-primary" onClick={this.onClickLogin}>{t('Login')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(LoginPage); //Higher Order Component denir buna.