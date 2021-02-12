import { createStore } from 'redux';
import authReducer from './authReducer';

const configureStore = () => {
    const manportAuth = localStorage.getItem('manport-auth'); //localstorage'da tuttugumuz oturum bilgilerini cekiyoruz.
    let stateInLocalStorage = {
        isLoggedIn: false,
        mail: undefined,
        name: undefined,
        surname: undefined,
        password: undefined
    };

    if (manportAuth) { //eger localstorage'da bu bilgiler varsa bunlari STRING'DEN JSON'a ceviriyoruz yoksada zaten stateInLocalStorage login olmamis bir sekilde degerlere sahip olacak
        try {
            stateInLocalStorage = JSON.parse(manportAuth) //try bloguna alma amacimiz belki adam local storage'daki degeri eliyle degistirdi ve bu stringe donusturulemeyecek bir hale geldi ozaman hata almayalim diye.
        } catch (error) {

        }
    }

    const store = createStore(authReducer, stateInLocalStorage, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); //2. parametremiz baslangic state'imiz oluyor.

    store.subscribe(() => { //store'da her degisim oldugu zaman bu calisacak bir method yaziyoruz.
        localStorage.setItem('manport-auth', JSON.stringify(store.getState())); //tarayicimizin localStorage'ina bu bilgileri kayit ediyoruz ki sayfa yenilendiginde bu bilgileri kayit etmeyelim yani logout olmamasi icn bu bilgileri bu local storage'dan cekelim
    })

    return store;
}

export default configureStore;