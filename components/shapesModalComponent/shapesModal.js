import { modalService } from "../../services/modalService.js";
import { eventListenerService } from "../../services/eventService.js";

export class ShapesModal {
  constructor() {
    this.modalService = modalService;
    this.eventListenerService = eventListenerService;

    document.body.innerHTML += this.render(); 
    this.modalService.subscribe(this.handleModalChange.bind(this)); 
  }

  handleModalChange(currentModal) {
    if (currentModal == "ShapesModal") {
      this.show(); 
    } else {
      this.hide(); 
    }
  }

  events =[
    {
        id: "shapes-modal-close-button",
        eventType: "click",
        action: () => this.modalService.setModalSubject(null),
    }
  ]

  render() {
    this.eventListenerService.events.push(...this.events);

    return `
          <div id="main_Modal" class="hidden">
            <div id="shapes_Modal"></div>
            <div id="modal_Content">
              <span id="shapes-modal-close-button">
                <img src="https://img.icons8.com/ios-glyphs/30/000000/xbox-x.png" />
              </span>
              <div class="iconlist">
                <ul id="shapes_Selection">
                  <li>
                    <img src="https://img.icons8.com/windows/96/000000/unchecked-checkbox.png" />
                  </li>
                  <li>
                    <img src="https://img.icons8.com/ios-glyphs/100/000000/circled.png" />
                  </li>
                  <li>
                    <img src="https://img.icons8.com/material-rounded/96/000000/octagon.png" />
                  </li>
                  <li>
                    <img src="https://img.icons8.com/material-outlined/96/000000/star--v2.png" />
                  </li>
                  <li>
                    <img src="https://img.icons8.com/material-outlined/96/000000/triangle-stroked.png" />
                  </li>
                  <li>
                    <img src="https://img.icons8.com/material-outlined/96/000000/like--v1.png" />
                  </li>
                  <li>
                    <img src="https://img.icons8.com/material-outlined/96/000000/link--v1.png" />
                  </li>
                  <li>
                    <img src="https://img.icons8.com/pastel-glyph/100/000000/person-male--v1.png" />
                  </li>
                  <li>
                    <img src="https://img.icons8.com/ios-glyphs/100/000000/sporty-wheelchair-user.png" />
                  </li>
                  <li>
                    <img src="https://img.icons8.com/material-outlined/96/000000/cloud--v1.png" />
                  </li>
                  <li>
                    <img src="https://img.icons8.com/material-outlined/96/000000/sun--v1.png" />
                  </li>
                  <li>
                    <img src="https://img.icons8.com/ios/100/000000/crescent-moon.png" />
                  </li>
                  <li>
                    <img src="https://img.icons8.com/ios-glyphs/100/000000/group-foreground-selected.png" />
                  </li>
                  <li>
                    <img src="https://img.icons8.com/ios/96/000000/hand.png" />
                  </li>
                  <li>
                    <img src="https://img.icons8.com/ios/96/000000/cursor--v1.png" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        `;
  }

  show() {
    document.getElementById("main_Modal").classList.remove("hidden");
    document.getElementById("main_Modal").classList.add("visible");
  }

  hide() {
    document.getElementById("main_Modal").classList.remove("visible");
    document.getElementById("main_Modal").classList.add("hidden");
  }
}
