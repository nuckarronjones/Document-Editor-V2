import { modalService } from "../../services/modalService.js";
import { eventListenerService } from "../../services/eventService.js";
import { toolbarService } from "../../services/toolbarService.js";

import { SHAPES } from "../../data/documentData.js";

export class ShapesModalComponent {
  constructor() {
    this.modalService = modalService;
    this.eventListenerService = eventListenerService;
    this.toolbarService = toolbarService;

    this.shapes = SHAPES;

    document.body.innerHTML += this.render();
    this.modalService.subscribe(this.handleModalChange.bind(this));
  }

  show() {
    document.getElementById("shapesModal").classList.remove("hidden");
    document.getElementById("shapesModal").classList.add("visible");
  }

  hide() {
    document.getElementById("shapesModal").classList.remove("visible");
    document.getElementById("shapesModal").classList.add("hidden");
  }

  renderIcons(){
    let formattedHTML = [];

    this.shapes.forEach((shape, index)=>{
      const source = this.shapes[index][Object.keys(shape)];

      formattedHTML.push(
        `
          <li class='modal-shape-option'>
              <img
                src='${source}'
              />
          </li>
        `
      );
    })
    return formattedHTML.join("");
  }

  handleModalChange(currentModal) {
    if (currentModal == "ShapesModal") {
      this.show();
    } else {
      this.hide();
    }
  }

  closeModal(){
    this.modalService.setModalSubject(null);
  }

  events = [
    {
      id: "closeShapesModal",
      eventType: "click",
      action: () => this.closeModal(),
    },
    {
      class: "modal-shape-option",
      eventType: "click",
      action: (pointer) => this.toolbarService.insertShape(pointer,this.closeModal())
    },
  ];

  _pushEvents(){
    this.eventListenerService.events.push(...this.events);
  }

  render() {
    this._pushEvents();

    return `
          <div id="shapesModal" class="hidden">

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
