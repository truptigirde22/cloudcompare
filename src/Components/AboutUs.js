import React from 'react'
import $ from 'jquery';

// The Roster component matches one of two different routes
// depending on the full pathname
// const AboutUs = () => (
//   <h3>
//       About us page will come soon....
// </h3>
// )

// $('.HomeTab').css("background-color", "black");

class AboutUs extends React.Component {
  render() {
    $('.HomeTab').css("background-color", "#2F2F2F");
    return(  <div><h3>
      About us page will come soon....
    </h3></div> 
    );
  } 
}


export default AboutUs
