import {AuthAction, AuthType} from "./authTypes";
import {Dispatch} from "redux";

import {Request} from "../../http/network";
import {SignInModel} from "../../models/auth/SignInModel";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface resultSignUp {
    isOk?: boolean;
}

const storeData = async (value:{isAuth:string, accessToken:string}) => {
    try {
        await AsyncStorage.setItem('isAuth', value.isAuth);
        await AsyncStorage.setItem('accessToken', value.accessToken)
    } catch (e) {
        // saving error
    }
}

export const AuthActionCreators = {
    signInAction: (values: SignInModel) => async (dispatch: Dispatch<AuthAction>) => {
        dispatch({type: AuthType.FETCH_AUTH})
        try {
            Request({
                url: "/auth/signIn",
                method: "POST",
                body: JSON.stringify(values),
            })
                .then((response: any) => {
                    if (response.isOk) {

                        storeData({isAuth:"true", accessToken:response.data.accessToken})

                        dispatch({type: AuthType.FETCH_AUTH_SET})
                    } else {
                        dispatch({type: AuthType.FETCH_AUTH_SET_ERROR, payload: response.data})
                    }
                })
        } catch (e) {
            dispatch({type: AuthType.FETCH_AUTH_SET_ERROR, payload: 'Произошла ошибка'})
        }
    }
}