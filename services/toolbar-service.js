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

  get documentElement() {
    return document.getElementById("main-document");
  }

  _setActiveDropdown(elementID) {
    this.activeDropdownElementId = elementID;
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
