class ModalService{
    constructor(){
        this.modalSubject = null;
        this.subscribers = [];
    }

    subscribe(callback){
        this.subscribers.push(callback);
    }

    setModalSubject(modal){
        this.modalSubject = modal;
        this._notifySubscribers(); 
    }

    _notifySubscribers(){
        this.subscribers.forEach(callback => callback(this.modalSubject));
    }

}

export const modalService = new ModalService();