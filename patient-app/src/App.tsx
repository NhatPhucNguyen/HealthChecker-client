import { BrowserRouter } from "react-router-dom";
import PatientApp from "./PatientApp";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <PatientApp />
            </BrowserRouter>
        </>
    );
};

export default App;
