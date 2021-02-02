import React from 'react'
import { signup } from '../api/apiCalls';

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
                <form>
                    <h2 className="text-center">Sign Up</h2>
                    <div className="form-group">
                        <label>Your name</label>
                        <input className="form-control" name="name" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label>Surname</label>
                        <input className="form-control" name="surname" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input className="form-control" name="email" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" name="password" type="password" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label>Re-enter password</label>
                        <input className="form-control" name="reEnterPassword" type="password" onChange={this.onChange} />
                    </div>
                    <div className="text-center">
                        <button disabled={pendingApiCall} className="btn btn-primary" onClick={this.onClickSignup}>Create Your Account</button>
                    </div>
                    <div className="text-center mt-2">
                        {pendingApiCall && //conditional rendering deniyor buna pendingApiCall dogruysa devamindaki calisir
                            <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>}
                    </div>

                </form>
            </div>

        );
    }

}

export default UserSignupPage;