/**
 * Receives form submissions from the Juicer website and appends them to a Google Sheet.
 * Setup: see docs/DEPLOYMENT.md ("Google Sheet for applications").
 *
 * - Each form type gets its own tab. Only the names in ALLOWED_FORMS are accepted.
 * - New fields automatically get a new column.
 * - SECRET (optional but recommended): set the same value here and in Vercel as
 *   SHEETS_SHARED_SECRET so random people who find the URL cannot add rows.
 */
var ALLOWED_FORMS = ["apply", "data-request", "pilot", "contributor", "contact"];
var SECRET = ""; // e.g. "a-long-random-string". Leave empty to disable the check.

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var d = JSON.parse(e.postData.contents);

    if (SECRET && d.token !== SECRET) return reply({ ok: false, error: "unauthorized" });
    delete d.token;
    if (ALLOWED_FORMS.indexOf(d.form) === -1) return reply({ ok: false, error: "unknown form" });

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(d.form) || ss.insertSheet(d.form);

    var headers = sh.getLastRow() === 0 ? [] : sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
    Object.keys(d).forEach(function (k) {
      if (headers.indexOf(k) === -1) headers.push(k);
    });
    sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
    sh.setFrozenRows(1);

    var row = headers.map(function (h) { return d[h] === undefined ? "" : String(d[h]); });
    var next = sh.getLastRow() + 1;
    var phoneCol = headers.indexOf("phone") + 1;
    if (phoneCol > 0) sh.getRange(next, phoneCol).setNumberFormat("@"); // keep leading zeros / +
    sh.getRange(next, 1, 1, row.length).setValues([row]);

    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
