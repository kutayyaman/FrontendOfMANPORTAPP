import React, { Component } from 'react'
import Input from '../components/input'
import { withTranslation } from 'react-i18next';
import { faEnvelopeSquare, faLock } from '@fortawesome/free-solid-svg-icons';
import { login } from '../api/apiCalls';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { withApiProgress } from '../shared/ApiProgress';
import { connect } from 'react-redux';
import { loginSuccess } from '../redux/authActions';

class LoginPage extends Component {

    state = {
        mail: null,
        password: null,
        error: null
    };

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
        const { push } = this.props.history; //bu history'i bize Route componenti sagliyor bu Route componentini App.js icerisinde kullanmistik
        this.setState({
            error: null
        })
        const creds = {
            username: mail, //basic auth username ve password olarak iki parametre alir yani maili username olarak verdim backendde username diye alacagimiz veri aslinda mail olacak
            password: password
        }
        try {
            const response = await login(creds);
            const { name, surname } = response.data;
            const authState = {
                mail: mail,
                name: name,
                surname: surname,
                password: password
            }
            this.props.onLoginSuccess(authState);
            push('/');
        } catch (errorFromBackend) {
            this.setState({
                error: errorFromBackend.response.data.message
            })
        }

    }

    render() {
        const { t, pendingApiCall } = this.props;
        const { error, mail, password } = this.state;
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
const LoginPageWithTranslation = withTranslation()(LoginPage);
const LoginPageWithApiProgress = withApiProgress(LoginPageWithTranslation, '/api/auth');

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginSuccess: (authState) => {
            return dispatch(loginSuccess(authState));
        }
    }
}

export default connect(null, mapDispatchToProps)(LoginPageWithApiProgress); //Higher Order Component denir buna.
