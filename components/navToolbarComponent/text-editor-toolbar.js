export class TextEditorToolbarComponent {

  render() {
    return `
        <div id="text_Settings" class="toolbar">
            <ul class="text_Settings_Tools hover">
                <li onclick="renderDropdown('arial')">
                    <span id="fontStyleTitle">Times New Roman</span>
                    <i class="bi bi-chevron-compact-down"></i>
                    <div id="arial" class="popup_Selector hidden">
                        <ul id="fontList" class="noBullets hover">

                        </ul>
                    </div>
                </li>
                <hr />

                <li onclick="renderDropdown('12')">
                    <span id="fontSizeTitle">15pt</span>
                    <i class="bi bi-chevron-compact-down"></i>
                    <div id="12" class="popup_Selector hidden">
                        <ul id="font_Sizes" class="noBullets hover">
                        
                        </ul>
                    </div>
                </li>

                <hr />

                <li
                    class="text_Settings_Tools_Item"
                    title="Bold Text"
                    onclick="formatTextStyling('bold')"
                >
                    <button><i class="bi bi-type-bold"></i></button>
                </li>

                <li
                    class="text_Settings_Tools_Item"
                    title="Italic Text"
                    onclick="formatTextStyling('italic')"
                >
                    <button><i class="bi bi-type-italic"></i></button>
                </li>

                <li
                    class="text_Settings_Tools_Item"
                    title="Underline"
                    onclick="formatTextStyling('underline')"
                >
                    <button><i class="bi bi-type-underline"></i></button>
                </li>

                <hr />

                <li
                    class="text_Settings_Tools_Item"
                    title="Font Color"
                    onclick="renderDropdown('paintBucket')"
                >
                    <button><i class="bi bi-paint-bucket"></i></button>
                    <div id="paintBucket" class="popup_Selector hidden">
                        <div id="colorGridWrapper">
                        <!--Generated colors go here from js function-->
                        </div>
                    </div>
                </li>

                <hr />

                <li
                    class="text_Settings_Tools_Item"
                    title="Align Left"
                    onclick="formatTextStyling('justifyLeft')"
                >
                    <button><i class="bi bi-justify-left"></i></button>
                </li>

                <li
                    class="text_Settings_Tools_Ite m"
                    title="Align Center"
                    onclick="formatTextStyling('justifyCenter')"
                >
                    <button><i class="bi bi-justify"></i></button>
                </li>

                <li
                    class="text_Settings_Tools_Item"
                    title="Align Right"
                    onclick="formatTextStyling('justifyRight')"
                >
                    <button><i class="bi bi-justify-right"></i></button>
                </li>

                <hr />

                <li title="Line Spacing" onclick="renderDropdown('line_Spacing')">
                    <button><i class="bi bi-arrows-expand"></i></button>
                    <div id="line_Spacing" class="popup_Selector hidden">
                    <ul class="noBullets hover">
                        <li onclick="setLineSpacing(1)">Single</li>
                        <li onclick="setLineSpacing(1.15)">1.15</li>
                        <li onclick="setLineSpacing(1.5)">1.5</li>
                        <li onclick="setLineSpacing(2)">Double</li>
                    </ul>
                    </div>
                </li>
            </ul>
        </div>
    `;

  }
}
