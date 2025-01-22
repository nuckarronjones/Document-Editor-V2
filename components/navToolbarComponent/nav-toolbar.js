import { DocumentSettingsComponent } from "./documentSettingsComponent/document-settings.js";
import { TextEditorToolbarComponent } from "./textEditorToolbarComponent/text-editor-toolbar.js";

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