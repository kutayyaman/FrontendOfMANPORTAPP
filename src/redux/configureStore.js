import { createStore } from 'redux';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';
import { setAuthorizationHeader } from '../api/apiCalls';

const secureLs = new SecureLS();

const getStateFromLocalStorage = () => {
    //const manportAuth = localStorage.getItem('manport-auth'); //localstorage'da tuttugumuz oturum bilgilerini cekiyoruz.
    const manportAuth = secureLs.get('manport-auth'); //okunulmaz bir halde kayit etmek icin securels kutuphanesini kullandik
    let stateInLocalStorage = {
        isLoggedIn: false,
        mail: undefined,
        name: undefined,
        surname: undefined,
        password: undefined
    };

    if (manportAuth) { //eger localstorage'da bu bilgiler varsa bunlari STRING'DEN JSON'a ceviriyoruz yoksada zaten stateInLocalStorage login olmamis bir sekilde degerlere sahip olacak
        /*try {
            stateInLocalStorage = JSON.parse(manportAuth) //try bloguna alma amacimiz belki adam local storage'daki degeri eliyle degistirdi ve bu stringe donusturulemeyecek bir hale geldi ozaman hata almayalim diye.
        } catch (error) {

        }*/
        return manportAuth; //yukarsida yorum satirina aldim cunku artik bu json donusum islemlerini securels kutuphanesi kendisi yapiyor
    }
    return stateInLocalStorage;
}

const updateStateInLocalStorage = newState => {
    //localStorage.setItem('manport-auth', JSON.stringify(newState)); //tarayicimizin localStorage'ina bu bilgileri kayit ediyoruz ki sayfa yenilendiginde bu bilgileri kayit etmeyelim yani logout olmamasi icn bu bilgileri bu local storage'dan cekelim
    secureLs.set('manport-auth', newState);//okunmaz bir sekilde kayit etmek icin securels kutuphanesini kullandik
}

const configureStore = () => {
    const initialState = getStateFromLocalStorage();
    const { mail, password, isLoggedIn } = initialState;
    setAuthorizationHeader({ mail, password, isLoggedIn }); // bunu yapalimki her istek yolladigimizda authorization bilgilerini header'a koymak zorunda olmayalim.
    const store = createStore(authReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); //2. parametremiz baslangic state'imiz oluyor.

    store.subscribe(() => { //store'da her degisim oldugu zaman bu calisacak bir method yaziyoruz.
        updateStateInLocalStorage(store.getState());
        setAuthorizationHeader(store.getState()); //bunuda yapalimki storedaki kullanici bilgileri her degistiginde headerimizdaki authrozation bilgileride degissin yani guncel kalsin
    })

    return store;
}

export default configureStore;