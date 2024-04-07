import { BrowserRouter } from "react-router-dom";
import AuthApp from "./AuthApp";

const App = () => {
    return (
        <BrowserRouter>
            <AuthApp />
        </BrowserRouter>
    );
};

export default App;
