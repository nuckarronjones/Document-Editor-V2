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

  renderDropdown(targetId) {
    const element = document.getElementById(targetId);

    if (element.classList.contains("visible")) {
      document.getElementById(targetId).classList.remove("visible");
      document.getElementById(targetId).classList.add("hidden");
    } else if (element.classList.contains("hidden")) {
      document.getElementById(targetId).classList.remove("hidden");
      document.getElementById(targetId).classList.add("visible");
    }
  }
}

export const toolbarService = new ToolbarService();
