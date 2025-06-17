import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import User from "./pages/User";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={ <Home/> }/>
                    <Route path=":username" element={ <User/> }></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;