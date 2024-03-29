import React, { useState, useEffect } from 'react';
import "../styles/UserList.css";
import axios from 'axios';
import { BiSearch } from 'react-icons/bi';

const UserSearchComponent = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Search term
  const [searchResult, setSearchResult] = useState(null); // Search result

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm) {
      return; // Prevent empty search
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/users/${searchTerm}`);
      if (response.status === 200) {
        setSearchResult(response.data);
      } else {
        setSearchResult({ message: 'No user found with that ID' }); // Handle not found
      }
    } catch (error) {
      console.error('Error searching for user:', error);
      setSearchResult({ message: 'Search failed' }); // Handle general error
    }
  };

  return (
    <div className='User--List'>
      <div className='list--header'>
        <h2>Candidates</h2>
        <div className='header--activity'>
          <div className='search-box'>
            <input
              type="text"
              placeholder="Search by ID Number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
              onKeyPress={(e) => { // Allow search on Enter key
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <BiSearch className='ico' onClick={handleSearch} /> {/* Trigger search on click */}
          </div>
          <select>
            {/* ... (optional dropdown) */}
          </select>
        </div>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>ID Number</th>
            <th>Email</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {/* Display search result if available, otherwise display all users */}
          {searchResult ? (
            <tr> {/* Display single search result in a table row */}
              <td>{searchResult.name}</td>
              <td>{searchResult.surname}</td>
              <td>{searchResult.idNumber}</td>
              <td>{searchResult.email}</td>
              <td>{searchResult.age}</td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.idNumber}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Display search error message if applicable */}
      {searchResult && searchResult.message && <p className="error-message">{searchResult.message}</p>}
    </div>
  );
};

export default UserSearchComponent;
