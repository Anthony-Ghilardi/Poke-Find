import React, { useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Callback = () => {
    const called = useRef(false); // Prevent multiple API calls due to StrictMode
    const { checkLoginState, loggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            if (loggedIn === false) {
                try {
                    if (called.current) return; // Ensure API call happens only once
                    called.current = true;

                    // Exchange authorization code for token and get user details
                    await axios.get(
                        `${serverUrl}/auth/token${window.location.search}`
                    );

                    // Update login state
                    checkLoginState();
                    navigate("/"); // Redirect to home/dashboard
                } catch (err) {
                    console.error("Error during callback:", err);
                    navigate("/"); // Redirect to home even on error
                }
            } else if (loggedIn === true) {
                navigate("/"); // Redirect to home if already logged in
            }
        })();
    }, [checkLoginState, loggedIn, navigate]);

    return <></>; // Empty component as this handles only redirection
};

export default Callback;
