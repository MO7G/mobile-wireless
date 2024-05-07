import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "../Login";
import Dashboard from "../Dashboard";
import MainRoutes from "../../routes/routes";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Set initial state to false
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(user); // Set user object when authenticated
      } else {
        setIsAuthenticated(false); // Set to false when not authenticated
      }
      setLoading(false); // Update loading state after authentication check
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <div></div> // Display loading indicator while checking authentication
      ) : (
        <MainRoutes isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      )}
    </div>
  );
};

export default App;
