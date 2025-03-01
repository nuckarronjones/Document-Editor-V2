class DocumentPreferencesService {
  constructor() {
    this._documentId = "";
    this._preferences = {
      fontSize: "15",
      font: "Times New Roman",
      lineSpacing: "1.15",
    };
  }
  
  getDocumentContent() {
    return document.getElementById("textContainer").innerHTML;
  }

  getDocumentTitle() {
    return document.getElementById("documentName").value;
  }

  get documentId() {
    return this._documentId;
  }

  get preferences() {
    return this._preferences;
  }

  set documentId(documentId) {
    this._documentId = documentId;
  }

  set preferences(updatedPreferences) {
    this._preferences = updatedPreferences;
  }
}

export const documentPreferencesService = new DocumentPreferencesService();
