import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import PublicRoute from "./components/PublicRoute";
const client = new ApolloClient({
    uri:
        (import.meta.env.VITE_API_URL as string) ||
        "http://localhost:5001/graphql",
    cache: new InMemoryCache(),
});
const AuthApp = () => {
    return (
        <ApolloProvider client={client}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <PublicRoute>
                    <Routes>
                        <Route path="/" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />
                    </Routes>
                </PublicRoute>
            </LocalizationProvider>
        </ApolloProvider>
    );
};

export default AuthApp;
