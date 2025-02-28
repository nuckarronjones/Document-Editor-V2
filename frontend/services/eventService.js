class EventListenerService {
  constructor() {
    this.events = [];
  }

  _addEventListenerOnId(eventSubject) {
    const id = eventSubject.id;
    const eventType = eventSubject.eventType;
    const action = eventSubject.action;

    document.getElementById(id).addEventListener(eventType, action);
  }

  _addEventListenersOnClasses(eventSubject) {
    const className = eventSubject.class;
    const eventType = eventSubject.eventType;
    const action = eventSubject.action;
    const elements = document.getElementsByClassName(className);

    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener(eventType, action);
    }
  }

  initializeEventListeners() {
    this.events.forEach((eventSubject) => {
      const eventUsesId = Object.keys(eventSubject).indexOf("id") !== -1;
      const eventUsesClass = Object.keys(eventSubject).indexOf("class") !== -1;

      if (eventUsesId) {
        this._addEventListenerOnId(eventSubject);
      } else if (eventUsesClass) {
        this._addEventListenersOnClasses(eventSubject);
      }
    });
  }

  emptyEventListeners(){
    this.events = [];
  }
}

export const eventListenerService = new EventListenerService();
