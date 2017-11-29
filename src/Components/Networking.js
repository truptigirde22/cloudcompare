import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import Checkbox from './Checkbox';
import ReactDOM from 'react-dom';
import DataPass from './DataPass';
import Pricing from './DataPass';
import $ from 'jquery';
import Cloud1 from './Cloud1';
import Slider from 'react-rangeslider'//Rahul
import 'react-rangeslider/lib/index.css'//Rahul
/*----------------Clear Cache------------------------*/
$.ajaxSetup({ cache: false });

let ang = '';
var region = '';

var AWSJSONObject = "";
var AzureJSONObject = "";
var googleJSONObject = "";

var azureFilterObj_Network = "";
var azureCategory = "Networking";


var os = "";
var ram = "";
var vcpu = "";
/*----- Json data Variable -----------*/
var AWSJSONObject_Network = "";
var awsFilterObj_Network = '';
/*------Variable use for Validation  -------*/
var cloudServises = '';
var chkGoogle = '';
var chkAws = '';
var chkAzure = '';
var chkTransferType = "";
var ddlTransferType_Network = 'InterRegion Inbound';
/*.................................Slider Variables...............................*/
var Egress_storage_Slider = 0;
var DregionWithUS_storage_Slider = 0;
var InterEgress_storage_Slider = 0;
var DZoneSmRegion_storage_Slider = 0;

var ddlEgress_Network = '';
var ddlInterEgress_Network = '';
/*...................................variable of Dropdown.............................*/
var DD_networking = "";
/*--------- PC Region ------------*/
var PCRegion;
/*---------- length of json pbj of all Clouds --------*/
var googleJsonLength_Network =0;
var azureJsonLength_Network =0;
var awsJsonLength_Network =0;
/**********Google Variable************** */
var GoogleJSONObject_Network = "";
var googleFilterObj_Network = null;

class Networking extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: false, checked2: false, checked3: false, data: "", value1: 0, value2: 0, value3: 0, value4: 0, dataDD: "", dataRegionNetworking: "", checkedDDN: false, ddlEgress: "", ddlInterEgress: "" };
    this.state = {
      azureArray_Network: [],
      awsArray_Network: [],
      googleArray_Network: []
    };
    /*........................state for slider values bt Rahul........*
    this.state = {
      value1: 10, value2: 10, value3: 10, value4: 10
    }
    this.state = { dataDD: "" }
    this.state = { dataRegionNetworking: "" };*/
    this.updateStateRegionNetworking = this.updateStateRegionNetworking.bind(this);
    this.updateStateDD = this.updateStateDD.bind(this);
    this.handleChangeDDN = this.handleChangeDDN.bind(this);
    this.updateStateDD_Egress = this.updateStateDD_Egress.bind(this);
    this.updateStateDD_InterEgress = this.updateStateDD_InterEgress.bind(this);
  }
  /*.........................................handle change slider by Rahul.........................................*/

  /*handleChangeStart = () => {
      console.log('Change event started')
    };*/

  handleChange = value1 => {
    Egress_storage_Slider = value1;
    this.setState({
      value1: value1
    })
    
  };

  handleChange2 = value2 => {
    InterEgress_storage_Slider = value2;
    this.setState({
      value2: value2
    })
    
  };

  handleChange3 = value3 => {
    DregionWithUS_storage_Slider = value3;
    this.setState({
      value3: value3
    })
    
  };

  handleChange4 = value4 => {
    DZoneSmRegion_storage_Slider = value4;
    this.setState({
      value4: value4
    })
    
  };


  /*handleChangeComplete = () => {
    console.log('Change event completed')
  }*/

  /*...................................................dropdown handler by rahul............................*/
  /*..............................checkbox handler by Rahul...............................*/
  updateStateDD_Egress(e) {
    ddlEgress_Network = e.target.value;
    this.setState({ ddlEgress: e.target.value });

    if(ddlEgress_Network!= 'selectEgress')
      $('.Egress1').css('pointer-events','auto');  
    else{
      $('.Egress1').css('pointer-events','none');
      this.state.value1= 0;
    }
  }
  updateStateDD_InterEgress(e) {
    ddlInterEgress_Network = e.target.value;
    this.setState({ ddlInterEgress: e.target.value });

    if(ddlInterEgress_Network!= 'selectEgressInter')
    $('.EgressInter').css('pointer-events','auto');  
  else{
    $('.EgressInter').css('pointer-events','none');
    this.state.value2= 0;
  }
  }
  handleChangeDDN() {
    chkTransferType = !this.state.checkedDDN;
    this.setState({
      checkedDDN: !this.state.checkedDDN
    })
  }
  updateStateDD(e) {
    ddlTransferType_Network = e.target.value;
    this.setState({ dataDD: e.target.value });
  }

  /*.................................................................Update state region........................*/
  updateStateRegionNetworking(e) {
    region = e.target.value;
    this.setState({ dataRegionNetworking: e.target.value });
  }
/*--------- Bind Google Cloud HTML ----------*/
  BindGoogleHtml_Network(){
      googleArray_Network: []; 
      // var dummy=[];
      // dummy= googleFilterObj_Network;

      // googleFilterObj_Network[0]=googleFilterObj_Network;

      $(".results").show();
      $('.divNoOffer').hide();
      $(".Collapsible__trigger").css("background-image", "url('../Image/arrowRight.png')");
      $(".Collapsible__trigger").css("opacity", "1");
      $(".Collapsible__trigger").css("color", "#0078d7");
      /*For showing no offer*/
      if(googleFilterObj_Network==null || googleFilterObj_Network==""||googleFilterObj_Network==undefined)
          $('.divNoOffer').show();
      else{    
          $('#googleResult').show(); 
           
         
          
          var dummy=[];
          dummy.push(googleFilterObj_Network);
          googleJsonLength_Network = "Total : " + dummy.length + "  Offers"; 
          this.setState({ googleArray_Network: dummy });   
          dummy=[];
          googleFilterObj_Network = [];


      }     
  }  
  
  getAzurePrice_Network(azurePrice){
    
      var price11 = azurePrice;
      price11 = price11 * 730.001;
      price11=(Math.round(price11 * 100) / 100);
      price11 = "$" + price11 + "/Month";
      
      return price11;
    }
  /*--------- Bind Azure Cloud HTML ----------*/
  BindAzureHtml_Network(){
    azureArray_Network: [];
    //$('#azureResult').show();
    $(".results").show();  
    $('.divNoOffer').hide();  
    $(".Collapsible__trigger").css("background-image", "url('../Image/arrowRight.png')");
    $(".Collapsible__trigger").css("opacity", "1");
    $(".Collapsible__trigger").css("color", "#0078d7");
    /*For showing no offer*/
    if(azureFilterObj_Network.length==0 || azureFilterObj_Network==""||azureFilterObj_Network==undefined)
        $('.divNoOffer').show();
    else{    
        $('#azureResult').show();  
        azureJsonLength_Network = "Total : " + azureFilterObj_Network.length + "  Offers";         
        this.setState({ azureArray_Network: azureFilterObj_Network });   
        azureFilterObj_Network = [];
    }
  } 
  /*--------- Bind AWS Cloud HTML ----------*/
  BindAWSHtml_Network(){
    awsArray_Network: []; 
    //$('#awsResult').show();
    $(".results").show(); 
    $('.divNoOffer').hide();
    $(".Collapsible__trigger").css("background-image", "url('../Image/arrowRight.png')");
    $(".Collapsible__trigger").css("opacity", "1");
    $(".Collapsible__trigger").css("color", "#0078d7");    
    /*For showing no offer*/
    if(awsFilterObj_Network.length==0 || awsFilterObj_Network==""||awsFilterObj_Network==undefined)
        $('.divNoOffer').show();
    else{    
        $('#awsResult').show();   
        awsJsonLength_Network = "Total : " + awsFilterObj_Network.length + "  Offers";       
        this.setState({ awsArray_Network: awsFilterObj_Network });   
        awsFilterObj_Network = [];
        
    }
  } 

// componentDidUpdate() {
  componentDidUpdate(){

    if(chkGoogle==true)
    $('#firstTable').hide();
  else
    $('#firstTable').show();

    if (chkAws == true || chkAzure == true)
    $('#firstTable').show();

    if(chkGoogle==true)
      $('#tablNetworking').show();
    else
      $('#tablNetworking').hide();

      //transferTable
      if(chkAws==true)
      $('#transferTable').show();
    else
      $('#transferTable').hide();
  }
  componentDidMount(){
    if(chkGoogle==true)
    $('#firstTable').hide();
  else
    $('#firstTable').show();

    if (chkAws == true || chkAzure == true)
    $('#firstTable').show();

    if(chkGoogle==true)
      $('#tablNetworking').show();
    else
      $('#tablNetworking').hide();

      //transferTable
      if(chkAws==true)
      $('#transferTable').show();
    else
      $('#transferTable').hide();
  }
  render() {
    /*...................................values for Sliders...................................*/
    const { value1 } = this.state
    const { value2 } = this.state
    const { value3 } = this.state
    const { value4 } = this.state


    console.log(this.props);
    chkAws = this.props.ApiParameter.awsCloud;
    chkGoogle = this.props.ApiParameter.googleCloud;
    chkAzure = this.props.ApiParameter.azureCloud;
    GoogleJSONObject_Network = this.props.ApiParameter.GoogleJSONObj;
    AzureJSONObject = this.props.ApiParameter.AzureJSONObject;
   // AWSJSONObject_Network = this.props.ApiParameter.AWSJSONObject;
    PCRegion = this.props.ApiParameter.myPCRegion;

    /*---------- Compute Category Filter Variables ----------*/
    var jp = require('jsonpath');

    /******************************/
    
    //on load validation //networking
    if(chkAws == false && chkGoogle == false && chkAzure == false)//(e.target.value=='selectService')
    {
      alert('Please select the cloud first.');
      return false;
    }


    if(chkGoogle==true)
    $('#firstTable').hide();
  else
    $('#firstTable').show();

    if (chkAws == true || chkAzure == true)
    $('#firstTable').show();

    if(chkGoogle==true)
      $('#tablNetworking').show();
    else
      $('#tablNetworking').hide();

      //transferTable
      if(chkAws==true)
      $('#transferTable').show();
    else
      $('#transferTable').hide();
    /******************************/






    /*added by trupti*/
    $("span.Collapsible__trigger").click(function () {

      var $header = $(this);
      var $content = $(this).attr('class');//$(".Collapsible").find('span').attr('class');//$(this).html();//alert($(".Collapsible").find('span').attr('class'));

      $header.text(function () {
        //change text based on condition
        if ($content.indexOf("open") != -1) {
          $(this).css("background-image", "url('../Image/arrowRight.png')");
          $(this).css("opacity", "1");
          $(this).css("color", "#0078d7");
          return $header.text()//.replace("Collapse", "Expand") //$content ="Expand";
        }
        else ($content.indexOf("closed") != -1)
        {
          $(this).css("background-image", "url('../Image/arrowDown.png')");
          $(this).css("opacity", "1");
          $(this).css("color", "#0078d7");
          return $header.text()//.replace("Expand", "Collapse")//$content ="Collapse";
        }
      });
    });
    /*************/

    /*--------- get Region for AWS CLoud ------------*/
    function getRegion_AWS(region) {
      var awsRegion = JSON.parse('{"US East": "us-east-1", "US West": "us-west-2", "EU (London)": "eu-west-2", "Europe Central": "eu-central-1","Asia Pacific (Singapore)": "ap-southeast-1","Asia Pacific (Japan)": "ap-northeast-1","Asia Pacific (Sydney)": "ap-southeast-2","Asia Pacific (Mumbai)": "ap-south-1","Asia Pacific (Sao Paulo)": "sa-east-1"}');
      return awsRegion[region];
    }
    function getJSONObj_Network() {



      /********** Validatation for Dropdowns and CHeckboxes ************/
      if (chkAws == false && chkGoogle == false && chkAzure == false) {
        alert("Please Select Cloud Name's to Compare");
        return false;
      }
      else if(chkAzure == true || chkAws == true)
      {
          if (region == "selectRegion" || region == "") {
              alert('Please Select Region');
              return false;
          }
      }     

      $("#loadingOnClick").show();
      awsFilterObj_Network =[];
      azureFilterObj_Network =[];
      googleFilterObj_Network=[];
      $('#azureResult').hide();
      $('#awsResult').hide();
      $('#googleResult').hide();
      /******************************Call AWS  API********************************************/
      if (chkAws == true ) {
        var getAWSRegion = getRegion_AWS(region);        
            var AWSUrl = 'https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonS3/current/' + getAWSRegion + '/index.json';
            var AWSRequest = require('request');

            AWSRequest.get({
              url: AWSUrl,
              json: true,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'dataType': 'json',
                'async': false,
                'Content-Type': 'application/json; charset=utf-8'
              }
            }, (err, res, data) => {
              if (err) {
                console.log('Error:', err);
              } else if (res.statusCode !== 200) {
                console.log('Status:', res.statusCode);
              } else {
                console.log('AWS Network JSON:', data);
                AWSJSONObject_Network = data;
                if (ddlTransferType_Network != "") {
                  var queryAWS = "";
                  if (ddlTransferType_Network == 'Accelerated InterRegion Inbound')
                    queryAWS = "$.products[*][?(@.transferType &&  /Accelerated InterRegion Inbound/.test(@.transferType ))]";
                  else if (ddlTransferType_Network == 'Accelerated InterRegion Outbound')
                    queryAWS = "$.products[*][?(@.transferType &&  /Accelerated InterRegion Outbound/.test(@.transferType ))]";
          
                  else
                    queryAWS = "$.products[*][?(@.transferType=='" + ddlTransferType_Network + "')]";
          
                  awsFilterObj_Network = jp.query(AWSJSONObject_Network, queryAWS)
                  console.log('AWS Filter JSON Storage:', awsFilterObj_Network);
                }
                else {
                  var queryAWS = "";
                  queryAWS = "$.products[*].attributes";
                  awsFilterObj_Network = jp.query(AWSJSONObject_Network, queryAWS)
                  console.log('AWS Filter JSON Network:', awsFilterObj_Network);
                }
                  $("#hiddenbuttonAWS").click(); 
              }
            });
      }
      else {
        AWSJSONObject_Network = [];
        awsFilterObj_Network = [];
      }

      
      if (chkGoogle == true && GoogleJSONObject_Network != ""){
        getFilterJSONObj_Google_Network();
        $("#hiddenbuttonGoogle").click(); 
      }
      if (chkAzure == true && AzureJSONObject != ""){
          getFilterJSONObj_Azure_Network();
          $("#hiddenbuttonAzure").click(); 
      }      
      // if (chkAws == true && AWSJSONObject_Network != ""){
      //   if (ddlTransferType_Network != "") {
      //     var queryAWS = "";
      //     if (ddlTransferType_Network == 'Accelerated InterRegion Inbound')
      //       queryAWS = "$.products[*][?(@.transferType &&  /Accelerated InterRegion Inbound/.test(@.transferType ))]";
      //     else if (ddlTransferType_Network == 'Accelerated InterRegion Outbound')
      //       queryAWS = "$.products[*][?(@.transferType &&  /Accelerated InterRegion Outbound/.test(@.transferType ))]";
  
      //     else
      //       queryAWS = "$.products[*][?(@.transferType=='" + ddlTransferType_Network + "')]";
  
      //     awsFilterObj_Network = jp.query(AWSJSONObject_Network, queryAWS)
      //     console.log('AWS Filter JSON Storage:', awsFilterObj_Network);
      //   }
      //   else {
      //     var queryAWS = "";
      //     queryAWS = "$.products[*].attributes";
      //     awsFilterObj_Network = jp.query(AWSJSONObject_Network, queryAWS)
      //     console.log('AWS Filter JSON Network:', awsFilterObj_Network);
      //   }
      //     $("#hiddenbuttonAWS").click();          
      // }
      $('#loadingOnClick').hide(); 
      
    }
    
    /***********************Google*************************** */
    /*--------- get Region for Google CLoud ------------*/
    function getRegion_Google(region) {
      var googleRegion = JSON.parse('{"US East": "us-east4", "US West": "us-west1", "EU (London)": "europe-west2", "Europe Central": "europe-west3","Asia Pacific (Singapore)": "asia-southeast","Asia Pacific (Japan)": "asia-northeast","Asia Pacific (Sydney)": "australia-southeast1","Asia Pacific (Mumbai)": "IN West","Asia Pacific (Sao Paulo)": "southamerica-east1"}');
      return googleRegion[region];
    }
    function getJSONByFilterParameter_Network(userFilterValue, JsonFilterValue_CDN) {
      var userSelectParameter = userFilterValue;
      var getGoogleRegion_Nw = getRegion_Google(region);
      var queryGoogle_Nw = "$..[" + userSelectParameter + "]";
      var googleFilterOs_Nw = jp.query(GoogleJSONObject_Network, queryGoogle_Nw)
      //console.log(googleFilterOs_Storage);
      //googleFilterOs_Storage[0]['us-west1']
      if (JsonFilterValue_CDN == 'us')
        var a = googleFilterOs_Nw[0]['us'];
      else
        var a = googleFilterOs_Nw[0].tiers[JsonFilterValue_CDN];
      return a;
    }
    /*--------- get egress for Google CLoud ------------*/



    var egress_Nw = ddlEgress_Network;//from dropdown
    function getEgress_Nw_Google() {
      //if (egress_Nw == "")
        //egress_Nw = "Asia/Pacific";
      var googleEgress_Nw = JSON.parse('{"Asia/Pacific": "CP-COMPUTEENGINE-INTERNET-EGRESS-APAC-APAC", "Australia": "CP-COMPUTEENGINE-INTERNET-EGRESS-AU-AU", "China": "CP-COMPUTEENGINE-INTERNET-EGRESS-CN-CN", "Other": "CP-COMPUTEENGINE-INTERNET-EGRESS-NA-NA"}');
      return googleEgress_Nw[egress_Nw];
    }
      /*--------- get Interconnected egress for Google CLoud ------------*/
      var InterEgress_Nw = ddlInterEgress_Network;//from dropdown
      function getInterconnectedEgress_Nw_Google() {
        var googleInterEgress_Nw = JSON.parse('{"Asia/Pacific": "CP-CLOUDCDN-CACHE-EGRESS-APAC", "Australia": "CP-CLOUDCDN-CACHE-EGRESS-AU", "Europe": "CP-CLOUDCDN-CACHE-EGRESS-EU", "Other": "CP-CLOUDCDN-CACHE-EGRESS-OTHER"}');
        return googleInterEgress_Nw[InterEgress_Nw];
      }

      var DZone_SRegion = DZoneSmRegion_storage_Slider;//Diff Zone Same Region
      var DRegion_US = DregionWithUS_storage_Slider;//Diff  Region with US
      function getFilterJSONObj_Google_Network() {
      /*******Variables use in Final object for Network******* */
      //user selected
      var egress_NW_slider = Egress_storage_Slider;
      // var userSelectedReginal=1;
      var UserEgress_NW = egress_NW_slider;
      var UserInterEgress_NW = InterEgress_storage_Slider;


      //calculated
      var Egress_NW_Price = 0;
      var InterEgress_Price = 0; //Default we set "1", bcz we need atlest one value to calculate cost 
      var DZone_SRegion_Price = 0;
      var DRegion_US_Price = 0;
      /***********END*********** */
      /***************************************** */
      //CP-COMPUTEENGINE-INTERNET-EGRESS-ZONE
      //CP-COMPUTEENGINE-INTERNET-EGRESS-REGION


      /*************Egress Filteration************** */
      if (UserEgress_NW > 0 && egress_Nw!="selectEgress") {
      var userSelectParameter = getEgress_Nw_Google();
      userSelectParameter = "'" + userSelectParameter + "'";
      var unitEgress_NW_Price = getJSONByFilterParameter_Network(userSelectParameter, 1024);
      Egress_NW_Price = unitEgress_NW_Price * UserEgress_NW;
      UserEgress_NW=UserEgress_NW+" GB";
      }
      /********************END******************** */

      /*************InterEgress Filteration************** */
      if (UserInterEgress_NW > 0 && InterEgress_Nw!="selectEgressInter") {
        var userSelectParameter1 = getInterconnectedEgress_Nw_Google();
        userSelectParameter1 = "'" + userSelectParameter1 + "'";
        var unitInterEgress_NW_Price = getJSONByFilterParameter_Network(userSelectParameter1, 10240);
        InterEgress_Price = unitInterEgress_NW_Price * UserInterEgress_NW;
        UserInterEgress_NW=UserInterEgress_NW+" GB";
      }


      /********************END******************** */

      /*************diff zone same region Filteration************** */
      if (DZone_SRegion > 0) {
        var unitDzone_SRegon_NW_Price = getJSONByFilterParameter_Network("'CP-COMPUTEENGINE-INTERNET-EGRESS-ZONE'", "us");
        DZone_SRegion_Price = unitDzone_SRegon_NW_Price * DZone_SRegion;
        DZone_SRegion=DZone_SRegion+" GB";
      }

      /************************END******************************** */
      /*************diff Region with US Filteration************** */
      if (DRegion_US > 0) {
        var unitDRegion_US_NW_Price = getJSONByFilterParameter_Network("'CP-COMPUTEENGINE-INTERNET-EGRESS-REGION'", "us");
        DRegion_US_Price = unitDRegion_US_NW_Price * DRegion_US;
        DRegion_US=DRegion_US+" GB";

      }

      /********************END******************** */
      var finalPrcie = Egress_NW_Price + InterEgress_Price + DZone_SRegion_Price + DRegion_US_Price;
      var getFinalGoogleObject_Nw = null;
      if (UserEgress_NW == 0) {
        UserEgress_NW = "N/A";
      }
      if (UserInterEgress_NW == 0) {
        UserInterEgress_NW = "N/A";
      }
      if (DZone_SRegion == 0) {
        DZone_SRegion = "N/A";
      }
      if (DRegion_US == 0) {
        DRegion_US = "N/A";
      }


      if (finalPrcie > 0) {
        getFinalGoogleObject_Nw = ({
          "Egress_NW": UserEgress_NW,
          "Egress_NW_Price": Egress_NW_Price,
          "InterconnectedEgress_NW": UserInterEgress_NW,
          "InterconnectedEgress_NW_Price": InterEgress_Price,
          "DZone_SRegion": DZone_SRegion,
          "DZone_SRegion_Price": DZone_SRegion_Price,
          "DRegion_US": DRegion_US,
          "DRegion_US_Price": DRegion_US_Price,
          "Total_Price": (Math.round(finalPrcie * 100) / 100)

        });
      }

      console.log(getFinalGoogleObject_Nw);

      googleFilterObj_Network = getFinalGoogleObject_Nw;

    }

    /*--------- get Region for AZURE CLoud ------------*/
    function getRegion_AZURE(region) {
      var azureRegion = JSON.parse('{"US East": "US East", "US West": "US West 2", "EU (London)": "UK South", "Europe Central": "eu-central-1","Asia Pacific (Singapore)": "AP Southeast","Asia Pacific (Japan)": "AP East","Asia Pacific (Sydney)": "AU Southeast","Asia Pacific (Mumbai)": "IN West","Asia Pacific (Sao Paulo)": "BR South"}');
      return azureRegion[region];
    }

    var azureSubCategory_Network = 'ExpressRoute';//Geo Redundant//Basic Application Gateway (Large) // Geo Redundant // Virtual Network // Basic Application Gateway (Medium) //Basic Application Gateway (Small)                                             

    /*------------------- Azure -----------------*/
    function getFilterJSONObj_Azure_Network() {
      var azureReg = getRegion_AZURE(region);
      var queryAzure = "$.Meters[?(@.MeterCategory =='" + azureCategory + "'&& @.MeterRegion=='" + azureReg + "')]";
      azureFilterObj_Network = jp.query(AzureJSONObject, queryAzure)
      console.log('Azure Filter JSON:', azureFilterObj_Network);
    }
    return (
      <div>
      <div id="loadingOnClick"></div>
       <div className="StorageDiv">
       <div className="divName" id="filters"> Filters</div>
       <div className="note">Note : Filters may vary as per selection of cloud and services.</div>
          <table className="sntable" id="firstTable">
            <tr>
              <td className="StorageTD" id="regionNetworking">
                <div className="leftDiv"><label> Region:</label>
                </div>
                <div className="rightDiv">*</div>
              </td>
              <td className="StorageTD">
                <div >
                  <select className="Dropdownmenu" onChange={this.updateStateRegionNetworking}>
                    <option value="selectRegion" >Select Region</option>
                    <option value="US West" >US West</option>
                    <option value="US East">US East </option>
                    <option value="EU (London)">EU (London)</option>
                    <option value="Europe Central">Europe Central</option>
                    <option value="Asia Pacific (Singapore)">Asia Pacific (Singapore)</option>
                    <option value="Asia Pacific (Japan)">Asia Pacific (Japan)</option>
                    <option value="Asia Pacific (Sydney)">Asia Pacific (Sydney) </option>
                    <option value="Asia Pacific (Mumbai)">Asia Pacific (Mumbai)</option>
                    <option value="Asia Pacific (Sao Paulo)">Asia Pacific (Sao Paulo)</option>
                  </select>
                </div>
              </td>
            </tr>
          </table>

          <table id="transferTable"><tr>
              <td className="StorageTD">
                {/* <input type="checkbox" checked={this.state.checkedDDN}
                  onChange={this.handleChangeDDN} />   */}
                <label>Transfer Type </label>
              </td>
              <td>
                <div className="StorageTD">
                  <select className="storageDD" onChange={this.updateStateDD}>
                    <option value="InterRegion Inbound">InterRegion Inbound</option>
                    <option value="InterRegion Outbound">InterRegion Outbound</option>
                    <option value="AWS Inbound">AWS Inbound</option>
                    <option value="IntraRegion">IntraRegion</option>
                    <option value="Accelerated InterRegion Inbound">Accelerated InterRegion Inbound</option>
                    <option value="Accelerated InterRegion Outbound">Accelerated InterRegion Outbound</option>
                  </select>
                </div>
              </td>
              <td>
              </td>
              <td className="StorageTD">
                {/* <input type="checkbox" /> Z */}
              </td>
              <td className="StorageTD">
                {/*<input className="txtbox" type="text"/>*/}
              </td>
            </tr></table>

          <table className="sntable" id="tablNetworking">
            <tr>
              <td className="StorageTD">
              </td>
              <td className="StorageTD">
                <select className="storageDD" onChange={this.updateStateDD_Egress}>
                <option value="selectEgress">Select Egress</option>
                  <option value="Asia/Pacific">Asia/Pacific</option>
                  <option value="Australia">Australia</option>
                  <option value="China">China</option>
                  <option value="Other">Other</option>
                </select>
              </td>
              <td>
                <Slider
                  className='slider Egress1'
                  min={0}
                  max={100}
                  value={value1} /*{value1}*/
                  /* onChangeStart={this.handleChangeStart}*/
                  onChange={this.handleChange}
                /*onChangeComplete={this.handleChangeComplete}*/
                />
                {/*..............................................New code for Sliders Labels By Rahul.................................*/ }             
                <div className="slider2Div">
                <table className="TableSliderRange">
                  <tr>
                    <td className="Slidertd1">
                      <label className="SliderRangeValues1">0</label>
                      </td>
                      <td className="Slidertd2">
                      <label className="SliderRangeValues2">{Egress_storage_Slider}</label>
                        </td>
                          <td className="Slidertd3">
                          <label className="SliderRangeValues3">100</label>
                            </td>
                    </tr>
                    </table>
                </div>
                {/*<h1>{Slider_A}</h1>*/}
              </td>
              <td>
              </td>
              <td className="StorageTD">
                {/* <input type="checkbox" /> */}
                <label>Differant Region with US </label>
              </td>
              <td>
                <Slider
                  className='slider'
                  min={0}
                  max={100}
                  value={value3}

                  /* onChangeStart={this.handleChangeStart}*/
                  onChange={this.handleChange3}
                /*onChangeComplete={this.handleChangeComplete}*/
                />
                {/*..............................................New code for Sliders Labels By Rahul.................................*/ }             
                <div className="slider2Div">
                <table className="TableSliderRange">
                  <tr>
                    <td className="Slidertd1">
                      <label className="SliderRangeValues1">0</label>
                      </td>
                      <td className="Slidertd2">
                      <label className="SliderRangeValues2">{DregionWithUS_storage_Slider}</label>
                        </td>
                          <td className="Slidertd3">
                          <label className="SliderRangeValues3">100</label>
                            </td>
                    </tr>
                    </table>
                </div>
                {/* <div className='value'>{value3}</div>*/}
              </td>
            </tr>
            <tr>
            <td className="StorageTD">
              </td>
              <td className="StorageTD">
                <select className="storageDD" onChange={this.updateStateDD_InterEgress}>
                  <option value="selectEgressInter">Select Interconnected Egress</option>
                  <option value="Asia/Pacific">Asia/Pacific</option>
                  <option value="Australia">Australia</option>
                  <option value="Europe">Europe</option>
                  <option value="Other">Other</option>
                </select>
              </td>
              <td>
                <Slider
                  className='slider EgressInter'
                  min={0}
                  max={100}
                  value={value2}
                  /* onChangeStart={this.handleChangeStart}*/
                  onChange={this.handleChange2}
                /*onChangeComplete={this.handleChangeComplete}*/
                />
                {/*..............................................New code for Sliders Labels By Rahul.................................*/ }             
                <div className="slider2Div">
                <table className="TableSliderRange">
                  <tr>
                    <td className="Slidertd1">
                      <label className="SliderRangeValues1">0</label>
                      </td>
                      <td className="Slidertd2">
                      <label className="SliderRangeValues2">{InterEgress_storage_Slider}</label>
                        </td>
                          <td className="Slidertd3">
                          <label className="SliderRangeValues3">100</label>
                            </td>
                    </tr>
                    </table>
                </div>
                {/*<div className='value'>{value2}</div>*/}
              </td>
              <td>
              </td>
              <td className="StorageTD">
                {/* <input type="checkbox" /> */}
                <label>Differant Zone same Region </label>
              </td>
              <td>
                <Slider
                  className='slider'
                  min={0}
                  max={100}
                  value={value4}
                  /* onChangeStart={this.handleChangeStart}*/
                  onChange={this.handleChange4}
                /*onChangeComplete={this.handleChangeComplete}*/
                />
                {/*..............................................New code for Sliders Labels By Rahul.................................*/ }             
                <div className="slider2Div">
                <table className="TableSliderRange">
                  <tr>
                    <td className="Slidertd1">
                      <label className="SliderRangeValues1">0</label>
                      </td>
                      <td className="Slidertd2">
                      <label className="SliderRangeValues2">{DZoneSmRegion_storage_Slider}</label>
                        </td>
                          <td className="Slidertd3">
                          <label className="SliderRangeValues3">100</label>
                            </td>
                    </tr>
                    </table>
                </div>
                {/*<div className='value'>{value4}</div>*/}
              </td>
            </tr>
          </table>
        </div>
        <div className="container">
          <div className="btnDiv">
            <button className="GoBtn" onClick={getJSONObj_Network}>Show Offers</button>
          </div>
          <div className="results">
            {/* {<button id="hiddenbutton" onClick={this.createProject_Network.bind(this)}>HiddenButton</button>} */}
            <div className="divNoOffer">No Offers Available..</div>
            {<button id="hiddenbuttonGoogle" onClick={this.BindGoogleHtml_Network.bind(this)}>HiddenButtonGoogle</button>}
            <div className="resultsCSS" id="googleResult">
              <Collapsible transitionTime={400} trigger="Google Cloud Offers">
              <p className="cloudNameDiv">Google</p>
              {<p className="offersCount">{googleJsonLength_Network} </p>}
                {this.state.googleArray_Network.map((googleFilterObj_Network, index) => {
                  return (
                    <div>
                      <div className="resultContainers" key={index}>
                        <div>
                          <table>
                            <tbody>
                              <tr>
                                <td className="heading">Egress To : {googleFilterObj_Network.Egress_NW}</td>
                                <td className="heading">InterConnected Egress To : {googleFilterObj_Network.InterConnectedEgress_NW}</td>
                                {/* <td className="heading">RAM : {azureItem_Network.text}</td> */}
                                <td rowspan="2"><div className="priceDiv">Price : {googleFilterObj_Network.Total_Price}</div></td>
                              </tr>
                              <tr>
                                <td className="heading">Differant Zone Same Region : {googleFilterObj_Network.DZone_SRegion}</td>
                                <td className="heading">Differant Region with US  : {googleFilterObj_Network.DRegion_US}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </Collapsible>
            </div>
           {<button id="hiddenbuttonAzure" onClick={this.BindAzureHtml_Network.bind(this)}>HiddenButtonAzure</button>}
            <div className="resultsCSS" id="azureResult">
              <Collapsible transitionTime={400} trigger="Azure Cloud Offers"><p className="cloudNameDiv">Azure</p>
              {<p className="offersCount">{azureJsonLength_Network} </p>}
                {this.state.azureArray_Network.map((azureFilterObj_Network, index) => {
                  return (
                    <div>
                      <div className="resultContainers" key={index}>
                        <div>
                          <table>
                            <tbody>
                              <tr>
                                <td className="heading">Region : {azureFilterObj_Network.MeterRegion}</td>
                                {/* <td className="heading">RAM : {azureItem_Network.text}</td> */}
                                {/* <td rowspan="2"><div className="priceDiv">Price : {azureFilterObj_Network.MeterRates[0]}</div></td> */}
                               <td></td>
                                <td rowspan="2"><div className="priceDiv">Price : {this.getAzurePrice_Network(azureFilterObj_Network.MeterRates[0])}</div></td>                      
                              </tr>
                              <tr>
                                <td className="heading">Sub Category : {azureFilterObj_Network.MeterSubCategory}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </Collapsible>
            </div>
            {/* region, fromLocation ,cloudName,price,usageType,transferType */}
            {<button id="hiddenbuttonAWS" onClick={this.BindAWSHtml_Network.bind(this)}>HiddenButtonAWS</button>}
            <div className="resultsCSS" id="awsResult">
              <Collapsible transitionTime={400} trigger="AWS Cloud Offers"><p className="cloudNameDiv">AWS</p>
              {<p className="offersCount">{awsJsonLength_Network} </p>}
                {this.state.awsArray_Network.map((awsFilterObj_Network, index) => {
                  return (
                    <div>
                      <div className="resultContainers" key={index}>
                        <div>
                          <table>
                            <tbody>
                              <tr>
                                <td className="heading">From Location : {awsFilterObj_Network.fromLocation}</td>
                                <td className="heading">To Location : {awsFilterObj_Network.toLocation}</td>
                                <td rowspan="2"><div className="priceDiv">Price : {awsFilterObj_Network.price}</div></td>
                              </tr>
                              <tr>
                                <td className="heading">Transfer Type : {awsFilterObj_Network.transferType}</td>
                                <td className="heading">Usage Type : {awsFilterObj_Network.usagetype}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </Collapsible>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Networking;

