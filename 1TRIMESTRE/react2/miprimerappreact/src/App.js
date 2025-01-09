import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HelloComponents from './components/HelloComponents';
import InputComponent from './components/InputComponent';

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
          <InputComponent nombre={this.state.name} changeName={this.changeName}></InputComponent>
        </header>
      </div >
    )
  }
}
export default App;





