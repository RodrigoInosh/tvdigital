var rows_table_anthenas = 11;
form_data = { 
    "tab_general": {
        "rep_legal": {
            "nombre": "",
            "rut":""
        },
        "res_otorga": {
            "num": "",
            "fecha":"",
            "cntv": ""
        },
        "res_modifica": {
            "num": "",
            "fecha":"",
            "cntv": ""
        }
    },
    "estudio_principal": {
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
    "arreglos_antena": {}
};

$('#saveFormPDF').on('click', function() {

    form_data.tab_general.rep_legal.nombre = $("#nombreRepLegal").val();
    form_data.tab_general.rep_legal.rut = $("#rutRepLegal").val();
    form_data.tab_general.res_otorga.num = $("#numResOtorga").val();
    form_data.tab_general.res_otorga.fecha = $("#fechaResOtorga").val();
    form_data.tab_general.res_otorga.cntv = $("#resOtorgaCNTV").val();
    form_data.tab_general.res_modifica.num = $("#numResModifica").val();
    form_data.tab_general.res_modifica.fecha = $("#fechaResModifica").val();
    form_data.tab_general.res_modifica.cntv = $("#resModificaCNTV").val();

    form_data.estudio_principal.domicilio = $("#direccionP").val();
    form_data.estudio_principal.comuna = $("#comunaP").val();
    form_data.estudio_principal.region = $("#regionP").val();
    form_data.estudio_principal.latitud = $("#latGradesP").val() + '° ' + $("#latMinP").val() + '\''+ $("#latMinP").val() + '\'\'';
    form_data.estudio_principal.longitud = $("#longGradesP").val() + '° ' + $("#longMinP").val() + '\''+ $("#longSecP").val() + '\'\'';

    form_data.ptx_adicional1.domicilio = $("#direccionPTxAdd1").val();
    form_data.ptx_adicional1.comuna = $("#comunaPTxAdd1").val();
    form_data.ptx_adicional1.region = $("#regionPTxAdd1").val();
    form_data.ptx_adicional1.latitud = $("#latGradesPTxAdd1").val() + '° ' + $("#latMinPTxAdd1").val() + '\''+ $("#latSecPTxAdd1").val() + '\'\'';
    form_data.ptx_adicional1.longitud = $("#longGradesPTxAdd1").val() + '° ' + $("#longMinPTxAdd1").val() + '\''+ $("#longSecPTxAdd1").val() + '\'\'';

    form_data.ptx_adicional2.domicilio = $("#direccionPTxAdd2").val();
    form_data.ptx_adicional2.comuna = $("#comunaPTxAdd2").val();
    form_data.ptx_adicional2.region = $("#regionPTxAdd2").val();
    form_data.ptx_adicional2.latitud = $("#latGradesPTxAdd2").val() + '° ' + $("#latMinPTxAdd2").val() + '\''+ $("#latSecPTxAdd2").val() + '\'\'';
    form_data.ptx_adicional2.longitud = $("#longGradesPTxAdd2").val() + '° ' + $("#longMinPTxAdd2").val() + '\''+ $("#longSecPTxAdd2").val() + '\'\'';

    form_data.carac_tecnicas.sist_radiante = $("#sistRadiante").val();
    form_data.carac_tecnicas.antena_combi = $("#antCombinada").val();
    form_data.carac_tecnicas.tipo_antena = $("#tipoAntena").val();
    form_data.carac_tecnicas.num_elem = $("#numElem").val();
    form_data.carac_tecnicas.polarizacion = $("#polarizacion").val();
    form_data.carac_tecnicas.angulo_tilt = $("#anguloTilt").val();

    var tabla_antenas = {"numero": {}, "altura": {}, "largo": {}, "azimutV": {}, "azimutA": {},
        "ganancia": {}, "polarizacion": {}, "marca": {}, "modelo": {}, "fase": {}, "potencia": {}};
    for(var ix = 0; ix < rows_table_anthenas; ix++) {
        tabla_antenas.numero["ant_num"+ix] = $("#ant_num"+ix).val();
        tabla_antenas.altura["ant_alt"+ix] = $("#ant_alt"+ix).val();
        tabla_antenas.largo["ant_lar"+ix] = $("#ant_lar"+ix).val();
        tabla_antenas.azimutV["ant_aziV"+ix] = $("#ant_aziV"+ix).val();
        tabla_antenas.azimutA["ant_aziA"+ix] = $("#ant_aziA"+ix).val();
        tabla_antenas.ganancia["ant_gan"+ix] = $("#ant_gan"+ix).val();
        tabla_antenas.polarizacion["ant_pol"+ix] = $("#ant_pol"+ix).val();
        tabla_antenas.marca["ant_marc"+ix] = $("#ant_marc"+ix).val();
        tabla_antenas.modelo["ant_mod"+ix] = $("#ant_mod"+ix).val();
        tabla_antenas.fase["ant_fase"+ix] = $("#ant_fase"+ix).val();
        tabla_antenas.potencia["ant_pot"+ix] = $("#ant_pot"+ix).val();
    }

    form_data.arreglos_antena = tabla_antenas;

    $('#openModal').hide();
});

$("button[name='subtab']").on('click', function(evt){
    var id_tab_active = $(".tablinks.active").attr('id');
    $("#"+id_tab_active).toggleClass("active");
    $("#"+evt.target.id).toggleClass("active");

    $("#div"+id_tab_active).toggle();
    $("#div"+evt.target.id).toggle();    
});

function getFormData() {
    return form_data;
}

$("#closeFrom").on('click', function(){
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
        "paging":   false,
        "ordering": false,
        "info":     false,
        "searching": false,
        "bAutoWidth": true,
    });

    $('.dataTable').wrap('<div class="dataTables_scroll" />');

    for(var ix = 0; ix < rows_table_anthenas; ix++){
        table.row.add([
            '<input type="text" id="ant_num'+ix+'" value="">',
            '<input type="text" id="ant_alt'+ix+'" value="">',
            '<input type="text" id="ant_lar'+ix+'" value="">',
            '<input type="text" id="ant_aziV'+ix+'" value="">',
            '<input type="text" id="ant_aziA'+ix+'" value="">',
            '<input type="text" id="ant_gan'+ix+'" value="">',
            '<input type="text" id="ant_pol'+ix+'" value="">',
            '<input type="text" id="ant_marc'+ix+'" value="">',
            '<input type="text" id="ant_mod'+ix+'" value="">',
            '<input type="text" id="ant_fase'+ix+'" value="">',
            '<input type="text" id="ant_pot'+ix+'" value="">'
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

