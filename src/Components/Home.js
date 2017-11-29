import React from 'react'
import HomeSideMenu from './HomeSideMenu'
import { Switch, Route } from 'react-router-dom'
import costCalci from './costCalci'

const Home = () => (
  <div id="content">
   <div className="leftContent">
          <HomeSideMenu />        
   </div>    
      <div className="rightContent">
      
        <div id="dynamicContent">
        <p>Welcome to Cloud Comparision Tool</p>
       </div>
      </div>
   <div id="separator"></div>
     
  </div>
)

export default Home
