import React from 'react'
import HomeSideMenu from './HomeSideMenu'
import { Switch, Route } from 'react-router-dom'
import ComputeNew from './ComputeNew'

const Home = () => (
  <div id="content">
    <div className="leftContent">
      <HomeSideMenu />
    </div>
    <div className="rightContent">
      <div id="dynamicContent">
        <ComputeNew />
      </div>
    </div>
    <div id="separator"></div>
  </div>
)

export default Home
