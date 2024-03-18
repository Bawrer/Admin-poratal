// ContentHeader.jsx
import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import '../styles/ContentHeader.css';

const ContentHeader = () => {
  return (
    <div className='content--header'>
      <h1 className='header--title'>Dashboard</h1>
    
      <div className='header--activity'> 
        <div className='search-box'>
          <input type="text" placeholder="Search for a user..."/> 
          <BiSearch className='ico'/>
        </div>
      </div> {/* closing div tag for header--activity */}

    </div>
  );
}

export default ContentHeader;
