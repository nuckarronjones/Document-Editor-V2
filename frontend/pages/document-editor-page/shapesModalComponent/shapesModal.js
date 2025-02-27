import { modalService } from "../../../services/modalService.js";
import { eventListenerService } from "../../../services/eventService.js";
import { toolbarService } from "../../../services/toolbarService.js";

import { SHAPES } from "../../../data/documentData.js";

export class ShapesModal {
  constructor() {
    this.modalService = modalService;
    this.eventListenerService = eventListenerService;
    this.toolbarService = toolbarService;

    this.shapes = SHAPES;

    document.body.innerHTML += this.render();
    this.modalService.subscribe(this.handleModalChange.bind(this));
  }

  show() {
    document.getElementById("main-modal").classList.remove("hidden");
    document.getElementById("main-modal").classList.add("visible");
  }

  hide() {
    document.getElementById("main-modal").classList.remove("visible");
    document.getElementById("main-modal").classList.add("hidden");
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
      id: "shapes-modal-close-button",
      eventType: "click",
      action: () => this.closeModal(),
    },
    {
      class: "modal-shape-option",
      eventType: "click",
      action: (pointer) => this.toolbarService.insertShape(pointer,this.closeModal())
    },
  ];

  render() {
    this.eventListenerService.events.push(...this.events);

    return `
          <div id="main-modal" class="hidden">
            <div id="shapes_Modal"></div>
            <div id="modal_Content">
              <span id="shapes-modal-close-button">
                <img src="https://img.icons8.com/ios-glyphs/30/000000/xbox-x.png" />
              </span>
              <div class="iconlist">
                <ul id="shapes_Selection">
                  ${this.renderIcons()}
                </ul>
              </div>
            </div>
          </div>
        `;
  }
}
