import React, {useState} from "react";
import '../styles/home.css';
import {login, register} from "../api/auth";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";

const Home = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();
    const {isLoggedIn} = useAuth();


    const handleLogin = async () => {
        try {
            const data = await login(username, password);
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            navigate(`/${username}`);
        }
        catch (error) {
            alert("Login failed!");
            console.log(error);
        }
    }

    const handleRegister = async () => {
        try {
            const data = await register(username, password);
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            navigate(`/${username}`);
        }
        catch (error) {
            alert("Registration failed!");
            console.log(error);
        }
    }

    return (
        <div id="home">
            <div id="home-main">
                <h1>DevLink</h1>
                <div id='home-input'>
                    <input
                        id="home-input-user"
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}/>
                    <input
                        id="home-input-pass"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                </div>
                {!isLoggedIn
                    ?
                    <div id="home-logged-out">
                        <button onClick={handleLogin}>Log in</button>
                        <button onClick={handleRegister}>Register</button>
                    </div>
                    :
                    <button onClick={() => navigate(`/${username}`)}>View your DevLink</button>
                }
            </div>
            <div id="home-signature">
                <small>Created by</small>
                <a target="_blank" href="https://github.com/milljo3">
                    <img alt="pfp" src="https://avatars.githubusercontent.com/u/144623594?v=4"/>
                    <p>@milljo3</p>
                    <i className="fa-brands fa-github"></i>
                </a>
            </div>
        </div>
    );
}

export default Home;