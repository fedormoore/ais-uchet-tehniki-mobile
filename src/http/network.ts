import AsyncStorage from "@react-native-async-storage/async-storage";

const SERVER = "http://192.168.68.114:8080";
const VER = "/api/v1"

const getToken = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken')
    if (accessToken !== null) {
        return {"Authorization": "Bearer " + accessToken, "Content-Type": "application/json"}
    } else {
        return {"Authorization": "", "Content-Type": "application/json"};
    }
}

interface OptionsValues {
    url?: string;
    body?: string;
    method?: string;
    params?: any;
}

export async function Request(options: OptionsValues) {
    try {
        const response = await fetch(SERVER + VER + options.url + '/?' + new URLSearchParams(options.params).toString(), {
            body: options.body,
            method: options.method,
            headers: await getToken()
        });

        const json = await response.json();

        if (!response.ok) {
            throw (json);
        }

        return {
            isOk: true,
            data: json
        };
    } catch (e: any) {
        console.log(e)
        if (e.status === 401 || e.status === 403) {
            // checkAuth(options)
            //     .then((response: any) => {
            //         return {
            //             isOk: true,
            //             data: response
            //         };
            //     })
        }
        return {
            isOk: false,
            data: e.message
        };
    }
}