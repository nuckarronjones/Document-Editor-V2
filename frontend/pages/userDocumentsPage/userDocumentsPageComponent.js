import { eventListenerService } from "../../services/eventService.js";
import { routingService } from "../../services/routingService.js";
import { documentPreferencesService } from "../../services/documentPreferencesService.js";
import { generateDocumentId } from "../../functions/generateDocumentId.js";
import { documentServiceApi } from "../../services/api/documentServiceApi.js";
import { componentLifecycleService } from "../../services/componentLifecycleService.js";
import { modalService } from "../../services/modalService.js";
import { ConfirmationModalComponent } from "../../ui/modals/confirmationModalComponent.js";

export class UserDocumentsPageComponent {
  constructor() {
    this.eventListenerService = eventListenerService;
    this.documentPreferencesService = documentPreferencesService;
    this.routingService = routingService;
    this.modalService = modalService;
    this.documentServiceApi = documentServiceApi;
    this.componentLifecycleService = componentLifecycleService;

    this.refreshUserDocuments();
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
      className: "user-document",
      eventType: "click",
      action: (pointer) => {
        const documentId = pointer.srcElement.dataset.documentId;

        this.documentServiceApi
          .retrieveDocumentById(documentId)
          .then((document) => {
            this.documentPreferencesService.documentId = document.documentId;
            this.documentPreferencesService.documentTitle = document.documentName;
            this.documentPreferencesService.preferences = document.documentPreferences;
            this.documentPreferencesService.documentContent = document.documentContent;
            this.routingService.setRoute("/editor");
          });
      },
    },
    {
      className: "card-delete-icon",
      eventType: "click",
      action: (pointer) => {
        const documentToDelete = pointer.target.dataset.deleteDocument;

        new ConfirmationModalComponent(() => {
          this.documentServiceApi
            .deleteDocumentById(documentToDelete)
            .then(() => this.refreshUserDocuments());
        });
        
      },
    },
  ];

  refreshUserDocuments() {
    this.documentServiceApi
      .retrieveAllDocuments()
      .then((documents) => {
        this.documents = [...documents];
        this.componentLifecycleService.refreshComponent(this.render.bind(this));
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
      });
  }

  _pushEvents() {
    this.eventListenerService.events.push(...this.events);
  }

  render() {
    this._pushEvents();

    return `
        <div id="UserDocumentsPageComponent" class="container">

          <img class="main-logo-corner" src="assets/images/flow-logo.png" />

          <div class="userDocumentsContainer">
            <h2>My Documents</h2>

            <div class="documentsContainer">

              <div id="new-document" class="card">
                  <i class="card-logo bi bi-plus"></i>
              </div>

              ${
                this.documents && this.documents.length > 0
                  ? this.documents
                      .map(
                        (document) => `
                          <div class="card">

                            <div class="card-title-container">
                              <h5 class="card-header">${document.documentName}</h5>
                              <i 
                                data-delete-document="${document.documentId}" 
                                class="bi bi-trash-fill card-delete-icon"
                              ></i>
                            </div>

                            <i 
                              data-document-id="${document.documentId}"
                              class="bi bi-file-earmark card-logo user-document"
                            ></i>
                            
                          </div>
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
