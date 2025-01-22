class EventListenerService {
  constructor() {
    this.events = [];
  }

  initializeEventListeners() {
    this.events.forEach((eventSubject) => {
      document
        .getElementById(eventSubject.id)
        .addEventListener(eventSubject.eventType, eventSubject.action);
    });
  }
}

export const eventListenerService = new EventListenerService();