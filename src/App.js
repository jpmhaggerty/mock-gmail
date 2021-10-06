import React from 'react';
import logo from './logo.svg';
import './App.css';
import MessageList from './messageList.js';
import PrimarySearchAppBar from './appBar.js';

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      gmailFeed: []
    };
  }

  async componentDidMount() {
    let response = await fetch("http://localhost:3001/emails");
    if (response.status >= 200 && response.status <= 299) {
      let json = await response.json();
      this.setState({gmailFeed: json})
    } else {
      console.log(response.status, response.statusText);
    }
  }

  render() {
    return (
      <div>
        <PrimarySearchAppBar messages={this.state.gmailFeed} />
        <ul>
          <MessageList messages={this.state.gmailFeed} />
        </ul>
      </div>
    );
  }
}

export default App;

// <MessageList messages={this.state.gmailFeed ? this.state.gmailFeed : []} />