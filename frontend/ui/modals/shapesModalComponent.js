import { eventListenerService } from "../../services/eventService.js";
import { toolbarService } from "../../services/toolbarService.js";
import { componentLifecycleService } from "../../services/componentLifecycleService.js";

import { SHAPES } from "../../data/documentData.js";

export class ShapesModalComponent {
  constructor() {
    this.eventListenerService = eventListenerService;
    this.toolbarService = toolbarService;
    this.componentLifecycleService = componentLifecycleService;

    this.shapes = SHAPES;

    this.render();

    this.eventListenerService.initializeEventListeners();
  }

  renderIcons() {
    let formattedHTML = [];

    this.shapes.forEach((shape, index) => {
      const source = this.shapes[index][Object.keys(shape)];

      formattedHTML.push(
        `
          <li class='shapeOption'>
              <img
                src='${source}'
              />
          </li>
        `
      );
    });
    return formattedHTML.join("");
  }

  closeModal() {
    this.componentLifecycleService.destroyComponent(
      "ShapesModalComponent",
      this.events
    );
  }

  events = [
    {
      id: "closeShapesModal",
      eventType: "click",
      action: () => this.closeModal(),
    },
    {
      class: "shapeOption",
      eventType: "click",
      action: (pointer) => {
        this.toolbarService.insertShape(pointer);
        this.closeModal();
      },
    },
  ];

  _pushEvents() {
    this.eventListenerService.events.push(...this.events);
  }

  render() {
    this._pushEvents();

    document.body.innerHTML += `
          <div id="ShapesModalComponent">

            <div id="modalContainer"></div>

            <div id="modalContent">
              <span id="closeShapesModal" class="modalCloseBtn">
                <img src="https://img.icons8.com/ios-glyphs/30/000000/xbox-x.png" />
              </span>
              <div class="iconlist">
                <ul id="shapesSelection">
                  ${this.renderIcons()}
                </ul>
              </div>
            </div>

          </div>
        `;
  }
}
