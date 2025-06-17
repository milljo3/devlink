import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import User from "./pages/User";
import Layout from "./components/Layout";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={ <Home/> }/>
                    <Route path=":username" element={ <User/> }></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;