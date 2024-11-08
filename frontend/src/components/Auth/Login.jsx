import React from "react";
import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const LoginHome = () => {
    const handleLogin = async () => {
        try {
            // Get the authentication URL from the backend server
            const {
                data: { url },
            } = await axios.get(`${serverUrl}/auth/url`);
            // Redirect to the Google consent screen
            window.location.assign(url);
        } catch (err) {
            console.error("Error during login:", err);
        }
    };

    return (
        <div>
            <h3>Login to Dashboard</h3>
            <button className="btn" onClick={handleLogin}>
                Login
            </button>
        </div>
    );
};

export default LoginHome;
