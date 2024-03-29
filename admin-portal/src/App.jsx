import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Assuming App.css is located in the same directory
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <div className="App"> {/* Assuming you have a div with class App for styling */}
      <Router>
        <Routes>
          <Route path="/Login" element={<Login />} /> {/* Define route for "/Login" */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Define route for "/dashboard" */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
