var superView = {};
var ajaxCall1 = {};
var ajaxCall2 = {};
var circleFunction;
var internal_token = 3;
var codigo = "";
var is_form_modal_first_openend = true;
var TIPO_SECCION = "";
var decimales_frecuencias = 0;
var idConcurso = 0;
var idIdentificador = 0;
var idTipoServicio = 0;
var concursoC = 0;
var modificacionM = 0;
var geoProcessor = null;
var printTaskRepore = null;
var geoScriptExportarKMZ = null;
var longitud_ptx = 0;
var latitud_ptx = 0;
var longitud_ptx_geo = "";
var latitud_ptx_geo = "";
var longitud = 0;
var latitud = 0;
var radiales8 = 0;
var radiales18 = 0;
var areaCalculo = 0;
var normaActual = true;
var normaAnterior = false;
var isCalculoZonaMaxima = false;
var isCoCanal = false;
var nuevaCoordenada = false;
var pointRegion = null;
var pointConcurso = null;
var capaPoligonos = null;
var capaCalculoPoligonos = null;
var capaPuntos = null;
var capaCalculoPuntos = null;
var layerGraphicsMax = null;
var layerGraphicsNewPoint = null;
var default72 = "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0";
var default18 = "0,0,0,0,0,0,0,0,0,0";
var default8 = "0,0,0,0,0,0,0,0";
var concursoModificacion = "Concurso";
var regiones = [];
var comunas = [];
var object_identificadores = null;
var identificador = "Identificadores3";
var queryTask1 = null;
//ListaConcursos (0)
var identificadores20 = `http://copahue.subtel.gob.cl:6080/arcgis/rest/services/Cobertura_Radio/${identificador}/MapServer/0`;
//ListaConcursosTV (1)
var identificadores21 = `http://copahue.subtel.gob.cl:6080/arcgis/rest/services/Cobertura_Radio/${identificador}/MapServer/1`;
//Identificador_Concursos (2)
var identificadores22 = `http://copahue.subtel.gob.cl:6080/arcgis/rest/services/Cobertura_Radio/${identificador}/MapServer/2`;
//Identificador_Modificacion_1546 (3)
var identificadores23 = `http://copahue.subtel.gob.cl:6080/arcgis/rest/services/Cobertura_Radio/${identificador}/MapServer/3`;
//Identificador_Modificacion_1546mas (4)
var identificadores24 = `http://copahue.subtel.gob.cl:6080/arcgis/rest/services/Cobertura_Radio/${identificador}/MapServer/4`;
//Identificador_Modificacion_370 (5)
var identificadores25 = `http://copahue.subtel.gob.cl:6080/arcgis/rest/services/Cobertura_Radio/${identificador}/MapServer/5`;
//Zonas_Concursos (6)
var identificadores26 = `http://copahue.subtel.gob.cl:6080/arcgis/rest/services/Cobertura_Radio/${identificador}/MapServer/6`;
//Zonas_Modificacion_1546 (7)
var identificadores27 = `http://copahue.subtel.gob.cl:6080/arcgis/rest/services/Cobertura_Radio/${identificador}/MapServer/7`;
//Zonas_Modificacion_1546_30p (8)
var identificadores28 = `http://copahue.subtel.gob.cl:6080/arcgis/rest/services/Cobertura_Radio/${identificador}/MapServer/8`;
//Zonas_Modificacion_1546mas (9)
var identificadores29 = `http://copahue.subtel.gob.cl:6080/arcgis/rest/services/Cobertura_Radio/${identificador}/MapServer/9`;
//Zonas_Modificacion_1546mas_30p (10)
var identificadores210 = `http://copahue.subtel.gob.cl:6080/arcgis/rest/services/Cobertura_Radio/${identificador}/MapServer/10`;
//Zonas_Modificacion_370 (11)
var identificadores211 = `http://copahue.subtel.gob.cl:6080/arcgis/rest/services/Cobertura_Radio/${identificador}/MapServer/11`;
//Zonas_Modificacion_370_30p (12)
var identificadores212 = `http://copahue.subtel.gob.cl:6080/arcgis/rest/services/Cobertura_Radio/${identificador}/MapServer/12`;


require(["esri/Map", "esri/Basemap", "esri/views/MapView", "esri/geometry/Circle",
        "esri/widgets/BasemapToggle", "esri/tasks/support/Query", "esri/tasks/QueryTask",
        "esri/layers/FeatureLayer", "esri/tasks/Geoprocessor", "esri/tasks/support/JobInfo",
        "esri/Graphic", "esri/geometry/Point", "esri/geometry/Polyline", "esri/geometry/Polygon",
        "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol",
        "esri/renderers/SimpleRenderer", "esri/tasks/PrintTask", "esri/tasks/support/PrintTemplate",
        "esri/tasks/support/PrintParameters", "esri/layers/GraphicsLayer", "esri/widgets/Home", "dojo/dom",
        "dojo/on", "dojo/domReady!"
    ],
    function(Map, Basemap, MapView, Circulo, BasemapToggle, Query, QueryTask, FeatureLayer, Geoprocessor, JobInfo,
        Graphic, Point, Polyline, Polygon, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
        SimpleRenderer, PrintTask, PrintTemplate, PrintParameters, GraphicsLayer, Home, dom, on) {

        internal_token = $("#id").val();
        codigo = $("#codigo").val();
        TIPO_SECCION = $("#seccion").val();

        setInitConcursosParametros();
        setComboTipoServicio(TIPO_SECCION, "concurso");
        setVariablesByIntensidadCampo();
        showInitPestana();
        setDataCombosRegiones();
        triggerPerdidasLobulos();

        $("#exportarKMZ").on('click', function() {
            showLoader(true, 'Generando Archivo KML');
            exportKMZClick(true);
        });

        $("#imprimirCalculo").on('click', function() {
            imprimirCalculoClick(true);
        });

        $("#frecuenciaM").on('change', function() {

            var value = this.value;
            if (value == "") {
                this.value = "0";
            } else {
                value = value.replace(",", ".");
                this.value = redondea(value, decimales_frecuencias);
            }
        });

        $("#potenciaM").on('change', function() {

            var value = this.value;
            if (value == "") {
                this.value = "0";
            }
        });

        $(".number_input").keypress(function(evt) {
            var code = evt.which;
            if ((code > 47 && code < 58) || code == 0 || code == 8 || code == 46 || code == 45) {
                return true;
            } else {
                evt.preventDefault();
            }
        });

        $(".number_input").on('change', function(event) {
            var id_target = event.target.id;
            if ($("#" + id_target).val() == '' || typeof $("#" + id_target).val() == undefined) {
                $("#" + id_target).val(0);
            }
        });

        $('input[type="radio"][name="radialesRadio"]').on('change', function(e){
        	setOmni();
        	var radiales = e.currentTarget.value;
        	$("#calculaPoligono").text(`Calcular Zona [${radiales} radiales]`);
        });

        $('#saveMongoData').on('click', function() {
            var mapParametros = getMapParameters();
            var calculos_guardados = $("#selectCalculos").val();
            preparedDataCalculosTVD();
        });

        $("#selectCalculos").on('change', function() {
            var id = $(this).val();
            if (id != '0') {
                ObtenerDatosCalculos(id);
            }
        });

        $("#enviarCalculosCNTV").on('click', function() {
            var id_calculo = $("#selectCalculos option:selected").val();
            var idIdentificador = $("#identificadores option:selected").text();
            var nombre_select = getCalculoName();
            var mapParametros = getParametersReport();

            mapParametros['form_data'] = form_data;
            mapParametros['form_general_modificacion'] = form_general_modificacion;
            mapParametros['form_general_concurso'] = form_general_concurso;

            $("#longitudI").val($("#longitudGradosM").val() + "° " + $("#longitudMinutosM").val() + "' " + $("#longitudSegundosM").val() + "''");
            $("#latitudI").val($("#latitudGradosM").val() + "° " + $("#latitudMinutosM").val() + "' " + $("#latitudSegudosM").val() + "''");
            var longitudGMS = ComponeCoordenadaNumero($("#longitudGradosM").val(), $("#longitudMinutosM").val(), $("#longitudSegundosM").val());
            var latitudGMS = ComponeCoordenadaNumero($("#latitudGradosM").val(), $("#latitudMinutosM").val(), $("#latitudSegudosM").val());
            mapParametros["longitud"] = longitudGMS;
            mapParametros["latitud"] = latitudGMS;
            mapParametros["canal"] = getCanal();
            showLoader(true, 'Guardando Informacion');
            guardarCalculoDefinitivo(nombre_select, mapParametros, id_calculo, idIdentificador, codigo);
        });

        $("#nuevaZonaMaxima").on('click', function(){
            isCalculoZonaMaxima = true;
            map.removeAll();
            calcularNuevaZonaMaxima();
        });

        $("#calcularCoCanal").on('click', function(){
            isCoCanal = true;
            map.removeAll ();
            calcularNuevaZonaMaxima();
        });

        $("#intensidadCampoM").on('change', function(){
            getKMLNameSite();
            setFrecuenciaByIntensidad();
        });

        var map = new Map({

            basemap: "topo"
        });

        var fillSymbolConcurso = new SimpleFillSymbol({
            color: [0, 0, 0, 0.1],
            outline: {
                color: [0, 0, 0],
                width: 1
            }
        });

        var fillSymbolModificacion = new SimpleFillSymbol({
            color: [0, 0, 0, 0.1],
            outline: {
                color: [0, 0, 0],
                width: 1,
                style: 'short-dash'
            }
        });

        var fillSymbolPoligono = new SimpleFillSymbol({
            color: [204, 0, 204, 0.1],
            outline: {
                color: [204, 0, 204],
                width: 1
            }
        });

        var concursoRenderer = new SimpleRenderer({
            symbol: fillSymbolConcurso
        });

        var modificacionRenderer = new SimpleRenderer({
            symbol: fillSymbolModificacion
        });

        var poligonoRenderer = new SimpleRenderer({
            symbol: fillSymbolPoligono
        });
        var markerSymbolConcurso = new SimpleMarkerSymbol({
            style: "cross",
            outline: {
                color: [0, 0, 0],
                width: 2
            }
        });
        var markerSymbolUbicacion = new SimpleMarkerSymbol({
            style: "cross",
            outline: {
                color: [204, 0, 204],
                width: 2
            }
        });

        var gpCalculoPredictivo = "http://copahue.subtel.gob.cl:6080/arcgis/rest/services/Cobertura_Radio/calculozona/GPServer/CalculoPredictivo72";
        var ptReporte = "http://copahue.subtel.gob.cl:6080/arcgis/rest/services/Cobertura_Radio/Imprimir/GPServer/Imprimir";
        var gpScriptExportarKMZ = "http://copahue.subtel.gob.cl:6080/arcgis/rest/services/Cobertura_Radio/ScriptExportarKMZ/GPServer/ScriptExportarKMZ/";
        var guardarDataCalculos = "http://copahue.subtel.gob.cl:6080/arcgis/rest/services/DDT/GuardarCalculos/GPServer/Modelo";
        var cargarListaCalculos = "http://copahue.subtel.gob.cl:6080/arcgis/rest/services/DDT/CargarInfoCalculos/GPServer/Modelo";
        var cargarDataCalculo = "http://copahue.subtel.gob.cl:6080/arcgis/rest/services/DDT/ObtenerDatosCalculos/GPServer/Modelo";

        //**CAMBIAR LOS SCRIPT DE CALCULO AL CORRESPONDIENTE**//
        var gpCalculoPredictivoCensal = "http://copahue.subtel.gob.cl:6080/arcgis/rest/services/Pruebas/CapaCensal/GPServer/CalculoPredictivo72";
        var gpCalculoZonaMaxima = "http://copahue.subtel.gob.cl:6080/arcgis/rest/services/Pruebas/CalculoZonaMaxima/GPServer/Modelo";
        var gpCalculoMatrizCotas = "http://copahue.subtel.gob.cl:6080/arcgis/rest/services/Pruebas/Test2/GPServer/Test2";

        queryTask1 = new QueryTask({
            url: object_identificadores.identificador_lista_concursos
        });

        var queryTask2 = new QueryTask({
             url: identificadores22
        });

        var queryTask3 = new QueryTask({
            url: object_identificadores.identificador_modif
        });
        var queryTask6 = new QueryTask({
            url: identificadores26
        });

        setInitConcursosList();

        var view = new MapView({
            container: "viewDiv",
            map: map,
            zoom: 3,
            center: [-70.6514212, -33.440616]
        });

        var homeWidget = new Home({
            view: view
        });

        view.ui.add(homeWidget, "top-left");

        homeWidget.on("click", function(event) {
            goHome();
        });

        function setInitConcursosParametros() {
            if (TIPO_SECCION == 'digital') {
            	$("#recomendacion").append(new Option("1546", "1546"));
            	$("#recomendacion option[value=1546]").prop('selected', true);
                decimales_frecuencias = 0;
                object_identificadores = new Identificadores(identificadores21, identificadores23, identificadores27, identificadores28);
            } else if (TIPO_SECCION == 'radiodifusion') {
            	$("#recomendacion").append(new Option("370", "370"));
				$("#recomendacion").append(new Option("1546+", "1546+"));
                $("#recomendacion option[value='1546+']").prop('selected', true);
            	$("#saveMongoData").prop('disabled', true);
            	$("#enviarCalculosCNTV").prop('disabled', true);
            	
                decimales_frecuencias = 1;
                object_identificadores = new Identificadores(identificadores20, identificadores24, identificadores29, identificadores210);
            } else if (TIPO_SECCION == 'servicios') {
            	$("#recomendacion").append(new Option("370", "370"));
                $("#recomendacion option[value=370]").prop('selected', true);
            	$("#frecuenciaM").prop('disabled', true);
                $("#saveMongoData").prop('disabled', true);
            	$("#enviarCalculosCNTV").prop('disabled', true);

                decimales_frecuencias = 3;
                object_identificadores = new Identificadores(identificadores20, identificadores25, identificadores211, identificadores212);
            }
        }

        function setInitConcursosList() {
        	var queryConcursos = new Query();
	        queryConcursos.returnGeometry = true;
	        queryConcursos.outFields = ["NOMBRE, CONCURSO"];
	        queryConcursos.where = "1=1";
	        queryTask1.execute(queryConcursos).then(setComboConcursos);
        }

        function setDataCombosRegiones() {
            $.ajax({
                url: "/CalculoTVD/calculoTVD/regiones",
                type: 'GET',
                success: function(response) {
                	comunas = response.comunas;
                    var datos = response.resp;
                    var arr = $.parseJSON(datos);
                    arr.forEach(function(val) {
                        regiones.push(val);
                    });
                },
                error: function(error) {
                    console.log("error");
                    console.log(error);
                }
            });

        }

        function changeComboIdentificadorClick() {
            $("#pestanaTab3").hide();
            concursoC = dom.byId("concursoC").checked;
            modificacionM = dom.byId("modificacionM").checked;
            triggerPerdidasLobulos();
            showLoader(true, '');
            if (concursoC) {
                setIndentificadorConcurso();
            }
            if (modificacionM) {
                setIndentificadorRegion();
            }
        }

        function changeComboConcursoClick() {
            view.graphics.removeAll();
            removeDataConcurso();
            removeDataInforme();
			showInitPestana();
            idConcurso = dom.byId("concursos").value;
            idIdentificador = 0;
            idTipoServicio = getServiceType(concursoModificacion);

            setVariablesByIntensidadCampo(idTipoServicio);
            var query3 = new Query();
            query3.returnGeometry = true;

            query3.outFields = ["IDENTIFICADOR"];
            query3.where = "CONCURSO='" + idConcurso + "' AND TIPO_SERVICIO = '" + idTipoServicio + "'";
            query3.orderByFields = ["IDENTIFICADOR"];
			
            queryTask2.execute(query3).then(function(data) {
                showLoader(true, 'Cargando Datos');
                triggerPerdidasLobulos();
                changeComboConcurso(data);
                setIndentificadorConcurso();
                showLoader(false, '');
            });
        }

        function changeComboTipoServicioClick() {
            view.graphics.removeAll();
            concursoC = dom.byId("concursoC").checked;
            modificacionM = dom.byId("modificacionM").checked;
            idConcurso = dom.byId("concursos").value;
            idTipoServicio = dom.byId("tipoServicio").value;
            idRegion = dom.byId("regiones").value;
            var query3 = new Query();
            query3.returnGeometry = true;
            query3.outFields = ["IDENTIFICADOR"];
            query3.orderByFields = ["IDENTIFICADOR"];

            if (concursoC) {
                query3.where = "CONCURSO='" + idConcurso + "' AND TIPO_SERVICIO = '" + idTipoServicio + "'";
                queryTask2.execute(query3).then(function(data) {
                    changeListaIdentificadores(data);
                    setIndentificadorConcurso();
                    if (data.features.length == 0) {
                        resetSelect('concursos', 'seleccione');
                    }
                });
            } else if (modificacionM) {
                query3.where = "REG=" + idRegion + " AND TIPO_SERVICIO = '" + idTipoServicio + "'";
                queryTask3.execute(query3).then(function(data) {
                    setIdentificadoresData(data);
                });
            }
        }

        function setIdentificadoresData(data) {
            changeListaIdentificadores(data);
            setIndentificadorRegion();
            if (data.features.length == 0) {
                resetSelect('regiones', '0');
            }
        }

        function changeConcursoModificacionClick() {
            concursoC = dom.byId("concursoC").checked;
            modificacionM = dom.byId("modificacionM").checked;
            if (validaCambiosCampos()) {

                is_form_modal_first_openend = true;
                view.graphics.removeAll();
                map.removeAll();
                
                removeDataConcurso();
                removeDataInforme();
				showInitPestana();

                if (concursoC) {
                    concursoModificacion = "Concurso";
                    var query1 = new Query();
                    query1.returnGeometry = true;
                    query1.outFields = ["nombre, id_concurso"];
                    query1.where = "1=1";
                    queryTask1.execute(query1).then(setComboConcursos);
                    setComboRegion(true);
                    setComboIntensidadCampo(true);
                    setComboTipoServicio(TIPO_SECCION, "concurso");
                    if(TIPO_SECCION != 'digital'){
                        $(".calculoZona").hide();
                        $("#whiteSpace").show();
                    }

                    $("#verRadiales").prop("disabled", true);
                    $("#label_zona_max").text("Zona de Servicio Máxima");
                }
                if (modificacionM) {
                    concursoModificacion = "Modificacion";
                    setComboRegion(false);
                    setComboIntensidadCampo(false);
                    setComboTipoServicio(TIPO_SECCION, "modificacion");
                    if(TIPO_SECCION != 'digital'){
                        $(".calculoZona").show();
                        $("#whiteSpace").hide();
                        $("#normaAnteriorM").prop("disabled", false);
                    }
                    
                    $("#verRadiales").prop("disabled", true);
                    $("#label_zona_max").text("Zona de Servicio Mínima");
                }
            } else {
                if (concursoC) {
                    $("#modificacionM").prop("checked", true);
                }
                if (modificacionM) {
                    $("#concursoC").prop("checked", true);
                }
            }
        }

        function changeCambiaNormaClick() {
        	if (dom.byId("normaActualM").checked) {
        		object_identificadores.setIdentificarZonasModif1(identificadores29);
        		object_identificadores.setIdentificarZonasModif2(identificadores210);
            }
            if (dom.byId("normaAnteriorM").checked) {
            	object_identificadores.setIdentificarZonasModif1(identificadores211);
        		object_identificadores.setIdentificarZonasModif2(identificadores212);
            }

            setIndentificadorRegion();
        }

        function triggerPerdidasLobulos() {
            if (TIPO_SECCION == "digital") {
                $("#72PerdidasLobulos").trigger('click');
            } else if(TIPO_SECCION == "radiodifusion") {
                $("#18PerdidasLobulos").trigger('click');
            } else if(TIPO_SECCION == "servicios") {
                $("#8PerdidasLobulos").trigger('click');
            }
        }

        function changeConcursoRegionesClick() {
            idRegion = dom.byId("regiones").value;
            idTipoServicio = getServiceType(concursoModificacion);

            var query3 = new Query();
            query3.returnGeometry = true;
            query3.outFields = ["IDENTIFICADOR"];
            query3.where = "REG=" + idRegion + " AND TIPO_SERVICIO = '" + idTipoServicio + "'";
            query3.orderByFields = ["IDENTIFICADOR"];

            queryTask3.execute(query3).then(function(data) {
                changeListaIdentificadores(data);
                setIndentificadorRegion();
            });
        }

        function setIndentificadorConcurso() {
            var queryCenter = new Query();
            idIdentificador = dom.byId("identificadores").value;
            tipoServicio = dom.byId("tipoServicio").value;

            var queryString = "IDENTIFICADOR='" + idIdentificador + "' AND TIPO_SERVICIO = '" + tipoServicio + "'";
            queryCenter.returnGeometry = true;
            queryCenter.outFields = ["IDENTIFICADOR"];
            queryCenter.where = queryString;

            queryTask2.execute(queryCenter).then(function(data) {
                cargarCalculosGuardados(idIdentificador);
                map.removeAll();

                if (data.features.length == 0) {
                    removeDataConcurso();
                    removeDataInforme();
					showInitPestana();
                } else {
                    longitud = data.features[0].geometry.x;
                    latitud = data.features[0].geometry.y;
                    longitud_ptx = longitud;
                    latitud_ptx = latitud;
                    longitud_ptx_geo = $("#longitudGradosM").val() + "° "+ $("#longitudMinutosM").val() + "' " + $("#longitudSegundosM").val() + "''";
                    latitud_ptx_geo = $("#latitudGradosM").val() + "° "+ $("#latitudMinutosM").val() + "' " + $("#latitudSegudosM").val() + "''";
                    view.center = [longitud, latitud];
                    var coordsPoint = new GeoPoint(longitud, latitud);
                    var coords = [coordsPoint.lonDeg, coordsPoint.latDeg]

                    pointConcurso = new FeatureLayer({
                        title: "CapaPoligonos",
                        url: identificadores22,
                        definitionExpression: queryString
                    });

                    map.add(pointConcurso);
                    var radio = new FeatureLayer({
                        title: "CapaPoligonos",
                        url: identificadores26,
                        renderer: concursoRenderer,
                        definitionExpression: "IDENTIFICADOR='" + idIdentificador + "'"
                    });

                    map.add(radio);
                    superView.pelota = radio;
                    
                    var queryData = new Query();
                    queryData.returnGeometry = true;
                    queryData.outFields = ["*"];
                    queryData.where = queryString;
                    queryTask2.execute(queryData).then(function(data) {
                        superView.punto = data;
                        setDataIdentificador(data.features[0].attributes, coords, decimales_frecuencias);
                        view.zoom = setZoom(data.features[0].attributes);
                    });
                }
                setPosicionTools();
            });
        }

        function setIndentificadorRegion() {
            var queryCenter = new Query();
            idIdentificador = dom.byId("identificadores").value;
            tipoServicio = dom.byId("tipoServicio").value;
            cargarCalculosGuardados(idIdentificador);

            var queryString = "IDENTIFICADOR='" + idIdentificador + "' AND TIPO_SERVICIO = '" + tipoServicio + "'";
            queryCenter.returnGeometry = true;
            queryCenter.outFields = ["*"];
            queryCenter.where = queryString;

            queryTask3.execute(queryCenter).then(function(data) {
                showLoader(true, 'Cargando Datos');
                map.removeAll();
                if (data.features.length == 0) {
                    removeDataConcurso();
                    removeDataInforme();
					showInitPestana();
                } else {
                    longitud = data.features[0].geometry.x;
                    latitud = data.features[0].geometry.y;
                    longitud_ptx = longitud;
                    latitud_ptx = latitud;
                    longitud_ptx_geo = $("#longitudGradosM").val() + "° "+ $("#longitudMinutosM").val() + "' " + $("#longitudSegundosM").val() + "''";
                    latitud_ptx_geo = $("#latitudGradosM").val() + "° "+ $("#latitudMinutosM").val() + "' " + $("#latitudSegudosM").val() + "''";
                    view.center = [longitud, latitud];
                    var coordsPoint = new GeoPoint(longitud, latitud);
                    var coords = [coordsPoint.lonDeg, coordsPoint.latDeg]
                    pointRegion = new FeatureLayer({
                        url: object_identificadores.identificador_modif,
                        definitionExpression: queryString
                    });
                    //Punto central
                    map.add(pointRegion);

                    //Corresponde al polígono a la zona -30%
                    var radio1 = new FeatureLayer({
                        url: object_identificadores.identificar_zonas_modif1,
                        renderer: modificacionRenderer,
                        definitionExpression: "IDENTIFICADOR='" + idIdentificador + "'"
                    });
                    map.add(radio1);

                    var ajaxCall1 = new XMLHttpRequest();
                    ajaxCall1.addEventListener("load", function(datLoad) {
                        eval("datosExtraidos = " + ajaxCall1.response);
                        superView.zonaMaxima1 = datosExtraidos.features[0].geometry;
                    });

                    ajaxCall1.open("GET", object_identificadores.identificar_zonas_modif1 + "/" + `query?f=json&where=IDENTIFICADOR%3D%27${idIdentificador}%27&returnGeometry=true`);
                    ajaxCall1.send();

                    //corresponde al polígono de la zona + 30%
                    var radio2 = new FeatureLayer({
                        url:  object_identificadores.identificar_zonas_modif2,
                        renderer: concursoRenderer,
                        definitionExpression: "IDENTIFICADOR='" + idIdentificador + "'"
                    });
                    map.add(radio2);

                    var ajaxCall2 = new XMLHttpRequest();
                    ajaxCall2.addEventListener("load", function(datLoad) {
                        eval("datosExtraidos = " + ajaxCall2.response);
                        superView.zonaMaxima2 = datosExtraidos.features[0].geometry;
                    });

                    ajaxCall2.open("GET",  object_identificadores.identificar_zonas_modif2 + "/" + `query?f=json&where=IDENTIFICADOR%3D%27${idIdentificador}%27&returnGeometry=true`);
                    ajaxCall2.send();

                    var queryData = new Query();
                    queryData.returnGeometry = true;
                    queryData.outFields = ["*"];
                    queryData.where = queryString;
                    //Hace el zoom en el mapa, centrado en el punto de la antena
                    queryTask3.execute(queryData).then(function(data) {
                        superView.punto = data;
                        activeAll();
                        setDataIdentificador(data.features[0].attributes, coords, decimales_frecuencias);
                        view.zoom = setZoom(data.features[0].attributes);
                    });
                }
                setPosicionTools();
                showLoader(false, '');
            });
        }

        function cambiaUbicacionClick() {
            nuevaCoordenada = true;
            cursorCross();
            view.on("click", obtieneNuevaCoordenada);
        }

        function obtieneNuevaCoordenada(event) {
            if (nuevaCoordenada) {
                map.remove(capaCalculoPuntos);
                var point = new Point({
                    longitude: event.mapPoint.longitude,
                    latitude: event.mapPoint.latitude
                });
                var newPointGraphic = new Graphic({
                    geometry: point,
                    symbol: markerSymbolUbicacion
                });
                capaCalculoPuntos = new GraphicsLayer({
                    graphics: [newPointGraphic]
                });
                map.add(capaCalculoPuntos);
                latitud = event.mapPoint.latitude;
                longitud = event.mapPoint.longitude;
                var coordsPoint = new GeoPoint(longitud, latitud);
                var coords = [coordsPoint.lonDeg, coordsPoint.latDeg];
                setPuntoCoordenadas(coords);
                nuevaCoordenada = false;
                cursorDefault();
            }
        }

        function cambiaNuevaCoordenada(latitud, longitud, markerSymbol) {
            map.remove(capaCalculoPuntos);
            var point = new Point({
                longitude: longitud,
                latitude: latitud
            });
            var newPointGraphic = new Graphic({
                geometry: point,
                symbol: markerSymbol
            });

            capaCalculoPuntos = new GraphicsLayer({
                graphics: [newPointGraphic]
            });
            map.add(capaCalculoPuntos);
            view.center = [longitud, latitud];
            view.zoom = 9;
        }

        function setNuevoPuntoCentral(latitud, longitud) {
            map.remove(pointRegion);
            var point = new Point({
                longitude: longitud,
                latitude: latitud
            });
            var newPointGraphic = new Graphic({
                geometry: point,
                symbol: markerSymbolConcurso
            });

            pointRegion = new GraphicsLayer({
                graphics: [newPointGraphic]
            });
            map.add(pointRegion);
            view.center = [longitud, latitud];
            view.zoom = 9;
            longitud_ptx = longitud;
            latitud_ptx = latitud;
            longitud_ptx_geo = $("#longitudGradosM").val() + "° "+ $("#longitudMinutosM").val() + "' " + $("#longitudSegundosM").val() + "''";
            latitud_ptx_geo = $("#latitudGradosM").val() + "° "+ $("#latitudMinutosM").val() + "' " + $("#latitudSegudosM").val() + "''";
        }

        function clickCalculaPoligonoClick() {
            showLoader(true, 'Calculando Zona de Propagación');
            map.remove(capaCalculoPoligonos);
            geoProcessor = new Geoprocessor(gpCalculoPredictivoCensal);

            var mapParametros = getMapParameters();
            var recomendacion = mapParametros.recomendacion;
            cambiaNuevaCoordenada(mapParametros.latitud, mapParametros.longitud, markerSymbolUbicacion);
            superView.puntoNuevo = {
                "longitud": mapParametros.longitud,
                "latitud": mapParametros.latitud
            };
            var params = {
                "latitud": mapParametros.latitud,
                "longitud": mapParametros.longitud,
                "potencia": mapParametros.potenciaM,
                "ganancia": mapParametros.gananciaM,
                "alturaAntenaTx": mapParametros.alturaAntenaTransmisoraM,
                "alturaAntenaRx": mapParametros.alturaAntenaRx,
                "perdidaCablesConectores": mapParametros.perdidasCablesConectoresM,
                "perdidaDivisorPotencia": mapParametros.divisorPotenciaM,
                "otrasPerdidas": mapParametros.otrasPerdidasM,
                "perdidasLobulo": setRadiansString(mapParametros),
                "obtaculosCircundantesTx": mapParametros.obstaculosCircundantesTx,
                "obstaculosCircundantesRx": mapParametros.obstaculosCircundantesRx,
                "toleranciaZonasSombra": mapParametros.toleranciaZonasSombras,
                "resolucionCalculo": mapParametros.resolucionCalculo,
                "porcentajeTiempo": mapParametros.porcentajeTiempo,
                "porcentajeUbicacion": mapParametros.porcentajeUbicacion,
                "frecuencia": mapParametros.frecuenciaM,
                "intensidadCampoReferencia": mapParametros.intensidadCampoM,
                "recomendacion": recomendacion,
                "radiales": mapParametros.radiales,
                "env:outSR": 102100,
                "f": 'json'
            };

            geoProcessor.submitJob(params).then(sendRequestPolygon, showError);
        }

        function calcularNuevaZonaMaxima() {

            showLoader(true, 'Calculando Nueva Zona Maxima');
            map.remove(pointRegion);
            map.remove(capaCalculoPoligonos);

            var mapParametros = getMapParameters();
            geoProcessor = new Geoprocessor(gpCalculoZonaMaxima);

            var recomendacion = mapParametros.recomendacion;

            if (isCalculoZonaMaxima && dom.byId("normaAnteriorM").checked || isCoCanal) {
                recomendacion = '370';
            } else if (isCalculoZonaMaxima && dom.byId("normaActualM").checked) {
                recomendacion = '1546+';
            }

            setNuevoPuntoCentral(mapParametros.latitud, mapParametros.longitud);

            var params = {
                "latitud": mapParametros.latitud,
                "longitud": mapParametros.longitud,
                "potencia": mapParametros.potenciaM,
                "ganancia": mapParametros.gananciaM,
                "alturaAntenaTx": mapParametros.alturaAntenaTransmisoraM,
                "alturaAntenaRx": mapParametros.alturaAntenaRx,
                "perdidaCablesConectores": mapParametros.perdidasCablesConectoresM,
                "perdidaDivisorPotencia": mapParametros.divisorPotenciaM,
                "otrasPerdidas": mapParametros.otrasPerdidasM,
                "perdidasLobulo": setRadiansString(mapParametros),
                "obtaculosCircundantesTx": mapParametros.obstaculosCircundantesTx,
                "obstaculosCircundantesRx": mapParametros.obstaculosCircundantesRx,
                "toleranciaZonasSombra": mapParametros.toleranciaZonasSombras,
                "resolucionCalculo": mapParametros.resolucionCalculo,
                "porcentajeTiempo": mapParametros.porcentajeTiempo,
                "porcentajeUbicacion": mapParametros.porcentajeUbicacion,
                "frecuencia": mapParametros.frecuenciaM,
                "intensidadCampoReferencia": mapParametros.intensidadCampoM,
                "recomendacion": recomendacion,
                "radiales": mapParametros.radiales,
                "env:outSR": 102100,
                "f": 'json'
            };
            
            geoProcessor.submitJob(params).then(sendRequestZonaMaxima, showError);
        }

        function clickGenerarMatrizCotas() {
            showLoader(true, 'Generando Matriz de Cotas');
            saveParametrosAvanzados();
            var mapParametros = getMapParameters();

            geoProcessor = new Geoprocessor(gpCalculoMatrizCotas);

            var params = {
                "latitud": mapParametros.latitud,
                "longitud": mapParametros.longitud,
                "potencia": mapParametros.potenciaM,
                "resolucionCalculo": mapParametros.resolucionCalculo,
                "radiales": mapParametros.radiales,
                "env:outSR": 102100,
                "f": 'json'
            };

            geoProcessor.submitJob(params).then(sendRequestCotas, showError);
        }

        function setRadiansString(data) {
            var radiales = "";
            if (data.radiales == 72) {
                if (data.M72PL0 == undefined) {
                    return default72;
                }
                for (var ix = 0; ix < 71; ix++) {
                    radiales += data["M72PL" + (ix * 5)] + ",";
                }
                radiales += data.M72PL355;
                return radiales;
            }
            if (data.radiales == 18) {
                if (data.M18PL0 == undefined) {
                    return default18;
                }
                for (var ix = 0; ix < 17; ix++) {
                    radiales += data["M18PL" + (ix * 20)] + ",";
                }
                radiales += data.M18PL340;
                return radiales;
            }
            if (data.radiales == 8) {
                if (data.M8PL0 == undefined) {
                    return default8;
                }
                for (var ix = 0; ix < 7; ix++) {
                    radiales += data["M8PL" + (ix * 45)] + ",";
                }
                radiales += data.M8PL315;
                return radiales;
            }
        }

        function sendRequestPolygon(data) {
            var jobId = data.jobId;
            var MAX_VALUE = 100000;
            geoProcessor.getResultData(jobId, "area").then(setPolygon, showError);
            geoProcessor.getResultData(jobId, "distancias").then(setDataReporteOut, showError);
            geoProcessor.getResultData(jobId, "capaCensal").then(getDataCensal, showError);
            geoProcessor.getResultData(jobId, "deltaH").then(getDeltaH, showError);
            geoProcessor.getResultData(jobId, "alturaEfectiva").then(getAlturaTerreno, showError);
            geoProcessor.getResultData(jobId, "altura").then(getAlturas, showError);
        }

         function sendRequestZonaMaxima(data) {
            var jobId = data.jobId;
            var MAX_VALUE = 100000;
            geoProcessor.getResultData(jobId, "area").then(setPolygon, showError);
            geoProcessor.getResultData(jobId, "distancias").then(setDistanciasEstacionExistente, showError);
            geoProcessor.getResultData(jobId, "deltaH").then(getDeltaHEstacionExistente, showError);
            geoProcessor.getResultData(jobId, "altura").then(getAlturasEstacionExistente, showError);
        }

        function sendRequestCotas(data) {
            var jobId = data.jobId;
            var MAX_VALUE = 100000;
            geoProcessor.getResultData(jobId, "nube").then(getDataNube, showError);
        }

        function showError(data) {
            showErrorMessage(data);
            setPosicionTools();
            hidePestanaTab3();
            showLoader(false, '');
        }

        function showErrorCalculosGuardados(data) {
            showLoader(false, '');
            alert("Hubo un problema cargando datos guardados.");
        }

        function getDataCensal(data) {
            setCantidadViviendas(data);
        }

        function getDeltaH(data) {
        	setDeltaH(data, false);
        }

        function getDeltaHEstacionExistente(data) {
            setDeltaH(data, true);
        }

        function getAlturaTerreno(data) {
        	setAlturaTerreno(data);
        }

        function getAlturas(data) {
        	setDataAlturas(data, false);
        }

        function getAlturasEstacionExistente(data) {
            setDataAlturas(data, true);
        }

        function setPolygon(data) {
            var polygonGraphic1 = null;
            var polygonGraphic2 = null;

            areaCalculo = redondea(Number(data.value.features[0].attributes.area), 2);

            if (isCalculoZonaMaxima) {


                polygonGraphic1 = new Graphic({
                    geometry: data.value.features[0].geometry,
                    symbol: fillSymbolModificacion
                });

                polygonGraphic2 = new Graphic({
                    geometry: data.value.features[1].geometry,
                    symbol: fillSymbolConcurso
                });

                layerGraphicsMax = new GraphicsLayer({
                    graphics: [polygonGraphic1, polygonGraphic2]
                });

                map.add(layerGraphicsMax);
                superView.concurso = polygonGraphic2;

                datos_pol1 = data.value.features[0].geometry.rings;
                datos_pol2 = data.value.features[1].geometry.rings;
                var zonaM1 = {rings: createNewPolygonCoordinates(datos_pol1)};
                var zonaM2 = {rings: createNewPolygonCoordinates(datos_pol2)};

                superView.zonaMaxima1 = zonaM1;
                superView.zonaMaxima2 = zonaM2;
            } else if (isCoCanal) {

                polygonGraphic1 = new Graphic({
                    geometry: data.value.features[0].geometry,
                    symbol: fillSymbolConcurso
                });

                layerGraphicsMax = new GraphicsLayer({
                    graphics: [polygonGraphic1]
                });

                datos_pol1 = data.value.features[0].geometry.rings;
                var zonaM1 = {rings: createNewPolygonCoordinates(datos_pol1)};

                map.add(layerGraphicsMax);
                superView.concurso = polygonGraphic1;
                superView.zonaMaxima1 = zonaM1;
            } else {
                polygonGraphic1 = new Graphic({
                    geometry: data.value.features[0].geometry,
                    symbol: fillSymbolPoligono
                });
                capaCalculoPoligonos = new GraphicsLayer({
                    graphics: [polygonGraphic1]
                });
                superView.zonaPropuesta = polygonGraphic1;
                map.add(capaCalculoPoligonos);
                showPestanaTab3();
            }
            isCalculoZonaMaxima = false;
            isCoCanal = false;

            setPosicionTools();
            showLoader(false, '');
        }

        function setDataReporteOut(data) {
            setDataReporte(data, false);
        }

        function setDistanciasEstacionExistente(data) {
            console.log("Dgsgs");
            setDataReporte(data, true);
        }

        function setZoom(value) {
            return new Zoom().getZoom(value);
        }

        function imprimirCalculoClick(download) {
            var pdfDocGenerator = getPDFFile();
            var pdf_name = getFileName($("#identificadores").val(), form_data.carac_tecnicas.sist_radiante, getKMLNameSite());
            pdfDocGenerator.download(pdf_name + '.pdf');
        }

        function getIdTipoCalculo(intensidad_campo) {
            var id_tipo_calculo = 0;
            if (zone_service_intensity == intensidad_campo) {
                id_tipo_calculo = 1;
            } else if (zone_hedge_intensity == intensidad_campo) {
                id_tipo_calculo = 2;
            } else if (zone_urban_intensity == intensidad_campo) {
                id_tipo_calculo = 3;
            }
            return id_tipo_calculo;
        }

        function createJSON(name, base64_file, id_tipo_calculo) {
            var json_object = new Object();
            var sha1_encoded = $.sha1(base64_file);

            json_object.descripcion = id_tipo_calculo;
            json_object.nombre = name;
            json_object.checksum = sha1_encoded;
            json_object.binario = base64_file;

            return json_object;
        }

        function showDocument(data) {
            showDocumentPopUp(data);
            setPosicionTools();
            showLoader(false, '');
        }

        function exportKMZClick(download) {

            var form_data = getMapParameters();
            var radioMaximo = form_data.radioMaximo;

            var printTask = new PrintTask({
                url: gpScriptExportarKMZ
            })

            var template = new PrintTemplate({
                format: "kmz",
                exportOptions: {
                    dpi: 96
                },
                outputSize: [800, 1100],
                layout: "",
                layoutOptions: {
                    titleText: "",
                    authorText: ""
                }
            });

            var params = new PrintParameters({
                view: view,
                template: template
            });

            // JCD
            var datos = {
                "poligonos": {
                    "zonaServicio": "",
                    "zonaMaximaServicio": "",
                    "zonaMaximaExistente": "",
                    "": ""
                },
                "puntos": {
                    "existente": {},
                    "nuevo": {}
                },
                "general": {
                    "localidad": "",
                    "frecuencia": "",
                    "intensidad": "",
                    "nombre": "",
                    "concursoModificacion": concursoModificacion
                }
            };
            datos.general.localidad = form_data.localidad;
            datos.general.frecuencia = form_data.frecuenciaM;
            datos.general.intensidad = form_data.intensidadCampoM;
            datos.general.seccion = TIPO_SECCION;
            datos.general.nombre =  getKMLNameSite();

            var poligono1 = "";
            var poligono2 = "";
            var poligonoM1 = "";
            var poligonoM2 = "";
            var poligonoMaxZone = "";

            if(longitud_ptx == 0 && latitud_ptx == 0) {
                longitud_ptx = superView.puntoNuevo.longitud;
                latitud_ptx = superView.puntoNuevo.latitud;
            }

            var ubicacion = {
                x: longitud_ptx,
                y: latitud_ptx
            };

            var circleGeometry = new Circulo([superView.puntoNuevo.longitud, superView.puntoNuevo.latitud], {
                "radius": 60000,
                geodesic: true
            });

            circleGeometry.rings[0].map(x => {
                poligono1 += x[0] + "," + x[1] + ",10 \n";
            });

            var circleMaxZone = new Circulo([longitud_ptx, latitud_ptx], {
                "radius": radioMaximo * 1000,
                geodesic: true
            });

            circleMaxZone.rings[0].map(x => {
                poligonoMaxZone += x[0] + "," + x[1] + ",10 \n";
            });

            if (superView.zonaMaxima1 != null) {
                superView.zonaMaxima1.rings[0].map(x => {
                    poligonoM1 += x[0] + "," + x[1] + ",10 \n";
                });
            }

            if (superView.zonaMaxima2 != null) {
                superView.zonaMaxima2.rings[0].map(x => {
                    poligonoM2 += x[0] + "," + x[1] + ",10 \n";
                });
            }

            superView.zonaPropuesta.geometry.rings[0].map(x => {
                result = toGeographic(x[0], x[1]);
                poligono2 += result.x + "," + result.y + ",10 \n";
            });

            datos.poligonos.zonaServicio = poligono2; //poligono zona de servicio
            datos.poligonos.zonaRestriccionServicio = poligono1; // poligono zona de restriccion 60km
            datos.poligonos.zonaMaxima = poligonoMaxZone; //poligono zona maxima
            datos.poligonos.zonaMaximaExistente = poligonoM1; //poligono zona maxima -30% o 100% (para los casos de radiodifusion)
            datos.poligonos.zonaMaximaExistenteExtendida = poligonoM2; //poligono zona maxima +30% 
            datos.puntos.existente.longitud = ubicacion.x; //PTx existente
            datos.puntos.existente.latitud = ubicacion.y; //PTx existente
            datos.puntos.nuevo.longitud = superView.puntoNuevo.longitud; //Ptx nueva
            datos.puntos.nuevo.latitud = superView.puntoNuevo.latitud; //Ptx nueva

            var kml = getTemplateKML(datos);
            var data = new Blob([kml]);
            var encodedData = window.btoa(kml);

            if (download == true) {
                var a = URL.createObjectURL(data);
                var name = $("#identificadores").val();
                var name2 = getFileName($("#identificadores").val(), $("#sistRadiante").val(), datos.general.nombre)
                var link = document.createElement('a');
                link.style = 'position: fixed; left -10000px;';
                link.href = a;
                link.download = name2 + ".kml";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                showLoader(false, '');
            } else {
                return encodedData;
            }
        }

        function cargarCalculosGuardados(identificador) {
            var params = {
                "internal_token": internal_token,
                "identificador": identificador,
                "f": 'json'
            }
            geoProcessor = new Geoprocessor(cargarListaCalculos);
            geoProcessor.submitJob(params).then(statusFunctionCargarCalculos, showErrorCalculosGuardados);
        }

        function statusFunctionCargarCalculos(data) {
            setDefaultSelectCalculos();
            var jobId = data.jobId;
            var MAX_VALUE = 100000;
            geoProcessor.getResultData(jobId, "datos").then(setDataCalculosGuardados, showError);
        }

        function setDefaultSelectCalculos() {
            var selectCalculos = $("#selectCalculos");
            selectCalculos.empty();
            selectCalculos.append(new Option("...", "0"));
        }

        function setDataCalculosGuardados(data) {
            var selectCalculos = $("#selectCalculos");
            $(data.value).each(function(index, value) {
                if (index == 0) {
                    $("#idomicilio").val(value.empresa.direccion);
                    $("#iemail").val(value.empresa.email);
                    $("#ifono").val(value.empresa.fono);
                    $("#inombreRazon").val(value.empresa.razon);
                    $("#irutRazon").val(value.empresa.rut);
                    $("#icomuna").val(value.empresa.comuna);
                    $("#iregion").val(value.empresa.region);
                } else {
                    selectCalculos.append(new Option(value.nombre, value.mongo_id));
                }
            });
            showLoader(false, '');
        }

        function preparedDataCalculosTVD() {
            var id_calculo = $("#selectCalculos option:selected").val();
            var nombre_select = $("#selectCalculos option:selected").text();
            var nombre_save = ''
            var mapParametros = getParametersReport();
            var idIdentificador = dom.byId("identificadores").value;

            if (id_calculo == '0') {
                nombre_save = prompt("Ingrese Nombre del Cálculo", "");
            } else {
                nombre_save = prompt("Ingrese Nombre del Cálculo", nombre_select);
            }

            if (nombre_save != nombre_select) {
                id_calculo = '0'
            }

            if (nombre_save != null) {
                guardarCalculosTVD(nombre_save, mapParametros, id_calculo, idIdentificador);
            }
        }

        function guardarCalculosTVD(nombre, mapParametros, id_calculo, idIdentificador) {
            showLoader(true, 'Guardando Datos');
            var params = {
                "calculos": JSON.stringify(mapParametros),
                "identificador": idIdentificador,
                "mongo_id": id_calculo,
                "action": "save",
                "nombre_calculo": nombre,
                "internal_id": internal_token,
                "f": 'json'
            }
            geoProcessor = new Geoprocessor(guardarDataCalculos);
            geoProcessor.submitJob(params).then(statusguardarCalculosTVD, showError);
        }

        function statusguardarCalculosTVD(data) {
            var jobId = data.jobId;
            var MAX_VALUE = 100000;
            geoProcessor.getResultData(jobId, "value").then(getStatus, showError);
        }

        function getStatus(data) {
            showLoader(false, '');
            if (data.value.status == 'saved') {
                alert("Datos Guardados Correctamente");
                updateComboSelectCalculos(data.value);
            } else if (data.value.status == 'updated') {
                alert("Datos Modificados Correctamente");
            } else if (data.value.status == 'usuario no existe') {
                alert("Error: usuario no existe");
            }
        }

        function updateComboSelectCalculos(value) {
            var selectCalculos = $("#selectCalculos");
            selectCalculos.append(new Option(value.nombre, value.mongo_id));
            $('#selectCalculos option[value=' + value.mongo_id + ']').attr('selected', 'selected');
        }

        function ObtenerDatosCalculos(mongo_id) {
            showLoader(true, 'Cargando Datos');
            var params = {
                "mongo_id": mongo_id,
                "internal_token": internal_token,
                "f": 'json'
            }
            geoProcessor = new Geoprocessor(cargarDataCalculo);
            geoProcessor.submitJob(params).then(statusFunctionDataCalculo, showError);
        }

        function statusFunctionDataCalculo(data) {
            var jobId = data.jobId;
            var MAX_VALUE = 100000;
            geoProcessor.getResultData(jobId, "data").then(setDataInForm, showError);
        }

        function setDataInForm(data) {
            datos = data.value.calculos[0];

            $("#intensidadCampoM").val(datos.pIntensidad);
            $("#alturaAntenaTransmisoraM").val(datos.pAlturaAntenaTx);
            $("#perdidasCablesConectoresM").val(datos.pPerdidaCablesConectores);
            $("#divisorPotenciaM").val(datos.pDivisorPotencia);
            $("#potenciaM").val(datos.pPotencia);
            $("#gananciaM").val(datos.pGanancia);
            $("#frecuenciaM").val(datos.pFrecuencia);
            $("#otrasPerdidasM").val(datos.pOtrasPerdidas);

            $("#latitudGradosM").val(datos.pLatitudDegress);
            $("#latitudMinutosM").val(datos.pLatitudMinutes);
            $("#latitudSegudosM").val(datos.pLatitudSeconds);

            $("#longitudGradosM").val(datos.pLongitudDegress);
            $("#longitudMinutosM").val(datos.pLongitudMinutes);
            $("#longitudSegundosM").val(datos.pLongitudSeconds);

            setRadiales(datos);
            showLoader(false, '');
        }

        function setRadiales(datos) {
            var radiales = datos.radiales;
            var grades = 360 / radiales;
            plCheckActual = radiales;
            $("#" + radiales + "PerdidasLobulos").trigger('click');

            var perdidas_aux = {};
            for (var ix = 0; ix < radiales; ix++) {
                var texto = "M" + radiales + "PL" + (ix * grades)
                perdidas_aux[texto] = datos[texto];
            }
            setDataByRadialIndex(radiales, perdidas_aux);
        }

        function setDataByRadialIndex(radiales, perdidas_aux) {
            if (radiales == 8) {
                perdidasLobulos8Map = perdidas_aux;
            } else if (radiales == 18) {
                perdidasLobulos18Map = perdidas_aux;
            } else if (radiales == 72) {
                perdidasLobulos72Map = perdidas_aux;
            }
        }

        function resetSelect(select_name, new_value) {
            $("#" + select_name).val(new_value);
        }

        function getCanal() {
            var tipo_concurso = "";
            if (concursoModificacion == 'Concurso') {
                tipo_concurso = "digital";
            } else if (concursoModificacion == 'Modificacion') {
                tipo_concurso = "analogo";
            }
            var canal = getCanalByFrecuencia(tipo_concurso, $("#frecuenciaM").val());
            return canal;
        }

        function getCalculoName() {
            var d = new Date();
            var n = d.getTime();
            var nombre_select = $("#selectCalculos option:selected").text();
            if (nombre_select == "...") {
                nombre_select = "CalculoDefinitivo" + n;
            }

            return nombre_select;
        }

        function guardarCalculoDefinitivo(nombre, mapParametros, id_calculo, idIdentificador, codigo) {
            if (validate_data(mapParametros)) {
                generateBase64Files();
                var params = {
                    "calculos": JSON.stringify(mapParametros),
                    "identificador": idIdentificador,
                    "mongo_id": id_calculo,
                    "internal_id": internal_token,
                    "nombre_calculo": nombre,
                    "codigo": codigo,
                    "action": "definitive",
                    "f": 'json'
                }
                geoProcessor = new Geoprocessor(guardarDataCalculos);
                geoProcessor.submitJob(params).then(statusguardarCalculosTVD, showError);
            } else {
                showLoader(false, '');
            }
        }

        on(dom.byId("concursos"), "change", changeComboConcursoClick);
        on(dom.byId("identificadores"), "change", changeComboIdentificadorClick);
        on(dom.byId("tipoServicio"), "change", changeComboTipoServicioClick);
        on(dom.byId("concursoC"), "change", changeConcursoModificacionClick);
        on(dom.byId("modificacionM"), "change", changeConcursoModificacionClick);
        on(dom.byId("cambioUbicacionM"), "click", cambiaUbicacionClick);
        on(dom.byId("normaActualM"), "change", changeCambiaNormaClick);
        on(dom.byId("normaAnteriorM"), "change", changeCambiaNormaClick);
        on(dom.byId("regiones"), "change", changeConcursoRegionesClick);
        on(dom.byId("calculaPoligono"), "click", clickCalculaPoligonoClick);
        on(dom.byId("generarMatrizCotas"), "click", clickGenerarMatrizCotas);
    });