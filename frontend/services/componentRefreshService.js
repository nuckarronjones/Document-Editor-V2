//Non-singleton service, initialized by a component - per use basis.
export class ComponentRefreshService {

  constructor(eventListenerService) {
    this.eventListenerService = eventListenerService;
  }

  //Takes in component render() function (binded to 'this')
  refreshComponent(componentRender){
    this.eventListenerService.emptyEventListeners();

    const appElement = document.getElementById("app");
    appElement.innerHTML = componentRender();

    this.eventListenerService.initializeEventListeners();
  }
}