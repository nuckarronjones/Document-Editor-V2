export class DocumentComponent {
  render() {
    return `
        <div id="text_Container">
            <div
                id="text_Area"
                contenteditable
                style="
                font-family: Times new roman;
                line-spacing: 1.15;
                line-height: 1;
                font-size: 15pt;
                position: relative;
                "
            ></div>
        </div>
    `;
  }
}
