import React from 'react'
import HomeSideMenu from './HomeSideMenu'
import { Switch, Route } from 'react-router-dom'


const Home = () => (
  <div id="content">
   <div className="leftContent">
          <HomeSideMenu />        
   </div>    
      <div className="rightContent">
        <div id="dynamicContent">
        Migration content will appear here...
       </div>
      </div>
   <div id="separator"></div>
     
  </div>
)

export default Home
