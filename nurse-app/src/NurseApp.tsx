import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    createHttpLink,
} from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import PatientList from "./components/PatientList";
import VitalSignList from "./components/VitalSignList";
import VitalSignForm from "./components/VitalSignForm";
import Patient from "./pages/Patient";
import DailyTipsList from "./components/DailyTipsList";
import DailyTipForm from "./components/DailyTipForm";
const link = createHttpLink({
    uri: "http://localhost:5000/graphql",
    credentials: "include",
});
const client = new ApolloClient({
    link,
    cache: new InMemoryCache({
        addTypename: false,
    }),
});
const NurseApp = () => {
    return (
        <ApolloProvider client={client}>
            <Routes>
                <Route path="/" element={<PatientList />} />
                <Route path=":patientId">
                    <Route index element={<Patient />} />
                    <Route path="vitalSigns">
                        <Route index element={<VitalSignList />} />
                        <Route path="add" element={<VitalSignForm />} />
                        <Route
                            path="edit/:vitalSignId"
                            element={<VitalSignForm isUpdate />}
                        />
                    </Route>
                    <Route path="dailyTips">
                        <Route index element={<DailyTipsList />} />
                        <Route path="add" element={<DailyTipForm />} />
                        <Route
                            path="edit/:dailyTipId"
                            element={<DailyTipForm isUpdate />}
                        />
                    </Route>
                </Route>
            </Routes>
        </ApolloProvider>
    );
};

export default NurseApp;
