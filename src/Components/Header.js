import React, { Component }  from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.  <li><Link to='/schedule'>Schedule</Link></li>

class GetObj extends Component {
  
 
  render(){
    
    return(<div> <div id="header">
    <div id="headerContent">
      <div id="logo">      
        <img src={require("../img/logo.png")} /> 
        <div>
        <span>Cloud Comparison Portal</span>
        </div>
      </div>     
    </div>
    <div id="menu">      
        <ul>         
          <li className="HomeTab"><NavLink exact activeClassName="selected" to='/' >Home</NavLink></li>
          <li><NavLink activeClassName="selected" to='/AboutUs'>About Us</NavLink></li>
          <li><NavLink activeClassName="selected" to='/ContactUs'>Contact Us</NavLink></li>
          <li><NavLink activeClassName="selected" to='/FAQ'>FAQ</NavLink></li>      
        </ul>     
    </div>
  </div></div>);
  }
}

export default GetObj
