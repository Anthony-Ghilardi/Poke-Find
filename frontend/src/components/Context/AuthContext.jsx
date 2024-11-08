import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(null);
    const [user, setUser] = useState(null);

    const checkLoginState = useCallback(async () => {
        try {
            const { data: { loggedIn: logged_in, user } } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/logged_in`);
            setLoggedIn(logged_in);
            user && setUser(user);
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        checkLoginState();
    }, [checkLoginState]);

    return (
        <AuthContext.Provider value={{ loggedIn, user, checkLoginState }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };