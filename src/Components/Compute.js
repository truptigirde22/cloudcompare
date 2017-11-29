import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Cloud1 from './Cloud1';
import Slider from 'react-rangeslider'//Rahul
import 'react-rangeslider/lib/index.css'//Rahul
/*----------------Clear Cache------------------------*/
$.ajaxSetup({ cache: false });

let ang = '';

const items = [
  'One',
  'Two',
  'Three',
];
var indents = 66;

var finalObject = [];
var AWSJSONObject = "";
var AzureJSONObject = "";
var googleJSONObject = "";
/*---------- length of json pbj of all Clouds --------*/
var googleJsonLength = 0;
var azureJsonLength = 0;
var awsJsonLength = 0;
/*---------- Compute Category Filter Variables ----------*/
var jp = require('jsonpath');
var azureFilterObj = "";
var awsFilterObj = "";
var googleFilterObj = "";
var azureCategory = "Virtual Machines";
var region = "";
var os = "";
var ram = 0;
var vcpu = "";

/*------Variable use for Validation  -------*/
var cloudServises = '';
var chkGoogle = '';
var chkAws = '';
var chkAzure = '';
/*.................................Slider Variables...............................*/
var Slider_A = "";
/*--------- PC Region ------------*/
var PCRegion;

class Compute extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: "", value1: 0 };
    this.updateStateOS = this.updateStateOS.bind(this);
    this.updateStateRegion = this.updateStateRegion.bind(this);
    this.updateStateVcpu = this.updateStateVcpu.bind(this);
    this.state = {
      azureArray: [],
      awsArray: [],
      googleArray: []
    }
  }

  handleChangeRAM = value1 => {
    ram = value1;
    this.setState({
      value1: value1
    })

  };

  updateStateRegion(e) {
    region = e.target.value;
    this.setState({ data: e.target.value });
  }
  updateStateOS(e) {
    os = e.target.value;
    this.setState({ data: e.target.value });
  }
  updateStateVcpu(e) {
    vcpu = e.target.value;
    this.setState({ data: e.target.value });
  }
  getAzurePrice(azurePrice) {

    var price11 = azurePrice;
    price11 = price11 * 730.001;
    price11 = (Math.round(price11 * 100) / 100);
    price11 = "$" + price11 + "/Month";

    return price11;
  }
  /*--------- Bind Google Cloud HTML ----------*/
  BindGoogleHtml() {
    googleArray: [];
    $(".results").show();
    $('.divNoOffer').hide();
    $(".Collapsible__trigger").css("background-image", "url('../Image/arrowRight.png')");
    $(".Collapsible__trigger").css("opacity", "1");
    $(".Collapsible__trigger").css("color", "#0078d7");
    /*For showing no offer*/
    if (googleFilterObj.length == 0 || googleFilterObj == "" || googleFilterObj == undefined)
      $('.divNoOffer').show();
    else {
      $('#googleResult').show();
      googleJsonLength = "Total : " + googleFilterObj.length + "  Offers";
      this.setState({ googleArray: googleFilterObj });
      googleFilterObj = [];
    }
  }
  /*--------- Bind Azure Cloud HTML ----------*/
  BindAzureHtml() {
    azureArray: [];
    // $('#azureResult').show();
    $(".results").show();
    $('.divNoOffer').hide();
    $(".Collapsible__trigger").css("background-image", "url('../Image/arrowRight.png')");
    $(".Collapsible__trigger").css("opacity", "1");
    $(".Collapsible__trigger").css("color", "#0078d7");
    /*For showing no offer*/

    if (azureFilterObj.length == 0 || azureFilterObj == "" || azureFilterObj == undefined)
      $('.divNoOffer').show();
    else {
      $('#azureResult').show();
      azureJsonLength = "Total : " + azureFilterObj.length + "  Offers";
      this.setState({ azureArray: azureFilterObj });
      azureFilterObj = [];
    }
  }
  /*--------- Bind AWS Cloud HTML ----------*/
  BindAWSHtml() {
    awsArray: [];
    //$('#awsResult').show();
    $(".results").show();
    $('.divNoOffer').hide();
    $(".Collapsible__trigger").css("background-image", "url('../Image/arrowRight.png')");
    $(".Collapsible__trigger").css("opacity", "1");
    $(".Collapsible__trigger").css("color", "#0078d7");
    /*For showing no offer*/
    if (awsFilterObj.length == 0 || awsFilterObj == "" || awsFilterObj == undefined)
      $('.divNoOffer').show();
    else {
      $('#awsResult').show();
      awsJsonLength = "Total : " + awsFilterObj.length + "  Offers";
      this.setState({ awsArray: awsFilterObj });
      awsFilterObj = [];

    }
  }

  
  componentDidUpdate() {
    if (chkAzure == true)
      $('#optionalRow').hide();
    else
      $('#optionalRow').show();

    if (chkAws == true || chkGoogle == true)
      $('#optionalRow').show();

    /* $('.Collapsible').css("padding-bottom","0px!important");
     $('.Collapsible:last-child').css("padding-bottom","20px");*/


    /*added by trupti*/
    var $content = $("span.Collapsible__trigger").attr('class');

    if ($content.indexOf("open") != -1)
    {
      $(this).css("background-image", "url('../Image/arrowDown.png')");
    }
    else //($content.indexOf("closed") != -1)
    {
      $(this).css("background-image", "url('../Image/arrowRight.png')");
    }


    /*************/



  }
  componentDidMount() {
    if (chkAzure == true)
      $('#optionalRow').hide();
    else
      $('#optionalRow').show();

    if (chkAws == true || chkGoogle == true)
      $('#optionalRow').show();
  }
  /*--------- function to get Price of Google------------*/
  getGooglePrice(TotalPrice) {
    TotalPrice = googleFilterObj.TotalPrice + "/Hr"
  }

  render() {
    const { value1 } = this.state
    console.log(this.props);
    chkAws = this.props.ApiParameter.awsCloud;
    chkGoogle = this.props.ApiParameter.googleCloud;
    chkAzure = this.props.ApiParameter.azureCloud;
    googleJSONObject = this.props.ApiParameter.GoogleJSONObj;
    AzureJSONObject = this.props.ApiParameter.AzureJSONObject;
    //AWSJSONObject = this.props.ApiParameter.AWSJSONObject;
    PCRegion = this.props.ApiParameter.myPCRegion;
    /*---------- Compute Category Filter Variables ----------*/
    var jp = require('jsonpath');

    //on load validation
    if (chkAws == false && chkGoogle == false && chkAzure == false)//(e.target.value=='selectService')
    {
      alert('Please select the cloud first.');
      return false;
    }

    if (chkAzure == true)
      $('#optionalRow').hide();
    else
      $('#optionalRow').show();
    if (chkAws == true || chkGoogle == true)
      $('#optionalRow').show();

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
          return $header.text()//.replace("Collapse","Expand") //$content ="Expand";
        }
        else ($content.indexOf("closed") != -1)
        {
          $(this).css("background-image", "url('../Image/arrowDown.png')");
          $(this).css("opacity", "1");
          $(this).css("color", "#0078d7");
          return $header.text()//.replace("Expand","Collapse")//$content ="Collapse";
        }
      });
    });
    /*************/
    /*--------- get Region for AWS CLoud ------------*/
    function getRegion_AWS(region) {
      var awsRegion = JSON.parse('{"US East": "us-east-1", "US West": "us-west-2", "EU (London)": "eu-west-2", "Europe Central": "eu-central-1","Asia Pacific (Singapore)": "ap-southeast-1","Asia Pacific (Japan)": "ap-northeast-1","Asia Pacific (Sydney)": "ap-southeast-2","Asia Pacific (Mumbai)": "ap-south-1","Asia Pacific (Sao Paulo)": "sa-east-1"}');
      return awsRegion[region];
    }

    function getJSONObj() {
      /********** Validatation for Dropdowns and CHeckboxes ************/
      if (chkAws == false && chkGoogle == false && chkAzure == false) {
        alert("Please Select Cloud Name's to Compare");
        return false;
      }
      else if (region == "selectRegion" || region == "") {
        alert('Please Select Region');
        return false;
      }
      else if (os == "selectOS" || os == "") {
        alert('Please Select OS');
        return false;
      }

      
      awsFilterObj = [];
      azureFilterObj = [];
      googleFilterObj = [];
      $('#azureResult').hide();
      $('#awsResult').hide();
      $('#googleResult').hide();
      if (chkGoogle == true && googleJSONObject != "") {
        getFilterJSONObj_Google();
        $("#hiddenbuttonGoogle").click();
        // if(chkAws==true)        
        //     $("#loadingOnClick").show();
        // else
        //     $("#loadingOnClick").hide();
      }
      if (chkAzure == true && AzureJSONObject != "") {
        getFilterJSONObj_Azure();
        $("#hiddenbuttonAzure").click();
        // if(chkAws==true)        
        //   $("#loadingOnClick").show();
        // else
        //   $("#loadingOnClick").hide();
      }

      /******************************Call AWS  API********************************************/
      if (chkAws == true) {
        var getAWSRegion = getRegion_AWS(region);
        var AWSUrl = 'https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonEC2/current/' + getAWSRegion + '/index.json';
        var AWSRequest = require('request');
        $(".results").show(); 
        $("#loadingOnClick").show(); 

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
            console.log('AWS JSON:', data);
            AWSJSONObject = data;
            getFilterJSONObj_AWS();
            $("#hiddenbuttonAWS").click();
            $('#loadingOnClick').hide();
          }
        });
        
        // $.getJSON("./AmazonEC2.json", function(json) {
        //   console.log('yeu ja :', json); // this will show the info it in firebug console
        // });
      }
      else {
        AWSJSONObject = [];
        awsFilterObj = [];
      }

      // if (chkAws == true && AWSJSONObject != ""){
      //     getFilterJSONObj_AWS(); 
      //     $("#hiddenbuttonAWS").click();          
      // }
      
    }

    
    

    /*--------- get Region for AZURE CLoud ------------*/
    function getRegion_AZURE(region) {
      var azureRegion = JSON.parse('{"US East": "US East", "US West": "US West 2", "EU (London)": "UK South", "Europe Central": "eu-central-1","Asia Pacific (Singapore)": "AP Southeast","Asia Pacific (Japan)": "AP East","Asia Pacific (Sydney)": "AU Southeast","Asia Pacific (Mumbai)": "IN West","Asia Pacific (Sao Paulo)": "BR South"}');
      return azureRegion[region];
    }

    /*--------- get Region for AZURE CLoud ------------*/
    function getRegion_Google() {
      var googleRegion = JSON.parse('{"US East": "us-east4", "US West": "us-west1", "EU (London)": "europe-west2", "Europe Central": "europe-west3","Asia Pacific (Singapore)": "asia-southeast","Asia Pacific (Japan)": "asia-northeast","Asia Pacific (Sydney)": "australia-southeast1","Asia Pacific (Mumbai)": "IN West","Asia Pacific (Sao Paulo)": "southamerica-east1"}');
      return googleRegion[region];
    }

    /*------------------- Azure -----------------*/
    function getFilterJSONObj_Azure() {
      var queryAzure = "";
      var azureReg = getRegion_AZURE(region);
      queryAzure = "$.Meters[?(@.MeterCategory =='" + azureCategory + "'&& @.MeterSubCategory &&  /" + os + "/.test(@.MeterSubCategory ) && @.MeterRegion=='" + azureReg + "')]";
      // if (ram != 0) {
      //   if (vcpu != "")
      //     queryAzure = "$.Meters[?(@.MeterCategory =='" + azureCategory + "'&& @.MeterSubCategory &&  /" + os + "/.test(@.MeterSubCategory ) && @.MeterRegion=='" + azureReg + "')]"; //&& @.RAM=='" + ram + "'&& @.VCPU=='" + vcpu + "')]";
      //   else if (vcpu == "")
      //     queryAzure = "$.Meters[?(@.MeterCategory =='" + azureCategory + "'&& @.MeterSubCategory &&  /" + os + "/.test(@.MeterSubCategory ) && @.MeterRegion=='" + azureReg + "')]"; //&& @.RAM=='" + ram + "')]";
      // }
      // if (ram == 0) {
      //   if (vcpu != "")
      //     queryAzure = "$.Meters[?(@.MeterCategory =='" + azureCategory + "'&& @.MeterSubCategory &&  /" + os + "/.test(@.MeterSubCategory ) && @.MeterRegion=='" + azureReg + "')]"; //&& @.VCPU=='" + vcpu + "')]";
      //   else if (vcpu == "")
      //     queryAzure = "$.Meters[?(@.MeterCategory =='" + azureCategory + "'&& @.MeterSubCategory &&  /" + os + "/.test(@.MeterSubCategory ) && @.MeterRegion=='" + azureReg + "')]";
      // }

      azureFilterObj = jp.query(AzureJSONObject, queryAzure)
      console.log('Azure Filter JSON:', azureFilterObj);
    }

    /*------------------- AWS -----------------*/
    function getFilterJSONObj_AWS() {
      var queryAWS = "";
      if (ram != 0) {
        if (vcpu != "" && vcpu != "selectVcpu")
          queryAWS = "$.products[*][?(@.operatingSystem=='" + os + "' && @.vcpu=='" + vcpu + "' && @.memory =='" + ram + " GiB')]";
        // queryAWS = "$.products[*][?(@.operatingSystem=='"+os+"' && @.vcpu=='"+vcpu+"' && @.memory=='"+ram +"')]]";
        else if (vcpu == "" || vcpu != "selectVcpu")
          queryAWS = "$.products[*][?(@.operatingSystem=='" + os + "' && @.memory =='" + ram + " GiB')]";
        //queryAWS = "$.products[*][?(@.operatingSystem=='"+os+"' && @.memory=='"+ram +"')]";
      }
      else if (ram == 0) {
        if (vcpu != "" && vcpu != "selectVcpu")
          queryAWS = "$.products[*][?(@.operatingSystem=='" + os + "' && @.vcpu=='" + vcpu + "')]";
        else if (vcpu == "" || vcpu != "selectVcpu")
          queryAWS = "$.products[*][?(@.operatingSystem=='" + os + "')]";
      }

      awsFilterObj = jp.query(AWSJSONObject, queryAWS)
      console.log('AWS Filter JSON:', awsFilterObj);

    }

    /*------------------- Google -----------------*/
    /*--------- get os for google CLoud ------------*/
    function getOs_Google() {
      var googleOS = JSON.parse('{"Windows": "win", "Linux": "rhel"}');
      return googleOS[os];
    }
    //var os="Windows";
    function getFilterJSONObj_Google() {
      var getGoogleRegion = getRegion_Google();
      //var getGoogleRegion ="us";
      var userVcup = vcpu;
      var userOs = getOs_Google();
      var userMemory = ram;
      /***********Os filteration***************** */
      var queryGoogle = "$.gcp_price_list[?(@.win)]." + userOs;
      var googleFilterOs = jp.query(googleJSONObject, queryGoogle)

      /************************ */
      var i;
      var googlePreFilterObject = [];


      /******region filteration***** */

      /************************** */
      for (i in googleJSONObject.gcp_price_list) {
        // i is the key of the user currently iterated.

        if (i.indexOf("CP-COMPUTEENGINE-VMIMAGE-") !== -1) { //condition chk if block related to compute? or not
          var manualCreatedObj = {};
          manualCreatedObj['Price'] = googleJSONObject.gcp_price_list[i][getGoogleRegion];
          if (manualCreatedObj['Price'] >= 0) {
            googleJSONObject.gcp_price_list[i].instanceType = i;

            /*********Creating new filter object*********** */

            var coresFromJson = googleJSONObject.gcp_price_list[i]['cores'];
            manualCreatedObj['region'] = getGoogleRegion;
            manualCreatedObj['Vcpu'] = coresFromJson;
            manualCreatedObj['memory'] = googleJSONObject.gcp_price_list[i]['memory'];
            manualCreatedObj['instanceType'] = i;
            /************Calculated Price************ */
            var OsCost = 0; /**if 4 and lessthen 4 then low else above 4 ..high** */
            if ((i.indexOf("F1-MICRO") !== -1 || i.indexOf("G1-SMALL") !== -1)) {
              OsCost = googleFilterOs[0]['low'];
            }
            else if (coresFromJson <= 4) {
              OsCost = googleFilterOs[0]['low'];
            }
            else if (coresFromJson > 4) {
              OsCost = googleFilterOs[0]['high'];
            }
            manualCreatedObj['OsPrice'] = OsCost;
            manualCreatedObj['Price'] = googleJSONObject.gcp_price_list[i][getGoogleRegion];

            var TotalPrice_object = googleJSONObject.gcp_price_list[i][getGoogleRegion] + OsCost;
            TotalPrice_object = (Math.round(TotalPrice_object * 100) / 100) + " /Hr"
            manualCreatedObj['TotalPrice'] = TotalPrice_object;

            //manualCreatedObj['TotalPrice']=googleJSONObject.gcp_price_list[i][getGoogleRegion]+OsCost;
            /*********End************* */


            googlePreFilterObject.push(manualCreatedObj);
          }
        }

      }
      if (googlePreFilterObject.length > 0) {
        /****************If Vcpu selected********* */
        if (userVcup != "" && userVcup != "selectVcpu") {
          var Enumerable = require('linq');
          var googleVcpuFilterObject = Enumerable.from(googlePreFilterObject)
            .select("$")
            .where('$.Vcpu == ' + userVcup)
            .toArray();
          console.log(googleVcpuFilterObject);
          //  if(googleVcpuFilterObject.length>0)
          googlePreFilterObject = googleVcpuFilterObject
        }
        /**********************End Vcpu************************ */

        /****************If Memory selected********* */
        if (userMemory != "") {
          var Enumerable = require('linq');
          var googleMemoryFilterObject = Enumerable.from(googlePreFilterObject)
            .select("$")
            //.where('$.memory >= '+userMemory-10  || '$.memory <= '+userMemory+10)
            .where('$.memory == ' + userMemory)
            .toArray();
          console.log(googleMemoryFilterObject);
          //  if(googleVcpuFilterObject.length>0)
          googlePreFilterObject = googleMemoryFilterObject
        }
      }
      /**********************End Vcpu************************ */

      googleFilterObj = googlePreFilterObject;
      console.log(googlePreFilterObject);
    }

    return (
      <div>
       
        <div className="filters"  >
          <div className="note">Note : Filters may vary as per selection of cloud and services.</div>
          <div className="divName"> Filters</div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <div className="leftDivCompute"><label> Region:</label>
                    </div><div className="rightDivCompute">*</div>
                  </td>
                  <td>
                    <div >
                      <select className="Dropdownmenu" onChange={this.updateStateRegion}>
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
                  <td>
                    <div className="leftDiv"><label> OS:</label>
                    </div><div className="rightDiv">*</div>
                  </td>
                  <td>
                    <div >
                      <select className="Dropdownmenu" onChange={this.updateStateOS}>
                        <option value="selectOS" >Select OS</option>
                        <option value="Windows" >Windows </option>
                        <option value="Linux">Linux</option>
                      </select>
                    </div>
                  </td>
                </tr>
                <tr id="optionalRow">
                  <td className="divRam">
                    <label> RAM :</label>
                  </td>
                  <td>
                    <div >
                      <Slider className='sliderCompute' min={0} max={1000} value={value1} /*{value1}*/
                        onChange={this.handleChangeRAM} />
                      <div className="slider2Div">
                        <table className="TableSliderRange">
                          <tr>
                            <td className="Slidertd1Compute">
                              <label className="SliderRangeValues1">0</label>
                            </td>
                            <td className="Slidertd2Compute">
                              <label className="SliderRangeValues2">{ram}</label>
                            </td>
                            <td className="Slidertd3Compute">
                              <label className="SliderRangeValues3">1000</label>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </td>
                  <td className="divVcpu">
                    <label>VCPU :</label>
                  </td>
                  <td>
                    <div className="divDDLVCPU">
                      <select className="Dropdownmenu" onChange={this.updateStateVcpu}>
                        <option value="selectVcpu" >Select Vcpu</option>
                        <option value="1" >1 </option>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                        <option value="8">8</option>
                        <option value="12">12</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="20">20</option>
                        <option value="24">24</option>
                        <option value="32">32</option>
                        <option value="36">36</option>
                        <option value="40">40</option>
                        <option value="64">64</option>
                        <option value="72">72</option>
                        <option value="96">96</option>
                        <option value="128">128</option>
                      </select>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            {/* <DataPass ApiParameter={ApiParameter}/> */}
          </div>
        </div>
        <div className="btnDiv">
          <button className="GoBtn" onClick={getJSONObj} >Show Offers</button>
        </div>

        <div className="results">
          {/* {<button id="hiddenbutton" onClick={this.BindGoogleHtml.bind(this)}>HiddenButton</button>} */}
          <div className="divNoOffer">No Offers Available..</div>
          {<button id="hiddenbuttonGoogle" onClick={this.BindGoogleHtml.bind(this)}>HiddenButtonGoogle</button>}
          <div className="resultsCSS" id="googleResult">
            <Collapsible transitionTime={400} trigger="Google Cloud Offers">
              <p className="cloudNameDiv">Google</p>
              {<p className="offersCount">{googleJsonLength} </p>}
              {this.state.googleArray.map((googleFilterObj, index) => {
                return (
                  <div>
                    <div className="resultContainers" key={index}>
                      <div>
                        <table>
                          <tbody>
                            <tr>
                              <td className="heading">Region : {googleFilterObj.region}</td>
                              <td className="heading">RAM : {googleFilterObj.memory}</td>
                              <td rowspan="2"><div className="priceDiv">Price : {googleFilterObj.TotalPrice} </div></td>
                            </tr>
                            <tr>
                              <td className="heading">Instance : {googleFilterObj.instanceType} </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div></div>
                )
              })}
            </Collapsible>
          </div>
          
          {<button id="hiddenbuttonAzure" onClick={this.BindAzureHtml.bind(this)}>HiddenButtonAzure</button>}
          <div className="resultsCSS" id="azureResult">
            <Collapsible transitionTime={400} trigger="Azure Cloud Offers">
              <p className="cloudNameDiv">Azure</p>
              {<p className="offersCount">{azureJsonLength} </p>}
              {this.state.azureArray.map((azureFilterObj, index) => {
                return (
                  <div>
                    <div className="resultContainers" key={index}>
                      <div>
                        <table>
                          <tbody>
                            <tr>
                              <td className="heading">Region : {azureFilterObj.MeterRegion}</td>
                              {/* <td className="heading">RAM : {item.text}</td> */}
                              <td></td>
                              {/* <td rowspan="2"><div className="priceDiv">Price : {azureFilterObj.MeterRates[0]} /Month</div></td> */}
                              <td rowspan="2"><div className="priceDiv">Price : {this.getAzurePrice(azureFilterObj.MeterRates[0])}</div></td>
                            </tr>
                            <tr>
                              <td className="heading">Instance : {azureFilterObj.MeterSubCategory}</td>
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

          <div id="loadingOnClick"></div>
          {<button id="hiddenbuttonAWS" onClick={this.BindAWSHtml.bind(this)}>HiddenButtonAWS</button>}
          <div className="resultsCSS" id="awsResult">
            <Collapsible transitionTime={400} trigger="AWS Cloud Offers">
              <p className="cloudNameDiv">AWS</p>
              {<p className="offersCount">{awsJsonLength} </p>}
              {this.state.awsArray.map((awsFilterObj, index) => {
                return (
                  <div>
                    <div className="resultContainers" key={index}>
                      <div>
                        <table>
                          <tbody>
                            <tr>
                              <td className="heading">Region : {awsFilterObj.location}</td>
                              <td class Name="heading">RAM : {awsFilterObj.memory}</td>
                              <td rowspan="2"> <div className="priceDiv">Price : {awsFilterObj.price}</div></td>
                            </tr>
                            <tr>
                              <td className="heading">Instance : {awsFilterObj.instanceType}</td>
                              <td className="heading">PreInstalled S/W :{awsFilterObj.preInstalledSw}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div></div>
                )
              })}
            </Collapsible>
          </div>
        </div>
      </div>
    );
  }

}
export default Compute;