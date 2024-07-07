import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ component }) => {
    const { isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isAuthenticated) {
            // Store the original location and redirect to login
            navigate("/login", { state: { from: location } });
        }
    }, [isAuthenticated, navigate, location]);

    return (
        <Fragment>
            {isAuthenticated && component}
        </Fragment>
    );
};

export default ProtectedRoute;
