import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Dashboard = () => {
    const { user, loggedIn, checkLoginState } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            if (loggedIn === true) {
                try {
                    const { data: { posts } } = await axios.get(`${serverUrl}/user/posts`);
                    setPosts(posts);
                } catch (err) {
                    console.error(err);
                }
            }
        })();
    }, [loggedIn]);

    const handleLogout = async () => {
        try {
            await axios.post(`${serverUrl}/auth/logout`);
            checkLoginState();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h3>Dashboard</h3>
            <button className="btn" onClick={handleLogout}>Logout</button>
            <h4>{user?.name}</h4>
            <p>{user?.email}</p>
            <img src={user?.picture} alt={user?.name} />
            {posts.map((post, idx) => (
                <div key={idx}>
                    <h5>{post?.title}</h5>
                    <p>{post?.body}</p>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;