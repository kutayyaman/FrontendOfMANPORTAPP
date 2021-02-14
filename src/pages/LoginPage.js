import React, { useEffect, useState } from 'react'
import Input from '../components/input'
import { useTranslation } from 'react-i18next';
import { faEnvelopeSquare, faLock } from '@fortawesome/free-solid-svg-icons';
import { login } from '../api/apiCalls';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authActions';

const LoginPage = (props) => {

    const [mail, setMail] = useState();
    const [password, setpassword] = useState();
    const [error, setError] = useState();

    const dispatch = useDispatch(); //action olusturmak icin kullanicaz yani redux ile alakali

    useEffect(() => { //mail veya passwordde bir degisiklik olursa error'u undefined yap dedik.
        setError(undefined);
    }, [mail, password]);


    const onClickLogin = async event => {
        event.preventDefault();
        const { push } = props.history; //bu history'i bize Route componenti sagliyor bu Route componentini App.js icerisinde kullanmistik
        setError(undefined);
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
            dispatch(loginSuccess(authState));
            push('/');
        } catch (errorFromBackend) {
            setError(errorFromBackend.response.data.message);
        }

    };

    const { t } = useTranslation();
    const pendingApiCall = useApiProgress('/api/auth');
    const buttonDisabled = !mail || !password;
    return (
        <div className="container">
            <div className="card mt-2">
                <div className="card-body">
                    <h2 className="text-center">{t('Login')}</h2>
                    <form>
                        <Input label={t("Email")} iconName={faEnvelopeSquare} onChange={(event) => { setMail(event.target.value); }} />
                        <Input label={t("Password")} type="password" iconName={faLock} onChange={(event) => { setpassword(event.target.value) }} />
                        <ButtonWithProgress onClick={onClickLogin} disabled={buttonDisabled || pendingApiCall} pendingApiCall={pendingApiCall} text={t('Login')} loading={t('Loading...')} />
                        {error &&
                            <div className="alert alert-warning mt-1">
                                {error}
                            </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    )

}
export default LoginPage; 
