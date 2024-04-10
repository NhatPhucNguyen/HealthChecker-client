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
                <Route
                    path="/:patientId/vitalSigns"
                    element={<VitalSignList />}
                />
                <Route path="/:patientId/vitalSigns/add" element={<VitalSignForm />} />
            </Routes>
        </ApolloProvider>
    );
};

export default NurseApp;
