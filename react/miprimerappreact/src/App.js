import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HelloComponents from './components/HelloComponents';

class App extends Component {
  constructor() {
    super()
    this.state = {
      name: ' Pablo'
    }
  }

  changeName = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <HelloComponents nombre={this.state.name}></HelloComponents>
          <input value={this.state.name} onChange={this.changeName} />
        </header>
      </div >
    )
  }
}
export default App;





