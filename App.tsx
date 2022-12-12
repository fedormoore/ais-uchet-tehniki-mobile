import {Provider} from "react-redux";
import {store} from "./src/store";
import AppApp from "./src/AppApp";

export default function App() {

    return (
        <Provider store={store}>
            <AppApp/>
        </Provider>
    );
}
