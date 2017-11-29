import React, { Component } from 'react';
import Collapsible from 'react-collapsible';//trupti
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


var region = '';
var azureCategory_Storage = "Storage";//trupti

/*----- Json data Variable -----------*/
var AWSJSONObject_Storage = "";
var awsFilterObj_Storage = '';
var AzureJSONObject_Storage = "";//trupti
var azureFilterObj_Storage = "";//trupti
/*------Variable use for Validation  -------*/
var cloudServises = '';
var chkGoogle = '';
var chkAws = '';
var chkAzure = '';


/*---------- length of json pbj of all Clouds --------*/
var googleJsonLength_Storage = 0;
var azureJsonLength_Storage = 0;
var awsJsonLength_Storage = 0;

/*--------- PC Region ------------*/


var chkTransferType = "";
var ddlTransferType = 'InterRegion Inbound';

/*********Google vriable************** */
var GoogleJSONObject_Storage = "";
var googleFilterObj_Storage = '';

/*.................................Slider Variables...............................*/
var rigonal_slider_Storge = 0;
var multiRigonal_Storge = 0;
var nearline_Storge = 0;
var coldline_Storge = 0;
/*...................................variable of Dropdown.............................*/




class Storage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { checked: false, checked2: false, checked3: false, data: "", value1: 0, value2: 0, value3: 0, value4: 0, dataDDS: "", dataRegionStorage: "", checkedDDN: false };
        //trupti  
        this.state = {
            azureArray_Storage: [],
            awsArray_Storage: [],
            googleArray_Storage: []
        }

        this.updateStateDDS = this.updateStateDDS.bind(this);
        this.updateStateRegionStorage = this.updateStateRegionStorage.bind(this);
        this.handleChangeDDN = this.handleChangeDDN.bind(this);
    }

    /*.........................................handle change slider by Rahul.........................................*/

    handleChange = value1 => {
        rigonal_slider_Storge = value1;
        this.setState({
            value1: value1
        })
    };

    handleChange2 = value2 => {
        nearline_Storge = value2;
        this.setState({
            value2: value2
        })
    };

    handleChange3 = value3 => {
        multiRigonal_Storge = value3;
        this.setState({
            value3: value3
        })
    };

    handleChange4 = value4 => {
        coldline_Storge = value4;
        this.setState({
            value4: value4
        })
    };


    /*...................................................dropdown handler by rahul............................*/
    /*..............................checkbox handler by Rahul...............................*/
    handleChangeDDN() {
        chkTransferType = !this.state.checkedDDN;
        this.setState({
            checkedDDN: !this.state.checkedDDN
        })
    }
    updateStateDDS(e) {
        ddlTransferType = e.target.value;
        this.setState({ dataDDS: e.target.value });
    }
    /*.................................................................Update state region........................*/
    updateStateRegionStorage(e) {
        region = e.target.value;
        this.setState({ dataRegionStorage: e.target.value });
    }

    /*--------- Bind Google Cloud HTML ----------*/
    BindGoogleHtml_Storage() {
        googleArray_Storage: [];
        $(".results").show();
        $('.divNoOffer').hide();
        $(".Collapsible__trigger").css("background-image", "url('../Image/arrowRight.png')");
        $(".Collapsible__trigger").css("opacity", "1");
        $(".Collapsible__trigger").css("color", "#0078d7");
        /*For showing no offer*/
        if (googleFilterObj_Storage.length == 0 || googleFilterObj_Storage == "" || googleFilterObj_Storage == undefined)
            $('.divNoOffer').show();
        else {
            $('#googleResult').show();

            var dummy_Storage = [];
            dummy_Storage.push(googleFilterObj_Storage);
            googleJsonLength_Storage = "Total : " + dummy_Storage.length + "  Offers";
            this.setState({ googleArray_Storage: dummy_Storage });
            dummy_Storage = [];
            googleFilterObj_Storage = [];
        }
    }
    getAzurePrice_Storage(azurePrice, azureUnit) {
        var price11 = azurePrice;
        //price11 = price11 * 730.001;
        price11 = (Math.round(price11 * 100) / 100);
        //price11 = "$" + price11 + "/Month";
        price11 = "$" + Math.round(price11) + "/" + azureUnit;
        return price11;
    }
    /*--------- Bind Azure Cloud HTML ----------*/
    BindAzureHtml_Storage() {
        azureArray_Storage: [];
        // $('#azureResult').show();
        $(".results").show();
        $('.divNoOffer').hide();
        $(".Collapsible__trigger").css("background-image", "url('../Image/arrowRight.png')");
        $(".Collapsible__trigger").css("opacity", "1");
        $(".Collapsible__trigger").css("color", "#0078d7");
        /*For showing no offer*/
        if (azureFilterObj_Storage.length == 0 || azureFilterObj_Storage == "" || azureFilterObj_Storage == undefined)
            $('.divNoOffer').show();
        else {
            $('#azureResult').show();
            azureJsonLength_Storage = "Total : " + azureFilterObj_Storage.length + "  Offers";
            this.setState({ azureArray_Storage: azureFilterObj_Storage });
            azureFilterObj_Storage = [];
        }
    }
    /*--------- Bind AWS Cloud HTML ----------*/
    BindAWSHtml_Storage() {
        awsArray_Storage: [];
        //$('#awsResult').show();
        $(".results").show();
        $('.divNoOffer').hide();
        $(".Collapsible__trigger").css("background-image", "url('../Image/arrowRight.png')");
        $(".Collapsible__trigger").css("opacity", "1");
        $(".Collapsible__trigger").css("color", "#0078d7");
        /*For showing no offer*/
        if (awsFilterObj_Storage.length == 0 || awsFilterObj_Storage == "" || awsFilterObj_Storage == undefined)
            $('.divNoOffer').show();
        else {
            $('#awsResult').show();
            awsJsonLength_Storage = "Total : " + awsFilterObj_Storage.length + "  Offers";
            this.setState({ awsArray_Storage: awsFilterObj_Storage });
            awsFilterObj_Storage = [];
        }
    }


    componentDidUpdate() {
        if (chkGoogle == true)
            $('#googleTable').show();
        else
            $('#googleTable').hide();

        if (chkAws == true)
            $('#awsTable').show();
        else
            $('#awsTable').hide();
    }
    componentDidMount() {
        $('.SliderRangeValues2').text('0');

        if (chkGoogle == true)
            $('#googleTable').show();
        else
            $('#googleTable').hide();

        if (chkAws == true)
            $('#awsTable').show();
        else
            $('#awsTable').hide();

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
        GoogleJSONObject_Storage = this.props.ApiParameter.GoogleJSONObj;
        AzureJSONObject_Storage = this.props.ApiParameter.AzureJSONObject;


        /*---------- Compute Category Filter Variables ----------*/
        var jp = require('jsonpath');

        //on load validation

        if (chkAws == false && chkGoogle == false && chkAzure == false)//(e.target.value=='selectService')
        {
            alert('Please select the cloud first.');
            return false;
        }

        if (chkGoogle == true)
            $('#googleTable').show();
        else
            $('#googleTable').hide();

        //transferTable
        if (chkAws == true)
            $('#awsTable').show();
        else
            $('#awsTable').hide();

        /************************************************* */

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
        function getRegion_AWS_Storage(region) {
            var awsRegion = JSON.parse('{"US East": "us-east-1", "US West": "us-west-2", "EU (London)": "eu-west-2", "Europe Central": "eu-central-1","Asia Pacific (Singapore)": "ap-southeast-1","Asia Pacific (Japan)": "ap-northeast-1","Asia Pacific (Sydney)": "ap-southeast-2","Asia Pacific (Mumbai)": "ap-south-1","Asia Pacific (Sao Paulo)": "sa-east-1"}');
            return awsRegion[region];
        }

        function getJSONObj_Storage() {

            /********** Validatation for Dropdowns and CHeckboxes ************/
            if (chkAws == false && chkGoogle == false && chkAzure == false) {
                alert("Please Select Cloud Name's to Compare");
                return false;
            }
            else if (region == "selectRegion" || region == "") {
                alert('Please Select Region');
                return false;
            }
            $("#loadingOnClick").show();
            awsFilterObj_Storage = [];
            azureFilterObj_Storage = [];
            googleFilterObj_Storage = [];
            $('#azureResult').hide();
            $('#awsResult').hide();
            $('#googleResult').hide();
            /******************************Call AWS  API********************************************/
            if (chkAws == true) {
                var getAWSRegion = getRegion_AWS_Storage(region);

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
                    } else if (res.statusCode != 200) {
                        console.log('Status:', res.statusCode);
                    } else {
                        console.log('AWS Storage JSON:', data);
                        AWSJSONObject_Storage = data;
                        if (ddlTransferType != "") {
                            var queryAWS = "";
                            if (ddlTransferType == 'Accelerated InterRegion Inbound')
                                queryAWS = "$.products[*][?(@.transferType &&  /Accelerated InterRegion Inbound/.test(@.transferType ))]";
                            else if (ddlTransferType == 'Accelerated InterRegion Outbound')
                                queryAWS = "$.products[*][?(@.transferType &&  /Accelerated InterRegion Outbound/.test(@.transferType ))]";

                            else
                                queryAWS = "$.products[*][?(@.transferType=='" + ddlTransferType + "')]";

                            awsFilterObj_Storage = jp.query(AWSJSONObject_Storage, queryAWS)
                            console.log('AWS Filter JSON Storage:', awsFilterObj_Storage);
                        }
                        else {
                            var queryAWS = "";
                            queryAWS = "$.products[*].attributes";
                            awsFilterObj_Storage = jp.query(AWSJSONObject_Storage, queryAWS)
                            console.log('AWS Filter JSON Network:', awsFilterObj_Storage);
                        }
                        $("#hiddenbuttonAWS").click();
                    }
                });
            }
            else {
                AWSJSONObject_Storage = [];
                awsFilterObj_Storage = [];
            }

            if (chkGoogle == true && GoogleJSONObject_Storage != "") {
                getFilterJSONObj_Google_Storage();
                $("#hiddenbuttonGoogle").click();
            }
            if (chkAzure == true && AzureJSONObject_Storage != "") {
                getFilterJSONObj_Azure_Storage();
                $("#hiddenbuttonAzure").click();
            }
            $('#loadingOnClick').hide();
        }



        /*--------- get Region for Google CLoud ------------*/
        function getRegion_Google(region) {
            var googleRegion = JSON.parse('{"US East": "us-east4", "US West": "us-west1", "EU (London)": "europe-west2", "Europe Central": "europe-west3","Asia Pacific (Singapore)": "asia-southeast","Asia Pacific (Japan)": "asia-northeast","Asia Pacific (Sydney)": "australia-southeast1","Asia Pacific (Mumbai)": "IN West","Asia Pacific (Sao Paulo)": "southamerica-east1"}');
            return googleRegion[region];
        }


        /*--------- get Region for AZURE CLoud ------------*/
        function getRegion_AZURE(region) {
            var azureRegion = JSON.parse('{"US East": "US East", "US West": "US West 2", "EU (London)": "UK South", "Europe Central": "eu-central-1","Asia Pacific (Singapore)": "AP Southeast","Asia Pacific (Japan)": "AP East","Asia Pacific (Sydney)": "AU Southeast","Asia Pacific (Mumbai)": "IN West","Asia Pacific (Sao Paulo)": "BR South"}');
            return azureRegion[region];
        }

        var azureSubCategory_Network = 'ExpressRoute';//Geo Redundant//Basic Application Gateway (Large) // Geo Redundant // Virtual Network // Basic Application Gateway (Medium) //Basic Application Gateway (Small)                                             

        /*------------------- Azure -----------------*/
        function getFilterJSONObj_Azure_Storage() {
            var azureReg = getRegion_AZURE(region);
            var queryAzure = "$.Meters[?(@.MeterCategory =='" + azureCategory_Storage + "'&& @.MeterRegion=='" + azureReg + "')]";
            /*if (ram != "") {
            if (vcpu != "")
                queryAzure = "$.Meters[?(@.MeterCategory =='" + azureCategory_Storage + "'&& @.MeterSubCategory &&  /" + os + "/.test(@.MeterSubCategory ) && @.MeterRegion=='" + region + "')]"; //&& @.RAM=='" + ram + "'&& @.VCPU=='" + vcpu + "')]";
            else if (vcpu == "")
                queryAzure = "$.Meters[?(@.MeterCategory =='" + azureCategory_Storage + "'&& @.MeterSubCategory &&  /" + os + "/.test(@.MeterSubCategory ) && @.MeterRegion=='" + region + "')]"; //&& @.RAM=='" + ram + "')]";
            }
            else if (ram == "") {
            if (vcpu != "")
                queryAzure = "$.Meters[?(@.MeterCategory =='" + azureCategory_Storage + "'&& @.MeterSubCategory &&  /" + os + "/.test(@.MeterSubCategory ) && @.MeterRegion=='" + region + "')]"; //&& @.VCPU=='" + vcpu + "')]";
            else if (vcpu == "")
                queryAzure = "$.Meters[?(@.MeterCategory =='" + azureCategory_Storage + "'&& @.MeterSubCategory &&  /" + os + "/.test(@.MeterSubCategory ) && @.MeterRegion=='" + region + "')]";
            }*/

            azureFilterObj_Storage = jp.query(AzureJSONObject_Storage, queryAzure)
            console.log('Azure Filter JSON:', azureFilterObj_Storage);
        }

        /*************************Google********************** */
        function getJSONByFilterParameter(userFilterValue) {
            var userSelectParameter = userFilterValue;
            var getGoogleRegion_Storage = getRegion_Google(region);
            var queryGoogle_Storage = "$..[" + userSelectParameter + "]";
            var googleFilterOs_Storage = jp.query(GoogleJSONObject_Storage, queryGoogle_Storage)
            //console.log(googleFilterOs_Storage);
            //googleFilterOs_Storage[0]['us-west1']
            var a = googleFilterOs_Storage[0][getGoogleRegion_Storage];
            return a;
        }

        function getFilterJSONObj_Google_Storage() {
            /*******Variables use in Final object for storage******* */
            //user selected
            var UserMultiRegional_Storage = multiRigonal_Storge;
            var userSelectedReginal = rigonal_slider_Storge;
            var UserRegional_Storage = userSelectedReginal > 1 ? userSelectedReginal : 1;
            var UserNearline_Storage = nearline_Storge;
            var UserColdline_Storage = coldline_Storge;

            //calculated
            var MULTI_REGIONAL_Price = 0;
            var REGIONAL_Price = 0; //Default we set "1", bcz we need atlest one value to calculate cost 
            var Cloud_Storage_Nearline_Price = 0;
            var Cloud_Storage_Coldline_Price = 0;
            /***********END*********** */

            /*************Regional Filteration************** */
            var userSelectParameter = "'CP-BIGSTORE-STORAGE-REGIONAL'";
            var unitREGIONAL_Price = getJSONByFilterParameter(userSelectParameter);
            REGIONAL_Price = unitREGIONAL_Price * UserRegional_Storage;
            UserRegional_Storage = UserRegional_Storage + " GB";
            /*************Multi_Regional Filteration************** */
            var unitMulti_REGIONAL_Price = 0;
            if (UserMultiRegional_Storage > 0) {
                var userSelectParameter = "'CP-BIGSTORE-STORAGE-MULTI_REGIONAL'";
                unitMulti_REGIONAL_Price = getJSONByFilterParameter(userSelectParameter);
                MULTI_REGIONAL_Price = unitMulti_REGIONAL_Price * UserMultiRegional_Storage;
                UserMultiRegional_Storage = UserMultiRegional_Storage + " GB";
            }

            /*************Nearline Filteration************** */
            var unitNearline_REGIONAL_Price = 0;
            if (UserNearline_Storage > 0) {
                var userSelectParameter = "'CP-BIGSTORE-STORAGE-NEARLINE'";
                unitNearline_REGIONAL_Price = getJSONByFilterParameter(userSelectParameter);
                Cloud_Storage_Nearline_Price = unitNearline_REGIONAL_Price * UserNearline_Storage;
                UserNearline_Storage = UserNearline_Storage + " GB";
            }


            /*************Coldline Filteration************** */
            var unitCold_REGIONAL_Price = 0;
            if (UserColdline_Storage > 0) {
                var userSelectParameter = "'CP-BIGSTORE-STORAGE-COLDLINE'";
                unitCold_REGIONAL_Price = getJSONByFilterParameter(userSelectParameter);
                Cloud_Storage_Coldline_Price = unitCold_REGIONAL_Price * UserColdline_Storage;
                UserColdline_Storage = UserColdline_Storage + " GB";
            }
            var finalRegion = REGIONAL_Price + MULTI_REGIONAL_Price + Cloud_Storage_Nearline_Price + Cloud_Storage_Coldline_Price;
            if (UserMultiRegional_Storage == 0) {
                UserMultiRegional_Storage = "N/A";
            }
            if (UserNearline_Storage == 0) {
                UserNearline_Storage = "N/A";
            }
            if (UserColdline_Storage == 0) {
                UserColdline_Storage = "N/A";
            }

            var getFinalGoogleObject_Storage = null;
            if (finalRegion >= 0) {
                getFinalGoogleObject_Storage = ({
                    "Regional_Storage": UserRegional_Storage,
                    "Regional_Storage_Price": unitREGIONAL_Price,
                    "Multi_Regional_Storage": UserMultiRegional_Storage,
                    "Multi_Regional_Storage_Price": unitMulti_REGIONAL_Price,
                    "Nearline_Storage": UserNearline_Storage,
                    "Nearline_Storage_Price": unitNearline_REGIONAL_Price,
                    "Coldline_Storage": UserColdline_Storage,
                    "Coldline_Storage_Price": unitCold_REGIONAL_Price,
                    "Total_Price": (Math.round(finalRegion * 100) / 100)
                });
            }
            googleFilterObj_Storage = getFinalGoogleObject_Storage;
            console.log(getFinalGoogleObject_Storage);
        }

        return (
            <div>
                <div id="loadingOnClick"></div>
                <div className="StorageDiv">
                    <div className="divName" id="filters"> Filters</div>
                    <div className="note">Note : Filters may vary as per selection of cloud and services.</div>
                    <table className="sntable">
                        <tr>
                            <td className="StorageTD" id="regionStorage">
                                <div className="leftDiv"><label> Region:</label>
                                </div><div className="rightDiv">*</div>
                            </td>
                            <td className="StorageTD">
                                <div >
                                    <select className="Dropdownmenu" onChange={this.updateStateRegionStorage}>
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
                    <table id="awsTable">

                        <tr>
                            {/* <td>

                            </td> */}
                            <td className="StorageTD">
                                {/* <input type="checkbox" checked={ this.state.checkedDDN } 
          onChange={ this.handleChangeDDN } /> */}<label>Transfer Type</label>
                            </td>
                            <td>
                                <div className="StorageTD">
                                    <select className="storageDD" onChange={this.updateStateDDS}>
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
                        </tr>
                    </table>
                    <table className="sntable" id="googleTable">
                        <tr>
                            <td className="StorageTD">

                            </td>
                            <td className="StorageTD">
                                {/* <input type="checkbox"  />  */}
                                <label>Region Storage</label>
                            </td>
                            <td>
                                <Slider
                                    className='slider'
                                    min={0}
                                    max={100}
                                    value={value1}

                                    /* onChangeStart={this.handleChangeStart}*/
                                    onChange={this.handleChange}
                                /*onChangeComplete={this.handleChangeComplete}*/
                                />
                                {/*..............................................New code for Sliders Labels By Rahul.................................*/}
                                <div className="slider2Div">
                                    <table className="TableSliderRange">
                                        <tr>
                                            <td className="Slidertd1">
                                                <label className="SliderRangeValues1">0</label>
                                            </td>
                                            <td className="Slidertd2">
                                                <label className="SliderRangeValues2">{rigonal_slider_Storge}</label>
                                            </td>
                                            <td className="Slidertd3">
                                                <label className="SliderRangeValues3">100</label>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                            <td className="StorageTD">
                            </td>
                            <td className="StorageTD">
                                {/* <input type="checkbox"  /> */}
                                <label>Nearline Storage</label>
                            </td>
                            <td>
                                <Slider
                                    className='slider'
                                    min={0}
                                    max={100}
                                    value={value2}

                                    /* onChangeStart={this.handleChangeStart}*/
                                    onChange={this.handleChange2}
                                /*onChangeComplete={this.handleChangeComplete}*/
                                />
                                {/*..............................................New code for Sliders Labels By Rahul.................................*/}
                                <div className="slider2Div">
                                    <table className="TableSliderRange">
                                        <tr>
                                            <td className="Slidertd1">
                                                <label className="SliderRangeValues1">0</label>
                                            </td>
                                            <td className="Slidertd2">
                                                <label className="SliderRangeValues2">{nearline_Storge}</label>
                                            </td>
                                            <td className="Slidertd3">
                                                <label className="SliderRangeValues3">100</label>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            </td>
                            <td className="StorageTD">
                                {/* <input type="checkbox"  /> */}
                                <label>MultiRegional Storage</label>
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
                                {/*..............................................New code for Sliders Labels By Rahul.................................*/}
                                <div className="slider2Div">
                                    <table className="TableSliderRange">
                                        <tr>
                                            <td className="Slidertd1">
                                                <label className="SliderRangeValues1">0</label>
                                            </td>
                                            <td className="Slidertd2">
                                                <label className="SliderRangeValues2">{multiRigonal_Storge}</label>
                                            </td>
                                            <td className="Slidertd3">
                                                <label className="SliderRangeValues3">100</label>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                {/* <div className='value'>{value3}</div>*/}
                            </td>
                            <td>
                            </td>
                            <td className="StorageTD">
                                {/* <input type="checkbox"  /> */}
                                <label> Coldline Storages</label>
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
                                {/*..............................................New code for Sliders Labels By Rahul.................................*/}
                                <div className="slider2Div">
                                    <table className="TableSliderRange">
                                        <tr>
                                            <td className="Slidertd1">
                                                <label className="SliderRangeValues1">0</label>
                                            </td>
                                            <td className="Slidertd2">
                                                <label className="SliderRangeValues2">{coldline_Storge}</label>
                                            </td>
                                            <td className="Slidertd3">
                                                <label className="SliderRangeValues3">100</label>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                {/*<div className='value'>{value4}</div>*/}
                                {/*<h1>{Slider_Y}</h1>*/}
                            </td>
                        </tr>
                    </table>
                </div>
                <div className="container">
                    <div className="btnDiv">
                        <button className="GoBtn" onClick={getJSONObj_Storage}>Show Offers</button>
                    </div>
                    <div className="results">
                        <div className="divNoOffer">No Offers Available..</div>
                        {<button id="hiddenbuttonGoogle" onClick={this.BindGoogleHtml_Storage.bind(this)}>HiddenButtonGoogle</button>}
                        <div className="resultsCSS" id="googleResult">
                            <Collapsible transitionTime={400} trigger="Google Cloud Offers">
                                <p className="cloudNameDiv">Google</p>
                                {<p className="offersCount">{googleJsonLength_Storage} </p>}
                                {this.state.googleArray_Storage.map((googleFilterObj_Storage, index) => {
                                    return (
                                        <div>
                                            <div className="resultContainers" key={index}>
                                                <div>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td className="heading">Regional Storage : {googleFilterObj_Storage.Regional_Storage}</td>
                                                                <td className="heading">Multi_Regional Storage : {googleFilterObj_Storage.Multi_Regional_Storage}</td>
                                                                <td rowspan="2"><div className="priceDiv">Price : ${googleFilterObj_Storage.Total_Price}/Month</div></td>
                                                            </tr>
                                                            <tr>
                                                                <td className="heading">Nearline Storage : {googleFilterObj_Storage.Nearline_Storage}</td>
                                                                <td className="heading">Coldline Storage : {googleFilterObj_Storage.Coldline_Storage}</td>
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

                        {<button id="hiddenbuttonAzure" onClick={this.BindAzureHtml_Storage.bind(this)}>HiddenButtonAzure</button>}
                        <div className="resultsCSS" id="azureResult">
                            <Collapsible transitionTime={400} trigger="Azure Cloud Offers"><p className="cloudNameDiv">Azure</p>
                                {<p className="offersCount">{azureJsonLength_Storage} </p>}
                                {this.state.azureArray_Storage.map((azureFilterObj_Storage, index) => {
                                    return (
                                        <div>
                                            <div className="resultContainers" key={index}>
                                                <div>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td className="heading">Region : {azureFilterObj_Storage.MeterRegion}</td>
                                                                {/* <td className="heading">RAM : {azureItem_Storage.text}</td> */}
                                                                <td className="heading">Redundancy : {azureFilterObj_Storage.MeterSubCategory}</td>
                                                                {/* <td rowspan="2"><div className="priceDiv">Price : {azureFilterObj_Storage.MeterRates[0]}/Month</div></td> */}
                                                                <td rowspan="2"><div className="priceDiv">Price : {this.getAzurePrice_Storage(azureFilterObj_Storage.MeterRates[0], azureFilterObj_Storage.Unit)}</div></td>

                                                            </tr>
                                                            <tr>
                                                                <td className="heading">Region : {azureFilterObj_Storage.MeterName}</td>
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
                        {<button id="hiddenbuttonAWS" onClick={this.BindAWSHtml_Storage.bind(this)}>HiddenButtonAWS</button>}
                        <div className="resultsCSS" id="awsResult">
                            <Collapsible transitionTime={400} trigger="AWS Cloud Offers"><p className="cloudNameDiv">AWS</p>
                                {<p className="offersCount">{awsJsonLength_Storage} </p>}
                                {this.state.awsArray_Storage.map((awsFilterObj_Storage, index) => {
                                    return (
                                        <div >
                                            <div className="resultContainers" key={index}>
                                                <div>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td className="heading">From Location : {awsFilterObj_Storage.fromLocation}</td>
                                                                <td className="heading">To Location : {awsFilterObj_Storage.toLocation}</td>
                                                                <td rowspan="2"><div className="priceDiv">Price : {awsFilterObj_Storage.price}</div></td>
                                                            </tr>
                                                            <tr>
                                                                <td className="heading">Transfer Type : {awsFilterObj_Storage.transferType}</td>
                                                                <td className="heading">Usage Type : {awsFilterObj_Storage.usagetype}</td>
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
export default Storage;