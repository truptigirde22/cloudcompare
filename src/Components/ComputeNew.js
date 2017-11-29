
import React, { Component } from 'react';
import Checkbox from './Checkbox';
import ReactDOM from 'react-dom';
//import {DropdownList,DropdownItem} from 'src/react-dropdownlist'
import DataPass from './DataPass';
import Pricing from './DataPass';
import Cloud1 from './Cloud1.js';
import CloudServices2 from './CloudServices2.js';
import JsonApi from './JsonApiGoogleAzure.js';
import $ from 'jquery';

let ang = '';

const items = [
  'One',
  'Two',
  'Three',
];
var indents = 66;

var finalObject=[];    
var AWSJSONObject="";
var AzureJSONObject="";
var googleJSONObject="";
var AWSJSONObject="";
var AzureJSONObject="";
var googleJSONObject="";
/*---------- Compute Category Filter Variables ----------*/
var jp = require('jsonpath');
var azureFilterObj="";
var awsFilterObj="";
var googleFilterObj="";
var azureCategory = "Virtual Machines";
var region = "";
var os="";
var ram=""; 
var vcpu=""; 

class ComputeNew extends Component {
  render(){
    return(
      <div>
         <JsonApi/>
        {/* <Cloud1 /> */}
        <CloudServices2 />
        </div>
    );
  }
}
export default ComputeNew;

