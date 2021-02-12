const loggedOutState = {
    isLoggedIn: false,
    mail: undefined,
    name: undefined,
    surname: undefined,
    password: undefined
};

//eger createStore yapilirken state olarak herhangi bir sey verilmezse default olarak loggedOutState verilsin demis olduk ilk parametrede. Yani const store = createStore(reducer); store olustururken ikinci parametreyi vermezsek default olarak kendisi atayacak.
const authReducer = (state = { ...loggedOutState }, action) => { //reducer dedigimiz sey son state'i ve aksiyonu alarak bize guncel state'i uretip donecek olan bir fonksiyondur
    if (action.type === 'logout-success') {
        return loggedOutState;
    }
    return state;
};

export default authReducer;