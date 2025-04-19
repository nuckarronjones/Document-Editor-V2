import { eventListenerService } from "../../services/eventService.js";
import { componentLifecycleService } from "../../services/componentLifecycleService.js";

export class ConfirmationModalComponent {
  constructor(callbackFn) {
    this.eventListenerService = eventListenerService;

    this.componentLifecycleService = componentLifecycleService;

    this.component = this.render();

    this.eventListenerService.initializeEventListeners();

    this.confirmDocumentDeletion = callbackFn;
  }

  events = [
    {
      id: "closeConfirmationModal",
      eventType: "click",
      action: () => {
        this._destroyModal();
      },
    },
    {
      id: "acceptBtn",
      eventType: "click",
      action: () => {
        this.confirmDocumentDeletion();
        this._destroyModal();
      },
    },
    {
      id: "declineBtn",
      eventType: "click",
      action: () => {
        this._destroyModal();
      },
    },
  ];

  _destroyModal() {
    this.componentLifecycleService.destroyComponent(
      "ConfirmationModalComponent",
      this.events
    );
  }

  _pushEvents() {
    this.eventListenerService.events.push(...this.events);
  }

  render() {
    this._pushEvents();

    document.body.innerHTML += `
          <div id="ConfirmationModalComponent">
            <div id="modalContainer"></div>

            <div id="modalContent">

              <span id="closeConfirmationModal" class="modalCloseBtn">
                <img src="https://img.icons8.com/ios-glyphs/30/000000/xbox-x.png" />
              </span>

              <div class="w-100">
                <h2 class="label mb-3">Are you sure you want to delete this document?</h2>

                <div class="w-100 navigateAwayButtons">
                  <button id="acceptBtn" class="d-inline-block btnPrimary btnMultiSelect">
                    Yes
                  </button>
                  <button id="declineBtn" class="d-inline-block btnPrimaryOutlined btnMultiSelect">
                    No
                  </button>
                </div>
              </div>

            </div>
          </div>
        `;
  }
}
