import React from "react";
import ReactDOM from "react-dom";
import ApolloClient, {
  createNetworkInterface,
  ApolloProvider
} from "react-apollo";

import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import logo from "./logo.svg";

const freecom = {
  companyName: "Rana",
  companyLogoURL: logo,
  mainColor: "rgba(0,105,255,1)"
};

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: "https://api.graph.cool/simple/v1/cj3e8hr8g0wp50189apqq6ez1"
  })
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App freecom={freecom} />
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
