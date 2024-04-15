import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

type PublicRouteProps = {
    children: React.ReactNode;
};
const PublicRoute = ({ children }: PublicRouteProps) => {
    const token = localStorage.getItem("token") as string;
    if (token) {
        const { role } = jwtDecode(token) as { role: string };
        if (role === "nurse" || role === "patient")
            return <Navigate to={`/${role}`}/>;
    }
    return <>{children}</>;
};

export default PublicRoute;
