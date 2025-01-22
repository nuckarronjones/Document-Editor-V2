import { eventListenerService } from "../../../services/event-service.js";
import { toolbarService } from "../../../services/toolbar-service.js";

export class DocumentSettingsComponent {
  constructor() {
    this.eventListenerService = eventListenerService;
    this.toolbarService = toolbarService;
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
                    <li>
                    <i id="logo" class="bi bi-book"></i>
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
                        <li id="btn-export">Download (.docx)</li>
                        <li id="print">Print<i class="bi bi-printer"></i></li>
                        </ul>
                    </div>
                    </li>

                    <li id="insert-options">
                    Insert
                    <div id="insert-options-dropdown" class="popup-selector hidden">
                        <ul class="noBullets hover">
                        <li>Shapes<i class="bi bi-star"></i></li>
                        </ul>
                    </div>
                    </li>
                </ul>
            </div>
        `;
  }
}
