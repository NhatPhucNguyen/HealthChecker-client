import { Box } from "@mui/material";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
const AuthApp = lazy(() => import("authApp/AuthApp"));
const NurseApp = lazy(() => import("nurseApp/NurseApp"));
const PatientApp = lazy(() => import("patientApp/PatientApp"));
const App = () => {
    return (
        <>
            <Box component={"main"} marginTop={"5rem"} width={"100%"}>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route
                            path="/*"
                            element={
                                <Suspense fallback={<Loader />}>
                                    <AuthApp />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/nurse/*"
                            element={
                                <Suspense fallback={<Loader />}>
                                    <NurseApp />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/patient/*"
                            element={
                                <Suspense fallback={<Loader />}>
                                    <PatientApp />
                                </Suspense>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </Box>
        </>
    );
};

export default App;
