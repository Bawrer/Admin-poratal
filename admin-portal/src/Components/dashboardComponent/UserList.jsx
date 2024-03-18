import React,{useState,useEffect} from 'react'
import "../styles/UserList.css"
import axios from 'axios';


const UserList = () => {

   const [users, setUsers] = useState([]);
 
   useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await axios.get('http://localhost:5000/api/users');
         if (response.headers['content-type'] && response.headers['content-type'].startsWith('text/html')) {
           console.error('Unexpected response format from API. Response data is an HTML document.');
         } else {
           setUsers(response.data);
         }
       } catch (error) {
         console.error('Error fetching user data:', error);
       }
     };
   
     fetchData();
   
   }, []);
   
  return (
    <div className='User--List'> 
    <div className='list--header'>
      <h2>Candidates</h2>
      <select>
         <option value="CA">Software</option>
         <option value="Developer">Dev</option>
      
      </select>
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
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.idNumber}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};
 export default UserList;
