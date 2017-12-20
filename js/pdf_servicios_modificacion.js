var Servicios = {
    getPdf: function(form_elements, form_pdf_data) {
        var radials = form_elements.radiales;
        var title = 'CÁLCULOS CON ' + radials + ' RADIALES FORMULARIO PROYECTO TÉCNICO PARA SERVICIOS LIMITADOS O PÚBLICOS'

        var doc = {
            info: {
                title: 'FORMULARIO PROYECTO TÉCNICO PARA SERVICIOS LIMITADOS O PÚBLICOS'
            },
            pageSize: 'A4',
            content: [
                Servicios.getPdfPage(title, form_elements, form_pdf_data),
                Servicios.getTableTechnicalSystemFeature('CARACTERÍSTICAS TÉCNICAS DEL SISTEMA RADIANTE PRINCIPAL', radials, form_elements, form_pdf_data)
            ]
        }

        var pdfDocGenerator = pdfMake.createPdf(doc);
        return pdfDocGenerator;
    },

    getPdfPage: function (title, form_elements, form_pdf_data) {
        var nombre_rep_legal = form_pdf_data.tab_general.rep_legal.nombre;
        var rut_rep_legal = form_pdf_data.tab_general.rep_legal.rut;
        var num_res_otorga = form_pdf_data.tab_general.res_otorga.num;
        var fecha_res_otorga = form_pdf_data.tab_general.res_otorga.fecha;
        
        var num_res_mod = form_pdf_data.tab_general.res_modifica.num;
        var fecha_res_mod = form_pdf_data.tab_general.res_modifica.fecha;
        var estudio_princ = form_pdf_data.estudio_principal;

        var frecuencia_analoga = form_elements.frecuenciaAnaloga;
        var frecuencia_digital = form_elements.pFrecuencia;
        var regionName = getValue(estudio_princ.regionName);
        var domicilio = getValue(estudio_princ.domicilio);
        var comuna = getValue(estudio_princ.comuna);

        var regionPtx = getValue(form_pdf_data.carac_tecnicas.regionNamePTx);
        var domicilioPtx = getValue(form_pdf_data.carac_tecnicas.domicilioPTx);
        var comunaPtx = getValue(form_pdf_data.carac_tecnicas.comunaNamePTx);

        ptx_adic1 = form_pdf_data.ptx_adicional1;
        ptx_adic2 = form_pdf_data.ptx_adicional2;

        var regionPtxAd1 = getValue(ptx_adic1.regionName);
        var comunaPtxAd1 = getValue(ptx_adic1.comunaName);
        var regionPtxAd2 = getValue(ptx_adic2.regionName);
        var comunaPtxAd2 = getValue(ptx_adic2.comunaName);

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
                            text: 'IDENTIFICACIÓN DEL CONCESIONARIO',
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
                                text: 'Comuna:    ',
                                fontSize: 10,
                                colSpan: 2,
                                border: [false, false, false, false]
                            }, {},
                            {
                                text: 'Región:    ',
                                fontSize: 10,
                                border: [false, false, true, false]
                            }
                        ],
                        [{
                                text: 'Representante Legal: ' + nombre_rep_legal,
                                fontSize: 10,
                                border: [true, false, false, true]
                            }, {
                                text: 'RUT:    ' + rut_rep_legal,
                                fontSize: 10,
                                border: [false, false, false, true]
                            },
                            {
                                text: 'E-mail: ',
                                fontSize: 10,
                                border: [false, false, false, true]
                            }, {
                                text: 'Teléfono:    ',
                                fontSize: 10,
                                border: [false, false, true, true]
                            }
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
                            text: 'DATOS SOLUCIÓN',
                            colSpan: 4,
                            alignment: 'center',
                            bold: true,
                            decoration: 'underline',
                            border: [true, true, true, false]
                        }, {}, {}, {}
                        ],
                        [{
                            text: 'PLANTA TRANSMISORA PRINCIPAL',
                            colSpan: 4,
                            alignment: 'left',
                            bold: true,
                            border: [true, false, true, false]
                        }, {}, {}, {}],
                        [{
                                text: 'Domicilio Calle: ' +  domicilioPtx,
                                colSpan: 2,
                                fontSize: 10,
                                border: [true, false, false, false]
                            }, {},
                            {
                                text: 'Comuna: ' + comunaPtx,
                                fontSize: 10,
                                colSpan: 2,
                                border: [false, false, true, false]
                            }, {}
                        ],
                        [{
                            text: 'Pobl. o  lugar:    ',
                            colSpan: 2,
                            fontSize: 10,
                            border: [true, false, false, false]
                        }, {}, {
                            text: 'Región: ' + regionPtx,
                            fontSize: 10,
                            colSpan: 2,
                            border: [false, false, true, false]
                        }, {}],
                        [{
                                text: 'Latitud Sur: ' + form_elements.pLatitud,
                                fontSize: 10,
                                border: [true, false, false, true]
                            },
                            {
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
                        ],
                        [{
                            text: 'PLANTA TRANSMISORA ESTACIÓN EXISTENTE',
                            colSpan: 4,
                            alignment: 'left',
                            bold: true,
                            border: [true, false, true, false]
                        }, {}, {}, {}],
                        [{
                                text: 'Domicilio Calle:    ' + ptx_adic1.domicilio,
                                colSpan: 2,
                                fontSize: 10,
                                border: [true, false, false, false]
                            }, {},
                            {
                                text: 'Comuna:    ' + comunaPtxAd1,
                                fontSize: 10,
                                colSpan: 2,
                                border: [false, false, true, false]
                            }, {}
                        ],
                        [{
                            text: 'Pobl. o  lugar:    ',
                            colSpan: 2,
                            fontSize: 10,
                            border: [true, false, false, false]
                        }, {}, {
                            text: 'Región:    ' + regionPtxAd1,
                            fontSize: 10,
                            colSpan: 2,
                            border: [false, false, true, false]
                        }, {}],
                        [{
                                text: 'Latitud Sur: ' + form_elements.latitudPTx,
                                fontSize: 10,
                                border: [true, false, false, true]
                            }, {
                                text: 'Longitud Oeste: ' + form_elements.longitudPTx,
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
        },
    
    getTableTechnicalSystemFeature: function (title, radials, form_elements, form_pdf_data) {
        var ganancia = typeof form_elements.pGanancia != 'undefined' ? form_elements.pGanancia : "";
        var potencia = typeof form_elements.pPotencia != 'undefined' ? form_elements.pPotencia : "";
        var frecuencia = typeof form_elements.pFrecuencia != 'undefined' ? form_elements.pFrecuencia : "";
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
                                text: 'VALORES DE OPERACIÓN: ',
                                fontSize: 10,
                                border: [true, true, false, false]
                            },
                            {
                                text: 'Potencia:  ' + potencia + ' [W]',
                                colSpan: 3,
                                fontSize: 10,
                                border: [false, true, true, false]
                            }, {}, {}
                        ],
                        [{
                                text: '   ',
                                border: [true, false, false, false]
                            },
                            {
                                text: 'Frecuencia Central:   ' + frecuencia + ' [MHz]',
                                colSpan: 3,
                                fontSize: 10,
                                border: [false, false, true, false]
                            }, {}, {}
                        ],
                        [{
                            text: '   ',
                            colSpan: 4,
                            border: [true, false, true, false]
                        }, {}, {}, {}],
                        getRadialsTable(radials, form_elements, true)
                    ]
                }
            }
        ];

        return page_content;
        }
}