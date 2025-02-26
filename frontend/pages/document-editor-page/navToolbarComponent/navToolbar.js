import { DocumentSettingsComponent } from "./documentSettingsComponent/documentSettings.js";
import { TextEditorToolbarComponent } from "./textEditorToolbarComponent/textEditorToolbar.js";

export class NavToolbarComponent {
  constructor() {
    this.documentSettings = new DocumentSettingsComponent();
    this.textEditorToolbar = new TextEditorToolbarComponent();
  }

  render() {
    return `
        <nav id="toolbar-container">
            ${this.documentSettings.render()}
            ${this.textEditorToolbar.render()}
        </nav>
        `;
  }
}