
function doGet(e) {
    var data = JSON.parse(e.parameter.data);

    if (data.PUT) {
        if (data.PUT.where == 'users') {
            addUser(data.PUT.data)
            var naa = 'okok'
        } else if (data.PUT.where == 'cierra') {
            cierraCaso(data.caso, data.data, data.user)
            var naa = 'okok'
        } else if (data.PUT.where == 'nl') {
            noloc(data.caso, data.data, data.user)
            var naa = 'okok'
        } else if (data.PUT.where == 'reporte') {
            report(data.data, data.coment, data.user, data.caso)
            var naa = 'okok'
        }else if (data.PUT.where == 'know') {
            knowledge(data.data, data.antdata, data.user, data.sol)
            var naa = 'okok'
        }


    } else if (data.GET) {
        if (data.GET == 'users') {
            var naa = getUsers()
        } else if (data.GET == 'metricas') {
            var naa = getMet(data.user)
        } else if (data.GET == 'caso') {
            var naa = getCaso(data.user)
        }
    }
    return ContentService.createTextOutput(naa);
}

function getUsers() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Users");
    var svalues = sheet.getDataRange().getValues();
    var usr = []

    for (var i = 1; i < svalues.length; i++) {
        usr.push(svalues[i][0])
    }

    return JSON.stringify(usr)
}

function getMet(x) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Users");
    var svalues = sheet.getDataRange().getValues();
    var met = 0;
    for (var i = 1; i < svalues.length; i++) {
        if (x == svalues[i][0]) {
            met = svalues[i][1];
            break
        }
    }

    return met
}

function addUser(x) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Users");
    sheet.appendRow([x]);
}

function getCaso(x) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Err");
    var svalues = sheet.getDataRange().getValues();
    var caso = null;

    for (var ei = 1; ei < svalues.length; ei++) {
        if (svalues[ei][0] && svalues[ei][13] == x && !svalues[ei][12]) {
            caso = ei;
            break
        }
    }

    if (caso == null) {
        for (var i = 1; i < svalues.length; i++) {
            if (svalues[i][0] && !svalues[i][13] && !svalues[i][12]) {
                caso = i;
                break
            }
        }
    }

    sheet.getRange(caso + 1, 14).setValue(x);
    var response = [svalues[caso][0], svalues[caso][1], svalues[caso][2], svalues[caso][3], svalues[caso][4], svalues[caso][5], svalues[caso][6], svalues[caso][7], svalues[caso][8], svalues[caso][9], svalues[caso][10], caso]
    
    return JSON.stringify(response)
}

function cierraCaso(x, data, user) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Err");

    sheet.getRange(x + 1, 4).setValue(data[3]);
    sheet.getRange(x + 1, 5).setValue(data[4]);
    sheet.getRange(x + 1, 6).setValue(data[5]);
    sheet.getRange(x + 1, 7).setValue(data[6]);
    sheet.getRange(x + 1, 8).setValue(data[7]);
    sheet.getRange(x + 1, 9).setValue(data[8]);
    sheet.getRange(x + 1, 10).setValue(data[9]);
    sheet.getRange(x + 1, 12).setValue('corregido');
    sheet.getRange(x + 1, 13).setValue(user);
}

function noloc(x, data, user) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Err");

    sheet.getRange(x + 1, 4).setValue(data[3]);
    sheet.getRange(x + 1, 5).setValue(data[4]);
    sheet.getRange(x + 1, 6).setValue(data[5]);
    sheet.getRange(x + 1, 7).setValue(data[6]);
    sheet.getRange(x + 1, 8).setValue(data[7]);
    sheet.getRange(x + 1, 9).setValue(data[8]);
    sheet.getRange(x + 1, 10).setValue(data[9]);
    sheet.getRange(x + 1, 12).setValue('N/L');
    sheet.getRange(x + 1, 13).setValue(user);
}

function report(x, coment, user, caso) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Reporte");

    sheet.appendRow([x[0], x[1], x[2], x[3], x[4], x[5], x[6], x[7], x[8], x[9], x[10], coment, user]);
  
   var err = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Err");
   err.getRange(caso + 1, 4).setValue(x[3]);
    err.getRange(caso + 1, 5).setValue(x[4]);
    err.getRange(caso + 1, 6).setValue(x[5]);
    err.getRange(caso + 1, 7).setValue(x[6]);
    err.getRange(caso + 1, 8).setValue(x[7]);
    err.getRange(caso + 1, 9).setValue(x[8]);
    err.getRange(caso + 1, 10).setValue(x[9]);
    err.getRange(caso + 1, 12).setValue('REPORTADO');
    err.getRange(caso + 1, 13).setValue(user);
}

function knowledge(data,antdata, user, sol){
var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Knowledge");
  
 sheet.appendRow([antdata[3],antdata[4],antdata[5],antdata[6],antdata[7],antdata[8],antdata[9], data[3], data[4], data[5], data[6], data[7], data[8], data[9], sol, user]);
}
