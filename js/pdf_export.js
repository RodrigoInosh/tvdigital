function getRadialsTable(radials, form_elements) {

    var table;
    if(radials === "18") {
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
    }, {}, {}, {}
    ];

    return radials_table;
}

function getAnthenasFixesTable() {
     var radials_table = [{
        border: [true, true, true, false],
        table: {
            widths: [20, 30, 35, 35, 35, 60, 55, 50, 50, 30, 40],
            body: [
                [getFormattedCellTitle('N°'),
                getFormattedCellTitle('Altura [m]'),
                getFormattedCellTitle('Largo Vástago [cm]'),
                getFormattedCellTitle('Azimut Vástago [°]'),
                getFormattedCellTitle('Azimut Antena [°]'),
                getFormattedCellTitle('Ganancia de la Antena [dBd]'),
                getFormattedCellTitle('Polarización'),
                getFormattedCellTitle('Marca'),
                getFormattedCellTitle('Modelo'),
                getFormattedCellTitle('Fase [°]'),
                getFormattedCellTitle('% Potencia')],
                ['  ', '', '', '', '', '', '', '', '', '', ''],
                ['  ', '', '', '', '', '', '', '', '', '', ''],
                ['  ', '', '', '', '', '', '', '', '', '', '']
            ]
        }
    }];

    return radials_table;
}

function getFormattedCellTitle(title){
    var style = [{
        text: title,
        style: 'header',
        alignment: 'center',
        fontSize: 10,
        bold: true}];

    return style;
}

function getFormattedCellText(txt){
    var style = [{
        text: txt,
        alignment: 'center',
        fontSize: 10}];

    return style;
}

function createRadialsTableBody(cicles, form_elements, vertical_grades, horizontal_grades) {
    var aux = [];
    var radials = form_elements.radiales;
    aux.push([{text: ' ', border: [false, false, false, true]}, {text: 'RADIALES', colSpan: 9, alignment: 'center', bold: true}, {}, {}, {}, {}, {}, {}, {}, {}]);
    for(x = 0; x < cicles; x++){
        aux.push(getRadialsTableRowHeaders('Acimut (°)', vertical_grades*x, horizontal_grades));
        aux.push(getRadialsTableRowData('Perd. por lóbulo (dB)', form_elements, vertical_grades*x, horizontal_grades, 'M'+radials+'PL'));
        aux.push(getRadialsTableRowData('Distancia Zona Servicio (km)', form_elements, vertical_grades*x, horizontal_grades, 'DIS'));
    }

    return aux;
}

function getRadialsTableRowHeaders(title, vertical_grades, horizontal_grades) {

    var aux = [];
    aux.push(getFormattedCellTitle(title));

    for(ix = 0; ix < 9; ix++) {
        aux.push(getFormattedCellTitle((vertical_grades+horizontal_grades*ix)+'°'));
    }

    return aux;
}

function getRadialsTableRowData(title, form_elements, init_grade, added_grades, parameter) {
    
    var aux = [];
    aux.push(getFormattedCellText(title));
    for(ix = 0; ix <9; ix++){
        aux.push(getFormattedCellText({text: form_elements[parameter+(init_grade+added_grades*ix)]}));
    }
    
    return aux;
}

function getFileName() {

	var date_in_milis = new Date();
	var year = date_in_milis.getFullYear();
	var month = date_in_milis.getMonth();
	var day = date_in_milis.getDay();
	var hour = date_in_milis.getHours();
	var minutes = date_in_milis.getMinutes();

	return year+"-"+month+"-"+day+"_"+hour+"_"+minutes;
}