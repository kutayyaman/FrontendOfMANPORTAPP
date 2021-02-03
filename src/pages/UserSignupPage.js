import React from 'react'
import { signup } from '../api/apiCalls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeSquare, faLock, faUser } from '@fortawesome/free-solid-svg-icons'

class UserSignupPage extends React.Component {

    state = { //bu state değişkeni Component sinifini kalittigimiz icin geliyor
        name: null,
        surname: null,
        email: null,
        password: null,
        reEnterPassword: null,
        pendingApiCall: false
    }

    onChange = (event) => {
        //const name = event.target.value;
        //const field = event.target.name;
        //bu yukardaki iki satır yerine Object Destructuring kullanalim
        const { name, value } = event.target; //buna Object Destructuring deniyor. event.target'ın name ini al name degiskenine koy value'sunu al value degiskenine koy
        this.setState({ // render methodunu tekrar cagirir bu olay flutterda vardır.
            [name]: value
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

        }
        finally {
            this.setState({ pendingApiCall: false })
        }

    }

    render() { // Component'i inherit ettiğimiz için bunu override etmek zorundayız.
        const { pendingApiCall } = this.state;
        return (
            <div className="container">
                <div className="card mt-2">
                    <div className="card-body">
                        <form>
                            <h2 className="text-center">Add User</h2>
                            <div className="form-group">
                                <label>Your name</label>
                                <div className="input-group-append">
                                    <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
                                    <input className="form-control" name="name" onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Surname</label>
                                <div className="input-group-append">
                                    <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
                                    <input className="form-control" name="surname" onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <div className="input-group-append">
                                    <span className="input-group-text"><FontAwesomeIcon icon={faEnvelopeSquare} /></span>
                                    <input className="form-control" name="email" onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <div className="input-group-append">
                                    <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                                    <input className="form-control" name="password" type="password" onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Re-enter password</label>
                                <div className="input-group-append">
                                    <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                                    <input className="form-control" name="reEnterPassword" type="password" onChange={this.onChange} />
                                </div>
                            </div>
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