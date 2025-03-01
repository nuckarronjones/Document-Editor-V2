class RoutingService {
  constructor() {}

  setRoute(route) {
    window.history.pushState("", "", route);
  }

  detectRefresh(callback) {
    window.navigation.addEventListener("navigate", (event) => {
      const url = event.destination.url;
      callback(url);
    });
  }
}

export const routingService = new RoutingService();
