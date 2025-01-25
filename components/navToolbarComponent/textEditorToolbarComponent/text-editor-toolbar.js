import { eventListenerService } from "../../../services/event-service.js";
import { toolbarService } from "../../../services/toolbar-service.js";

export class TextEditorToolbarComponent {
  constructor() {
    this.eventListenerService = eventListenerService;
    this.toolbarService = toolbarService;
  }

  renderFontList() {
    const fontList = this.toolbarService.FONTLIST;
    let htmlFormattedList = [];

    for (let i = 0; i < fontList.length; i++) {
      htmlFormattedList.push(
        `<li class='dropdown-font-option' style='font-family: ${fontList[i]};'> ${fontList[i]} &emsp;</li>`
      );
    }
    return htmlFormattedList.join("");
  }

  renderFontSizeList() {
    let htmlFormattedList = [];

    for (let i = 3; i < 76; i++) {
      htmlFormattedList.push(`<li class='dropdown-size-list'> ${i} &emsp;</li>`);
    }
    return htmlFormattedList.join("");
  }

  renderFontColorList() {
    const colors = this.toolbarService.COLORS;
    let htmlFormattedList = [];

    for (let i = 0; i < colors.length; i++) {
      htmlFormattedList.push(
        `<button style='width: 20px; height:20px; background-color:${colors[i][0]}' class='color_Box'></button>`
      );
    }
    return htmlFormattedList.join("");
  }

  events = [
    {
      id: "font-loader",
      eventType: "click",
      action: () => this.toolbarService.renderDropdown("font-dropdown"),
    },
    {
      id: "font-size-loader",
      eventType: "click",
      action: () => this.toolbarService.renderDropdown("font-size-preview"),
    },
    {
      id: "font-colors-loader",
      eventType: "click",
      action: () => this.toolbarService.renderDropdown("colors-dropdown"),
    },
    {
      class: "dropdown-font-option",
      eventType: "click",
      action: (pointer) => this.toolbarService.setDocumentFont(pointer),
    },
    {
      class: "dropdown-size-list",
      eventType: "click",
      action: (pointer) => this.toolbarService.setDocumentFontSize(pointer),
    },
  ];

  render() {
    this.eventListenerService.events.push(...this.events);

    return `
        <div id="text_Settings" class="toolbar">
            <ul class="text_Settings_Tools hover">
                <li id="font-loader">
                <span id="font-option-preview">Times New Roman</span>
                <i class="bi bi-chevron-compact-down"></i>
                <div id="font-dropdown" class="popup-selector hidden">
                    <ul class="noBullets hover">
                    ${this.renderFontList()}
                    </ul>
                </div>
                </li>

                <hr />

                <li id="font-size-loader">
                <span id="fontSizeTitle">15pt</span>
                <i class="bi bi-chevron-compact-down"></i>
                <div id="font-size-preview" class="popup-selector hidden">
                    <ul class="noBullets hover">
                    ${this.renderFontSizeList()}
                    </ul>
                </div>
                </li>

                <hr />

                <li class="text_Settings_Tools_Item" title="Bold Text">
                <button><i class="bi bi-type-bold"></i></button>
                </li>

                <li class="text_Settings_Tools_Item" title="Italic Text">
                <button><i class="bi bi-type-italic"></i></button>
                </li>

                <li class="text_Settings_Tools_Item" title="Underline">
                <button><i class="bi bi-type-underline"></i></button>
                </li>

                <hr />

                <li id="font-colors-loader" class="text_Settings_Tools_Item">
                <button><i class="bi bi-paint-bucket"></i></button>
                <div id="colors-dropdown" class="popup-selector hidden">
                    <div>${this.renderFontColorList()}</div>
                </div>
                </li>

                <hr />

                <li class="text_Settings_Tools_Item" title="Align Left">
                <button><i class="bi bi-justify-left"></i></button>
                </li>

                <li class="text_Settings_Tools_Ite m" title="Align Center">
                <button><i class="bi bi-justify"></i></button>

                </li>

                <li class="text_Settings_Tools_Item" title="Align Right">
                <button><i class="bi bi-justify-right"></i></button>
                </li>

                <li title="Line Spacing">
                <button><i class="bi bi-arrows-expand"></i></button>
                <div id="line_Spacing" class="popup-selector hidden">
                    <ul class="noBullets hover">
                    <li>Single</li>
                    <li>1.15</li>
                    <li>1.5</li>
                    <li>Double</li>
                    </ul>
                </div>
                </li>
                
            </ul>
        </div>
    `;
  }
}
