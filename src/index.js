import React from "react";
import ReactDOM from "react-dom";
import ApolloClient, {
  createNetworkInterface,
  ApolloProvider
} from "react-apollo";
import {
  SubscriptionClient,
  addGraphQLSubscriptions
} from "subscriptions-transport-ws";

import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import logo from "./logo.svg";

// Create WebSocket client
const wsClient = new SubscriptionClient(
  "wss://subscriptions.graph.cool/v1/cj3e8hr8g0wp50189apqq6ez1",
  {
    reconnect: true
  }
);

const networkInterface = createNetworkInterface({
  uri: "https://api.graph.cool/simple/v1/cj3e8hr8g0wp50189apqq6ez1"
});

// Extend the network interface with the WebSocket
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

const freecom = {
  companyName: "Rana",
  companyLogoURL: logo,
  mainColor: "rgba(0,105,255,1)"
};

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  dataIdFromObject: o => o.id
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App freecom={freecom} />
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
