import React, { Component } from 'react';
import Checkbox from './Checkbox';
import $ from 'jquery';
import Compute from './Compute.js';
import Networking from './Networking.js';
import Storage from './Storage.js';

const items = [
    'One',
    'Two',
    'Three',
  ];
  var AzureJSONObject = "";
  var googleJSONObject = "";
  var AWSJSONObject ="";
  /*--------- PC Region ------------*/
 

class Cloud1 extends React.Component{
    componentWillMount = () => {
        this.selectedCheckboxes = new Set();
        getJSONObjAzureGoogle();
        function getJSONObjAzureGoogle() {
          /******************************Call Google  API*****************************************/         
            var Googleurl = 'https://cloudpricingcalculator.appspot.com/static/data/pricelist.json';
            var googleRequest = require('request');
    
            googleRequest.get({
              url: Googleurl,
              json: true,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'dataType': 'json',
                'Content-Type': 'application/json; charset=utf-8'
              }
            }, (err, res, data) => {
              if (err) {
                console.log('Error:', err);
                $("#loading").hide();  
              } else if (res.statusCode != 200) {
                console.log('Status:', res.statusCode);
                $("#loading").hide();  
              } else {
                console.log('Google JSON:', data);
                googleJSONObject = data;                  
              }
            });          
          /**********************************Call Azure API *****************************************/
            var adal = require('adal-node');
            var rest = require('restler');
    
            var AuthenticationContext = adal.AuthenticationContext;
            var tenantID = "click2cloudhotmail.onmicrosoft.com";
            var clientID = "318c54db-672a-4077-bcb5-185ac68dc5a8";//"66bc35ad-7c37-496d-9c9c-d8fd60dd66d2";
            var resource = "https://management.azure.com/";
            var authURL = "https://login.windows.net/" + tenantID;
            var secret = "bKnurOYduK6lZC+cq3pnv29tRHqpCZqJRWlWqiepro8=";
            var context = new AuthenticationContext(authURL);
            var authHeader, requestURL;
    
            context.acquireTokenWithClientCredentials(resource, clientID, secret, function (err, tokenResponse) {
              if (err) {
                console.log('Oops, error' + err.stack);
                $("#loading").hide(); 
              } else {
                authHeader = tokenResponse['accessToken'];
                requestURL = "https://management.azure.com/subscriptions/efbaf842-f428-4020-8718-9e3a642fa2c6/providers/Microsoft.Commerce/RateCard?api-version=2015-06-01-preview&$filter=OfferDurableId eq 'MS-AZR-0063P' and Currency eq 'USD' and Locale eq 'en-US' and RegionInfo eq 'US'";
                rest.get(requestURL, { accessToken: authHeader }).on('complete', function (result) {
                  console.log('Azure JSON:', result);
                  AzureJSONObject = result;
                  $("#loading").hide();                   
                });
              }               
            });

                    
          }
      }
    
      toggleCheckbox = label => {
        if (this.selectedCheckboxes.has(label)) {
          this.selectedCheckboxes.delete(label);
        } else {
          this.selectedCheckboxes.add(label);
        }
      }
    
      handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();    
        for (const checkbox of this.selectedCheckboxes) {    
          console.log(checkbox, 'is selected.');
        }
      }
    
      createCheckbox = label => (
        <Checkbox
          label={label}
          handleCheckboxChange={this.toggleCheckbox}
          key={label} />
      )
    
      createCheckboxes = () => (
        items.map(this.createCheckbox)
      )
    
      constructor(props) {
        super(props);    
        this.state = { checked: false, checked2: false, checked3: false,datass:""};
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.updateStatess=this.updateStatess.bind(this);
        }
            
      handleChange() {
        this.setState({
            checked: !this.state.checked      
        })
      }
    
      handleChange2() {
        this.setState({
            checked2: !this.state.checked2      
        })
      }
      handleChange3() {
        this.setState({
            checked3: !this.state.checked3      
        })
      }
      updateStatess(e)
      {
        this.setState({datass:e.target.value});
      }
      render(){
        $('.HomeTab').css("background-color", "#0F5496");      
        // console.log(this.props); 
        const togglecheck1 = this.state.checked ? '' : 'AWS';
        const togglecheck2 = this.state.checked2 ? '' : 'google';
        const togglecheck3 = this.state.checked3 ? '' : 'azure';

        var ApiParameter = {
          awsCloud: this.state.checked,
          googleCloud: this.state.checked2,
          azureCloud: this.state.checked3,
          Service: this.state.datass,
          GoogleJSONObj: googleJSONObject,//this.props.JsonApiParameter.GoogleJSONObj,
          AzureJSONObject: AzureJSONObject// this.props.JsonApiParameter.AzureJSONObject,       
        }

        return(
          <div>            
            <div className="cloudOption">
            <div id="loading" ></div>       {/* For page Loader  */}
              <div className="divName"> Cloud</div>
              <div className="singlecloud">
                <div className="cloudSelection">    
                  <input type="checkbox" id="awsChk" className="chk" checked={this.state.checked} onChange={this.handleChange} />
                  <img src={require("../img/amazon-web-services.png")} />
                </div>
              </div>
              <div className="singlecloud">
                <div className="cloudSelection">    
                  <input type="checkbox" id="googleChk" className="chk" checked={this.state.checked2} onChange={this.handleChange2} />
                  <img src={require("../img/google-cloud-logo.png")} />
                </div>
              </div>
              <div className="singlecloud">
                <div className="cloudSelection">    
                  <input type="checkbox" id="azureChk" className="chk" checked={this.state.checked3} onChange={this.handleChange3} />
                  <img src={require("../img/Microsoft-Azure-logo.png")} />
                </div>
              </div>
            </div>
            <div className="cloudServer">
                <select className="CloudServiceDD" onChange={this.updateStatess}>
                  <option value="selectService" >Select Service<span className="caret"></span></option>
                  <option value="Compute" >Compute</option>
                  <option value="Networking" >Networking</option>
                  <option value="Storage" >Storage</option>
                </select>
                <div className="divContent">
                  <div className="divName"> Cloud Services</div>
                  <div className="divSubContent">
                  Cloud Computing Services provide information technology (IT) as a service over the Internet 
                  or dedicated network, with delivery on demand, and payment based on usage. 
                  
                      </div>
                </div>
                <div className="CloudServiceDrp">
                </div>
                        <h1>{this.state.datass == "Compute" ? < Compute ApiParameter = {ApiParameter }/> : ''}</h1>
                <h1>{this.state.datass=="Networking"? < Networking ApiParameter = {ApiParameter }/>:''}</h1>
            <h1>{this.state.datass=="Storage"? <Storage ApiParameter = {ApiParameter }/>:''}</h1>
                </div>                
            </div>
        );
      }
}
export default Cloud1;