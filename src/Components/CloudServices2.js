import React, { Component } from 'react';
import Compute from './Compute.js';
import Networking from './Networking.js';
import Storage from './Storage.js';

import $ from 'jquery';
class CloudServices2 extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = { datass:""};
        this.updateStatess=this.updateStatess.bind(this);
}
updateStatess(e)
{
  this.setState({datass:e.target.value});
}
render(){
    return(
      <div>
        {/* <div className="cloudServer">
        <select className="CloudServiceDD" onChange={this.updateStatess}>
          <option value="ss" >Select Service<span className="caret"></span></option>
          <option value="Compute" >Compute</option>
          <option value="Networking" >Networking</option>
          <option value="Storage" >Storage</option>
        </select>
       
        <div className="divContent">
          <div className="divName"> Cloud Services</div>
          <div className="divSubContent">
            Cloud-based is a term that refers to applications, services or resources made
                  available to users on demand via the Internet from a cloud .
              </div>
        </div>
        <div className="CloudServiceDrp">

        </div>
        <h1>{this.state.datass == "Compute" ? < Compute/> : ''}</h1>
        <h1>{this.state.datass=="Networking"? < Networking/>:''}</h1>
    <h1>{this.state.datass=="Storage"? <Storage />:''}</h1>
      </div> */}
      </div>
    );
}
}
export default CloudServices2;