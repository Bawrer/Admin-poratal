 import React from 'react'
 import Sidebar from './dashboardComponent/Sidebar'
//  import ContentHeader from './dashboardComponent/ContentHeader'
 import Content from  './dashboardComponent/Content'
 import Profile  from './dashboardComponent/profile'
 
//  import './Components/styles/ContentHeader.css'
 
 const Dashboard = () => {
   return (
    <><div className='dashboard'> 
     <Sidebar />
     <div className="Dashboard--content">
      <Content/>
      <Profile/>
      </div>
      </div>
    </>
   )
 }
 export default Dashboard
 