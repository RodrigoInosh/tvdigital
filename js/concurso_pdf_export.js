var form_pdf_data = {};

function getPDFConcurso(form_elements, form_pdf_data) {
    this.form_pdf_data = form_pdf_data;
    console.log(form_pdf_data);
    var radials = form_elements.radiales;
    var title = 'CÁLCULOS CON ' + radials + ' RADIALES FORMULARIO PROYECTO TÉCNICO PARA EL SERVICIO DE RADIODIFUSIÓN TELEVISIVA'

    var doc = {
        info: {
            title: 'prueba'
        },
        pageSize: 'A4',
        content: [
            this.getPage(title, form_elements),
            this.getConcourseTableTechnicalSystemFeature('CARACTERÍSTICAS TÉCNICAS DEL SISTEMA RADIANTE PRINCIPAL', radials, form_elements)
        ]
    }

    var pdf_name = getFileName(form_elements.pIdentificador);

    pdfMake.createPdf(doc).download(pdf_name + '.pdf');
}

function getPage(title, form_elements) {
    var estudio_princ = form_pdf_data.estudio_principal;
    var estudio_alter = form_pdf_data.estudio_alternativo;
    var frecuencia_digital = getCanalByFrecuencia("digital", form_elements.pFrecuencia);
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
                headerRows: 0,
                widths: [180, 85, 120, 125],
                body: [
                    [{
                        text: 'IDENTIFICACIÓN DEL PETICIONARIO',
                        colSpan: 4,
                        alignment: 'center',
                        bold: true,
                        decoration: 'underline',
                        border: [true, true, true, false]
                    }, {}, {}, {}],
                    [{
                            text: 'Razón Social: ' + form_elements.pRazonSocial,
                            colSpan: 2,
                            fontSize: 10,
                            border: [true, false, false, false]
                        }, {},
                        {
                            text: 'RUT: ' + form_elements.pRut,
                            colSpan: 2,
                            fontSize: 10,
                            border: [false, false, true, false]
                        }, {}
                    ],
                    [{
                            text: 'Domicilio: Calle: ' + form_elements.pDomicilio,
                            fontSize: 10,
                            border: [true, false, false, false]
                        },
                        {
                            text: 'Comuna:',
                            fontSize: 10,
                            colSpan: 2,
                            border: [false, false, false,false]
                        }, {},
                        {
                            text: 'Región:',
                            fontSize: 10,
                            border: [false, false, true, false]
                        }
                    ],
                    [{
                            text: 'E-mail: ' + form_elements.pEmail,
                            fontSize: 10,
                            border: [true, false, false, true],
                            colSpan: 2
                        }, {},
                        {
                            text: 'Teléfono:' + form_elements.pFono,
                            fontSize: 10,
                            border: [false, false, true, true],
                            colSpan: 2
                        }, {}
                    ]
                ]
            }
        },
        {
            text: '    '
        },
        {
            table: {
                headerRows: 0,
                widths: [127.5, 127.5, 127.5, 127.5],
                body: [
                    [{
                        text: 'DATOS GENERALES CONCESIÓN DIGITAL SOLICITADA/MODIFICADA',
                        colSpan: 4,
                        alignment: 'center',
                        bold: true,
                        decoration: 'underline',
                        border: [true, true, true, false]
                    }, {}, {}, {}],
                    [{
                            text: 'Canal:     ' + frecuencia_digital,
                            fontSize: 10,
                            border: [true, false, false, false]
                        },
                        {
                            text: 'Localidad o Nombre de la Estación:   ' + form_elements.pLocalidad,
                            colSpan: 3,
                            fontSize: 10,
                            border: [false, false, false, false]
                        },
                        {}, {}
                    ],
                    [{
                        text: 'Inicio de las obras: ' + form_pdf_data.tab_general.plazos.ini_obras + '               Términos de las obras: ' + form_pdf_data.tab_general.plazos.fin_obras + '          Inicio servicio: ' + form_pdf_data.tab_general.plazos.ini_serv + '',
                        fontSize: 10,
                        colSpan: 4,
                        border: [true, false, true, false]
                    }, {}, {}, {}],
                    [{
                        text: 'Tipo de emisión: ' + form_pdf_data.tab_general.tipo_emision,
                        colSpan: 4,
                        fontSize: 10,
                        border: [true, false, true, false]
                    }, {}, {}, {}],
                    [{
                        text: 'NOTA: Plazo en días hábiles, contados desde la fecha en que se notifique al interesado de la total tramitación de la respectiva Resolución del Consejo que asigne/modifica la concesión.',
                        colSpan: 4,
                        fontSize: 8,
                        border: [true, false, true, true]
                    }, {}, {}, {}]
                ]
            }
        },
        {
            text: '    '
        },
        {
            table: {
                headerRows: 0,
                widths: [127.5, 127.5, 127.5, 127.5],
                body: [
                    [{
                        text: 'UBICACIÓN DE LAS INSTALACIONES',
                        colSpan: 4,
                        alignment: 'center',
                        bold: true,
                        decoration: 'underline',
                        border: [true, true, true, false]
                    }, {}, {}, {}],
                    [{
                        text: 'ESTUDIO PRINCIPAL',
                        colSpan: 4,
                        alignment: 'left',
                        bold: true,
                        border: [true, false, true, false]
                    }, {}, {}, {}],
                    [{
                            text: 'Domicilio Calle: ' + estudio_princ.domicilio,
                            colSpan: 2,
                            fontSize: 10,
                            border: [true, false, false, false]
                        }, {},
                        {
                            text: 'Comuna: ' + estudio_princ.comuna,
                            fontSize: 10,
                            colSpan: 2,
                            border: [false, false, true, false]
                        }, {}
                    ],
                    [{
                        text: 'Pobl. o  lugar:',
                        colSpan: 2,
                        fontSize: 10,
                        border: [true, false, false, false]
                    }, {}, {
                        text: 'Región: ' + estudio_princ.region,
                        fontSize: 10,
                        colSpan: 2,
                        border: [false, false, true, false]
                    },{}],
                    [{
                            text: 'Latitud Sur: ' + estudio_princ.latitud,
                            fontSize: 10,
                            border: [true, false, false, true]
                        },
                        {
                            text: 'Longitud Oeste: ' + estudio_princ.longitud,
                            fontSize: 10,
                            border: [false, false, false, true]
                        },
                        {
                            text: 'Datum: ' + datum + '',
                            fontSize: 10,
                            border: [false, false, true, true],
                            colSpan: 2
                        }, {}
                    ],
                    [{
                        text: 'ESTUDIO ALTERNATIVO',
                        colSpan: 4,
                        alignment: 'left',
                        bold: true,
                        border: [true, false, true, false]
                    }, {}, {}, {}],
                    [{
                            text: 'Domicilio Calle: ' + estudio_alter.domicilio,
                            colSpan: 2,
                            fontSize: 10,
                            border: [true, false, false, false]
                        }, {},
                        {
                            text: 'Comuna: ' + estudio_alter.comuna,
                            fontSize: 10,
                            colSpan: 2,
                            border: [false, false, true, false]
                        }, {}
                    ],
                    [{
                        text: 'Pobl. o  lugar:',
                        colSpan: 2,
                        fontSize: 10,
                        border: [true, false, false, false]
                    }, {}, {
                        text: 'Región: ' + estudio_alter.region,
                        fontSize: 10,
                        colSpan: 2,
                        border: [false, false, true, false]
                    }, {}],
                    [{
                            text: 'Latitud Sur: ' + estudio_alter.latitud,
                            fontSize: 10,
                            border: [true, false, false, true]
                        }, {
                            text: 'Longitud Oeste: ' + estudio_alter.longitud,
                            fontSize: 10,
                            border: [false, false, false, true]
                        },
                        {
                            text: 'Datum: ' + datum + '',
                            fontSize: 10,
                            border: [false, false, true, true],
                            colSpan: 2
                        }, {}
                    ],
                    [{
                        text: 'PLANTA TRANSMISORA',
                        colSpan: 4,
                        alignment: 'left',
                        bold: true,
                        border: [true, false, true, false]
                    }, {}, {}, {}],
                    [{
                            text: 'Domicilio Calle: ' + form_pdf_data.carac_tecnicas.domicilioPTx,
                            colSpan: 2,
                            fontSize: 10,
                            border: [true, false, false, false]
                        }, {},
                        {
                            text: 'Comuna: ' + form_pdf_data.carac_tecnicas.comunaPTx,
                            fontSize: 10,
                            colSpan: 2,
                            border: [false, false, true, false]
                        }, {}
                    ],
                    [{
                        text: 'Pobl. o  lugar: ',
                        colSpan: 2,
                        fontSize: 10,
                        border: [true, false, false, false]
                    }, {}, {
                        text: 'Región: ' + form_pdf_data.carac_tecnicas.regionPTx,
                        fontSize: 10,
                        colSpan: 2,
                        border: [false, false, true, false]
                    }, {}],
                    [{
                            text: 'Latitud Sur: ' + form_elements.pLatitud,
                            fontSize: 10,
                            border: [true, false, false, true]
                        }, {
                            text: 'Longitud Oeste: ' + form_elements.pLongitud,
                            fontSize: 10,
                            border: [false, false, false, true]
                        },
                        {
                            text: 'Datum: ' + datum + '',
                            fontSize: 10,
                            border: [false, false, true, true],
                            colSpan: 2
                        }, {}
                    ]
                ]
            }
        }, {
            text: ' ',
            pageBreak: 'after'
        }
    ];

    return obj;
}

function getConcourseTableTechnicalSystemFeature(title, radials, form_elements) {
    var ganancia = typeof form_elements.pGanancia != 'undefined' ? form_elements.pGanancia : "";
    var potencia = typeof form_elements.pPotencia != 'undefined' ? form_elements.pPotencia : "";
    var num_antenas = form_pdf_data.carac_tecnicas.num_elem;
    var ganancia_max = form_pdf_data.carac_tecnicas.ganancia_max;
    var antena_combi_si = form_pdf_data.carac_tecnicas.antena_combi == "si" ? '_X_' : '___';
    var antena_combi_no = form_pdf_data.carac_tecnicas.antena_combi == "no" ? '_X_' : '___';
    var antena_dipolo = form_pdf_data.carac_tecnicas.tipo_antena == "princ" ? '_X_' : '___';
    var antena_ranura = form_pdf_data.carac_tecnicas.tipo_antena == "ranura" ? '_X_' : '___';
    var antena_supert = form_pdf_data.carac_tecnicas.tipo_antena == "supert" ? '_X_' : '___';
    var antena_yagi = form_pdf_data.carac_tecnicas.tipo_antena == "yagi" ? '_X_' : '___';
    var antena_logP = form_pdf_data.carac_tecnicas.tipo_antena == "logP" ? '_X_' : '___';
    var antena_otro = form_pdf_data.carac_tecnicas.tipo_antena == "otro" ? '_X_' : '___';
    var tilt_elec_si = isTilt(form_pdf_data.carac_tecnicas.angulo_tilt) ? '_X_' : '___';
    var tilt_elec_no = isTilt(form_pdf_data.carac_tecnicas.angulo_tilt) ? '___' : '_X_';
    var suma_perdidas = Number(form_elements.pPerdidaCablesConectores) + Number(form_elements.pDivisorPotencia) + Number(form_elements.pOtrasPerdidas);
    var perc_horizontal = form_pdf_data.carac_tecnicas.perc_horizontal;
    var perc_vertical = form_pdf_data.carac_tecnicas.perc_vertical;

    var page_content = [{
            text: title,
            style: 'header',
            alignment: 'center',
            bold: true,
            decoration: 'underline'
        },
        {
            text: '    '
        },
        {
            table: {
                headerRows: 0,
                widths: [160, 95, 127.5, 127.5],
                body: [
                    [{
                            text: 'Potencia: ' + potencia + ' [W]',
                            colSpan: 2,
                            fontSize: 10,
                            border: [true, true, false, false]
                        }, {},
                        {
                            text: 'Antena combinada: Si [' + antena_combi_si + '] No [' + antena_combi_no + ']',
                            colSpan: 2,
                            fontSize: 10,
                            border: [false, true, true, false]
                        }, {}
                    ],
                    [{
                            text: 'Tipo de Antena: Panel dipolos [' + antena_dipolo + ']',
                            fontSize: 10,
                            border: [true, false, false, false]
                        },
                        {
                            text: 'Ranura [' + antena_ranura + ']',
                            fontSize: 10,
                            border: [false]
                        },
                        {
                            text: 'Superturnstile [' + antena_supert + ']',
                            fontSize: 10,
                            border: [false]
                        },
                        {
                            text: 'Yagi [' + antena_yagi + ']',
                            fontSize: 10,
                            border: [false, false, true, false]
                        }
                    ],
                    [{
                            text: 'Log Periódica [' + antena_logP + ']',
                            colSpan: 2,
                            fontSize: 10,
                            border: [true, false, false, false]
                        }, {},
                        {
                            text: 'Otro [' + antena_otro + '] (                               )',
                            colSpan: 2,
                            fontSize: 10,
                            border: [false, false, true, false]
                        }, {}
                    ],
                    [{
                        text: 'Nº de antenas: ' + num_antenas + '     Ganancia máxima: ' + ganancia_max + ' [dBd].                     Polarización: '+perc_horizontal+' %H      '+perc_vertical+' %V',
                        colSpan: 4,
                        fontSize: 10,
                        border: [true, false, true, false]
                    }, {}, {}, {}],
                    [{
                            text: 'Tilt eléctrico: Sí [' + tilt_elec_si + '] No [' + tilt_elec_no + ']',
                            fontSize: 10,
                            border: [true, false, false, false]
                        },
                        {
                            text: 'Angulo de tilt: ' + form_pdf_data.carac_tecnicas.angulo_tilt + ' °',
                            fontSize: 10,
                            border: [false]
                        },
                        {
                            text: 'Ganancia plano horizontal: ' + ganancia + ' [dBd]',
                            colSpan: 2,
                            fontSize: 10,
                            border: [false, false, true, false]
                        }, {}
                    ],
                    [{
                        text: 'Altura centro radiación:   ' + form_elements.pAlturaAntenaTx + '[m].         Pérdida cables y conectores:   ' + form_elements.pPerdidaCablesConectores + ' [dB]    Divisor de Potencia:  ' + form_elements.pDivisorPotencia + ' [dB]',
                        colSpan: 4,
                        fontSize: 10,
                        border: [true, false, true, false]
                    }, {}, {}, {}],
                    [{
                        text: 'Otras pérdidas:   ' + form_elements.pOtrasPerdidas + ' [dB]. (especificar:                                                  )               Pérdidas totales =      '+suma_perdidas+' [dB].',
                        colSpan: 4,
                        fontSize: 10,
                        border: [true, false, true, false]
                    }, {}, {}, {}],
                    [{
                        text: '   ',
                        colSpan: 4,
                        border: [true, false, true, false]
                    }, {}, {}, {}],
                    getRadialsTable(radials, form_elements)
                ]
            }
        },
        {
            text: '    '
        },
        {
            table: {
                headerRows: 0,
                body: [
                    getAnthenasFixesTable(num_antenas, form_pdf_data.arreglos_antena), [{
                        text: 'Nota:',
                        fontSize: 8,
                        bold: true,
                        border: [true, false, true, false]
                    }],
                    [{
                        text: 'Arreglo de Antenas: Puede estar compuesto por una o varias antenas dispuestas espacialmente.',
                        fontSize: 8,
                        border: [true, false, true, false]
                    }],
                    [{
                        text: 'N°: Número de antena según orden descendente de emplazamiento en la torre y en sentido horario en un mismo plano.',
                        fontSize: 8,
                        border: [true, false, true, false]
                    }],
                    [{
                        text: 'Altura: Altura de emplazamiento de la antena respectiva referente al suelo, en metros',
                        fontSize: 8,
                        border: [true, false, true, false]
                    }],
                    [{
                        text: 'Largo Vástago: Largo del vástago que soporta la antena respectiva a la torre soportante, en cm',
                        fontSize: 8,
                        border: [true, false, true, false]
                    }],
                    [{
                        text: 'Azimut Vástago: Ángulo de orientación del vástago respectivo referente al norte geográfico, en grados.',
                        fontSize: 8,
                        border: [true, false, true, false]
                    }],
                    [{
                        text: 'Azimut Antena: Ángulo de orientación de la antena respectiva referente al norte geográfico, en grados.',
                        fontSize: 8,
                        border: [true, false, true, false]
                    }],
                    [{
                        text: 'Fase: Fase en grados eléctricos de la antena respectiva, referida a la frecuencia central de la antena (frecuencia de la portadora del transmisor) y está determinada por el camino que tiene que recorrer la onda entre el punto de generación, en este caso el divisor de potencia, y la antena.',
                        fontSize: 8,
                        border: [true, false, true, false]
                    }],
                    [{
                        text: '% Potencia: Porcentaje de la potencia inyectada al arreglo de antenas, distribuido a la antena respectiva, comprendido entre 0 y 100. La suma de todos los porcentajes debe ser 100.',
                        fontSize: 8,
                        border: [true, false, true, true]
                    }]
                ]
            }
        }
    ];

    return page_content;
}