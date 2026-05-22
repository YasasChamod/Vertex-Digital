import React, { memo, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileCirclePlus,
    faUserPlus,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import useAuth from "../hooks/useAuth";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
    const { isAdmin, isManager } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [sendLogout, { isSuccess }] = useLogoutMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate("/");
        }
    }, [isSuccess, navigate]);

    const handleLogout = () => {
        sendLogout();
    };

    const go = (to) => navigate(to);

    const showUsers = isManager || isAdmin;
    const showNewUser = isAdmin;

    const dashClass =
        DASH_REGEX.test(location.pathname) || NOTES_REGEX.test(location.pathname) || USERS_REGEX.test(location.pathname)
            ? ""
            : "dash-header--small";

    return (
        <header className={`dash-header ${dashClass}`}>
            <div className="dash-header__brand" aria-hidden={false}>
                <p className="dash-kicker">Admin workspace</p>
                <h1 className="dash-title">Dashboard</h1>
            </div>

            <nav className="dash-nav" aria-label="Dashboard navigation">
                <Link to="/dash" className={DASH_REGEX.test(location.pathname) ? "active" : ""}>
                    Home
                </Link>
                <Link to="/dash/notes" className={NOTES_REGEX.test(location.pathname) ? "active" : ""}>
                    Notes
                </Link>
                {showUsers && (
                    <Link to="/dash/users" className={USERS_REGEX.test(location.pathname) ? "active" : ""}>
                        Users
                    </Link>
                )}

                <div className="dash-actions" role="group" aria-label="Dashboard actions">
                    <button type="button" className="icon-button" onClick={() => go("/dash/notes/new")} title="New note">
                        <FontAwesomeIcon icon={faFileCirclePlus} />
                        <span className="visually-hidden">New note</span>
                    </button>

                    {showNewUser && (
                        <button type="button" className="icon-button" onClick={() => go("/dash/users/new")} title="New user">
                            <FontAwesomeIcon icon={faUserPlus} />
                            <span className="visually-hidden">New user</span>
                        </button>
                    )}

                    <button type="button" className="icon-button logout" onClick={handleLogout} title="Logout">
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        <span className="visually-hidden">Logout</span>
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default memo(DashHeader);