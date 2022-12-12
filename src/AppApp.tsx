import React, {useState} from 'react';
import {Button, InputItem, Text, View, WhiteSpace, WingBlank} from "@ant-design/react-native";
import {useActions} from "./hooks/useActions";
import {AuthActionCreators} from "./reducers/auth/authActionCreators";
import {useTypedSelector} from "./hooks/useTypedSelector";
import Scanner from "./pages/Scanner";

const AppApp = () => {

    const {signInAction} = useActions(AuthActionCreators);
    const {isAuth} = useTypedSelector(state => state.auth)

    const [values, setValues] = useState({email: '', password: ''})

    const [visibleScanner, setVisibleScanner] = useState<boolean>(false)

    return (
        <View
            style={{
                flex: 1,
                padding: 20,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            {isAuth
                ?
                <>
                    {visibleScanner ? <Scanner/> :
                        <Button type="primary" onPress={() => setVisibleScanner(true)}>Режим сканера</Button>}
                </>
                :
                <>
                    <InputItem
                        clear
                        onChange={(value: any) => {
                            setValues({...values, email: value})
                        }}
                        placeholder="E-mail">
                    </InputItem>
                    <InputItem
                        clear
                        onChange={(value: any) => {
                            setValues({...values, password: value})
                        }}
                        placeholder="Пароль"
                        type={'password'}>
                    </InputItem>
                    <WhiteSpace/>
                    <Button type="primary" onPress={() => signInAction(values)}>Вход</Button>
                </>
            }
        </View>
    );
};

export default AppApp;