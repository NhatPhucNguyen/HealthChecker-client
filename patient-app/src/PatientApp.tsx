import {
    createHttpLink,
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import SubNav from "./components/SubNav";
import SymptomsList from "./components/SymptomsList";
import FitnessGames from "./components/FitnessGames";
import ModalProvider from "./context/ModalContext";
const PatientApp = () => {
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
    return (
        <ModalProvider>
            <ApolloProvider client={client}>
                <SubNav />
                <Routes>
                    <Route path="/symptoms" element={<SymptomsList />} />
                    <Route path="/fitnessGames" element={<FitnessGames />} />
                </Routes>
            </ApolloProvider>
        </ModalProvider>
    );
};

export default PatientApp;
