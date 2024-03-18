import React, { useState } from 'react';
import axios from 'axios';
import './AddAdmin.css';

const AddAdmin = () => {
    const [newUser, setNewUser] = useState({
        email: '',
        password: '',
        name: '',
        surname: '',
        birthdate: '',
        photo: '',
        role: 'full', // Default role to 'Full Access'
    });

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', newUser.photo);
        formData.append('birthdate', newUser.birthdate);
        formData.append('name', newUser.name);
        formData.append('surname', newUser.surname);
        formData.append('role', newUser.role);
        formData.append('email', newUser.email);
        formData.append('password', newUser.password);

        console.log(formData);

        axios.post('http://localhost:5000/api/admins/add', formData) // Updated the URL to match backend route
            .then(res => {
                console.log(res);
                setShowSuccessModal(true);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleChange = (e) => {
        setNewUser({...newUser, [e.target.name]: e.target.value});
    }

    const handlePhoto = (e) => {
        setNewUser({...newUser, photo: e.target.files[0]});
    }

    const closeModal = () => {
        setShowSuccessModal(false);
    }

    return (
        <div className="form-container">
            <h2> Save admin</h2>
            <form className='adminForm'  onSubmit={handleSubmit} encType='multipart/form-data'>
                
                <div className='PersonalDetails'>
                <label htmlFor="name">Name:</label>
                <input 
                    type="text"
                    id="name"
                    placeholder="Enter name"
                    name="name"
                    value={newUser.name}
                    onChange={handleChange}
                />

                <label htmlFor="surname">Surname:</label>
                <input 
                    type="text"
                    id="surname"
                    placeholder="Enter surname"
                    name="surname"
                    value={newUser.surname}
                    onChange={handleChange}
                />
                <label htmlFor="birthdate">Birthdate:</label>
                <input 
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    value={newUser.birthdate}
                    onChange={handleChange}
                />
                
                <label htmlFor="photo">Photo:</label>
                <input 
                    type="file" 
                    accept=".png, .jpg, .jpeg"
                    id="photo"
                    onChange={handlePhoto}
                />
                </div>
                <div className='Security'>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        name="email"
                        value={newUser.email}
                        onChange={handleChange}
                    />
                    

                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        name="password"
                        value={newUser.password}
                        onChange={handleChange}
                    />

                    

                    <label htmlFor="role">Role:</label>
                    <select
                        id="role"
                        name="role"
                        value={newUser.role}
                        onChange={handleChange}
                    >
                        <option value="full">Full Access</option>
                        <option value="partial">Partial Access</option>
                    </select>

                    <input 
                    type="submit"
                    value="Submit"
                />
                </div>

                

                
            </form>
            {showSuccessModal && (
        <div className="success-modal">
          <div className="success-modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <p>User added successfully!</p>
          </div>
        </div>
      )}
        </div>
    );
}

export default AddAdmin;
