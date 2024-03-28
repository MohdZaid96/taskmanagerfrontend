import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextApi";


function PrivateRoute({ path, element }) {
    const { authState } = useContext(AuthContext);

    if (!authState.isAuth) {
        return <Navigate to="/login" replace />;
    }

    return <Routes>
        <Route path={path} element={element} />;
    </Routes>

}

export default PrivateRoute;