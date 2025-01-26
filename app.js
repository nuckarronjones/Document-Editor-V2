import { NavToolbarComponent } from "./components/navToolbarComponent/navToolbar.js";
import { DocumentComponent } from "./components/documentComponent/document.js";
import { eventListenerService } from "./services/eventService.js";
import { ShapesModal } from "./components/shapesModalComponent/shapesModal.js";

class App {
  constructor() {
    this.eventListenerService = eventListenerService;
    this.documentComponent = new DocumentComponent();
    this.navbarComponent = new NavToolbarComponent();
    this.shapesModal = new ShapesModal();
  }

  bootstrap = () => {
    const appElement = document.getElementById("app");

    const html = `
        ${this.navbarComponent.render()}
        ${this.documentComponent.render()}
    `;

    appElement.innerHTML = html;
    this.eventListenerService.initializeEventListeners();
  };
}

const app = new App();
app.bootstrap();
