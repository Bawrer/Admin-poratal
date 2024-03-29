import React, { useState } from 'react';
import axios from 'axios';

const DeleteUser = () => {
  const [userId, setUserId] = useState('');
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setUserId(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      // Send a request to delete user with the specified ID
      const response = await axios.delete(`http://localhost:5000/api/users/${userId}`);

      if (response.status === 200) {
        setDeleted(true);
      } else {
        setError('Failed to delete user');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Delete User</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label htmlFor="userId">User ID:</label>
          <input type="text" id="userId" value={userId} onChange={handleInputChange} required />
        </div>
        <button type="submit">Delete User</button>
      </form>
      {deleted && <p>User deleted successfully.</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default DeleteUser;
