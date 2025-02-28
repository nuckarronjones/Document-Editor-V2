class ToolbarService {
  constructor() {}
  activeDropdownElementId = null;
  
  documentElement() {
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
    this.documentElement().style.fontFamily = fontSelection;
  }

  setDocumentFontSize(pointer) {
    const fontSize = `${parseInt(pointer.target.innerHTML)}pt`;
    
    document.getElementById("font-size-preview").innerText = fontSize;
    this.documentElement().style.fontSize = fontSize;
  }

  setFontColor(pointer){
    const fontColor = pointer.target.dataset.color;

    document.execCommand("styleWithCSS", false, true);
    document.execCommand("foreColor", false, fontColor);
  }

  setDocumentLineSpacing(pointer){
    const spacing = pointer.target.dataset.spacing;

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

  saveDocument(){
    fetch('/', {
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          key1: 'value1',
          key2: 'value2'
      })
  })
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));
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
