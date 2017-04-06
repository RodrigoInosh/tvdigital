var rows_table_anthenas = 11;
var tipo_licitacion = "";

var tabla_antenas = {
    "numero": {"ant_num0":""},
    "altura": {"ant_alt0":""},
    "largo": {"ant_lar0":""},
    "azimutV": {"ant_aziV0":""},
    "azimutA": {"ant_aziA0":""},
    "ganancia": {"ant_gan0":""},
    "polarizacion": {"ant_pol0":""},
    "marca": {"ant_marc0":""},
    "modelo": {"ant_mod0":""},
    "fase": {"ant_fase0":""},
    "potencia": {"ant_pot0":""}
};

var form_general_modificacion = {
    "rep_legal": {
        "nombre": "",
        "rut": ""
    },
    "res_otorga": {
        "num": "",
        "fecha": "",
        "cntv": ""
    },
    "res_modifica": {
        "num": "",
        "fecha": "",
        "cntv": ""
    }
};
var form_general_concurso = {
    "plazos": {
        "ini_obras": "",
        "fin_obras": "",
        "ini_serv": ""
    },
    "tipo_emision": ""
};

var form_data = {
    "tab_general": {},
    "estudio_principal": {
        "domicilio": "",
        "comuna": "",
        "region": "",
        "latitud": "",
        "longitud": ""
    },
    "estudio_alternativo": {
        "domicilio": "",
        "comuna": "",
        "region": "",
        "latitud": "",
        "longitud": ""
    },
    "ptx_adicional1": {
        "domicilio": "",
        "comuna": "",
        "region": "",
        "latitud": "",
        "longitud": ""
    },
    "ptx_adicional2": {
        "domicilio": "",
        "comuna": "",
        "region": "",
        "latitud": "",
        "longitud": ""
    },
    "carac_tecnicas": {
        "sist_radiante": "",
        "antena_combi": "",
        "tipo_antena": "",
        "num_elem": "",
        "ganancia_max": "",
        "polarizacion": "",
        "angulo_tilt": ""
    },
    "arreglos_antena": tabla_antenas
};

var frecuencias_canal_analogica = {
    "55.25": "2",
    "61.25": "3",
    "67.25": "4",
    "77.25": "5",
    "83.25": "6",
    "175.25": "7",
    "181.25": "8",
    "187.25": "9",
    "193.25": "10",
    "199.25": "11",
    "205.25": "12",
    "211.25": "13",
    "513.25": "21",
    "519.25": "22",
    "525.25": "23",
    "531.25": "24",
    "537.25": "25",
    "543.25": "26",
    "567.25": "30",
    "585.25": "33",
    "591.25": "34",
    "597.25": "35",
    "687.25": "50",
    "711.25": "54",
    "729.25": "57"
};

var frecuencias_canal_digital = {
    "515": "21",
    "521": "22",
    "527": "23",
    "533": "24",
    "539": "25",
    "545": "26",
    "551": "27",
    "557": "28",
    "563": "29",
    "569": "30",
    "575": "31",
    "581": "32",
    "587": "33",
    "593": "34",
    "599": "35",
    "605": "36",
    "611": "37",
    "617": "38",
    "623": "39",
    "629": "40",
    "635": "41",
    "641": "42",
    "647": "43",
    "653": "44",
    "659": "45",
    "665": "46",
    "671": "47",
    "677": "48",
    "683": "49",
    "689": "50",
    "659": "51"
}

$('#saveFormPDF').on('click', function() {

    if (tipo_licitacion == 'Modificacion') {
        form_general_modificacion.rep_legal.nombre = $("#nombreRepLegal").val();
        form_general_modificacion.rep_legal.rut = $("#rutRepLegal").val();
        form_general_modificacion.res_otorga.num = $("#numResOtorga").val();
        form_general_modificacion.res_otorga.fecha = $("#fechaResOtorga").val();
        form_general_modificacion.res_otorga.cntv = $("#resOtorgaCNTV").val();
        form_general_modificacion.res_modifica.num = $("#numResModifica").val();
        form_general_modificacion.res_modifica.fecha = $("#fechaResModifica").val();
        form_general_modificacion.res_modifica.cntv = $("#resModificaCNTV").val();
    } else {
        form_general_concurso.plazos.ini_obras = $("#ini_obras").val();
        form_general_concurso.plazos.fin_obras = $("#fin_obras").val();
        form_general_concurso.plazos.ini_serv = $("#ini_servicio").val();
        form_general_concurso.tipo_emision = $("#tipo_emision").val();
    }

    form_data.estudio_principal.domicilio = $("#direccionP").val();
    form_data.estudio_principal.comuna = $("#comunaP").val();
    form_data.estudio_principal.region = $("#regionP").val();
    form_data.estudio_principal.latitud = $("#latGradesP").val() + '° ' + $("#latMinP").val() + '\' ' + $("#latMinP").val() + '\'\'';
    form_data.estudio_principal.longitud = $("#longGradesP").val() + '° ' + $("#longMinP").val() + '\' ' + $("#longSecP").val() + '\'\'';

    form_data.estudio_alternativo.domicilio = $("#direccionA").val();
    form_data.estudio_alternativo.comuna = $("#comunaA").val();
    form_data.estudio_alternativo.region = $("#regionA").val();
    form_data.estudio_alternativo.latitud = $("#latGradesA").val() + '° ' + $("#latMinA").val() + '\' ' + $("#latMinA").val() + '\'\'';
    form_data.estudio_alternativo.longitud = $("#longGradesA").val() + '° ' + $("#longMinA").val() + '\' ' + $("#longSecA").val() + '\'\'';

    form_data.ptx_adicional1.domicilio = $("#direccionPTxAdd1").val();
    form_data.ptx_adicional1.comuna = $("#comunaPTxAdd1").val();
    form_data.ptx_adicional1.region = $("#regionPTxAdd1").val();
    form_data.ptx_adicional1.latitud = $("#latGradesPTxAdd1").val() + '° ' + $("#latMinPTxAdd1").val() + '\' ' + $("#latSecPTxAdd1").val() + '\'\'';
    form_data.ptx_adicional1.longitud = $("#longGradesPTxAdd1").val() + '° ' + $("#longMinPTxAdd1").val() + '\' ' + $("#longSecPTxAdd1").val() + '\'\'';

    form_data.ptx_adicional2.domicilio = $("#direccionPTxAdd2").val();
    form_data.ptx_adicional2.comuna = $("#comunaPTxAdd2").val();
    form_data.ptx_adicional2.region = $("#regionPTxAdd2").val();
    form_data.ptx_adicional2.latitud = $("#latGradesPTxAdd2").val() + '° ' + $("#latMinPTxAdd2").val() + '\' ' + $("#latSecPTxAdd2").val() + '\'\'';
    form_data.ptx_adicional2.longitud = $("#longGradesPTxAdd2").val() + '° ' + $("#longMinPTxAdd2").val() + '\' ' + $("#longSecPTxAdd2").val() + '\'\'';

    form_data.carac_tecnicas.sist_radiante = $("#sistRadiante").val();
    form_data.carac_tecnicas.antena_combi = $("#antCombinada").val();
    form_data.carac_tecnicas.tipo_antena = $("#tipoAntena").val();
    form_data.carac_tecnicas.num_elem = $("#numElem").val();
    form_data.carac_tecnicas.polarizacion = $("#polarizacion").val();
    form_data.carac_tecnicas.ganancia_max = $("#gananciaMax").val();
    form_data.carac_tecnicas.angulo_tilt = $("#anguloTilt").val();


    for (var ix = 0; ix < rows_table_anthenas; ix++) {
        tabla_antenas.numero["ant_num" + ix] = $("#ant_num" + ix).val();
        tabla_antenas.altura["ant_alt" + ix] = $("#ant_alt" + ix).val();
        tabla_antenas.largo["ant_lar" + ix] = $("#ant_lar" + ix).val();
        tabla_antenas.azimutV["ant_aziV" + ix] = $("#ant_aziV" + ix).val();
        tabla_antenas.azimutA["ant_aziA" + ix] = $("#ant_aziA" + ix).val();
        tabla_antenas.ganancia["ant_gan" + ix] = $("#ant_gan" + ix).val();
        tabla_antenas.polarizacion["ant_pol" + ix] = $("#ant_pol" + ix).val();
        tabla_antenas.marca["ant_marc" + ix] = $("#ant_marc" + ix).val();
        tabla_antenas.modelo["ant_mod" + ix] = $("#ant_mod" + ix).val();
        tabla_antenas.fase["ant_fase" + ix] = $("#ant_fase" + ix).val();
        tabla_antenas.potencia["ant_pot" + ix] = $("#ant_pot" + ix).val();
    }

    form_data.arreglos_antena = tabla_antenas;

    $('#openModal').hide();
});

$("button[name='subtab']").on('click', function(evt) {
    var id_tab_active = $(".tablinks.active").attr('id');
    $("#" + id_tab_active).toggleClass("active");
    $("#" + evt.target.id).toggleClass("active");

    $("#div" + id_tab_active).toggle();
    $("#div" + evt.target.id).toggle();
});

function getFormData(concursoModificacion) {
    if (concursoModificacion == 'Concurso') {
        form_data.tab_general = form_general_concurso;
    } else if (concursoModificacion == 'Modificacion') {
        form_data.tab_general = form_general_modificacion;
    }
    return form_data;
}

$("#closeFrom").on('click', function() {
    clearForm();
    $('#openModal').hide();
});

$(document).ready(function() {
    var table = $('#example').DataTable({
        "scrollCollapse": true,
        "paging": false,
        fixedColumns: {
            leftColumns: 1,
            rightColumns: 0
        },
        "paging": false,
        "ordering": false,
        "info": false,
        "searching": false,
        "bAutoWidth": true,
    });

    $('.dataTable').wrap('<div class="dataTables_scroll" />');

    for (var ix = 0; ix < rows_table_anthenas; ix++) {
        table.row.add([
            '<input type="text" id="ant_num' + ix + '" value="">',
            '<input type="text" id="ant_alt' + ix + '" value="">',
            '<input type="text" id="ant_lar' + ix + '" value="">',
            '<input type="text" id="ant_aziV' + ix + '" value="">',
            '<input type="text" id="ant_aziA' + ix + '" value="">',
            '<input type="text" id="ant_gan' + ix + '" value="">',
            '<input type="text" id="ant_pol' + ix + '" value="">',
            '<input type="text" id="ant_marc' + ix + '" value="">',
            '<input type="text" id="ant_mod' + ix + '" value="">',
            '<input type="text" id="ant_fase' + ix + '" value="">',
            '<input type="text" id="ant_pot' + ix + '" value="">'
        ]).draw(false);
    }
});

function clearForm() {
    $('#divtabB').find('input:text').val('');
    $('#divtabC').find('input:text').val('');
    $('#divtabD').find('input:text').val('');
    $('#divtabE').find('input:text').val('');
    $('#divtabF').find('input:text').val('');
}

function showDatosGenerales(concursoModificacion) {
    tipo_licitacion = concursoModificacion;
    if (tipo_licitacion == 'Concurso') {
        $('#ul_modificacion').hide();
        $('#ul_concurso').show();
    } else if (tipo_licitacion == 'Modificacion') {
        $('#ul_concurso').hide();
        $('#ul_modificacion').show();
    }
}