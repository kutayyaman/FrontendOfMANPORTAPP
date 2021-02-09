import React, { Component } from 'react'

export const Authentication = React.createContext();

class AuthenticationContext extends Component {

    state = {
        isLoggedIn: false,
        mail: undefined,
        name: undefined,
        surname: undefined,
        password: undefined
    };

    onLoginSuccess = (authState) => {
        this.setState({
            mail: authState.mail,
            name: authState.name,
            surname: authState.surname,
            password: authState.password,
            isLoggedIn: true
        });
        /*veya asagidaki gibi yapsaydikta olurdu kendisi authState icerisindeki name'i state'deki name'ye falan atayacakti.
        this.setState({
            ...authState,
            isLoggedIn:true
        })
        */

    };

    onLogoutSuccess = () => {
        this.setState({
            mail: undefined,
            name: undefined,
            surname: undefined,
            password: undefined,
            isLoggedIn: false
        });
    };

    render() {
        return (
            <Authentication.Provider value={{
                state: { ...this.state },
                onLoginSuccess: this.onLoginSuccess,
                onLogoutSuccess: this.onLogoutSuccess
            }}>
                {this.props.children}
            </Authentication.Provider>
        )
    }
}

export default AuthenticationContext;