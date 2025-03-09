import { eventListenerService } from "../../services/eventService.js";
import { routingService } from "../../services/routingService.js";

export class UserLoginPageComponent{
  constructor() {
    this.eventListenerService = eventListenerService;
    this.routingService = routingService;
  }

  events = [
      {
        id: "loginButton",
        eventType: "click",
        action: () => {
          this.routingService.setRoute("/allDocuments");
        },
      }
    ];

  _pushEvents(){
    this.eventListenerService.events.push(...this.events);
  }

  render() {
    this._pushEvents();

    return `
        <div class="container">
            <h1> Login </h1>
            <button id="loginButton"> click me</button>
        </div>
        `;
  }
}
