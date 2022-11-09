import React, { Component } from 'react'
import './App.css';
export default class App extends Component {
  state = {
    id : "",
    returnId : "",
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value,
    });
  }

  submitId = () => {
    const post = {
      plzid : this.state.id,
    }
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
        returnId : json.text,
      });
    });
  };

  render() {
    return (
      <div>
        <input onChange={this.handleChange} name = "id"/>
        <button onClick = {this.submitId}>Submit</button>
        <h1>{this.state.returnId}</h1>
      </div>
    )
  }

}