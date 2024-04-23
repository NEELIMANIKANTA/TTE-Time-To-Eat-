import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // Perform logout action when component mounts
        handleLogout();
    }, []); // Empty dependency array to run the effect only once when the component mounts

    const handleLogout = () => {
        // Clear the username from sessionStorage
        sessionStorage.removeItem('username');

        // Navigate to the home page
        navigate('/');
    };

}

export default Logout;
