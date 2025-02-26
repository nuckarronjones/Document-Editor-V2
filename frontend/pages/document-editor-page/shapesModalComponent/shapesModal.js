import { modalService } from "../../../services/modalService.js";
import { eventListenerService } from "../../../services/eventService.js";
import { toolbarService } from "../../../services/toolbarService.js";

export class ShapesModal {
  constructor() {
    this.modalService = modalService;
    this.eventListenerService = eventListenerService;
    this.toolbarService = toolbarService;

    document.body.innerHTML += this.render();
    this.modalService.subscribe(this.handleModalChange.bind(this));
  }

  SHAPES = [
    {
      square: "https://img.icons8.com/windows/96/000000/unchecked-checkbox.png"
    },
    {
      circle: "https://img.icons8.com/ios-glyphs/100/000000/circled.png"
    },
    {
      octagon: "https://img.icons8.com/material-rounded/96/000000/octagon.png"
    },
    {
      star: "https://img.icons8.com/material-outlined/96/000000/star--v2.png"
    },
    {
      triangle: "https://img.icons8.com/material-outlined/96/000000/triangle-stroked.png"
    },
    {
      heart: "https://img.icons8.com/material-outlined/96/000000/like--v1.png"
    },
    {
      link: "https://img.icons8.com/material-outlined/96/000000/link--v1.png"
    },
    {
      person: "https://img.icons8.com/pastel-glyph/100/000000/person-male--v1.png"
    },
    {
      wheelchair: "https://img.icons8.com/ios-glyphs/100/000000/sporty-wheelchair-user.png"
    },
    {
      cloud: "https://img.icons8.com/material-outlined/96/000000/cloud--v1.png"
    },
    {
      sun: "https://img.icons8.com/material-outlined/96/000000/sun--v1.png"
    },
    {
      moon: "https://img.icons8.com/ios/100/000000/crescent-moon.png"
    },
    {
      group: "https://img.icons8.com/ios-glyphs/100/000000/group-foreground-selected.png"
    },
    {
      hand: "https://img.icons8.com/ios/96/000000/hand.png"
    },
    {
      cursor: "https://img.icons8.com/ios/96/000000/cursor--v1.png"
    }
  ];

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

    this.SHAPES.forEach((shape, index)=>{
      const source = this.SHAPES[index][Object.keys(shape)];

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
