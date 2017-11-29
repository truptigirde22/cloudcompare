import React from 'react'
import Getobj from './Header'
import Content from './Content'
import Footer from './Footer'
import DataPass from './DataPass'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';



const App = () => (
  <div>
    <div id="wrapper">
        <div className="header-div">
          <Getobj/>
          
        </div>
        <div className="container">
          <Content />
        </div>
       
        <div className="footer-div">
          <Footer/>
        </div>
      </div>
  </div>
)

export default App



/*import CheckboxTree from 'react-checkbox-tree';
 const nodes = [{
      value: 'mars',
      label: 'Mars',
      children: [
          { value: 'phobos', label: 'Phobos' },
          { value: 'deimos', label: 'Deimos' },
      ],
  }];
   
  class App extends React.Component {
      constructor() {
          super();
   
          this.state = {
              checked: [],
              expanded: [],
          };
      }
   
      render() {
          return (
              <CheckboxTree
                  nodes={nodes}
                  checked={this.state.checked}
                  expanded={this.state.expanded}
                  onCheck={checked => this.setState({ checked })}
                  onExpand={expanded => this.setState({ expanded })}
              />
          );
      }
  }
  export default App*/