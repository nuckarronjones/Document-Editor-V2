import { eventListenerService } from "../../../services/eventService.js";
import { routingService } from "../../../services/routingService.js";

export class UserDocumentsComponent {
  constructor() {
    this.eventListenerService = eventListenerService;
    this.routingService = routingService;
  }

  events = [
    {
      id: "new-document-btn",
      eventType: "click",
      action: () => this.routingService.createNewDocument(),
    }
  ];

  render() {
    this.eventListenerService.events.push(...this.events);

    return `
        <div class="container">
            <h1> My Documents </h1>
            <div id="userDocumentsContainer">
              <button id="new-document-btn">Create New Document + </button>
            </div>
        </div>
        `;
  }
}
