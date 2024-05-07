// SimulatorHeader.js
import React from "react";
import "./SimulatorHeader.css";
import Notifications from "react-notifications-menu";
import LogoutImage from '../../static/logout.png'; // Import the image
import Logout from "../Logout/index";

const SimulatorHeader = ({ isAuthenticated, setIsAuthenticated }) => {
  const data = [
    {
      image: 'https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      message: 'Lorem ipsum dolor sit amet.',
      detailPage: '/events',
      receivedTime: '12h ago'
    },
    {
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      message: 'abdo likes to suck dick',
      detailPage: '/events',
      receivedTime: '12h ago'
    }
  ];

  return (
    <div className="simulator-header-container">
      <div className="simulator-header">
        <p className="hi-message">
          {isAuthenticated ? "Hi admin abdo" : "Hi There"}
        </p>
        <div className="simulator-header-right">
          {isAuthenticated && <Logout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} LogoutImage={LogoutImage} />}
          {isAuthenticated && <Notifications className="notifications-menu" data={data} />}
        </div>
      </div>
    </div>
  );
  
};

export default SimulatorHeader;
