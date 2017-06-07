import React from "react"
import ReactDOM from "react-dom"
import ApolloClient, {
  ApolloProvider,
  createNetworkInterface
} from "react-apollo"
import {
  addGraphQLSubscriptions,
  SubscriptionClient
} from "subscriptions-transport-ws"

import App from "./components/App"
import registerServiceWorker from "./registerServiceWorker"
import "./index.css"
import logo from "./logo.svg"
import { FREECOM_AUTH_TOKEN_KEY } from "./constants"

// Create WebSocket client
const wsClient = new SubscriptionClient(
  "wss://subscriptions.graph.cool/v1/cj3e8hr8g0wp50189apqq6ez1",
  {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(FREECOM_AUTH_TOKEN_KEY)
    }
  }
)

const networkInterface = createNetworkInterface({
  uri: "https://api.graph.cool/simple/v1/cj3e8hr8g0wp50189apqq6ez1"
})

// Add Authorization header
networkInterface.use([
  {
    applyMiddleware(request, next) {
      if (!request.options.headers) {
        request.options.headers = {}
      }
      // get the authentication token from local storage if it exists
      const token = localStorage.getItem(FREECOM_AUTH_TOKEN_KEY)
      console.log(`Bearer ${token}`)
      request.options.headers.authorization = token ? `Bearer ${token}` : null
      next()
    }
  }
])

// Extend the network interface with the WebSocket
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

const freecom = {
  companyName: "Rana",
  companyLogoURL: logo,
  mainColor: "rgba(0,105,255,1)"
}

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  dataIdFromObject: o => o.id
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App freecom={freecom} />
  </ApolloProvider>,
  document.getElementById("root")
)
registerServiceWorker()
