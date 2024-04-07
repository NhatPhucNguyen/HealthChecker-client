import { Box } from "@mui/material";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
const AuthApp = lazy(() => import("authApp/AuthApp"));
const App = () => {
    return (
        <>
            <Navbar />
            <Box component={"main"} marginTop={"7rem"} width={"100%"}>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/*"
                            element={
                                <Suspense fallback={<Loader />}>
                                    <AuthApp />
                                </Suspense>
                            }
                        />
                        <Route path="/nurse/*" element={<div>Nurse</div>} />
                        <Route path="/patient/*" element={<div>Patient</div>} />
                    </Routes>
                </BrowserRouter>
            </Box>
        </>
    );
};

export default App;
