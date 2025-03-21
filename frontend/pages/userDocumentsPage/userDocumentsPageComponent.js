import { eventListenerService } from "../../services/eventService.js";
import { routingService } from "../../services/routingService.js";
import { documentPreferencesService } from "../../services/documentPreferencesService.js";
import { generateDocumentId } from "../../funcions/generateDocumentId.js";

export class UserDocumentsPageComponent {
  constructor() {
    this.eventListenerService = eventListenerService;
    this.documentPreferencesService = documentPreferencesService;
    this.routingService = routingService;
  }

  events = [
    {
      id: "new-document-btn",
      eventType: "click",
      action: () => {
        this.routingService.setRoute("/editor");
        this.documentPreferencesService.documentId = generateDocumentId();
      },
    },
  ];

  _pushEvents() {
    this.eventListenerService.events.push(...this.events);
  }

  render() {
    this._pushEvents();

    return `
        <div class="container">
          <div class="userDocumentsContainer">
            <h1>My Documents</h1>

            <div class="documentsContainer">

              <div id="new-document-btn" class="card">
                <i class="card-logo bi bi-plus"></i>
              </div>

              <!--div id="new-document-btn" class="card">
                <i class="bi bi-file-earmark card-logo"></i>
                <div class="card-title">My Document Name</div>
              </div-->

            </div>
            
          </div>
        </div>
        `;
  }
}
