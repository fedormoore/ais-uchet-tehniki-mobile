export enum AuthType {
    FETCH_AUTH= 'FETCH_AUTH',
    FETCH_AUTH_SET= 'FETCH_SET_AUTH',
    FETCH_AUTH_SET_ERROR='FETCH_AUTH_SET_ERROR'
}

export interface AuthState {
    isLoading: boolean;
    error: null | string;
    isAuth: boolean;
}

interface FetchAuthAction {
    type: AuthType.FETCH_AUTH;
}

interface FetchAuthSetAction {
    type: AuthType.FETCH_AUTH_SET;
}

interface FetchAuthErrorAction {
    type: AuthType.FETCH_AUTH_SET_ERROR;
    payload: string;
}

export type AuthAction = FetchAuthAction | FetchAuthSetAction | FetchAuthErrorAction
