import { DocumentComponent } from "../../document-editor-page/documentComponent/document.js";
import { NavToolbarComponent } from "../../document-editor-page/navToolbarComponent/navToolbar.js";
export class DocumentEditorComponent {
  constructor() {
    this.documentComponent = new DocumentComponent();
    this.navbarComponent = new NavToolbarComponent();
  }

  render() {
    return `
         ${this.navbarComponent.render()}
         ${this.documentComponent.render()}
     `;
  }
}
