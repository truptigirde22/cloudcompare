import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.  <li><Link to='/schedule'>Schedule</Link></li>
const HomeSideMenu = () => (
  <header>
    <div>
      <nav>
        <ul className="ul1">
          <li className="li1">
            <NavLink activeClassName="selectedLeftMenu" to='/CostCalculator'>
              <img src={require("../img/white-calci.png")} className="Side-Menu-logo" />Cost Calculator</NavLink>
          </li>
          <li className="li1">
            <NavLink activeClassName="selectedLeftMenu" to='/Services'>
              <img src={require("../img/settings-32.png")} className="Side-Menu-logo" />Services</NavLink></li>
          <li className="li1">
            <NavLink activeClassName="selectedLeftMenu" to='/Latency'>
              <img src={require("../img/latency.png")} className="Side-Menu-logo" />Latency</NavLink></li>
          <li className="li1">

            <NavLink activeClassName="selectedLeftMenu" to='/Geographical'>
              <img src={require("../img/globe.png")} className="Side-Menu-logo" />Geographical</NavLink></li>
          <li className="li1">

            <NavLink activeClassName="selectedLeftMenu" to='/Migration'>
              <img src={require("../img/migration.png")} className="Side-Menu-logo" />Migration</NavLink></li>
          <li className="li1">

            <NavLink activeClassName="selectedLeftMenu" to='/Roadmap'>
              <img src={require("../img/roadmap.png")} className="Side-Menu-logo" />Roadmap</NavLink></li>
        </ul>
      </nav>
    </div>
  </header>
)

export default HomeSideMenu
