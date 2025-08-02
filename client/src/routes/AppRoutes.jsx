/* -------------------------------------------------------------------------- */
/*                    This handle all the routes in the app                   */
/* -------------------------------------------------------------------------- */

import { Routes } from "react-router";
import UserRoutes from "./UserRoutes";
import PublicRoutes from "./PublicRoutes";
import AdminRoutes from "./AdminRoutes";
import SvgLoader from "../utils/Animation/SvgLoader";

const AppRoutes = () => {
    return (
        <>
            <Routes>
                {/* Public Route */}
                {PublicRoutes()}

                {/* USER DASHBOARD ROUTE */}
                {UserRoutes()}

                {/* ADMIN DASHBOARD ROUTE */}
                {AdminRoutes()}
            </Routes>
        </>
    );
};

export default AppRoutes;
