import { documentPreferencesService } from "./documentPreferencesService.js";

class ToolbarService {
  constructor() {
    this.documentPreferencesService = documentPreferencesService;
    
    this.activeDropdownElementId = null;
  }

  documentElement() {
    return document.getElementById("mainDocument");
  }

  setTextStyling(pointer) {
    const styling = pointer.target.dataset.fontstyle;
    document.execCommand(styling, false, "");
  }

  setDocumentFont(pointer) {
    const fontSelection = pointer.target.style.fontFamily.replace(/['"]/g, "");
    
    //Update current user preference when user saves
    this.documentPreferencesService.preferences.font = fontSelection;

    //Alter current document element and dropdown to reflect this change
    document.getElementById(
      "font-option-preview"
    ).innerHTML = `<span style='font-family: ${fontSelection};'>${fontSelection}</span>`;
    this.documentElement().style.fontFamily = fontSelection;
  }

  setDocumentFontSize(pointer) {
    const fontSize = parseInt(pointer.target.innerHTML);
    const fontSizeFormatted = `${fontSize}pt`;

    //Update current user preference when user saves
    this.documentPreferencesService.preferences.fontSize = fontSize;
    
    //Alter current document element and dropdown to reflect this change
    document.getElementById("fontSizeTitle").innerText = fontSizeFormatted;
    this.documentElement().style.fontSize = fontSizeFormatted;
  }

  setFontColor(pointer){
    const fontColor = pointer.target.dataset.color;

    document.execCommand("styleWithCSS", false, true);
    document.execCommand("foreColor", false, fontColor);
  }

  setDocumentLineSpacing(pointer){
    const spacing = pointer.target.dataset.spacing;

    //Update current user preference when user saves
    this.documentPreferencesService.preferences.lineSpacing = spacing;

    //Alter current document element and dropdown to reflect this change
    this.documentElement().style.lineHeight = spacing;
  }

  exportDocument() {
    const header =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
      "xmlns:w='urn:schemas-microsoft-com:office:word' " +
      "xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    const footer = "</body></html>";
    const sourceHTML =
      header + document.getElementById("textContainer").innerHTML + footer;

    const source =
      "data:application/vnd.ms-word;charset=utf-8," +
      encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");

    document.body.appendChild(fileDownload);

    fileDownload.href = source;

    fileDownload.download = `${
      document.getElementById("documentName").value
    } .doc`;

    fileDownload.click();
    
    document.body.removeChild(fileDownload);
  }

  insertShape(pointer, closeModal) {
    const imageURL = pointer.srcElement.src;
    const newDiv = document.createElement("img");

    newDiv.style.height = "50px";
    newDiv.style.width = "50px";
    newDiv.src = imageURL;

    this.documentElement().appendChild(newDiv);

    closeModal;
  }

  printDocument() {
    const documentContents =
      document.getElementById("textContainer").innerHTML;
    const windowedDocument = window.open("", "", "height=1375p, width=1063");
    
    windowedDocument.document.write("<html>");
    windowedDocument.document.write("<body >");
    windowedDocument.document.write(documentContents);
    windowedDocument.document.write("</body></html>");
    windowedDocument.document.close();
    windowedDocument.print();
  }

  renderDropdown(targetId) {
    const clickedElement = targetId;
    const currentActiveDropdown = this.activeDropdownElementId;

    if (currentActiveDropdown == clickedElement) {
      this._hideElement(clickedElement, null);

    } else if (currentActiveDropdown) {
      this._hideElement(currentActiveDropdown, null);
      this._showElement(clickedElement,clickedElement);

    } else {
      this._showElement(clickedElement,clickedElement);
      
    }
  }

  _hideElement(clickedElement, activeDropdown){
    this._setActiveDropdown(activeDropdown);

    document.getElementById(clickedElement).classList.remove("visible");
    document.getElementById(clickedElement).classList.add("hidden");
  }

  _showElement(clickedElement, activeDropdown){
    this._setActiveDropdown(activeDropdown);

    document.getElementById(clickedElement).classList.add("visible");
    document.getElementById(clickedElement).classList.remove("hidden");
  }

  _setActiveDropdown(elementID) {
    this.activeDropdownElementId = elementID;
  }
}

export const toolbarService = new ToolbarService();
