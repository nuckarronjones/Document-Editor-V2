import { eventListenerService } from "../../../../services/eventService.js";
import { toolbarService } from "../../../../services/toolbarService.js";
import { documentPreferencesService } from "../../../../services/documentPreferencesService.js";

import { COLORS } from "../../../../data/documentData.js";
import { LINE_SPACINGS } from "../../../../data/documentData.js";
import { FONTLIST } from "../../../../data/documentData.js";

export class TextEditorToolbarComponent {
  constructor() {
    this.eventListenerService = eventListenerService;
    this.toolbarService = toolbarService;
    this.preferences = documentPreferencesService.preferences;

    this.fontList = FONTLIST;
    this.lineSpacings = LINE_SPACINGS;
    this.colors = COLORS;
  }

  renderFontList() {
    const fontList = this.fontList;
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

    for (let i = 12; i < 76; i++) {
      htmlFormattedList.push(
        `<li class='dropdown-size-list'> ${i} &emsp;</li>`
      );
    }
    return htmlFormattedList.join("");
  }

  renderFontColorList() {
    const colors = this.colors;
    let htmlFormattedList = [];

    for (let i = 0; i < colors.length; i++) {
      htmlFormattedList.push(
        ` <button 
            style='width: 20px; height:20px; background-color:${colors[i][0]}' 
            class='dropdown-color-option' 
            data-color="${colors[i][0]}">
          </button>
        `
      );
    }
    return htmlFormattedList.join("");
  }

  renderSpacingList() {
    const spacingOptions = this.lineSpacings;
    let htmlFormattedList = [];

    Object.keys(spacingOptions).forEach((key) => {
      htmlFormattedList.push(
        `<li class="dropwown-spacing-option" data-spacing="${spacingOptions[key]}" >${key}</li>`
      );
    });
    return htmlFormattedList.join("");
  }

  events = [
    {
      id: "font-loader",
      eventType: "click",
      action: () => this.toolbarService.renderDropdown("font-dropdown")
    },
    {
      id: "font-size-loader",
      eventType: "click",
      action: () => this.toolbarService.renderDropdown("font-size-preview")
    },
    {
      id: "font-colors-loader",
      eventType: "click",
      action: () => this.toolbarService.renderDropdown("colors-dropdown")
    },
    {
      id: "line-spacing-loader",
      eventType: "click",
      action: () => this.toolbarService.renderDropdown("line-spacing-dropdown")
    },
    {
      class: "dropdown-font-option",
      eventType: "click",
      action: (pointer) => this.toolbarService.setDocumentFont(pointer)
    },
    {
      class: "dropdown-size-list",
      eventType: "click",
      action: (pointer) => this.toolbarService.setDocumentFontSize(pointer)
    },
    {
      class: "dropwown-spacing-option",
      eventType: "click",
      action: (pointer) => this.toolbarService.setDocumentLineSpacing(pointer)
    },
    {
      class: "text-styling-option",
      eventType: "click",
      action: (pointer) => this.toolbarService.setTextStyling(pointer)
    },
    {
      class: "dropdown-color-option",
      eventType: "click",
      action: (pointer) => this.toolbarService.setFontColor(pointer)
    },

  ];

  _pushEvents(){
    this.eventListenerService.events.push(...this.events);
  }

  render() {
    this._pushEvents();

    return `
        <div id="textSettings" class="toolbar">
            <ul class="textSettings hover">
                <li id="font-loader">
                <span id="font-option-preview">${this.preferences.font}</span>
                <i class="bi bi-chevron-compact-down selection-icon"></i>
                <div id="font-dropdown" class="popupMenuSelection hidden">
                    <ul class="noBullets hover">
                    ${this.renderFontList()}
                    </ul>
                </div>
                </li>

                <li id="font-size-loader">
                <span id="fontSizeTitle">${this.preferences.fontSize}pt</span>
                <i class="bi bi-chevron-compact-down selection-icon"></i>
                <div id="font-size-preview" class="popupMenuSelection hidden">
                    <ul class="noBullets hover">
                    ${this.renderFontSizeList()}
                    </ul>
                </div>
                </li>

                <li class="text-styling-option">
                <button><i class="bi bi-type-bold selection-icon" data-fontStyle="bold"></i></button>
                </li>

                <li class="text-styling-option">
                <button><i class="bi bi-type-italic selection-icon" data-fontStyle="italic"></i></button>
                </li>

                <li class="text-styling-option">
                <button><i class="bi bi-type-underline selection-icon" data-fontStyle="underline"></i></button>
                </li>

                <li id="font-colors-loader" class="text-styling-option">
                <button><i class="bi bi-paint-bucket selection-icon"></i></button>
                <div id="colors-dropdown" class="popupMenuSelection hidden">
                    <div>${this.renderFontColorList()}</div>
                </div>
                </li>

                <li class="text-styling-option">
                <button><i class="bi bi-justify-left selection-icon" data-fontStyle="justifyLeft"></i></button>
                </li>

                <li class="text-styling-option">
                <button><i class="bi bi-justify selection-icon" data-fontStyle="justifycenter"></i></button>

                </li>

                <li class="text-styling-option">
                <button><i class="bi bi-justify-right selection-icon" data-fontStyle="justifyright"></i></button>
                </li>

                <li id="line-spacing-loader" class="text-styling-option">
                <button><i class="bi bi-arrows-expand selection-icon"></i></button>
                <div id="line-spacing-dropdown" class="popupMenuSelection hidden">
                    <ul class="noBullets hover">
                      ${this.renderSpacingList()}
                    </ul>
                </div>
                </li>
                
            </ul>
        </div>
    `;
  }
}
