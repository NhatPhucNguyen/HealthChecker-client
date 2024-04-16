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
import DailyInformation from "./components/DailyInformation";
import DailyInformationForm from "./components/DailyInformationForm";
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
        <ApolloProvider client={client}>
            <ModalProvider>
                <SubNav />
                <Routes>
                    <Route path="/" index element={<SymptomsList />} />
                    <Route path="/fitnessGames" element={<FitnessGames />} />
                    <Route path="/dailyInformation">
                        <Route index element={<DailyInformation />} />
                        <Route path="add" element={<DailyInformationForm />} />
                        <Route
                            path="edit/:dailyInformationId"
                            element={<DailyInformationForm isUpdate />}
                        />
                    </Route>
                </Routes>
            </ModalProvider>
        </ApolloProvider>
    );
};

export default PatientApp;
