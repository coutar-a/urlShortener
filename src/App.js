import React from "react";
import axios from "axios";
import "./App.css";
import dotenv from "dotenv"

dotenv.config()

class ShortenField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: null };
    this.fetchShortUrl = this.fetchShortUrl.bind(this);
  }

  fetchShortUrl = async () => {
    console.log(process.env)
    const res = await axios.post(
      `http://localhost:${process.env.REACT_APP_SERVER_PORT}/api/shortenURL`,
      { url: this.textField.value }
    );
    console.log(res);
    this.setState({
      url: `http://localhost:${process.env.REACT_APP_SERVER_PORT}/api/${res.data.hash}`,
    });
  };

  render() {
    return (
      <div>
        <h1>Fancy-pants URL shortening !</h1>
        <h2>Enter your url to shorten it:</h2>
        <input type="text" ref={(c) => (this.textField = c)}></input>
        <button onClick={this.fetchShortUrl}>Shorten !</button>
        <h2>
          <a href={this.state.url}>{this.state.url}</a>
        </h2>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ShortenField></ShortenField>
      </header>
    </div>
  );
}

export default App;
