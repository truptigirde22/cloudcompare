import React from 'react'
import Checkbox from './Checkbox';
import HomeSideMenu from './HomeSideMenu'
import { Switch, Route } from 'react-router-dom'
import Latency from './Latency'
import $ from 'jquery';

const items = [
  'One',
  'Two',
  'Three',
];
var awsChecked = false;
var azureChecked = false;
var alibabaChecked = false;
var huaweiChecked = false;


class Home extends React.Component {
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
    this.state = { checkedAWS: false, checkedAzure: false, checkedAlibaba: false, checkedHuawei: false, datass: "" };
    this.handleChangeAWS = this.handleChangeAWS.bind(this);
    this.handleChangeAzure = this.handleChangeAzure.bind(this);
    this.handleChangealibaba = this.handleChangealibaba.bind(this);
    this.handleChangehuawei = this.handleChangehuawei.bind(this);
    this.updateStatess = this.updateStatess.bind(this);
  }

  handleChangeAWS() {
    this.setState({
      checkedAWS: !this.state.checkedAWS
    })
    awsChecked = !this.state.checkedAWS;
  }

  handleChangeAzure() {
    this.setState({
      checkedAzure: !this.state.checkedAzure
    })
    azureChecked = !this.state.checkedAzure;
  }

  handleChangealibaba() {
    this.setState({
      checkedAlibaba: !this.state.checkedAlibaba
    })
    alibabaChecked = !this.state.checkedAlibaba;
  }

  handleChangehuawei() {
    this.setState({
      checkedHuawei: !this.state.checkedHuawei
    })
    huaweiChecked = !this.state.checkedHuawei;
  }

  updateStatess(e) {
    this.setState({ datass: e.target.value });
  }

  showReports() {
    this.setState({
      awsVisible: awsChecked,
      azureVisible: azureChecked,
      alibabaVisible: alibabaChecked,
      huaweiVisible: huaweiChecked
    });
  }

  render() {

    return (
      <div id="content">
        <div className="leftContent">
          <HomeSideMenu />
        </div>
        <div className="rightContent">
          <Switch>
            <Route exact path='Latency' component={Latency} />
          </Switch>
          <div id="dynamicContent">
            <div className="cloudOption">
              <div className="divName"> Cloud</div>
              <div className="cloudDiv">
                <div className="cloudSelection">
                  <input type="checkbox" id="awsChk" className="chk" checked={this.state.checkedAWS}
                    onChange={this.handleChangeAWS} />
                  <img src={require("../img/amazon-web-services.png")} />
                </div>
              </div>
              <div className="cloudDiv">
                <div className="cloudSelection">
                  <input type="checkbox" id="azureChk" className="chk" checked={this.state.checkedAzure}
                    onChange={this.handleChangeAzure} />
                  <img src={require("../img/Microsoft-Azure-logo.png")} />
                </div>
              </div>
              <div className="cloudDiv">
                <div className="cloudSelection">
                  <input type="checkbox" id="alibabaChk" className="chk" checked={this.state.checkedAlibaba}
                    onChange={this.handleChangealibaba} />
                  <img src={require("../img/alibaba_1.png")} />
                </div>
              </div>
              <div className="cloudDiv">
                <div className="cloudSelection">
                  <input type="checkbox" id="huaweiChk" className="chk" checked={this.state.checkedHuawei}
                    onChange={this.handleChangehuawei} />
                  <img src={require("../img/huawei.png")} />
                </div>
              </div>
            </div>
            <div>
              <div className="btnReports">
                <button className="GoBtn" onClick={() => this.showReports()}>Show Reports</button>
              </div>

              <div className="reportDivider">Report : Services details</div><span className="arrow"></span>



              {
                this.state.awsVisible
                  ? (<div id="divAWS" class="reportContainer">
                    <iframe width="800" height="600" src="https://app.powerbi.com/view?r=eyJrIjoiMDQ2NTc3YTAtNmQyMy00NDdkLWE1OGItM2JhY2JhYzdjNzc3IiwidCI6ImZhMGZkOGQyLWQ0MTQtNDgyYy1hMmEzLWQ4Njk2OWI1YzVmYyIsImMiOjZ9" frameborder="0" allowFullScreen="true"></iframe>
                  </div>)
                  : null
              }
              {
                this.state.azureVisible
                  ? (<div id="divAzure" class="reportContainer">
                    <iframe width="800" height="600" src="https://app.powerbi.com/view?r=eyJrIjoiNmQyOGQyNDAtMWMzZC00OTY3LWEwOGQtODJiYmE2MDU2ODllIiwidCI6ImZhMGZkOGQyLWQ0MTQtNDgyYy1hMmEzLWQ4Njk2OWI1YzVmYyIsImMiOjZ9" frameborder="0" allowFullScreen="true"></iframe>
                  </div>)
                  : null
              }
              {
                this.state.alibabaVisible
                  ? (<div id="divAlibaba" className="reportContainer">
                    <iframe width="800" height="600" src="https://app.powerbi.com/view?r=eyJrIjoiYjI3M2JiMDAtMTEwMi00MWUzLWE5MTgtOWVhNmRjMDFkYTAyIiwidCI6ImZhMGZkOGQyLWQ0MTQtNDgyYy1hMmEzLWQ4Njk2OWI1YzVmYyIsImMiOjZ9" frameborder="0" allowFullScreen="true"></iframe>
                  </div>)
                  : null
              }
              {
                this.state.huaweiVisible
                  ? (<div id="divHuawei" className="reportContainer">
                    <iframe width="500" height="500" src="https://app.powerbi.com/view?r=eyJrIjoiNTBhMTViZGYtYWI0ZC00Y2Y3LThhNjEtMGExNDEyZWFkZWI4IiwidCI6ImZhMGZkOGQyLWQ0MTQtNDgyYy1hMmEzLWQ4Njk2OWI1YzVmYyIsImMiOjZ9" frameborder="0" allowFullScreen="true"></iframe>

                  </div>)
                  : null
              }

              <div className="reportDivider">Report : API Count</div><span className="arrow"></span>

              <div className="reportDivider">Report : Automation</div><span className="arrow"></span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Home



