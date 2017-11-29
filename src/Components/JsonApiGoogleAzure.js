import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import ReactDOM from 'react-dom';
import Checkbox from './Checkbox';
import $ from 'jquery';
import Compute from './Compute.js';
import Networking from './Networking.js';
import Storage from './Storage.js';
import Cloud1 from './Cloud1';

  var AzureJSONObject = "";
  var googleJSONObject = "";
  var AWSJSONObject ="";
  /*--------- PC Region ------------*/
  var myPCRegion = 'us-east-1';
  var JsonApiParameter ;
class JsonApi extends React.Component{ 

      render(){
        // getJSONObjAzureGoogle();
        // //setTimeout(getJsonApi, 30000);
        // /*----------- call Google and Azure API on Page load -----------*/        
        // function getJsonApi(){
        //     JsonApiParameter = {         
        //       GoogleJSONObj: googleJSONObject,
        //       AzureJSONObject: AzureJSONObject,
        //       AWSJSONObject:AWSJSONObject,
        //       myPCRegion:myPCRegion
        //     }
        // } 
        
        // function getJSONObjAzureGoogle() {
        //   /******************************Call Google  API*****************************************/         
        //     var Googleurl = 'https://cloudpricingcalculator.appspot.com/static/data/pricelist.json';
        //     var googleRequest = require('request');
    
        //     googleRequest.get({
        //       url: Googleurl,
        //       json: true,
        //       headers: {
        //         'Access-Control-Allow-Origin': '*',
        //         'dataType': 'json',
        //         'Content-Type': 'application/json; charset=utf-8'
        //       }
        //     }, (err, res, data) => {
        //       if (err) {
        //         console.log('Error:', err);
        //         $("#loading").hide();  
        //       } else if (res.statusCode != 200) {
        //         console.log('Status:', res.statusCode);
        //         $("#loading").hide();  
        //       } else {
        //         console.log('Google JSON:', data);
        //         googleJSONObject = data;
        //         getJsonApi();
        //       }
        //     });          
        //   /**********************************Call Azure API *****************************************/
        //     var adal = require('adal-node');
        //     var rest = require('restler');
    
        //     var AuthenticationContext = adal.AuthenticationContext;
        //     var tenantID = "click2cloudhotmail.onmicrosoft.com";
        //     var clientID = "318c54db-672a-4077-bcb5-185ac68dc5a8";//"66bc35ad-7c37-496d-9c9c-d8fd60dd66d2";
        //     var resource = "https://management.azure.com/";
        //     var authURL = "https://login.windows.net/" + tenantID;
        //     var secret = "bKnurOYduK6lZC+cq3pnv29tRHqpCZqJRWlWqiepro8=";
        //     var context = new AuthenticationContext(authURL);
        //     var authHeader, requestURL;
    
        //     context.acquireTokenWithClientCredentials(resource, clientID, secret, function (err, tokenResponse) {
        //       if (err) {
        //         console.log('Oops, error' + err.stack);
        //         $("#loading").hide(); 
        //       } else {
        //         authHeader = tokenResponse['accessToken'];
        //         requestURL = "https://management.azure.com/subscriptions/efbaf842-f428-4020-8718-9e3a642fa2c6/providers/Microsoft.Commerce/RateCard?api-version=2015-06-01-preview&$filter=OfferDurableId eq 'MS-AZR-0063P' and Currency eq 'USD' and Locale eq 'en-US' and RegionInfo eq 'US'";
        //         rest.get(requestURL, { accessToken: authHeader }).on('complete', function (result) {
        //           console.log('Azure JSON:', result);
        //           AzureJSONObject = result;
        //           //$("#loading").hide(); 
        //           getJsonApi();
        //         });
        //       }
             
        //     });

        // /******************************Call AWS  API********************************************/           
        //     var AWSUrl = 'https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonEC2/current/' + myPCRegion + '/index.json';
        //     var AWSRequest = require('request');
    
        //     AWSRequest.get({
        //       url: AWSUrl,
        //       json: true,
        //       headers: {
        //         'Access-Control-Allow-Origin': '*',
        //         'dataType': 'json',
        //         'async': false,
        //         'Content-Type': 'application/json; charset=utf-8'
        //       }
        //     }, (err, res, data) => {
        //       if (err) {
        //         console.log('Error:', err);
        //         $("#loading").hide(); 
        //       } else if (res.statusCode != 200) {
        //         console.log('Status:', res.statusCode);
        //         $("#loading").hide(); 
        //       } else {
        //         console.log('AWS JSON:', data);
        //         AWSJSONObject = data; 
        //         $("#loading").hide();  
        //         getJsonApi();                          
        //       }
        //     });             
        //   }                  
          return(
            <div>
              {/* <div id="loading" ></div>    */}
              {/* if(JsonApiParameter.googleJSONObject !="")  */}
              {/* {JsonApiParameter != undefined ? <Cloud1 JsonApiParameter = {JsonApiParameter }/> : ''}  */}
            <Cloud1 />             
            </div>
          );
      }
}
export default JsonApi;