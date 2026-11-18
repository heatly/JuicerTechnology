/**
 * Receives form submissions from the Juicer website and appends them to a Google Sheet.
 * Setup: see docs/DEPLOYMENT.md ("Google Sheets form delivery").
 * Each form type gets its own tab (apply, data-request, pilot, contributor, contact).
 * New fields automatically get a new column.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var d = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(d.form) || ss.insertSheet(d.form);

    var keys = Object.keys(d);
    var headers = sh.getLastRow() === 0 ? [] : sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
    keys.forEach(function (k) {
      if (headers.indexOf(k) === -1) headers.push(k);
    });
    sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
    sh.setFrozenRows(1);

    // Store phone numbers as text so leading zeros and + signs survive.
    var row = headers.map(function (h) { return d[h] === undefined ? "" : String(d[h]); });
    var next = sh.getLastRow() + 1;
    var phoneCol = headers.indexOf("phone") + 1;
    if (phoneCol > 0) sh.getRange(next, phoneCol).setNumberFormat("@");
    sh.getRange(next, 1, 1, row.length).setValues([row]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
