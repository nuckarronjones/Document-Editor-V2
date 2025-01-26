import { eventListenerService } from "../../../services/eventService.js";
import { toolbarService } from "../../../services/toolbarService.js";

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

    for (let i = 12; i < 76; i++) {
      htmlFormattedList.push(
        `<li class='dropdown-size-list'> ${i} &emsp;</li>`
      );
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

  renderSpacingList() {
    const spacingOptions = this.toolbarService.LINE_SPACINGS;
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
      id: "line-spacing-loader",
      eventType: "click",
      action: () => this.toolbarService.renderDropdown("line-spacing-dropdown"),
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
    {
      class: "dropwown-spacing-option",
      eventType: "click",
      action: (pointer) => this.toolbarService.setDocumentLineSpacing(pointer),
    },
    {
      class: "text-styling-option",
      eventType: "click",
      action: (pointer) => this.toolbarService.setTextStyling(pointer),
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

                <li class="text-styling-option">
                <button><i class="bi bi-type-bold" data-fontStyle="bold"></i></button>
                </li>

                <li class="text-styling-option">
                <button><i class="bi bi-type-italic" data-fontStyle="italic"></i></button>
                </li>

                <li class="text-styling-option">
                <button><i class="bi bi-type-underline" data-fontStyle="underline"></i></button>
                </li>

                <hr />

                <li id="font-colors-loader" class="text-styling-option">
                <button><i class="bi bi-paint-bucket"></i></button>
                <div id="colors-dropdown" class="popup-selector hidden">
                    <div>${this.renderFontColorList()}</div>
                </div>
                </li>

                <hr />

                <li class="text-styling-option">
                <button><i class="bi bi-justify-left" data-fontStyle="justifyLeft"></i></button>
                </li>

                <li class="text-styling-option">
                <button><i class="bi bi-justify" data-fontStyle="justifycenter"></i></button>

                </li>

                <li class="text-styling-option">
                <button><i class="bi bi-justify-right" data-fontStyle="justifyright"></i></button>
                </li>

                <li id="line-spacing-loader" title="Line Spacing">
                <button><i class="bi bi-arrows-expand"></i></button>
                <div id="line-spacing-dropdown" class="popup-selector hidden">
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
