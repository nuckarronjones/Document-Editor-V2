import { eventListenerService } from "../../../../services/eventService.js";
import { toolbarService } from "../../../../services/toolbarService.js";
import { modalService } from "../../../../services/modalService.js";
import { routingService } from "../../../../services/routingService.js";
import { documentServiceApi } from "../../../../services/api/documentServiceApi.js";
import { documentPreferencesService } from "../../../../services/documentPreferencesService.js";

export class DocumentSettingsComponent {
  constructor() {
    this.eventListenerService = eventListenerService;
    this.toolbarService = toolbarService;
    this.modalService = modalService;
    this.routingService = routingService;
    this.documentServiceApi = documentServiceApi;
    this.documentPreferencesService = documentPreferencesService;
  }

  events = [
    {
      id: "file-options",
      eventType: "click",
      action: () => this.toolbarService.renderDropdown("file-options-dropdown"),
    },
    {
      id: "insert-options",
      eventType: "click",
      action: () => this.toolbarService.renderDropdown("insert-options-dropdown"),
    },
    {
      id: "export-button",
      eventType: "click",
      action: () => this.toolbarService.exportDocument(),
    },
    {
      id: "print-button",
      eventType: "click",
      action: () => this.toolbarService.printDocument(),
    },
    {
      id: "save-button",
      eventType: "click",
      action: () => this.documentServiceApi.saveDocument(),
    },
    {
      id: "toggle-shapes-modal",
      eventType: "click",
      action: () => this.modalService.setModalSubject("ShapesModal"),
    },
    {
      id: "home-button",
      eventType: "click",
      action: () => this.routingService.setRoute("/allDocuments"),
    },
  ];

  renderDropdown(targetId) {
    const element = document.getElementById(targetId);

    if (element.classList.contains("visible")) {
      document.getElementById(targetId).classList.remove("visible");
      document.getElementById(targetId).classList.add("hidden");
    } else if (element.classList.contains("hidden")) {
      document.getElementById(targetId).classList.remove("hidden");
      document.getElementById(targetId).classList.add("visible");
    }
  }

  _pushEvents(){
    this.eventListenerService.events.push(...this.events);
  }

  render() {
    this._pushEvents();

    return `
           <div id="name_Toolbar" class="toolbar">
              <div class="top-nav">

                <button id="home-button">
                  <img class="main-logo" src="assets/images/flow-logo.png" />
                </button>

                <input
                  id="documentName"
                  type=""
                  name=""
                  value="${this.documentPreferencesService.documentTitle}"
                />
              </div>

              <div id="document_Settings" class="toolbar">
                <ul class="textSettings hover">
                  <li id="file-options">
                    File
                    <div id="file-options-dropdown" class="popupMenuSelection hidden">
                      <ul class="dropdown-list-items hover">
                        <li id="save-button">
                          <i class="bi bi-save selection-icon"></i>Save
                        </li>
                        <li id="export-button">
                          <i class="bi bi-download selection-icon"></i>Download
                        </li>
                        <li id="print-button">
                          <i class="bi bi-printer selection-icon"></i>Print
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li id="insert-options">
                    Insert
                    <div id="insert-options-dropdown" class="popupMenuSelection hidden">
                      <ul class="dropdown-list-items hover">
                        <li id="toggle-shapes-modal">
                          <i class="bi bi-star selection-icon"></i>Shapes
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
        `;
  }
}
