class EventListenerService {
  constructor() {
    this.events = [];
  }

  initializeEventListeners() {
    this.events.forEach((eventSubject) => {
      const eventUsesId = Object.keys(eventSubject).indexOf("id") !== -1;
      const eventUsesClass = Object.keys(eventSubject).indexOf("className") !== -1;

      if (eventUsesId) {
        this._alterEventListenerOnId(eventSubject, true);
      } else if (eventUsesClass) {
        this._alterEventListenersOnClasses(eventSubject, true);
      }

    });
  }

  removeEventListeners(removableEvents) {
    removableEvents.forEach((eventToBeRemoved) => {
      const indexOfRemovableEvent = this.events.indexOf(eventToBeRemoved);

      if (indexOfRemovableEvent !== -1) {
        const eventUsesId = Object.keys(eventToBeRemoved).indexOf("id") !== -1;
        const eventUsesClass = Object.keys(eventToBeRemoved).indexOf("class") !== -1;

        if (eventUsesId) {
          this._alterEventListenerOnId(eventToBeRemoved, false);
        } else if (eventUsesClass) {
          this._alterEventListenersOnClasses(eventToBeRemoved, false);
        }

        this.events.splice(indexOfRemovableEvent, 1);
      }
    });
  }

  emptyEventListeners() {
    this.events = [];
  }

  _alterEventListenerOnId(eventSubject, applyEvent) {
    const {id, eventType, action} = eventSubject;
    
    if (applyEvent) {
      document.getElementById(id).addEventListener(eventType, action);
    } else {
      document.getElementById(id).removeEventListener(eventType, action);
    }
  }

  _alterEventListenersOnClasses(eventSubject, applyEvent) {
    const {className, eventType, action} = eventSubject;

    const elements = document.getElementsByClassName(className);

    for (let i = 0; i < elements.length; i++) {
      if (applyEvent) {
        elements[i].addEventListener(eventType, action);
      } else {
        elements[i].removeEventListener(eventType, action);
      }
    }
  }
}

export const eventListenerService = new EventListenerService();
