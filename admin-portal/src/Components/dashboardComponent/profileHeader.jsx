import React, { useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom'; // Uncomment if needed
import '../styles/profileHeader.css';

const ProfileHeader = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const adminName = localStorage.getItem('adminName'); // Retrieve admin name from localStorage
    const navigate = useNavigate(); // Uncomment if needed

    console.log('adminName:', adminName); // Log the admin name to console

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
        console.log('Dropdown toggled:', showDropdown); // Log the current state of dropdown
    };

    const handleLogout = () => {
        // Remove token and adminName from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('adminName');
        localStorage.removeItem('adminPhoto');
        console.log('Logout clicked'); // Log that logout button is clicked
        // Redirect to login component page
        navigate('/login'); // Uncomment if needed
    };

    return (
        <div className="profile-header">
            <h2 className='header-title'>{adminName}</h2>
            <div className='dropdown'>
                <div className="dropdown-toggle" onClick={toggleDropdown}>
                    <BsChevronDown className={`dropdown-arrow ${showDropdown ? 'open' : ''}`} />
                </div>
                {showDropdown && (
                    <div className="dropdown-menu">
                        <button className="dropdown-item">Profile</button>
                        <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfileHeader;
