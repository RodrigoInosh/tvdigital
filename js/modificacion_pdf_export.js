var form_pdf_data = {};

function getPDFModificacion(form_elements, form_pdf_data) {
    this.form_pdf_data = form_pdf_data;
    console.log(this.form_pdf_data);
    var radials = form_elements.radiales;
    var title = 'CÁLCULOS CON '+radials+' RADIALES FORMULARIO PROYECTO TÉCNICO PARA LA TRANSICIÓN ANÁLOGO-DIGITAL DEL SERVICIO DE RADIODIFUSIÓN TELEVISIVA'

    var doc = {
        info: {title: 'prueba'},
        pageSize: 'A4',
        content: [
            getPage1(title, form_elements), 
            getModificationTableTechnicalSystemFeature('CARACTERÍSTICAS TÉCNICAS DEL SISTEMA RADIANTE PRINCIPAL', radials, form_elements)
        ]
    }

    var pdf_name = getFileName();

    pdfMake.createPdf(doc).download(pdf_name+'.pdf');
}

function getPage1(title, form_elements) {
    console.log(form_pdf_data.tab_general);
    var nombre_rep_legal = form_pdf_data.tab_general.rep_legal.nombre;
    var rut_rep_legal = form_pdf_data.tab_general.rep_legal.rut;
    var num_res_otorga = form_pdf_data.tab_general.res_otorga.num;
    var fecha_res_otorga = form_pdf_data.tab_general.res_otorga.fecha;
    var cntv_res_otorga = form_pdf_data.tab_general.res_otorga.cntv_res_otorga == 'si' ? '_X_' : '___';
    var num_res_mod = form_pdf_data.tab_general.res_modifica.num;
    var fecha_res_mod = form_pdf_data.tab_general.res_modifica.fecha;
    var cntv_res_mod = form_pdf_data.tab_general.res_modifica.cntv_res_otorga == 'si' ? '_X_' : '___';

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
                    [{text: 'IDENTIFICACIÓN DEL CONCESIONARIO', colSpan: 4, alignment: 'center', bold: true, decoration: 'underline', border: [true, true, true, false]}, {}, {}, {}],
                    [{text: 'Razón Social: ' + form_elements.pRazonSocial, colSpan: 2, fontSize: 10, border: [true, false, false, false]}, {},
                        {text: 'RUT: ' + form_elements.pRut, colSpan: 2, fontSize: 10, border: [false, false, true, false]}, {}],
                    [{text: 'Domicilio: Calle: ' + form_elements.pDomicilio, fontSize: 10, border: [true, false, false, false]}, {text: 'N°:', fontSize: 10, border: [false]},
                        {text: 'Comuna:', fontSize: 10, border: [false]}, {text: 'Región:', fontSize: 10, border: [false, false, true, false]}],
                    [{text: 'Representante Legal: ' + nombre_rep_legal, fontSize: 10, border: [true, false, false, false]}, {text: 'RUT:' + rut_rep_legal, fontSize: 10, border: [false]},
                        {text: 'E-mail: ', fontSize: 10, border: [false]}, {text: 'Teléfono:', fontSize: 10, border: [false, false, true, false]}],
                    [{text: 'Resolución Otorga   N°: '+num_res_otorga, fontSize: 10, border: [true, false, false, false], colSpan: 2}, {},
                        {text: 'Fecha: '+fecha_res_otorga, fontSize: 10, border: [false]}, {text: 'CNTV ['+cntv_res_otorga+']:', fontSize: 10, border: [false, false, true, false]}],
                    [{text: 'Resolución Modifica   N°: '+num_res_mod, fontSize: 10, border: [true, false, false, false], colSpan: 2}, {},
                        {text: 'Fecha: '+fecha_res_mod, fontSize: 10, border: [false]}, {text: 'CNTV ['+cntv_res_mod+']:', fontSize: 10, border: [false, false, true, false]}],
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
                    [{text: 'Latitud Sur:', fontSize: 10, border: [true, false, false, true]}, 
                     {text: 'Longitud Oeste:', fontSize: 10, colSpan: 2, border: [false, false, false, true]}, {},
                        {text: 'Datum: WGS84', fontSize: 10, border: [false, false, true, true]}]
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
                    [{text: 'Latitud Sur: ' + form_elements.pLatitud, fontSize: 10, border: [true, false, false, true]}, 
                        {text: 'Longitud Oeste: ' + form_elements.pLongitud, fontSize: 10, border: [false, false, false, true]},
                        {text: 'Datum: WGS84', fontSize: 10, border: [false, false, true, true], colSpan: 2}, {}],
                        [{text: 'PLANTA TRANSMISORA ADICIONAL 1 (Si aplica)', colSpan: 4, alignment: 'left', bold: true, border: [true, false, true, false]}, {}, {}, {}],
                    [{text: 'Domicilio Calle:', colSpan: 2, fontSize: 10, border: [true, false, false, false]}, {}, {text: 'N°:', fontSize: 10, border: [false]},
                        {text: 'Comuna:', fontSize: 10, border: [false, false, true, false]}],
                    [{text: 'Pobl. o  lugar:', colSpan: 3, fontSize: 10, border: [true, false, false, false]}, {}, {}, {text: 'Región:', fontSize: 10, border: [false, false, true, false]}],
                    [{text: 'Latitud Sur:', fontSize: 10, border: [true, false, false, true]}, {text: 'Longitud Oeste:', fontSize: 10, border: [false, false, false, true]},
                        {text: 'Datum: WGS84', fontSize: 10, border: [false, false, true, true], colSpan: 2}, {}],
                    [{text: 'PLANTA TRANSMISORA ADICIONAL 2 (Si aplica)', colSpan: 4, alignment: 'left', bold: true, border: [true, false, true, false]}, {}, {}, {}],
                    [{text: 'Domicilio Calle:', colSpan: 2, fontSize: 10, border: [true, false, false, false]}, {}, {text: 'N°:', fontSize: 10, border: [false]},
                        {text: 'Comuna:', fontSize: 10, border: [false, false, true, false]}],
                    [{text: 'Pobl. o  lugar:', colSpan: 3, fontSize: 10, border: [true, false, false, false]}, {}, {}, {text: 'Región:', fontSize: 10, border: [false, false, true, false]}],
                    [{text: 'Latitud Sur:', fontSize: 10, border: [true, false, false, true]}, {text: 'Longitud Oeste:', fontSize: 10, border: [false, false, false, true]},
                        {text: 'Datum: WGS84', fontSize: 10, border: [false, false, true, true], colSpan: 2}, {}]
                ]
            }
        }, {text: ' ', pageBreak: 'after'}];

    return obj;
}

function getModificationTableTechnicalSystemFeature(title, radials, form_elements) {
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
                widths: [160, 95, 127.5, 127.5],
                body: [
                    [{text: 'VALORES MÁXIMOS: Potencia admisible:                   [W]', colSpan: 2, fontSize: 10, border: [true, true, false, false]}, {},
                        {text: 'Antena combinada: Si ['+antena_combi_si+']', colSpan: 2, fontSize: 10, border: [false, true, true, false]}, {}
                    ],
                    [{text: 'VALORES DE OPERACIÓN: ', fontSize: 10, border: [true, false, false, false]},
                        {text: 'Potencia:  '+potencia+' [W]', colSpan: 3, fontSize: 10, border: [false, false, true, false]}, {}, {}
                    ],
                    [{text: '   ', border: [true, false, false, false]},
                        {text: 'Frecuencia Central:   '+frecuencia+' [MHz]', colSpan: 3, fontSize: 10, border: [false, false, true, false]}, {}, {}
                    ],
                    [{text: 'Tipo de Antena: Panel dipolos ['+antena_dipolo+']', fontSize: 10, border: [true, false, false, false]},
                        {text: 'Ranura ['+antena_ranura+']', fontSize: 10, border: [false]},
                        {text: 'Superturnstile ['+antena_supert+']', fontSize: 10, border: [false]},
                        {text: 'Yagi ['+antena_yagi+']', fontSize: 10, border: [false, false, true, false]}
                    ],
                    [{text: 'Log Periódica ['+antena_logP+']', colSpan: 2, fontSize: 10, border: [true, false, false, false]}, {},
                        {text: 'Otro ['+antena_otro+'] (                               )', colSpan: 2, fontSize: 10, border: [false, false, true, false]}, {}
                    ],
                    [{text: 'Nº de elementos de antena: '+num_antenas+'      Ganancia máxima: '+ganancia_max+' dBd.                     Polarización:     %H       %V', colSpan: 4, fontSize: 10,
                            border: [true, false, true, false]}, {}, {}, {}
                    ],
                    [{text: 'Tilt eléctrico: Sí ['+tilt_elec_si+'] No ['+tilt_elec_no+']', fontSize: 10, border: [true, false, false, false]},
                        {text: 'Angulo de tilt: '+form_pdf_data.carac_tecnicas.angulo_tilt+'°', fontSize: 10, border: [false]},
                        {text: 'Ganancia plano horizontal: '+ganancia+' [dBd]', colSpan: 2, fontSize: 10, border: [false, false, true, false]}, {}
                    ],
                    [{text: 'Altura centro radiación:          [m].         Pérdida cables y conectores:      [dB]', colSpan: 4,
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
                    getAnthenasFixesTable(num_antenas, form_pdf_data.arreglos_antena),
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
        }
    ];

    return page_content;
}