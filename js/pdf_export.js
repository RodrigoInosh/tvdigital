function getPDF(form_elements) {

    var radials = form_elements.radiales;
    var title = 'CÁLCULOS CON '+radials+' RADIALES FORMULARIO PROYECTO TÉCNICO PARA LA TRANSICIÓN ANÁLOGO-DIGITAL DEL SERVICIO DE RADIODIFUSIÓN TELEVISIVA'

    var doc = {
        info: {title: 'prueba'},
        pageSize: 'A4',
        content: [getPage1(title, form_elements), getTableTechnicalSystemFeature('CARACTERÍSTICAS TÉCNICAS DEL SISTEMA RADIANTE PRINCIPAL', radials, form_elements),
            getTableTechnicalSystemFeature('CARACTERÍSTICAS TÉCNICAS DEL SISTEMA RADIANTE ADICIONAL 1 (Si aplica)', radials, [])
        ]
    }

    pdfMake.createPdf(doc).download('safa.pdf');
}

function getPage1(title, form_elements) {
    var obj = [{
            text: title,
            style: 'header',
            alignment: 'center',
            bold: true,
            decoration: 'underline'
        },
        {
            text: '     '
        },
        {
            text: '     '
        },
        {
            table: {
                // headers are automatically repeated if the table spans over multiple pages
                // you can declare how many rows should be treated as headers
                headerRows: 0,
                widths: [180, 85, 120, 125],
                // border: [left, top, right, bottom]
                body: [
                    [{text: 'IDENTIFICACIÓN DEL CONCESIONARIO', colSpan: 4, alignment: 'center', bold: true, decoration: 'underline', border: [true, true, true, false]}, {}, {}, {}],
                    [{text: 'Razón Social: ' + form_elements.pRazonSocial, colSpan: 2, fontSize: 10, border: [true, false, false, false]}, {},
                        {text: 'RUT: ' + form_elements.pRut, colSpan: 2, fontSize: 10, border: [false, false, true, false]}, {}],
                    [{text: 'Domicilio: Calle: ' + form_elements.pDomicilio, fontSize: 10, border: [true, false, false, false]}, {text: 'N°:', fontSize: 10, border: [false]},
                        {text: 'Comuna:', fontSize: 10, border: [false]}, {text: 'Región:', fontSize: 10, border: [false, false, true, false]}],
                    [{text: 'Representante Legal:', fontSize: 10, border: [true, false, false, false]}, {text: 'RUT:', fontSize: 10, border: [false]},
                        {text: 'E-mail: ' + form_elements.pEmail, fontSize: 10, border: [false]}, {text: 'Teléfono:', fontSize: 10, border: [false, false, true, false]}],
                    [{text: 'Resolución Otorga   N°:', fontSize: 10, border: [true, false, false, false], colSpan: 2}, {},
                        {text: 'Fecha:', fontSize: 10, border: [false]}, {text: 'CNTV [ ]:', fontSize: 10, border: [false, false, true, false]}],
                    [{text: 'Resolución Modifica   N°:', fontSize: 10, border: [true, false, false, false], colSpan: 2}, {},
                        {text: 'Fecha:', fontSize: 10, border: [false]}, {text: 'CNTV [ ]:', fontSize: 10, border: [false, false, true, false]}],
                    [{text: 'Otro documento autorizatorio:   N°:', fontSize: 10, border: [true, false, false, true], colSpan: 2}, {},
                        {text: 'Fecha:', fontSize: 10, border: [false, false, false, true]}, {text: 'Institución:', fontSize: 10, border: [false, false, true, true]}]

                ]
            }
        },
        {text: '    '},
        {
            table: {
                headerRows: 0,
                widths: [127.5, 127.5, 127.5, 127.5],
                body: [
                    [{text: 'DATOS GENERALES CONCESIÓN ANALÓGICA', colSpan: 4, alignment: 'center', bold: true, decoration: 'underline', border: [true, true, true, false]}, {}, {}, {}],
                    [{text: 'Canal:', fontSize: 10, border: [true, false, false, true]}, {text: 'Señal distintiva:', fontSize: 10, border: [false, false, false, true]},
                        {text: 'Localidad o Nombre de la Estación:', colSpan: 2, fontSize: 10, border: [false, false, true, true]}, {}]
                ]
            }
        },
        {text: '    '},
        {
            table: {
                headerRows: 0,
                widths: [127.5, 127.5, 127.5, 127.5],
                body: [
                    [{text: 'DATOS GENERALES CONCESIÓN DIGITAL SOLICITADA', colSpan: 4, alignment: 'center', bold: true, decoration: 'underline', border: [true, true, true, false]}, {}, {}, {}],
                    [{text: 'Canal:', fontSize: 10, border: [true, false, false, false]}, {text: 'Señal distintiva:', fontSize: 10, border: [false]},
                        {text: 'Localidad o Nombre de la Estación: ' + form_elements.pLocalidad, colSpan: 2, fontSize: 10, border: [false, false, true, false]}, {}],
                    [{text: ' ', colSpan: 4, border: [true, false, true, false]}, {}, {}, {}],
                    [{text: 'ESTUDIO PRINCIPAL', colSpan: 4, alignment: 'left', bold: true, border: [true, false, true, false]}, {}, {}, {}],
                    [{text: 'Domicilio Calle:', colSpan: 2, fontSize: 10, border: [true, false, false, false]}, {}, {text: 'N°:', fontSize: 10, border: [false]},
                        {text: 'Comuna:', fontSize: 10, border: [false, false, true, false]}],
                    [{text: 'Pobl. o  lugar:', colSpan: 3, fontSize: 10, border: [true, false, false, false]}, {}, {}, {text: 'Región:', fontSize: 10, border: [false, false, true, false]}],
                    [{text: 'Latitud Sur:  ' + form_elements.pLatitud, fontSize: 10, border: [true, false, false, true]}, 
                     {text: 'Longitud Oeste:  ' + form_elements.pLongitud, fontSize: 10, colSpan: 2, border: [false, false, false, true]}, {},
                        {text: 'Datum:', fontSize: 10, border: [false, false, true, true]}]
                ]
            }
        },
        {text: '    '},
        {
            table: {
                headerRows: 0,
                widths: [127.5, 127.5, 127.5, 127.5],
                body: [
                    [{text: 'DATOS SOLUCIÓN DIGITAL', colSpan: 4, alignment: 'center', bold: true, decoration: 'underline', border: [true, true, true, false]}, {}, {}, {}],
                    [{text: 'La réplica de la Zona de Servicio de la concesión analógica se hará mediante (seleccionar todas las que apliquen):', colSpan: 4,
                            fontSize: 10, border: [true, false, true, false]}, {}, {}, {}],
                    [{text: 'Una estación transmisora [__]', colSpan: 2, border: [true, false, false, false], fontSize: 10}, {},
                        {text: 'Múltiples estaciones transmisoras [__]', colSpan: 2, fontSize: 10, border: [false, false, true, false]}, {}],
                    [{text: 'Solución Complementaria (solo concesionarias de categoría nacional) [__]', fontSize: 10, colSpan: 4, alignment: 'left', border: [true, false, true, false]},
                        {}, {}, {}],
                    [{text: 'PLANTA TRANSMISORA PRINCIPAL', colSpan: 4, alignment: 'left', bold: true, border: [true, false, true, false]}, {}, {}, {}],
                    [{text: 'Domicilio Calle:', colSpan: 2, fontSize: 10, border: [true, false, false, false]}, {}, {text: 'N°:', fontSize: 10, border: [false]},
                        {text: 'Comuna:', fontSize: 10, border: [false, false, true, false]}],
                    [{text: 'Pobl. o  lugar:', colSpan: 3, fontSize: 10, border: [true, false, false, false]}, {}, {}, {text: 'Región:', fontSize: 10, border: [false, false, true, false]}],
                    [{text: 'Latitud Sur:', fontSize: 10, border: [true, false, false, true]}, {text: 'Longitud Oeste:', fontSize: 10, border: [false, false, false, true]},
                        {text: 'Datum:', fontSize: 10, border: [false, false, true, true], colSpan: 2}, {}],
                    [{text: 'PLANTA TRANSMISORA ADICIONAL 1 (Si aplica)', colSpan: 4, alignment: 'left', bold: true, border: [true, false, true, false]}, {}, {}, {}],
                    [{text: 'Domicilio Calle:', colSpan: 2, fontSize: 10, border: [true, false, false, false]}, {}, {text: 'N°:', fontSize: 10, border: [false]},
                        {text: 'Comuna:', fontSize: 10, border: [false, false, true, false]}],
                    [{text: 'Pobl. o  lugar:', colSpan: 3, fontSize: 10, border: [true, false, false, false]}, {}, {}, {text: 'Región:', fontSize: 10, border: [false, false, true, false]}],
                    [{text: 'Latitud Sur:', fontSize: 10, border: [true, false, false, true]}, {text: 'Longitud Oeste:', fontSize: 10, border: [false, false, false, true]},
                        {text: 'Datum:', fontSize: 10, border: [false, false, true, true], colSpan: 2}, {}],
                    [{text: 'PLANTA TRANSMISORA ADICIONAL 2 (Si aplica)', colSpan: 4, alignment: 'left', bold: true, border: [true, false, true, false]}, {}, {}, {}],
                    [{text: 'Domicilio Calle:', colSpan: 2, fontSize: 10, border: [true, false, false, false]}, {}, {text: 'N°:', fontSize: 10, border: [false]},
                        {text: 'Comuna:', fontSize: 10, border: [false, false, true, false]}],
                    [{text: 'Pobl. o  lugar:', colSpan: 3, fontSize: 10, border: [true, false, false, false]}, {}, {}, {text: 'Región:', fontSize: 10, border: [false, false, true, false]}],
                    [{text: 'Latitud Sur:', fontSize: 10, border: [true, false, false, true]}, {text: 'Longitud Oeste:', fontSize: 10, border: [false, false, false, true]},
                        {text: 'Datum:', fontSize: 10, border: [false, false, true, true], colSpan: 2}, {}]
                ]
            }
        }, {text: ' ', pageBreak: 'after'}];

    return obj;
}

function getTableTechnicalSystemFeature(title, radials, form_elements) {
    var page_content = [
        {
            text: title,
            style: 'header',
            alignment: 'center',
            bold: true,
            decoration: 'underline'
        },
        {text: '    '},
        {
            table: {
                headerRows: 0,
                widths: [150, 105, 127.5, 127.5],
                body: [
                    [{text: 'VALORES MÁXIMOS: Potencia admisible:                   [W]', colSpan: 2, fontSize: 10, border: [true, true, false, false]}, {},
                        {text: 'Antena combinada: Si [__]', colSpan: 2, fontSize: 10, border: [false, true, true, false]}, {}
                    ],
                    [{text: 'VALORES DE OPERACIÓN: ', fontSize: 10, border: [true, false, false, false]},
                        {text: 'Potencia:  '+form_elements.pPotencia+' [W]', colSpan: 3, fontSize: 10, border: [false, false, true, false]}, {}, {}
                    ],
                    [{text: '   ', border: [true, false, false, false]},
                        {text: 'Canal: N°           Frecuencia Central:   '+form_elements.pFrecuencia+' [MHz]', colSpan: 3, fontSize: 10, border: [false, false, true, false]}, {}, {}
                    ],
                    [{text: 'Tipo de Antena: Panel dipolos [__]', fontSize: 10, border: [true, false, false, false]},
                        {text: 'Ranura [__]', fontSize: 10, border: [false]},
                        {text: 'Superturnstile [__]', fontSize: 10, border: [false]},
                        {text: 'Yagi [__]', fontSize: 10, border: [false, false, true, false]}
                    ],
                    [{text: 'Log Periódica [__]', colSpan: 2, fontSize: 10, border: [true, false, false, false]}, {},
                        {text: 'Otro [__] (                               )', colSpan: 2, fontSize: 10, border: [false, false, true, false]}, {}
                    ],
                    [{text: 'Nº de elementos de antena:             Ganancia máxima: '+form_elements.pGanancia+' dBd.                     Polarización:     %H       %V', colSpan: 4, fontSize: 10,
                            border: [true, false, true, false]}, {}, {}, {}
                    ],
                    [{text: 'Tilt eléctrico: Sí [__] No [__]', fontSize: 10, border: [true, false, false, false]},
                        {text: 'Angulo de tilt:          °', fontSize: 10, border: [false]},
                        {text: 'Ganancia plano horizontal:         [dBd]', colSpan: 2, fontSize: 10, border: [false, false, true, false]}, {}
                    ],
                    [{text: 'Altura centro radiación:          [m].         Pérdida cables y conectores:      [dB]     Pérdidas del combinador:        [dB]', colSpan: 4,
                            fontSize: 10, border: [true, false, true, false]}, {}, {}, {}
                    ],
                    [{text: 'Otras pérdidas:       [dB]. (especificar:                                                  )               Pérdidas totales =       [dB].', colSpan: 4,
                            fontSize: 10, border: [true, false, true, false]}, {}, {}, {}
                    ],
                    [{text: '   ', colSpan: 4, border: [true, false, true, false]}, {}, {}, {}],
                    getRadialsTable(radials, form_elements)
                ]
            }
        },
        {text: '    '},
        {
            table: {
                headerRows: 0,
                body: [
                    getAnthenasFixesTable(),
                    [{text: 'Nota:', fontSize: 8, bold: true, border: [true, false, true, false]}],
                    [{text: 'Arreglo de Antenas: Puede estar compuesto por una o varias antenas dispuestas espacialmente.', fontSize: 8, border: [true, false, true, false]}],
                    [{text: 'N°: Número de antena según orden descendente de emplazamiento en la torre y en sentido horario en un mismo plano.', fontSize: 8, border: [true, false, true, false]}],
                    [{text: 'Altura: Altura de emplazamiento de la antena respectiva referente al suelo, en metros', fontSize: 8, border: [true, false, true, false]}],
                    [{text: 'Largo Vástago: Largo del vástago que soporta la antena respectiva a la torre soportante, en cm', fontSize: 8, border: [true, false, true, false]}],
                    [{text: 'Azimut Vástago: Ángulo de orientación del vástago respectivo referente al norte geográfico, en grados.', fontSize: 8, border: [true, false, true, false]}],
                    [{text: 'Azimut Antena: Ángulo de orientación de la antena respectiva referente al norte geográfico, en grados.', fontSize: 8, border: [true, false, true, false]}],
                    [{text: 'Fase: Fase en grados eléctricos de la antena respectiva, referida a la frecuencia central de la antena (frecuencia de la portadora del transmisor) y está determinada por el camino que tiene que recorrer la onda entre el punto de generación, en este caso el divisor de potencia, y la antena.', fontSize: 8, border: [true, false, true, false]}],
                    [{text: '% Potencia: Porcentaje de la potencia inyectada al arreglo de antenas, distribuido a la antena respectiva, comprendido entre 0 y 100. La suma de todos los porcentajes debe ser 100.', fontSize: 8, border: [true, false, true, true]}]
                ]
            }
        },
        {text: ' ', pageBreak: 'after'}
    ];

    return page_content;
}

function getRadialsTable(radials, form_elements) {

    var table;
    if(radials === "18") {
        table = get18RadialsTable(form_elements, 2, 180, 20);
    } else if (radials === "72") {
        table = get18RadialsTable(form_elements, 8, 45, 5);
    }

    return table;
}

function get18RadialsTable(form_elements, cicles, vertical_grades, horizontal_grades) {

    var radials_table = [{
        colSpan: 4,
        border: [true, false, true, true],
        table: {
            widths: [170, 30, 30, 30, 30, 30, 30, 30, 30, 30],
            body: createRadialsTable(cicles, form_elements, vertical_grades, horizontal_grades)
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

function createRadialsTable(cicles, form_elements, vertical_grades, horizontal_grades) {
    var aux = [];

    aux.push([{text: ' ', border: [false, false, false, true]}, {text: 'RADIALES', colSpan: 9, alignment: 'center', bold: true}, {}, {}, {}, {}, {}, {}, {}, {}]);
    for(x = 0; x < cicles; x++){
        aux.push(getRadialsTableRowHeaders('Acimut (°)', vertical_grades*x, horizontal_grades));
        aux.push(getRadialsTableRowData('Perd. por lóbulo (dB)', form_elements, vertical_grades*x, horizontal_grades, 'M18PL'));
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