const SPREADSHEET_ID = '1uIBe2IadpAWIpVbqUp0RO8THfEw8Mjlrl_1VvORw_rs';

const DASHBOARD_SHEETS = Object.freeze({
  rg: 1551290449,
  leads: 17439818,
  mat: 955481695,
  metas: 2109044138,
});

/**
 * Sirve el tablero como aplicación web privada de Google Apps Script.
 */
function doGet() {
  return HtmlService.createTemplateFromFile('tablero_catolica')
    .evaluate()
    .setTitle('Dashboard Católica — ADCOM')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * Lee las cuatro pestañas con la identidad de quien despliega la aplicación.
 * El acceso de usuarios se restringe al dominio al crear el despliegue.
 */
function getDashboardData() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);

  return {
    rg: getSheetValuesById_(spreadsheet, DASHBOARD_SHEETS.rg),
    leads: getSheetValuesById_(spreadsheet, DASHBOARD_SHEETS.leads),
    mat: getSheetValuesById_(spreadsheet, DASHBOARD_SHEETS.mat),
    metas: getSheetValuesById_(spreadsheet, DASHBOARD_SHEETS.metas),
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Devuelve una sola fuente para evitar respuestas demasiado grandes en
 * google.script.run. El navegador solicita las cuatro fuentes en paralelo.
 */
function getDashboardSheetData(dataset) {
  if (!Object.prototype.hasOwnProperty.call(DASHBOARD_SHEETS, dataset)) {
    throw new Error(`Fuente de datos no válida: ${dataset}.`);
  }

  const startedAt = Date.now();
  console.log(`[DashboardCatolica] Iniciando ${dataset} (gid ${DASHBOARD_SHEETS[dataset]}).`);
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const values = getSheetValuesById_(spreadsheet, DASHBOARD_SHEETS[dataset]);
  console.log(`[DashboardCatolica] ${dataset}: ${values.length} filas en ${Date.now() - startedAt} ms.`);
  return values;
}

function getSheetValuesById_(spreadsheet, sheetId) {
  const sheet = spreadsheet.getSheets().find(item => item.getSheetId() === sheetId);

  if (!sheet) {
    throw new Error(`No se encontró la pestaña con gid ${sheetId}.`);
  }

  return sheet.getDataRange().getDisplayValues();
}
