import React, { Component } from "react";
import "./App.css";
import Lifeline from "./components/Lifeline.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: {
        "20180605": [
          {
            title: "Microsoft Buys GitHub for $7.5 Billion",
            text:
              "Microsoft, fully embracing a model it once saw as a threat, said on Monday that it was buying GitHub, an open software platform used by 28 million programmers, for $7.5 billion.",
            link:
              "https://www.nytimes.com/2018/06/04/technology/microsoft-github-cloud-computing.html"
          }
        ],
        "20180604": [
          {
            title: "In India, a Trio of Unlikely Heroes Wages War on Plastic",
            text:
              "For more than 25 years, Ram Nath has lived on the banks of the Yamuna River under a 19th-century iron bridge. Each morning, the wiry man walks a few steps from his makeshift hut and enters the black, sludgy waters of one of India's most polluted r...",
            link:
              "https://www.nytimes.com/aponline/2018/06/04/world/asia/ap-as-india-plastic-pollution.html"
          }
        ],
        "20180603": [
          {
            title: "How to Apologize (Better)",
            text:
              "An old-school Act of Contrition will teach you everything you need to know about making amends.",
            link:
              "https://www.nytimes.com/2018/06/04/opinion/roseanne-barr-apology.html"
          }
        ]
      }
    };
  }
  render() {
    return (
      <div className="App">
        <Lifeline events={this.state.events} />
      </div>
    );
  }
}

export default App;
