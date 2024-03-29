import React from 'react'
import ContentHeader from './ContentHeader'
import Card from './Card'
import '../styles/Content.css' 
import UserList from './UserList'
const Content = () => {
  return (
    <div className='content'>
      <ContentHeader/>
      <Card/>
     <UserList />
    </div>
  )
}

export default Content