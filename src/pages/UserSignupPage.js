import React from 'react';
import { signup } from '../api/apiCalls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeSquare, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import Input from '../components/input';

class UserSignupPage extends React.Component {

    state = { //bu state değişkeni Component sinifini kalittigimiz icin geliyor
        name: null,
        surname: null,
        email: null,
        password: null,
        reEnterPassword: null,
        pendingApiCall: false,
        errors: {}
    }

    onChange = (event) => {
        //const name = event.target.value;
        //const field = event.target.name;
        //bu yukardaki iki satır yerine Object Destructuring kullanalim
        const { name, value } = event.target; //buna Object Destructuring deniyor. event.target'ın name ini al name degiskenine koy value'sunu al value degiskenine koy
        const errors = { ...this.state.errors } //... demek kopyasini olustur demek yani errors'un kopyasini olusturduk
        errors[name] = undefined;
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
        this.setState({ pendingApiCall: true });

        try {
            const response = await signup(body);
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
        const { pendingApiCall, errors } = this.state;
        const { name, surname, email, password, reEnterPassword } = errors;
        return (
            <div className="container">
                <div className="card mt-2">
                    <div className="card-body">
                        <form>
                            <h2 className="text-center">Add User</h2>
                            <Input name="name" label="name" error={name} onChange={this.onChange}></Input>
                            <Input name="surname" label="surname" error={surname} onChange={this.onChange}></Input>
                            <Input name="email" label="email" error={email} onChange={this.onChange}></Input>
                            <Input name="password" label="password" error={password} onChange={this.onChange}></Input>
                            <Input name="reEnterPassword" label="reEnterPassword" error={reEnterPassword} onChange={this.onChange}></Input>

                            <div className="text-center">
                                <button disabled={pendingApiCall} className="btn btn-primary" onClick={this.onClickSignup}>Add User</button>
                            </div>
                            <div className="text-center mt-2">
                                {pendingApiCall && //conditional rendering deniyor buna pendingApiCall dogruysa devamindaki calisir
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>}
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        );
    }

}

export default UserSignupPage;