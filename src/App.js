import React, { Component } from 'react'
import './App.css';
export default class App extends Component {
  state = {
    id : "",
    testbody : "",
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value,
    });
  }

  submit = () => {
    const post = {
      test : this.state.id,
    };

    fetch("http://localhost:3001/idplz", {
      method: "post",
      headers: {
        "content-type":"application/json",
      },
      body: JSON.stringify(post),
    })
    .then((res) => res.json())
    .then((json) => {
      this.setState({
        testbody : json.text,
      });
    });
  };

  render() {
    return (
      <div>
        <input onChange={this.handleChange} name = "id"/>
        <button onClick = {this.submit}>Submit</button>
        <h1>{this.state.testbody}</h1>
      </div>
    )
  }

}