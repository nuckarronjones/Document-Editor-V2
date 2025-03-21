import { documentPreferencesService } from "../documentPreferencesService.js";
import { userAuthenticationService } from "./userAuthenticationService.js";

class DocumentServiceApi {
  constructor() {
    this.documentPreferencesService = documentPreferencesService;
    this.userAuthenticationService = userAuthenticationService;
  }

  async retrieveAllDocuments() {
    await fetch("/allUserDocuments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: authenticatedUser.username,
        token: authenticatedUser.jwtToken
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
  }

  retrieveDocumentById(id) {}

  saveDocument() {
    const documentId = this.documentPreferencesService.documentId;
    const documentName = this.documentPreferencesService.getDocumentTitle();
    const documentContent =
      this.documentPreferencesService.getDocumentContent();
    const documentPreferences = this.documentPreferencesService.preferences;
    const authenticatedUser = this.userAuthenticationService.getUser();

    fetch("/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: authenticatedUser.username,
        token: authenticatedUser.jwtToken,
        documentId: documentId,
        documentName: documentName,
        documentContent: documentContent,
        documentPreferences: documentPreferences,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
  }

  deleteDocumentById(id) {}
}

export const documentServiceApi = new DocumentServiceApi();
