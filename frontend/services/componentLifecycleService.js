import { eventListenerService } from "./eventService.js";

export class ComponentLifecycleService {

  constructor() {
    this.eventListenerService = eventListenerService;
  }

  //Takes in component render() function (binded to 'this')
  refreshComponent(renderCallback){
    const appElement = document.getElementById("app");

    this.eventListenerService.emptyEventListeners();

    appElement.innerHTML = renderCallback();

    this.eventListenerService.initializeEventListeners();
  }

  destroyComponent(htmlIdSelector, eventsToRemove){
    this.eventListenerService.removeEventListeners(eventsToRemove);
    document.getElementById(htmlIdSelector).remove();
  }

}

export const componentLifecycleService = new ComponentLifecycleService();