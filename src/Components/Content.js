import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import AboutUs from './AboutUs'
import ContactUs from './ContactUs'
import FAQ from './FAQ'
import Services from './Services'
import Latency from './Latency'
import CostCalculator from './CostCalculator'
import Roadmap from './Roadmap'
import Migration from './Migration'
import Geographical from './Geographical'

//import Schedule from './Schedule'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/" <Route path='/schedule' component={Schedule}/>
const Content = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/AboutUs' component={AboutUs}/>
      <Route path='/ContactUs' component={ContactUs}/> 
      <Route path='/FAQ' component={FAQ}/>      
      <Route path='/Services' component={Services}/>
      <Route path='/Latency' component={Latency}/>    
      <Route path='/CostCalculator' component={CostCalculator}/>   
      <Route path='/Roadmap' component={Roadmap}/> 
      <Route path='/Migration' component={Migration}/> 
      <Route path='/Geographical' component={Geographical}/> 
      
    </Switch>
  </main>
)

export default Content
