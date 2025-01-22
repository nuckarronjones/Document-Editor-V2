export class DocumentSettingsComponent{
    render(){
        return `
           <div id="name_Toolbar" class="toolbar">
                <ul class="text_Settings_Tools">
                    <li>
                    <i id="logo" class="bi bi-book"></i>
                    </li>
                    <li>
                    <input id="documentName" type="" name="" value="Document Title" />
                    </li>
                </ul>
                </div>

                <div id="document_Settings" class="toolbar">
                <ul class="text_Settings_Tools hover">
                    <li>
                    File
                    <div id="file_Options" class="popup-selector hidden">
                        <ul class="noBullets hover">
                        <li id="btn-export">Download (.docx)</li>
                        <li id="print">Print<i class="bi bi-printer"></i></li>
                        </ul>
                    </div>
                    </li>

                    <li>
                    Insert
                    <div id="Insert" class="popup-selector hidden">
                        <ul class="noBullets hover">
                        <li>Shapes<i class="bi bi-star"></i></li>
                        </ul>
                    </div>
                    </li>
                </ul>
            </div>
        `;
    }
}