import React from 'react';
import { signup } from '../api/apiCalls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeSquare, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import Input from '../components/input';
import { withTranslation } from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress'

class UserSignupPage extends React.Component {

    state = { //bu state değişkeni Component sinifini kalittigimiz icin geliyor
        name: null,
        surname: null,
        email: null,
        password: null,
        reEnterPassword: null,
        pendingApiCall: false,
        errors: {},
        message: null
    }

    onChange = (event) => {
        const { t } = this.props;
        //const name = event.target.value;
        //const field = event.target.name;
        //bu yukardaki iki satır yerine Object Destructuring kullanalim
        const { name, value } = event.target; //buna Object Destructuring deniyor. event.target'ın name ini al name degiskenine koy value'sunu al value degiskenine koy
        const errors = { ...this.state.errors } //... demek kopyasini olustur demek yani errors'un kopyasini olusturduk
        errors[name] = undefined;
        if (name === "password" || name === "reEnterPassword") {
            if (name === "password" && value !== this.state.reEnterPassword) {
                errors.reEnterPassword = t('Passwords must match')
            }
            else if (name === "reEnterPassword" && value !== this.state.password) {
                errors.reEnterPassword = t('Passwords must match')
            } else {
                errors.reEnterPassword = undefined;
            }
        }
        this.setState({ // render methodunu tekrar cagirir bu olay flutterda vardır.
            [name]: value,
            errors: errors //yukardaki errors aslinda state'deki errors'un kopyasi alinarak olusturulmustu simdi onu state icindeki errors'a koyduk
        });
    }

    onClickSignup = async event => {
        event.preventDefault(); //normalde browser formdaki bilgileri alip bize getiriyor bazi isler yapiyor bu methodu cagirarak browser'in bizim icin biseyler yapmasini engelliyoruz

        const { name, surname, email, password } = this.state;
        const body = {
            name: name,
            surname: surname,
            email: email,
            password: password
        }
        this.setState({ pendingApiCall: true, message: null });

        try {
            const response = await signup(body);
            this.setState({ message: response.data.message })
        }
        catch (error) {
            if (error.response.data.validationErrors) { //validationErrors undefined degilse
                this.setState({ errors: error.response.data.validationErrors })
            }
        }
        finally {
            this.setState({ pendingApiCall: false })
        }

    }

    render() { // Component'i inherit ettiğimiz için bunu override etmek zorundayız.
        const { pendingApiCall, errors, message } = this.state;
        const { name, surname, email, password, reEnterPassword } = errors;
        const { t } = this.props;
        return (
            <div className="container">
                <div className="card mt-2">
                    <div className="card-body">
                        <form>
                            <h2 className="text-center">{t('Add User')}</h2>
                            <Input name="name" label={t("Name")} error={name} onChange={this.onChange} iconName={faUser}></Input>
                            <Input name="surname" label={t("Surname")} error={surname} onChange={this.onChange} iconName={faUser}></Input>
                            <Input name="email" label={t("Email")} error={email} onChange={this.onChange} iconName={faEnvelopeSquare}></Input>
                            <Input name="password" label={t("Password")} error={password} onChange={this.onChange} type="password" iconName={faLock}></Input>
                            <Input name="reEnterPassword" label={t("Re-Enter-Password")} error={reEnterPassword} onChange={this.onChange} type="password" iconName={faLock}></Input>
                            <ButtonWithProgress onClick={this.onClickSignup} disabled={pendingApiCall || reEnterPassword !== undefined} pendingApiCall={pendingApiCall} text={t('Add User')} loading={t('Loading...')} />
                            {message && <div class="alert alert-success" role="alert">
                                {message}
                            </div>}
                        </form>
                    </div>
                </div>
            </div>

        );
    }

}

export default withTranslation()(UserSignupPage); //Higher Order Component denir buna.