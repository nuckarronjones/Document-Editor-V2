import { UserLoginPageComponent } from "./pages/userLoginPage/userLoginPageComponent.js";
import { UserDocumentsPageComponent } from "./pages/userDocumentsPage/userDocumentsPageComponent.js";
import { DocumentEditorPageComponent } from "./pages/documentEditorPage/documentEditorPageComponent.js";
import { UserRegistrationPageComponent } from "./pages/userRegistrationPage/userRegistrationPageComponent.js";

import { routingService } from "./services/routingService.js";
import { eventListenerService } from "./services/eventService.js";
class App {
  constructor() {
    this.eventListenerService = eventListenerService;
    this.routingService = routingService;
    //Upon refresh, or initial load, set default url. Lets just send users home for now
    this.routingService.setRoute("/");
    //Already initialized routing service, send callback to load relevant pages upon route change
    this.routingService.detectURLChange(this.routeChangeCallback.bind(this));
    //Boostrap app as soon as its constructed
    this.bootstrap();
  }

  bootstrap() {
    const appElement = document.getElementById("app");

    const html = `
      ${new UserLoginPageComponent().render()}
    `;

    //Initialize page content first, then listeners. Must be in this order to attach listeners to html
    appElement.innerHTML = html;
    this.eventListenerService.initializeEventListeners();
  }

  routeChangeCallback(url) {
    const appElement = document.getElementById("app");
    //Clear event listeners, as we are removing all innerHTML to replace with another component
    this.eventListenerService.emptyEventListeners();

    let component;
    switch (true) {
      case url.includes("/editor"):
        component = new DocumentEditorPageComponent();
        break;
      case url.includes("/allDocuments"):
        component = new UserDocumentsPageComponent();
        break;
      case url.includes("/registration"):
        component = new UserRegistrationPageComponent();
        break;
      case url.includes("/login"):
        component = new UserLoginPageComponent();
        break;
      default:
        component = new UserLoginPageComponent();
    }

    appElement.innerHTML = component.render();
    //Now that we render a new component innerHTML, we need to initialize the new event listeners
    this.eventListenerService.initializeEventListeners();
  }
}

new App();
