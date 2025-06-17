import React, {useState} from "react";
import '../styles/home.css';
import {login as loginApi, register as registerApi} from "../api/auth";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext"
import {isValidUsername, isValidPassword} from "../utils/validation";

const Home = () => {
    const [usernameInput, setUsernameInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");

    const navigate = useNavigate();
    const {username, login} = useAuth();

    const handleLogin = async () => {
        if (!isValidUsername(usernameInput)) {
            alert("Invalid username. Use 3–20 alphanumeric characters.");
            return;
        }
        if (!isValidPassword(passwordInput)) {
            alert("Password must be at least 6 characters.");
            return;
        }

        try {
            const data = await loginApi(usernameInput, passwordInput);
            login(data.username, data.token);
            navigate(`/${data.username}`);
        }
        catch (error: any) {
            const errorMessage = error.response?.data?.message || "Login failed!"
            alert(errorMessage);
            console.error(error);
        }
    }

    const handleRegister = async () => {
        if (!isValidUsername(usernameInput)) {
            alert("Invalid username. Use 3–20 alphanumeric characters.");
            return;
        }
        if (!isValidPassword(passwordInput)) {
            alert("Password must be at least 6 characters.");
            return;
        }

        try {
            const data = await registerApi(usernameInput, passwordInput);
            login(data.username, data.token);
            navigate(`/${data.username}`);
        }
        catch (error: any) {
            const errorMessage = error.response?.data?.message || "Registration failed!"
            alert(errorMessage);
            console.error(error);
        }
    }

    return (
        <div id="home">
            <div id="home-main">
                <h1>DevLink</h1>
                {!username &&
                    <div id='home-input'>
                        <input
                            id="home-input-user"
                            type="text"
                            placeholder="Enter username"
                            value={usernameInput}
                            onChange={(e) => setUsernameInput(e.target.value)}/>
                        <input
                            id="home-input-pass"
                            type="password"
                            placeholder="Enter password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}/>
                    </div>
                }
                {!username
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