import React, { useState } from 'react';
import { signup } from '../api/apiCalls';
import { faEnvelopeSquare, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import Input from '../components/input';
import { useTranslation } from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress'
import { useApiProgress } from '../shared/ApiProgress';

const UserSignupPage = (props) => {

    const [form, setForm] = useState({
        name: null,
        surname: null,
        email: null,
        password: null,
        reEnterPassword: null
    });
    const [errors, setErrors] = useState({}); //baslangic degeri olarak obje dedik dikkat!
    const [message, setMessage] = useState();


    const onChange = (event) => {
        const { name, value } = event.target; //buna Object Destructuring deniyor. event.target'ın name ini al name degiskenine koy value'sunu al value degiskenine koy

        const errorsCopy = { ...errors } //... demek kopyasini olustur demek yani errors'un kopyasini olusturduk cunku ben setErrors diyince yine errors'u verirsem adresleri ayni oldugu icin degisiklik yok sanacak yapmayacak set etme isini
        errorsCopy[name] = undefined;
        setErrors(errorsCopy);

        /*const formCopy = { ...form };
        formCopy[name] = value;
        setForm(formCopy);*/ //alttaki sekilde de yapabiliriz bu olayi
        setForm((previousForm) => { //setErrors'ude istersek boyle yapabiliriz ama ornek olsun diye oyle biraktim onu
            return {
                ...previousForm,
                [name]: value
            }
        }); //setForm'a fonksiyonda verebiliriz bu fonksiyon o degiskenin onceki halini parametre olarak alir ve yeni halini geri dondurmeni ister
    };

    const onClickSignup = async event => {
        event.preventDefault(); //normalde browser formdaki bilgileri alip bize getiriyor bazi isler yapiyor bu methodu cagirarak browser'in bizim icin biseyler yapmasini engelliyoruz

        const { name, surname, email, password } = form;
        const body = {
            name: name,
            surname: surname,
            email: email,
            password: password
        }

        try {
            const response = await signup(body);
            setMessage(response.data.message);
        }
        catch (error) {
            if (error.response.data.validationErrors) { //validationErrors undefined degilse
                setErrors(error.response.data.validationErrors);
                setMessage(undefined);
            }
        }
        finally {
        }

    }

    const { t } = useTranslation();
    const { name: nameError, surname: surnameError, email: emailError, password: passwordError } = errors;
    //yukarda biz name, surname gibi degiskenlere zaten bu fonksiyon icerisinde sahip oldugumuz icin error icerisindeki name degiskenini nameError isimli bir degiskene ata demis olduk
    const pendingApiCall = useApiProgress('/api/users');

    let reEnterPasswordError;
    if (form.password !== form.reEnterPassword) {
        reEnterPasswordError = t('Passwords must match');
    }

    return (
        <div className="container">
            <div className="card mt-2">
                <div className="card-body">
                    <form>
                        <h2 className="text-center">{t('Add User')}</h2>
                        <Input name="name" label={t("Name")} error={nameError} onChange={onChange} iconName={faUser}></Input>
                        <Input name="surname" label={t("Surname")} error={surnameError} onChange={onChange} iconName={faUser}></Input>
                        <Input name="email" label={t("Email")} error={emailError} onChange={onChange} iconName={faEnvelopeSquare}></Input>
                        <Input name="password" label={t("Password")} error={passwordError} onChange={onChange} type="password" iconName={faLock}></Input>
                        <Input name="reEnterPassword" label={t("Re-Enter-Password")} error={reEnterPasswordError} onChange={onChange} type="password" iconName={faLock}></Input>
                        <ButtonWithProgress onClick={onClickSignup} disabled={pendingApiCall || reEnterPasswordError !== undefined} pendingApiCall={pendingApiCall} text={t('Add User')} loading={t('Loading...')} />
                        {message && <div class="alert alert-success" role="alert">
                            {message}
                        </div>}
                    </form>
                </div>
            </div>
        </div>

    );
};

export default UserSignupPage; 