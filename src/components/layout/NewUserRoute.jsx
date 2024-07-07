import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const NewUserRoute = ({ component }) => {
    const { isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated) {
            // Retrieve the intended path from state or default to '/'
            const redirectTo = location.state?.from?.pathname || "/";
            navigate(redirectTo, { replace: true });
        }
    }, [isAuthenticated, navigate, location]);

    return (
        <Fragment>
            {!isAuthenticated && component}
        </Fragment>
    );
};

export default NewUserRoute;
