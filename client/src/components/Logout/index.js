import React from 'react';
import Swal from 'sweetalert2';
import { getAuth, signOut } from 'firebase/auth'; // Import Firebase authentication modules
import { useNavigate } from 'react-router-dom';
import './index.css'
const Logout = ({ setIsAuthenticated , LogoutImage }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const handleLogout = () => {
    const auth = getAuth(); // Get the Firebase Auth instance
    Swal.fire({
      icon: 'question',
      title: 'Logging Out',
      text: 'Are you sure you want to log out?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then(result => {
      if (result.value) {
        signOut(auth) // Sign out the user
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Logged Out!',
              showConfirmButton: false,
              timer: 1500,
              willClose: () => {
                setIsAuthenticated(false);
                navigate('/')
              },
            });
          })
          .catch(error => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to log out. Please try again.',
              showConfirmButton: true,
            });
            console.error('Error logging out:', error);
          });
      }
    });
  };

  return (
    <>
      {LogoutImage ? ( // Conditionally render based on LogoutImage
        <img className="logout-image" src={LogoutImage} onClick={handleLogout} alt="Logout" className="logout-image" />
      ) : (
        <button
          style={{ marginLeft: '12px' }}
          className="muted-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </>
  );
  
};

export default Logout;
