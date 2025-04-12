import { eventListenerService } from "../../services/eventService.js";

export class UserRegistrationPageComponent {
  constructor() {
    this.eventListenerService = eventListenerService;
  }

  events = [];

  _pushEvents() {
    this.eventListenerService.events.push(...this.events);
  }

  render() {
    this._pushEvents();

    return `
       
        `;
  }
}
