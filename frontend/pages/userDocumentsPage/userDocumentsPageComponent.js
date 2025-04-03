import { eventListenerService } from "../../services/eventService.js";
import { routingService } from "../../services/routingService.js";
import { documentPreferencesService } from "../../services/documentPreferencesService.js";
import { generateDocumentId } from "../../funcions/generateDocumentId.js";
import { documentServiceApi } from "../../services/api/documentServiceApi.js";
import { ComponentRefreshService } from "../../services/componentRefreshService.js";

export class UserDocumentsPageComponent {
  constructor() {
    this.eventListenerService = eventListenerService;
    this.documentPreferencesService = documentPreferencesService;
    this.routingService = routingService;
    this.documentServiceApi = documentServiceApi;

    this.componentRefreshService = new ComponentRefreshService(
      this.eventListenerService
    );

    this.documentServiceApi.retrieveAllDocuments().then((documents) => {
      this.documents = [...documents];
      this.componentRefreshService.refreshComponent(this.render.bind(this));
    }).catch(error => {
      console.error("Error fetching documents:", error);
    });
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

            ${this.documents && this.documents.length > 0 
              ? this.documents.map((document) => `

                  <div data-document-id=${document.documentId} class="card">
                    <i class="bi bi-file-earmark card-logo"></i>
                    <div class="card-title">${document.documentName}</div>
                  </div>
                  
                `).join('') 
              : ''
            }     

            </div>
            
          </div>
        </div>
        `;
  }
}
