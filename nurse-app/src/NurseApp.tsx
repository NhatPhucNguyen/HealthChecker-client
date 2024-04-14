import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    createHttpLink,
} from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import AlertList from "./components/AlertList";
import DailyTipForm from "./components/DailyTipForm";
import DailyTipsList from "./components/DailyTipsList";
import PatientList from "./components/PatientList";
import VitalSignForm from "./components/VitalSignForm";
import VitalSignList from "./components/VitalSignList";
import Patient from "./pages/Patient";
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
                <Route path="/:patientId" element={<Patient />}>
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
                    <Route path="alerts">
                        <Route index element={<AlertList />} />
                    </Route>
                </Route>
            </Routes>
        </ApolloProvider>
    );
};

export default NurseApp;
