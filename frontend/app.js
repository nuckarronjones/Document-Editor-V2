import { ShapesModal } from "./pages/document-editor-page/shapesModalComponent/shapesModal.js";
import { UserDocumentsComponent } from "./pages/document-editor-page/documentEditorComponent.js";
import { DocumentEditorComponent } from "./pages/user-documents-page/userDocumentsComponent/userDocumentsComponent.js";

import { routingService } from "./services/routingService.js";
import { eventListenerService } from "./services/eventService.js";
class App {
  constructor() {
    this.documentEditorComponent = new DocumentEditorComponent();
    this.userDocumentsComponent = new UserDocumentsComponent();
    this.shapesModal = new ShapesModal();

    this.eventListenerService = eventListenerService;
    this.routingService = routingService;

    //Bind this context, so we dont lose it when passed in as a callback
    this.onRouteChange = this.onRouteChange.bind(this);
    //Detect refresh, and use our callback to re-initialize page contents/listeners
    this.routingService.detectRefresh(this.onRouteChange);

    //Boostrap app as soon as its constructed
    this.bootstrap();
  }

  bootstrap() {
    const appElement = document.getElementById("app");

    const html = `
      ${this.userDocumentsComponent.render()}
    `;

    //Initialize page content first, then listeners. Must be in this order to attach listeners to html
    appElement.innerHTML = html;
    this.eventListenerService.initializeEventListeners();
  }

  onRouteChange(url) {
    const appElement = document.getElementById("app");

    this.eventListenerService.emptyEventListeners();

    if (url.includes("/editor")) {
      appElement.innerHTML = `
        ${this.documentEditorComponent.render()}
     `;
    } else {
      appElement.innerHTML = `
      ${this.userDocumentsComponent.render()}
    `;
    }

    this.eventListenerService.initializeEventListeners();
  }
}

new App();
