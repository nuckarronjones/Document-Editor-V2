import { NavToolbarComponent } from "./pages/document-editor-page/navToolbarComponent/navToolbar.js";
import { DocumentComponent } from "./pages/document-editor-page/documentComponent/document.js";
import { eventListenerService } from "./services/eventService.js";
import { ShapesModal } from "./pages/document-editor-page/shapesModalComponent/shapesModal.js";
import { UserDocumentsComponent } from "./pages/user-documents-page/userDocumentsComponent/userDocumentsComponent.js";

class App {
  constructor() {
    this.eventListenerService = eventListenerService;
    this.documentComponent = new DocumentComponent();
    this.navbarComponent = new NavToolbarComponent();
    this.userDocumentsComponent = new UserDocumentsComponent();
    this.shapesModal = new ShapesModal();
  }

  bootstrap = () => {
    const appElement = document.getElementById("app");

    const html = `
        ${this.navbarComponent.render()}
        ${this.documentComponent.render()}
    `;

    // const html= `
    //   ${this.userDocumentsComponent.render()}
    // `;

    appElement.innerHTML = html;
    this.eventListenerService.initializeEventListeners();
  };
}

const app = new App();
app.bootstrap();
