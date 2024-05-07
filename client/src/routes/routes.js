// src/routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoutes from '../components/PrivateRoutes';
import NotFound from '../components/NotFound/index';
import Dashboard from '../components/Dashboard/index'
import Login from '../components/Login';
import Simulator from '../components/Simulator/index'
import Welcome from '../components/Weclome/index';
const MainRoutes = ({ isAuthenticated , setIsAuthenticated }) => {
    return (
        <Routes>
            <Route path="/" element={<Welcome isAuthenticated={isAuthenticated}></Welcome>}/>
            <Route path="/login" element={<Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} ></Login>} />
            <Route path="/Simulator" element={<Simulator isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}></Simulator>}/>
            {/* All other routes are private  */}
            <Route path="/dashboard" element={<PrivateRoutes isAuthenticated={isAuthenticated} component={() =><Dashboard  setIsAuthenticated={setIsAuthenticated}></Dashboard>} />} />
              {/* 404 Route - This will never match if `/*` is matched first */}
            <Route path="*" element={<h1>not found</h1>} />
        </Routes>
    );
};

export default MainRoutes;