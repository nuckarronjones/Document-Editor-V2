class ToolbarService {
  constructor() {}
  activeDropdownElementId = null;

  FONTLIST = [
    "Arial",
    "Arial Black",
    "Verdana",
    "Tahoma",
    "Trebuchet MS",
    "Impact",
    "Times New Roman",
    "Courier",
    "Lucida Console",
    "Luminari",
    "Comic Sans MS",
  ].sort();

  COLORS = [
    ["red", "#FF0000"],
    ["orange", "#FF7F00"],
    ["yellow", "#FFFF00"],
    ["green", "#00FF00"],
    ["blue", "#0000FF"],
    ["indigo", "#4B0082"],
    ["violet", "#9400D3"],
    ["black", "#000000"],
    ["white", "#FFFFFF"],
  ];

  LINE_SPACINGS = {
    Single: "1",
    1.15: "1.15",
    1.5: "1.5",
    Double: "2",
  };

  get documentElement() {
    return document.getElementById("main-document");
  }

  _setActiveDropdown(elementID) {
    this.activeDropdownElementId = elementID;
  }

  setTextStyling(pointer) {
    const styling = pointer.target.dataset.fontstyle;
    document.execCommand(styling, false, "");
  }

  setDocumentFont(pointer) {
    const fontSelection = pointer.target.style.fontFamily.replace(/['"]/g, "");

    document.getElementById(
      "font-option-preview"
    ).innerHTML = `<span style='font-family: ${fontSelection};'>${fontSelection}</span>`;
    this.documentElement.style.fontFamily = fontSelection;
  }

  setDocumentFontSize(pointer) {
    const fontSize = `${parseInt(pointer.target.innerHTML)}pt`;
    
    document.getElementById("font-size-preview").innerText = fontSize;
    this.documentElement.style.fontSize = fontSize;
  }

  setFontColor(pointer){
    const fontColor = pointer.target.dataset.color;

    document.execCommand("styleWithCSS", false, true);
    document.execCommand("foreColor", false, fontColor);
  }

  setDocumentLineSpacing(pointer){
    const spacing = pointer.target.dataset.spacing;

    this.documentElement.style.lineHeight = spacing;
  }

  exportDocument() {
    const header =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
      "xmlns:w='urn:schemas-microsoft-com:office:word' " +
      "xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    const footer = "</body></html>";
    const sourceHTML =
      header + document.getElementById("text_Container").innerHTML + footer;

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

  printDocument(){
    const documentContents = document.getElementById("text_Container").innerHTML;
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
      this._setActiveDropdown(null);
      document.getElementById(clickedElement).classList.remove("visible");
      document.getElementById(clickedElement).classList.add("hidden");
    } else if (currentActiveDropdown) {
      document
        .getElementById(currentActiveDropdown)
        .classList.remove("visible");
      document.getElementById(currentActiveDropdown).classList.add("hidden");

      this._setActiveDropdown(clickedElement);

      document.getElementById(clickedElement).classList.remove("hidden");
      document.getElementById(clickedElement).classList.add("visible");
    } else {
      this._setActiveDropdown(clickedElement);
      document.getElementById(clickedElement).classList.remove("hidden");
      document.getElementById(clickedElement).classList.add("visible");
    }
  }
}

export const toolbarService = new ToolbarService();
