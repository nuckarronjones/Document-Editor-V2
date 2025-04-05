class DocumentPreferencesService {
  constructor() {
    this.loadDefaultPreferences();
  }

  loadDefaultPreferences(){
    this._documentId = "";
    this._documentContent = "";
    this._preferences = {
      fontSize: "15",
      font: "Times New Roman",
      lineSpacing: "1.15",
    };
  }

  getDocumentTitle() {
    return document.getElementById("documentName").value;
  }

  get documentContent(){
    return this._documentContent;
  }

  get documentId() {
    return this._documentId;
  }

  get preferences() {
    return this._preferences;
  }

  set documentContent(content){
    return this._documentContent = content;
  }

  set documentId(documentId) {
    this._documentId = documentId;
  }

  set preferences(updatedPreferences) {
    this._preferences = updatedPreferences;
  }
}

export const documentPreferencesService = new DocumentPreferencesService();
