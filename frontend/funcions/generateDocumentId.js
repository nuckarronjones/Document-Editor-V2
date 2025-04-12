export function generateDocumentId(){
    const unixTimestamp = Math.floor(Date.now() / 1000);
    return `_document-${unixTimestamp}`;
}