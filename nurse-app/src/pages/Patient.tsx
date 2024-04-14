import { Outlet } from "react-router-dom";
import SubNav from "../components/SubNav";

const Patient = () => {
    return (
        <>
            <SubNav />
            <Outlet />
        </>
    );
};

export default Patient;
