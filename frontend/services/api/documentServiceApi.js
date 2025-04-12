import { documentPreferencesService } from "../documentPreferencesService.js";
import { userAuthenticationService } from "./userAuthenticationService.js";

class DocumentServiceApi {
  constructor() {
    this.documentPreferencesService = documentPreferencesService;
    this.userAuthenticationService = userAuthenticationService;
  }

retrieveAllDocuments() {
  const { username, jwtToken } = this.userAuthenticationService.getUser();

  return fetch("/allUserDocuments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      token: jwtToken
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data.documents;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error; 
    });
}

  retrieveDocumentById(id) {
    const { username, jwtToken } = this.userAuthenticationService.getUser();

    return fetch("/userDocument", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        token: jwtToken,
        documentId: id,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      return data.document[0];
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error; 
    });
  }

  saveDocument() {
    const documentId = this.documentPreferencesService.documentId;
    const documentName = this.documentPreferencesService.getDocumentTitle();
    const documentContent = document.getElementById('mainDocument').innerHTML;
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

  deleteDocumentById(id) {
    const authenticatedUser = this.userAuthenticationService.getUser();

    return fetch("/deleteDocument", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: authenticatedUser.username,
        token: authenticatedUser.jwtToken,
        documentId: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
  }

}

export const documentServiceApi = new DocumentServiceApi();
