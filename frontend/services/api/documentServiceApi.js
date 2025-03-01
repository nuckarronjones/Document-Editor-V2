import { documentPreferencesService } from "../documentPreferencesService.js";

class DocumentServiceApi {

  constructor() {
    this.documentPreferencesService = documentPreferencesService;
  }

  retrieveAllDocuments() {

  }

  retrieveDocumentById(id) {

  }

  saveDocument() {
    const documentId = this.documentPreferencesService.documentId;
    const documentName = this.documentPreferencesService.getDocumentTitle();
    const documentContent = this.documentPreferencesService.getDocumentContent();
    const documentPreferences = this.documentPreferencesService.preferences;

    fetch('/', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: documentId,
            name: documentName,
            content: documentContent,
            preferences: documentPreferences
        })
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
  }

  deleteDocumentById(id) {

  }
}

export const documentServiceApi = new DocumentServiceApi();
