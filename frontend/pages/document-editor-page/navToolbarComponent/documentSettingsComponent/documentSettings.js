import { eventListenerService } from "../../../../services/eventService.js";
import { toolbarService } from "../../../../services/toolbarService.js";
import { modalService } from "../../../../services/modalService.js";
import { routingService } from "../../../../services/routingService.js";

export class DocumentSettingsComponent {
  constructor() {
    this.eventListenerService = eventListenerService;
    this.toolbarService = toolbarService;
    this.modalService = modalService;
    this.routingService = routingService;
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
      action: () => this.toolbarService.saveDocument(),
    },
    {
      id: "toggle-shapes-modal",
      eventType: "click",
      action: () => this.modalService.setModalSubject("ShapesModal"),
    },
    {
      id: "home-button",
      eventType: "click",
      action: () => this.routingService.setRoute("/"),
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

  render() {
    this.eventListenerService.events.push(...this.events);

    return `
           <div id="name_Toolbar" class="toolbar">
                <ul class="text_Settings_Tools">
                    <li 
                      <button id="home-button"><i id="logo" class="bi bi-book"></i></button>
                    </li>
                    <li>
                    <input id="documentName" type="" name="" value="Document Title" />
                    </li>
                </ul>
                </div>

                <div id="document_Settings" class="toolbar">
                <ul class="text_Settings_Tools hover">
                    <li id="file-options">
                    File
                    <div id="file-options-dropdown" class="popup-selector hidden">
                        <ul class="noBullets hover">
                        <li id="save-button"><i class="bi bi-save"></i>Save</li>
                        <li id="export-button"><i class="bi bi-download"></i>Download</li>
                        <li id="print-button"><i class="bi bi-printer"></i>Print</li>
                        </ul>
                    </div>
                    </li>

                    <li id="insert-options">
                    Insert
                    <div id="insert-options-dropdown" class="popup-selector hidden">
                        <ul class="noBullets hover">
                        <li id="toggle-shapes-modal"><i class="bi bi-star"></i>Shapes</li>
                        </ul>
                    </div>
                    </li>
                </ul>
            </div>
        `;
  }
}
