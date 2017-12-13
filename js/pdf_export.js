var datum = 'WGS84';
var sist_radiante_principal = "sistRadiantePrinc";
var sist_radiante_adicional1 = "sistRadianteAdic1";
var sist_radiante_adicional2 = "sistRadianteAdic2";
var zone_service_intensity = "48";
var zone_hedge_intensity = "40";
var zone_urban_intensity = "66";

function getRadialsTable(radials, form_elements) {
    var table;
    if (radials === "18") {
        table = createRadialsTable(form_elements, 2, 180, 20);
    } else if (radials === "72") {
        table = createRadialsTable(form_elements, 8, 45, 5);
    }

    return table;
}

function createRadialsTable(form_elements, cicles, vertical_grades, horizontal_grades) {

    var radials_table = [{
        colSpan: 4,
        border: [true, false, true, true],
        table: {
            widths: [170, 30, 30, 30, 30, 30, 30, 30, 30, 30],
            body: createRadialsTableBody(cicles, form_elements, vertical_grades, horizontal_grades)
        },
    }, {}, {}, {}];

    return radials_table;
}

function getAnthenasFixesTable(count_antenas_elements, data_antenas_fixes) {
    var radials_table = [{
        border: [true, true, true, false],
        table: {
            widths: [20, 30, 35, 35, 35, 60, 55, 50, 50, 30, 40],
            body: getAnthenasFixesTableBody(count_antenas_elements, data_antenas_fixes)
        }
    }];

    return radials_table;
}

function getFormattedCellTitle(title) {
    var style = [{
        text: title,
        style: 'header',
        alignment: 'center',
        fontSize: 10,
        bold: true
    }];

    return style;
}

function getFormattedCellText(txt) {
    txt = txt == "" ? " " : txt;
    var style = [{
        text: txt,
        alignment: 'center',
        fontSize: 10
    }];

    return style;
}

function createRadialsTableBody(cicles, form_elements, vertical_grades, horizontal_grades) {
    var aux = [];
    var radials = form_elements.radiales;

    aux.push([{
        text: ' ',
        border: [false, false, false, true]
    }, {
        text: 'RADIALES',
        colSpan: 9,
        alignment: 'center',
        bold: true
    }, {}, {}, {}, {}, {}, {}, {}, {}]);

    for (x = 0; x < cicles; x++) {
        aux.push(getRadialsTableRowHeaders('Acimut (°)', vertical_grades * x, horizontal_grades));
        aux.push(getRadialsTableRowData('Perd. por lóbulo (dB)', form_elements, vertical_grades * x, horizontal_grades, 'M' + radials + 'PL'));
        aux.push(getRadialsTableRowData('Distancia Zona Servicio (km)', form_elements, vertical_grades * x, horizontal_grades, 'DIS'));
    }

    return aux;
}

function getAnthenasFixesTableBody(count_antenas_elements, data_antenas_fixes) {
    var aux = [];
    aux.push([getFormattedCellTitle('N°'), getFormattedCellTitle('Altura [m]'), getFormattedCellTitle('Largo Vástago [cm]'), getFormattedCellTitle('Azimut Vástago [°]'), getFormattedCellTitle('Azimut Antena [°]'),
        getFormattedCellTitle('Ganancia de la Antena [dBd]'), getFormattedCellTitle('Polarización'), getFormattedCellTitle('Marca'), getFormattedCellTitle('Modelo'), getFormattedCellTitle('Fase [°]'),
        getFormattedCellTitle('% Potencia')
    ]);
    count_antenas_elements = count_antenas_elements == 0 ? 1 : count_antenas_elements;
    for (var row = 0; row < count_antenas_elements; row++) {
        aux.push(getColumnData(data_antenas_fixes, row));
    }

    return aux;
}

function getColumnData(data_antenas_fixes, row) {
    var column_numero = [];

    column_numero.push(getFormattedCellText(data_antenas_fixes.numero['ant_num' + row]));
    column_numero.push(getFormattedCellText(data_antenas_fixes.altura['ant_alt' + row]));
    column_numero.push(getFormattedCellText(data_antenas_fixes.largo['ant_lar' + row]));
    column_numero.push(getFormattedCellText(data_antenas_fixes.azimutV['ant_aziV' + row]));
    column_numero.push(getFormattedCellText(data_antenas_fixes.azimutA['ant_aziA' + row]));
    column_numero.push(getFormattedCellText(data_antenas_fixes.ganancia['ant_gan' + row]));
    column_numero.push(getFormattedCellText(data_antenas_fixes.polarizacion['ant_pol' + row]));
    column_numero.push(getFormattedCellText(data_antenas_fixes.marca['ant_marc' + row]));
    column_numero.push(getFormattedCellText(data_antenas_fixes.modelo['ant_mod' + row]));
    column_numero.push(getFormattedCellText(data_antenas_fixes.fase['ant_fase' + row]));
    column_numero.push(getFormattedCellText(data_antenas_fixes.potencia['ant_pot' + row]));

    return column_numero;
}

function getRadialsTableRowHeaders(title, vertical_grades, horizontal_grades) {

    var aux = [];
    aux.push(getFormattedCellTitle(title));

    for (ix = 0; ix < 9; ix++) {
        aux.push(getFormattedCellTitle((vertical_grades + horizontal_grades * ix) + '°'));
    }

    return aux;
}

function getRadialsTableRowData(title, form_elements, init_grade, added_grades, parameter) {

    var aux = [];
    aux.push(getFormattedCellText(title));
    for (ix = 0; ix < 9; ix++) {
        aux.push(getFormattedCellText({
            text: form_elements[parameter + (init_grade + added_grades * ix)]
        }));
    }

    return aux;
}

function getFileName(identificator, sist_radiante, intensidad_zone_name) {

    var date_in_milis = new Date();

    var year = date_in_milis.getFullYear();
    var month = date_in_milis.getMonth()+1;
    var day = date_in_milis.getUTCDate();
    var hour = date_in_milis.getHours();
    var minutes = date_in_milis.getMinutes();
    var type_sist_radiant = getSistRadiantType(sist_radiante);
    // var intensidad_zone_name = getNameZone(intensidad_campo);

    month = month < 10 ? '0'+month : month;
    day = day < 10 ? '0'+day : day;
    hour = hour < 10 ? '0'+hour : hour;
    minutes = minutes < 10 ? '0'+minutes : minutes;

    return intensidad_zone_name + '_' + type_sist_radiant + '_' + identificator +'_'+ year + month + day + hour + minutes;
}

function isTilt(tilt_value) {
    if (tilt_value != "0" && tilt_value != "") {
        return true;
    } else {
        return false;
    }
}

function getCanalByFrecuencia(tipo_frecuencia, frecuencia) {
    var canal = "";

    if (tipo_frecuencia == 'analoga') {
        canal = frecuencias_canal_analogica[frecuencia];
    } else if (tipo_frecuencia == 'digital') {
        canal = frecuencias_canal_digital[frecuencia];
    }

    canal = typeof canal != 'undefined' ? canal : "[N/A]";
    return canal;
}

function getSistRadiantType(sist_radiante) {
    sist_radiant_name = "PTx0";
    if(sist_radiante_principal === sist_radiante) {
        sist_radiant_name = "PTx0";
    } else if(sist_radiante_adicional1 === sist_radiante) {
        sist_radiant_name = "PTx1";
    } else if(sist_radiante_adicional2 === sist_radiante) {
        sist_radiant_name = "PTx2";
    }

    return sist_radiant_name;
}

function getNameZone(intensidad_campo) {
    zone_name = "ZonaServicio";
    if(zone_service_intensity == intensidad_campo) {
        zone_name = "ZonaServicio";
    } else if(zone_hedge_intensity == intensidad_campo) {
        zone_name = "ZonaCobertura";
    } else if(zone_urban_intensity == intensidad_campo) {
        zone_name = "ZonaUrbana";
    }
    return zone_name;
}
