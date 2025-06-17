import React from "react";
import '../styles/home.css'

const Home = () => {
    const isLoggedIn: boolean = false;

    return (
        <div id="home">
            <div id="home-main">
                <h1>DevLink</h1>
                {!isLoggedIn
                    ?
                    <div id="home-logged-out">
                        <button>Log in</button>
                        <button>Register</button>
                    </div>
                    :
                    <button>View your DevLink</button>
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