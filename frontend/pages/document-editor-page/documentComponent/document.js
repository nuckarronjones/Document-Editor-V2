import { documentPreferencesService } from "../../../services/documentPreferencesService.js";

export class DocumentComponent {
  constructor(){
    this.documentPreferencesService = documentPreferencesService;

    //Initialize this components values using document preferences service
    this.fontPreference = this.documentPreferencesService.preferences.font;
    this.lineSpacing = this.documentPreferencesService.preferences.lineSpacing;
    this.fontSize = this.documentPreferencesService.preferences.fontSize;
  }
  
  render() {
    return `
        <div id="textContainer">
            <div
                id="mainDocument"
                contenteditable
                style="
                font-family: ${this.fontPreference};
                line-spacing: ${this.lineSpacing};
                line-height: 1;
                font-size: ${this.fontSize }pt;
                position: relative;
                "
            >
             ${this.documentPreferencesService.getDocumentContent()}
            </div>
        </div>
    `;
  }

}
