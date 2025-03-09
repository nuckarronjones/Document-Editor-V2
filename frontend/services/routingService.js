class RoutingService {
  constructor() {
  }

  setRoute(route) {
    window.history.pushState("", "", route);
  }

  detectURLChange(callback) {
    window.navigation.addEventListener("navigate", (event) => {
      const url = event.destination.url;
      //Using a callback, as we cannot initialize components here that reply upon this yet to be initialized service
      callback(url);
    });
  }

}

export const routingService = new RoutingService();
