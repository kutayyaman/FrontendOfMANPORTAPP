import React, { Component } from 'react'
import Input from '../components/input'
import { withTranslation } from 'react-i18next';
import { faEnvelopeSquare, faLock } from '@fortawesome/free-solid-svg-icons';
import { login } from '../api/apiCalls'
import axios from 'axios';
import ButtonWithProgress from '../components/ButtonWithProgress'

class LoginPage extends Component {
    state = {
        mail: null,
        password: null,
        error: null,
        pendingApiCall: null
    };

    componentDidMount() {//component ilk yuklendigi zaman calisan bir methoddur yani LoginPage componenti yuklenirken
        axios.interceptors.request.use((request) => {
            this.setState({ pendingApiCall: true })
            return request;
        });

        axios.interceptors.response.use((response) => {
            this.setState({ pendingApiCall: false });
            return response;
        }, (error) => {
            this.setState({ pendingApiCall: false });
            throw error;
        })
    }

    onChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            error: null
        })
    }

    onClickLogin = async event => {
        event.preventDefault();
        const { mail, password, error } = this.state;
        this.setState({
            error: null
        })
        const creds = {
            username: mail, //basic auth username ve password olarak iki parametre alir yani maili username olarak verdim backendde username diye alacagimiz veri aslinda mail olacak
            password: password
        }
        try {
            await login(creds);
        } catch (errorFromBackend) {
            this.setState({
                error: errorFromBackend.response.data.message
            })
        }

    }

    render() {
        const { t } = this.props;
        const { error, mail, password, pendingApiCall } = this.state;
        const buttonDisabled = !mail || !password;
        return (
            <div className="container">
                <div className="card mt-2">
                    <div className="card-body">
                        <h2 className="text-center">{t('Login')}</h2>
                        <form>
                            <Input label={t("Email")} name="mail" iconName={faEnvelopeSquare} onChange={this.onChange} />
                            <Input label={t("Password")} name="password" type="password" iconName={faLock} onChange={this.onChange} />
                            <ButtonWithProgress onClick={this.onClickLogin} disabled={buttonDisabled || pendingApiCall} pendingApiCall={pendingApiCall} text={t('Login')} loading={t('Loading...')} />
                            {error && <div className="alert alert-warning mt-1">
                                {error}
                            </div>}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(LoginPage); //Higher Order Component denir buna.