import {AuthAction, AuthState, AuthType} from "./authTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getData = () => {
    let isAuth: boolean = false;

    try {
        (async function () {
            const response = await AsyncStorage.getItem('isAuth')
            if (response !== null) {
                console.log(response)
            }
        })();
    } catch (e) {
        // error reading value
    }
    return isAuth
}

const initialState: AuthState = {
    isLoading: false,
    error: null,
    isAuth: getData() ? (getData()) : false,
}

export function authReducer(state = initialState, action: AuthAction): AuthState {
    switch (action.type) {
        case AuthType.FETCH_AUTH:
            return {isLoading: true, error: null, isAuth: false}
        case AuthType.FETCH_AUTH_SET:
            return {
                isLoading: false,
                error: null,
                isAuth: true
            }
        case AuthType.FETCH_AUTH_SET_ERROR:
            return {isLoading: false, error: action.payload, isAuth: false}
        default:
            return state
    }
}