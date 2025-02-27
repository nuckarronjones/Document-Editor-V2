class DocumentServiceApi {
  #documentContent;
  #preferences;

  constructor() {
    this.#documentContent = ``;
    this.#preferences = {};
  }

  get documentContent() {
    return this.#documentContent;
  }

  get preferences() {
    return this.#preferences;
  }

  set documentContent(updatedContent) {
    this.#documentContent = updatedContent;
  }

  set preferences(updatedPreferences) {
    this.#preferences = updatedPreferences;
  }

  retrieveAllDocuments() {}

  retrieveDocumentById(id) {}

  saveDocumentById(id) {}

  deleteDocumentById(id) {}
}

export const documentServiceApi = new DocumentServiceApi();
