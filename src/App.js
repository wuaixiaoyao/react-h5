import React, { Component } from 'react';
class App extends Component {
  componentDidMount(){
    fetch('/api/search?keywords=%E6%B5%B7%E9%98%94%E5%A4%A9%E7%A9%BA').then(res=>{

    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
