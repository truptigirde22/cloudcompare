import React from 'react'
import HomeSideMenu from './HomeSideMenu'
import { Switch, Route } from 'react-router-dom'
import $ from 'jquery';
import ServicesJson from '../Data/ServicesJson';

var trHTML = "";
var  item;

function dataprocessor(input,type)
{
      var trHTML = '';
      if(input.length>1) 
      {
        trHTML+='<td><ul>';
        for (var i in input)
        {   
          trHTML += '<li><img src="../Image/cloudproviders/' + type + '/' + input[i].icon + '"  alt="' + input[i].name + '" class="img-responsive img-icons" />' + input[i].name + ' <a href="' + input[i].ref + '" class="glyphicon glyphicon-link srvc-hyperlink"  target="_blank"></a></li>';    
        } 
        trHTML+='</ul></td>';
      } 
      else
      {
        trHTML += '<td><img src="../Image/cloudproviders/' + type + '/' + input[0].icon + '" alt="' + input[0].name + '" class="img-responsive img-icons" />  ' + input[0].name + ' <a href="' + input[0].ref + '" class="glyphicon glyphicon-link srvc-hyperlink"  target="_blank"></a></td>';   
      }  
      return trHTML;  
}

class Services extends React.Component {

RemoveEmptyAHref() { 
            $("a").each(function () {
                var href = $(this).attr("href");
                if (href == 'https://#' || href == '' || href == 'http://#' || href == '#') { // or anything else you want to remove...
                     $(this).remove();
                }
            });
}
componentDidMount() {

    trHTML="";
    $.each(ServicesJson, function (key, value) {   
              trHTML += '<tr><td><b>' + value.category.name + '</b></td>';
              trHTML += '<td><b>' + value.service.name + '</b> <a href="' + value.service.ref + '" class="glyphicon glyphicon-link" target="_blank"></a></td>';
              trHTML += dataprocessor(value.aws,'aws');
              trHTML += dataprocessor(value.azure,'azure');
              trHTML += dataprocessor(value.google,'gcp');
              trHTML += dataprocessor(value.alibaba, 'alibaba');                
    });
    $("#comparetable").append(trHTML);  
    this.RemoveEmptyAHref();
  }
  
  render() {

     $('.HomeTab').css("background-color", "#0F5496");  

    return (
      <div id="content">
        <div className="leftContent">
          <HomeSideMenu />
        </div>
        <div className="rightContent">
          <div id="dynamicContent">      
          </div>
          <table id="comparetable" className="blueshine table">
                        <thead>
                            <tr>
                                <th width="8%">Category</th>
                                <th width="8%">Service</th>
                                <th width="15%"><img className="img-responsive" src={require("../img/Services/aws.png")} alt='icon' /></th>
                                <th width="15%"><img className="img-responsive" src={require("../img/Services/msazure.png")} alt='icon' /></th>
                                <th width="15%"><img className="img-responsive" src={require("../img/Services/google.png")} height="112" alt='icon' /></th> 
                                <th width="15%"><img className="img-responsive" src={require("../img/Services/alibaba.png")} height="112" alt='icon' /></th>
                           </tr>
                        </thead>
                    </table>
        </div>      
      </div>);
  }
}

export default Services
