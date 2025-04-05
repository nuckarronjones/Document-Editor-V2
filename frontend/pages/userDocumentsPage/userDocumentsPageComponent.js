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

    this.documentServiceApi
      .retrieveAllDocuments()
      .then((documents) => {
        this.documents = [...documents];
        this.componentRefreshService.refreshComponent(this.render.bind(this));
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
      });
  }

  events = [
    {
      id: "new-document",
      eventType: "click",
      action: () => {
        this.documentPreferencesService.loadDefaultPreferences();
        this.documentPreferencesService.documentId = generateDocumentId();
        this.routingService.setRoute("/editor");
      },
    },
    {
      class: "user-document",
      eventType: "click",
      action: (pointer) => {
        const documentId = pointer.srcElement.dataset.documentId;

        this.documentServiceApi
          .retrieveDocumentById(documentId)
          .then((document) => {
            this.documentPreferencesService.documentId = document.documentId;
            this.documentPreferencesService.preferences = document.documentPreferences;
            this.documentPreferencesService.documentContent = document.documentContent;
            this.routingService.setRoute("/editor");
          });
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

              <div id="new-document" class="card">
                  <i class="card-logo bi bi-plus"></i>
              </div>

              ${
                this.documents && this.documents.length > 0
                  ? this.documents
                      .map(
                        (document) => `
                        <span class="user-document">
                          <div class="card"  data-document-id="${document.documentId}">

                            <div class="card-title-container">
                              <h4 class="card-header">${document.documentName}</h4>
                              <i class="bi bi-trash-fill card-icon"></i>
                            </div>

                            <i class="bi bi-file-earmark card-logo"></i>
                            
                          </div>
                        </span>
                      `
                      )
                      .join("")
                  : ""
              }     
            </div>
            
          </div>
        </div>
        `;
  }
}
