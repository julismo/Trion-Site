// ================================================================
// Google Apps Script — Trion Scale Lead Capture
// ================================================================
// COMO USAR:
// 1. Criar um Google Sheet com nome "Trion Leads"
// 2. Abrir Extensions > Apps Script
// 3. Colar este código inteiro (substitui o conteúdo default)
// 4. Clicar "Deploy" > "New Deployment"
//    - Type: "Web app"
//    - Execute as: "Me"
//    - Who has access: "Anyone"
// 5. Copiar o URL gerado (https://script.google.com/macros/s/...)
// 6. Colar o URL em js/main.js → GOOGLE_SCRIPT_URL
// ================================================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Criar cabeçalhos na primeira utilização
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Nome',
        'Email',
        'Empresa',
        'Cargo',
        'Interesse',
        'Descrição',
        'Origem',
        'Data Submissão'
      ]);
      // Formatar cabeçalhos
      sheet.getRange(1, 1, 1, 9).setFontWeight('bold');
    }

    // Adicionar nova linha com os dados
    sheet.appendRow([
      new Date(),
      data.nome || '',
      data.email || '',
      data.empresa || '',
      data.cargo || '',
      data.interesse || '',
      data.descricao || '',
      data.origem || 'website',
      data.data_submissao || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Teste manual (opcional) — correr no editor Apps Script
function testDoPost() {
  var mockEvent = {
    postData: {
      contents: JSON.stringify({
        nome: 'Teste Manual',
        email: 'teste@exemplo.com',
        empresa: 'Empresa Teste',
        cargo: 'CEO',
        interesse: 'agentes-ia',
        descricao: 'Quero testar a integração',
        origem: 'teste_manual',
        data_submissao: new Date().toISOString()
      })
    }
  };
  var result = doPost(mockEvent);
  Logger.log(result.getContent());
}
