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
        ],
        "20180602": [
          {
            title:
              "As Party Vote Inches Closer, Abe Seeks to Turn Page on Scandal Narrative",
            text:
              "Prime Minister Shinzo Abe's government sought on Monday to put behind it the worst of a suspected cronyism scandal that has clouded Abe's chances for re-election, as his finance minister said he'd give back a year's salary but would not quit.",
            link:
              "https://www.nytimes.com/reuters/2018/06/04/world/asia/04reuters-japan-politics.html"
          }
        ],
        "20180601": [
          {
            title: "Kompany in Belgium's World Cup Squad Despite Injury",
            text:
              "Vincent Kompany was included in Belgium coach Roberto Martinez's 23-man World Cup squad on Monday despite picking up a groin injury during a friendly over the weekend.",
            link:
              "https://www.nytimes.com/aponline/2018/06/04/sports/soccer/ap-soc-wcup-belgium-squad.html"
          }
        ],
        "20180531": [
          {
            title:
              "Japan Airlines to Expand Budget Carrier's Fleet After 2020 Launch: Director",
            text:
              "Japan Airlines Co Ltd hopes to expand the fleet of a new low-cost carrier by two jets a year after it launches in mid-2020, a director of the airline said on Monday, as it takes on rival ANA Holdings Inc's budget arm Peach.",
            link:
              "https://www.nytimes.com/reuters/2018/06/04/business/04reuters-airlines-iata-japan-airlines.html"
          }
        ],
        "20180530": [
          {
            title: "KLM CEO Says More Restructuring Needed at Air France",
            text:
              "More restructuring is needed at French flag carrier Air France, the head of Dutch sister airline KLM said on Monday.",
            link:
              "https://www.nytimes.com/2014/09/12/business/international/air-france-klm-restructuring-puts-new-focus-on-its-low-cost-airline.html"
          }
        ]
      }
    };
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>LifeLine</h1>
        </div>
        <Lifeline events={this.state.events} />
      </div>
    );
  }
}

export default App;
