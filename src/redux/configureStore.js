import { createStore } from 'redux';
import authReducer from './authReducer';

const loggedInState = {
    isLoggedIn: true,
    mail: "sabitemail@gmail.com",
    name: "kutay",
    surname: "yaman",
    password: "12345678"
};

const configureStore = () => {
    return createStore(authReducer, loggedInState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); //2. parametremiz baslangic state'imiz oluyor.
}

export default configureStore;