import { DocumentComponent } from "./documentComponent/document.js";
import { NavToolbarComponent } from "./navToolbarComponent/navToolbar.js";
export class DocumentEditorPageComponent {
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
