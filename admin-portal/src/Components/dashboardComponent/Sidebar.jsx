import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import AddUser from '../Dashboard/Adduser';
import AddAdmin from '../Dashboard/Admin/Admin/AddAdmin';
import DeleteUser from '../Dashboard/DeleteUsers';
import UserSearchComponent from '../Dashboard/UserSearchComponent';

import { BiBookAlt, BiHome } from 'react-icons/bi';
import { MdAutoDelete } from 'react-icons/md';
import { IoPersonAdd} from 'react-icons/io5';
import { FaUsersViewfinder } from "react-icons/fa6";
import { GrUpdate } from 'react-icons/gr';

import '../styles/dashboard.css';

const Sidebar = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [showUserSearchComponentModal, setShowUserSearchComponentModal] = useState(false);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [isFullRole, setIsFullRole] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'full') {
      setIsFullRole(true);
    }
  }, []);

  const handleAddUserClick = () => {
    setShowAddUserModal(true);
  };

  const handleDeleteUserClick = () => {
    setShowDeleteUserModal(true);
  };

  const handleUserSearchComponentClick = () => {
    setShowUserSearchComponentModal(true);
  };

  const handleCloseAddUserModal = () => {
    setShowAddUserModal(false);
  };

  const handleCloseDeleteUserModal = () => {
    setShowDeleteUserModal(false);
  };

  const handleCloseUserSearchComponentModal = () => {
    setShowUserSearchComponentModal(false);
  };

  const handleAddAdminClick = () => {
    setShowAddAdminModal(true);
  };

  const handleCloseModal = () => {
    setShowAddUserModal(false);
    setShowAddAdminModal(false);
  };

  return (
    <div className="menu">
      <div className="logo">
        <BiBookAlt className="logo-icon" />
        <h2>VB</h2>
      </div>
      <div className="menu-list">
        <Link to="/" className="item">
          <BiHome className="ico" />
          Home
        </Link>
        <a href="#" className="item" onClick={handleAddUserClick}>
          <IoPersonAdd className="ico" />
          Add user
        </a>
        {isFullRole && (
          <a href="#" className="item" onClick={handleAddAdminClick}>
            <IoPersonAdd className="ico" />
            Add admin
          </a>
        )}
        <a href="#" className="item" onClick={handleDeleteUserClick}>
          <MdAutoDelete />
          Delete
        </a>
        <a href="#" className="item">
          <GrUpdate className="ico" />
          Updates
        </a>
        <a href="#" className="item" onClick={handleUserSearchComponentClick}>
          <FaUsersViewfinder  className="ico" />
          View users
        </a>
      </div>

      {showAddUserModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseAddUserModal}>
              &times;
            </span>
            <AddUser />
          </div>
        </div>
      )}

      {showDeleteUserModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseDeleteUserModal}>
              &times;
            </span>
            <DeleteUser />
          </div>
        </div>
      )}

      {showUserSearchComponentModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseUserSearchComponentModal}>
              &times;
            </span>
            <UserSearchComponent />
          </div>
        </div>
      )}

      {showAddAdminModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <AddAdmin handleCloseModal={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
