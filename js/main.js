var superView={};
var ajaxCall1 = {};
var ajaxCall2 = {};
var circleFunction;
var internal_token = 3;
var codigo = "";
var is_form_modal_first_openend = true;
var TIPO_SECCION = "";
var decimales_frecuencias = 0;

require(["esri/Map", "esri/Basemap", "esri/views/MapView", "esri/geometry/Circle",
		"esri/widgets/BasemapToggle", "esri/tasks/support/Query", "esri/tasks/QueryTask", 
		"esri/layers/FeatureLayer", "esri/tasks/Geoprocessor", "esri/tasks/support/JobInfo",
		"esri/Graphic", "esri/geometry/Point", "esri/geometry/Polyline", "esri/geometry/Polygon",
		"esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol",
		"esri/renderers/SimpleRenderer", "esri/tasks/PrintTask", "esri/tasks/support/PrintTemplate", 
		"esri/tasks/support/PrintParameters","esri/layers/GraphicsLayer","esri/widgets/Home", "dojo/dom",
  		"dojo/on","dojo/domReady!"],
function(Map, Basemap, MapView, Circulo, BasemapToggle, Query, QueryTask, FeatureLayer, Geoprocessor, JobInfo, 
		 Graphic, Point, Polyline, Polygon, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, 
		 SimpleRenderer, PrintTask, PrintTemplate, PrintParameters,GraphicsLayer,Home, dom, on) {

	internal_token = $("#id").val();
	codigo = $("#codigo").val();
	TIPO_SECCION = $("#seccion").val();
	
	var idConcurso = 0;
	var idIdentificador = 0;
	var idTipoServicio = 0;
	var concursoC = 0;
	var modificacionM = 0;
	var geoProcessor = null;
	var printTaskRepore  = null;
	var geoScriptExportarKMZ = null;
	var longitud = 0;
	var latitud = 0;
	var radiales8 = 0;
	var radiales18 =0;
	var areaCalculo = 0;
	var normaActual = true;
	var normaAnterior = false;
	var calculoZonaMaxima = false;
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

	var map = new Map({
	
		basemap : "topo"
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

	
	var identificador = "Identificadores3";
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
	var identificadores29 = `http://copahue.subtel.gob.cl:6080/arcgis/rest/services/Cobertura_Radio/${identificador}/MapServer/8`;
	//Zonas_Modificacion_1546mas_30p (10)
	var identificadores210 = `http://copahue.subtel.gob.cl:6080/arcgis/rest/services/Cobertura_Radio/${identificador}/MapServer/8`;
	//Zonas_Modificacion_370 (11)
	var identificadores211 = `http://copahue.subtel.gob.cl:6080/arcgis/rest/services/Cobertura_Radio/${identificador}/MapServer/8`;
	//Zonas_Modificacion_370_30p (12)
	var identificadores212 = `http://copahue.subtel.gob.cl:6080/arcgis/rest/services/Cobertura_Radio/${identificador}/MapServer/8`;
	
	var gpCalculoPredictivo = "http://copahue.subtel.gob.cl:6080/arcgis/rest/services/Cobertura_Radio/calculozona/GPServer/CalculoPredictivo72";
	var ptReporte = "http://copahue.subtel.gob.cl:6080/arcgis/rest/services/Cobertura_Radio/Imprimir/GPServer/Imprimir";
	var gpScriptExportarKMZ = "http://copahue.subtel.gob.cl:6080/arcgis/rest/services/Cobertura_Radio/ScriptExportarKMZ/GPServer/ScriptExportarKMZ/";
	var guardarDataCalculos = "http://copahue.subtel.gob.cl:6080/arcgis/rest/services/DDT/GuardarCalculos/GPServer/Modelo";
	var cargarListaCalculos = "http://copahue.subtel.gob.cl:6080/arcgis/rest/services/DDT/CargarInfoCalculos/GPServer/Modelo";
	var cargarDataCalculo = "http://copahue.subtel.gob.cl:6080/arcgis/rest/services/DDT/ObtenerDatosCalculos/GPServer/Modelo";
	var scriptCalculoPrueba = "http://copahue.subtel.gob.cl:6080/arcgis/rest/services/DDT/ModelPrueba2/GPServer/CalculoPredictivo72";
	var gpCalculoPredictivoCensal = "http://copahue.subtel.gob.cl:6080/arcgis/rest/services/Pruebas/CapaCensal/GPServer/CalculoPredictivo72";
	var gpCalculoMatrizCotas = "http://copahue.subtel.gob.cl:6080/arcgis/rest/services/Pruebas/Test2/GPServer/Test2";
	
	var queryTask1 = new QueryTask({ url: identificadores21 });
	var queryTask2 = new QueryTask({ url: identificadores22 });
	var queryTask3 = new QueryTask({ url: identificadores23 });
	var queryTask6 = new QueryTask({ url: identificadores26 });
	
	var queryConcursos = new Query();
	queryConcursos.returnGeometry = true;
	queryConcursos.outFields = ["NOMBRE, CONCURSO"];
	queryConcursos.where = "1=1";
	queryTask1.execute(queryConcursos).then(setComboConcursos);
	
	var view = new MapView({
		container : "viewDiv",
		map : map,
		zoom : 3,
		center : [ -70.6514212, -33.440616 ]
	});
	
	var homeWidget = new Home({
		view: view
	});
	
	view.ui.add(homeWidget, "top-left");
	
	homeWidget.on("click", function(event){
		goHome();
	});

	setDecimalesFrecuenciasValue();
	setDataCombosRegiones();

	function setDecimalesFrecuenciasValue() {
		console.log(TIPO_SECCION);
		if(TIPO_SECCION == 'digital') {
			decimales_frecuencias = 0;
		} else if (TIPO_SECCION == 'radiodifusion') {
			decimales_frecuencias = 1;
		} else if (TIPO_SECCION == 'servicios') {
			decimales_frecuencias = 3;
		}
	}

	function setDataCombosRegiones() {
		$.ajax({
			url: "/CalculoTVD/calculoTVD/regiones",
			type: 'GET',
			success: function(response) {
				var datos = response.resp;
				comunas = response.comunas;
				var arr = $.parseJSON(datos);
				arr.forEach(function(val){
					regiones.push(val);
				});
			},
			error: function(error) {
				console.log("error");
				console.log(error);
			}
		});

	}
	
	// Conversion de coordenadas de arcgis a geograficas reales
	function toGeographic(xMercator, yMercator) {
	    if (Math.abs(xMercator) < 180 && Math.abs(yMercator) < 90)
		   return null;
	    if ((Math.abs(xMercator) > 20037508.3427892) || (Math.abs(yMercator) > 20037508.3427892))
		   return null;
	    var x = xMercator;
	    var y = yMercator;
	    var w1 = x = x / 6378137.0;
	    var w2 = x * 57.295779513082323;
	    var w3 = Math.floor((x + 180.0) / 360.0);
	    x = w2 - (w3 * 360.0);
	    y = (1.5707963267948966 - (2.0 * Math.atan(Math.exp((-1.0 * y) / 6378137.0)))) * 57.295779513082323;
	    return {
		   x: x,
		   y: y
	    }
    }
		   
	function changeComboConcursoClick(){
		view.graphics.removeAll();
		removeDataConcurso();
		idConcurso = dom.byId("concursos").value;
		idIdentificador = 0;
		idTipoServicio = getServiceType();
		var query3 = new Query();
		query3.returnGeometry = true;

		query3.outFields = ["IDENTIFICADOR"];
		query3.where = "CONCURSO='"+idConcurso+"' AND TIPO_SERVICIO = '"+idTipoServicio+"'";
		query3.orderByFields = ["IDENTIFICADOR"];
		queryTask2.execute(query3).then(function(data){
			showLoader(true, 'Cargando Datos');
			triggerPerdidasLobulos();
			// $("#72PerdidasLobulos").trigger('click');
			changeComboConcurso(data);
			setIndentificadorConcurso();
			if(data.features.length == 0){
				resetSelect('concursos', 'seleccione');
			}
			showLoader(false, '');
		});
	}

	function getServiceType() {
    	var service_type = dom.byId("tipoServicio").value;
    	if(service_type == "" && concursoModificacion == 'Concurso') {
    		service_type = "ISDBT";
    		$("#tipoServicio").val('ISDBT');
    	} else if (service_type == "" && concursoModificacion == 'Modificacion') {
    		service_type = "VHF";
    		$("#tipoServicio").val('VHF');
    	}
    	return service_type;
    }
	
	function changeComboIdentificadorClick(){
		concursoC = dom.byId("concursoC").checked;
		modificacionM = dom.byId("modificacionM").checked;
		$("#pestanaTab3").hide();
		triggerPerdidasLobulos();
		// $("#18PerdidasLobulos").trigger('click');
		showLoader(true, '');
		if(concursoC){
			setIndentificadorConcurso();
		}
		if(modificacionM){
			setIndentificadorRegion();
		}
	}
	
	function changeComboTipoServicioClick(){
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

		if(concursoC){
			query3.where = "CONCURSO='"+idConcurso+"' AND TIPO_SERVICIO = '"+idTipoServicio+"'";
			queryTask2.execute(query3).then(function(data){
				// $("#18PerdidasLobulos").trigger('click');
				changeListaIdentificadores(data);
				setIndentificadorConcurso();
				if(data.features.length == 0){
					resetSelect('concursos', 'seleccione');
				}
			});
		}
		else if(modificacionM){
			query3.where = "REG="+idRegion+" AND TIPO_SERVICIO = '"+idTipoServicio+"'";
			queryTask3.execute(query3).then(function(data){
				// $("#18PerdidasLobulos").trigger('click');
				changeListaIdentificadores(data);
				setIndentificadorRegion();
				if(data.features.length == 0){
					resetSelect('regiones', '0');
				}
			});
		}
	}
	
	function changeConcursoModificacionClick(){
		concursoC = dom.byId("concursoC").checked;
		modificacionM = dom.byId("modificacionM").checked;
		if(validaCambiosCampos()){

			is_form_modal_first_openend = true;
			view.graphics.removeAll();
			map.removeAll();
			setCombosToStart(modificacionM);
			removeDataConcurso();
			if(concursoC){
				concursoModificacion = "Concurso";
				var query1 = new Query();
				query1.returnGeometry = true;
				query1.outFields = ["nombre, id_concurso"];
				query1.where = "1=1";
				queryTask1.execute(query1).then(setComboConcursos);
				setComboRegion(true);
				$("#verRadiales").prop("disabled", true);
				$("#label_zona_max").text("Zona de Servicio Máxima");
			}
			if(modificacionM){
				concursoModificacion = "Modificacion";
				setComboRegion(false);
				$("#verRadiales").prop("disabled", true);
				$("#label_zona_max").text("Zona de Servicio Mínima");
			}
		} else {
			if(concursoC){
				$("#modificacionM").prop("checked", true);
			}
			if(modificacionM){
				$("#concursoC").prop("checked", true);
			}
		}
	}
	
	function changeCambiaNormaClick(){
		// setIndentificadorRegion();
	}

	function triggerPerdidasLobulos() {
		if(TIPO_SECCION == "digital") {
			$("#72PerdidasLobulos").trigger('click');
		} else {
			$("#18PerdidasLobulos").trigger('click');
		}
	}
	
	function changeConcursoRegionesClick(){
		idRegion = dom.byId("regiones").value;
		idTipoServicio = getServiceType();
		var query3 = new Query();
		query3.returnGeometry = true;query3
		query3.outFields = ["IDENTIFICADOR"];
		query3.where = "REG="+idRegion+" AND TIPO_SERVICIO = '"+idTipoServicio+"'";
		query3.orderByFields = ["IDENTIFICADOR"];

		queryTask3.execute(query3).then(function(data){
			// $("#18PerdidasLobulos").trigger('click');
			changeListaIdentificadores(data);
			setIndentificadorRegion();
		});
	}
	
	function setIndentificadorConcurso(){
		var queryCenter = new Query();
		idIdentificador = dom.byId("identificadores").value;
		tipoServicio = dom.byId("tipoServicio").value;
		var queryString = "IDENTIFICADOR='"+idIdentificador+"' AND TIPO_SERVICIO = '"+tipoServicio+"'";
		var queryStringZona = "IDENTIFICADOR='"+idIdentificador+"'";
		queryCenter.returnGeometry = true;
		queryCenter.outFields = ["IDENTIFICADOR"];
		queryCenter.where = queryString;
		queryTask2.execute(queryCenter).then(function(data){
			// $("#18PerdidasLobulos").trigger('click');
			cargarCalculosGuardados(idIdentificador);
			// showLoader(true, 'Cargando Datos');
			map.removeAll();
			if(data.features.length == 0){
				removeDataConcurso();
			}else{
				longitud = data.features[0].geometry.x;
				latitud = data.features[0].geometry.y;
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
					renderer:concursoRenderer,
					definitionExpression: "IDENTIFICADOR='"+idIdentificador+"'"
				});
				
				map.add(radio);
				superView.pelota = radio;
				var queryData = new Query();
				queryData.returnGeometry = true;
				queryData.outFields = ["*"];
				queryData.where = queryString;
				queryTask2.execute(queryData).then(function(data){
					superView.punto = data;
					setDataIdentificador(data.features[0].attributes, coords, decimales_frecuencias);
					view.zoom = setZoom(data.features[0].attributes);
				});

				var queryData = new Query();
				queryData.returnGeometry = true;
				queryData.outFields = ["*"];
				queryData.where = queryString;
				queryTask2.execute(queryData).then(function(data){
					superView.circulo = data;
					setDataIdentificador(data.features[0].attributes, coords, decimales_frecuencias);
					view.zoom = setZoom(data.features[0].attributes);
				});
			}
			setPosicionTools();
			// showLoader(false, '');
		});
	}

	function setIndentificadorRegion(){
		var urlRadio1 = "";
		var urlRadio2 = "";
		if(dom.byId("normaActualM").checked){
			urlRadio1 = identificadores27;
			urlRadio2 = identificadores28;
		}
		if(dom.byId("normaAnteriorM").checked){
			urlRadio1 = identificadores211;
			urlRadio2 = identificadores212;
		}

		var queryCenter = new Query();
		idIdentificador = dom.byId("identificadores").value;
		tipoServicio = dom.byId("tipoServicio").value;
		cargarCalculosGuardados(idIdentificador);

		var queryString = "IDENTIFICADOR='"+idIdentificador+"' AND TIPO_SERVICIO = '"+tipoServicio+"'";
		queryCenter.returnGeometry = true;
		queryCenter.outFields = ["*"];
		queryCenter.where = queryString;
		queryTask3.execute(queryCenter).then(function(data){
			// $("#18PerdidasLobulos").trigger('click');
			showLoader(true, 'Cargando Datos');
			map.removeAll();
			if(data.features.length == 0){
				removeDataConcurso();
			}else{
				longitud = data.features[0].geometry.x;
				latitud = data.features[0].geometry.y;
				view.center = [longitud, latitud];
				var coordsPoint = new GeoPoint(longitud, latitud);
				var coords = [coordsPoint.lonDeg, coordsPoint.latDeg]
				pointRegion = new FeatureLayer({
					url: identificadores23,
					definitionExpression: queryString
				});
				map.add(pointRegion); 
				var radio1 = new FeatureLayer({
					url: urlRadio1,
					renderer:modificacionRenderer,
					definitionExpression: "IDENTIFICADOR='"+idIdentificador+"'"
				});
				map.add(radio1);

				var ajaxCall1 = new XMLHttpRequest();
				ajaxCall1.addEventListener("load", function(datLoad) {
					eval("datosExtraidos = " + ajaxCall1.response);
					superView.zonaMaxima1 = datosExtraidos.features[0].geometry;
				});

				ajaxCall1.open("GET", urlRadio1 + "/" + `query?f=json&where=IDENTIFICADOR%3D%27${idIdentificador}%27&returnGeometry=true`); 
				ajaxCall1.send();

				var radio2 = new FeatureLayer({
					url: urlRadio2,
					renderer:concursoRenderer,
					definitionExpression: "IDENTIFICADOR='"+idIdentificador+"'"
				});
				map.add(radio2);

				var ajaxCall2 = new XMLHttpRequest();
				ajaxCall2.addEventListener("load", function(datLoad) {
					eval("datosExtraidos = " + ajaxCall2.response);
					superView.zonaMaxima2 = datosExtraidos.features[0].geometry;
				});

				ajaxCall2.open("GET", urlRadio2 + "/" + `query?f=json&where=IDENTIFICADOR%3D%27${idIdentificador}%27&returnGeometry=true`); 
				ajaxCall2.send();

				var queryData = new Query();
				queryData.returnGeometry = true;
				queryData.outFields = ["*"];
				queryData.where = queryString;
				queryTask3.execute(queryData).then(function(data){
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

	function cambiaUbicacionClick(){
		nuevaCoordenada = true;
		cursorCross();
		view.on("click", obtieneNuevaCoordenada);
	}

	function obtieneNuevaCoordenada(event){
		if(nuevaCoordenada){
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
			var coordsPoint = new GeoPoint( longitud, latitud);
			var coords = [coordsPoint.lonDeg, coordsPoint.latDeg];
			setPuntoCoordenadas(coords);
			nuevaCoordenada = false;
			cursorDefault();
		}
	}
	function cambiaNuevaCoordenada(latitud,longitud){
		map.remove(capaCalculoPuntos);
		var point = new Point({
			longitude: longitud,
			latitude: latitud
		});
		var newPointGraphic = new Graphic({
			geometry: point,
			symbol: markerSymbolUbicacion
		});

		capaCalculoPuntos = new GraphicsLayer({
			graphics: [newPointGraphic]
			});
		map.add(capaCalculoPuntos);
	}

	function clickCalculaPoligonoClick(){
		showLoader(true, 'Calculando Zona de Propagación');
		map.remove(capaCalculoPoligonos);
		var mapParametros = getMapParameters();
		geoProcessor = new Geoprocessor(gpCalculoPredictivoCensal);
		// geoProcessor = new Geoprocessor(scriptCalculoPrueba);
		
		var recomendacion = mapParametros.recomendacion;
		/*PROBABLEMENTE ESTÉ DEPRECADO*/
		if(calculoZonaMaxima && dom.byId("normaAnteriorM").checked){
			var recomendacion = '370';
		}
		cambiaNuevaCoordenada(mapParametros.latitud,mapParametros.longitud);

		superView.puntoNuevo = {"longitud": mapParametros.longitud, "latitud": mapParametros.latitud };
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
        // console.log(params);
		geoProcessor.submitJob(params).then(sendRequestPolygon, showError);
	}

	function clickGenerarMatrizCotas(){
		// showLoader(true, 'Generando Matriz de Cotas');
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

	function setRadiansString(data){
		var radiales = "";
		if(data.radiales == 72){
			if(data.M72PL0 == undefined){
				return default72;
			}
			for(var ix=0; ix < 71; ix++) {
				radiales += data["M72PL"+(ix*5)] + ",";
			}
			radiales += data.M72PL355;
			return radiales;
		}
		if(data.radiales == 18){
			if(data.M18PL0 == undefined){
				return default18;
			}
			for(var ix=0; ix < 17; ix++) {
				radiales += data["M18PL"+(ix*20)] + ",";
			}
			radiales += data.M18PL340;
			return radiales;
		}
		if(data.radiales == 8){
			if(data.M8PL0 == undefined){
				return default8;
			}
			for(var ix=0; ix < 7; ix++) {
				radiales += data["M8PL"+(ix*45)] + ",";
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
	}

	function sendRequestCotas(data) {
		var jobId = data.jobId;
		var MAX_VALUE = 100000;
		geoProcessor.getResultData(jobId, "nube").then(getDataNube, showError);
	}

	function showError(data){
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

	function getDataNube(data) {
		var fields = data.value.features;
		var csv_data = ["angulo", "distancia", "Z"];
		var dataString = [];

		fields.forEach(function(value, index){
			var value_Z = value.attributes.Z.toString().replace(".", ",");
			dataString.push({
				"Angulo": value.attributes.angulo,
				"distancia": value.attributes.distancia,
				"Z" : "\""+value_Z+ "\""
			});
		});

		downloadCSV(dataString);
	}

	function setPolygon(data){
		var polygonGraphic1 = null;
		var polygonGraphic2 = null;
		areaCalculo = redondea(Number(data.value.features[0].attributes.area),2);

		if(calculoZonaMaxima){
			map.removeAll();
			map.add(pointRegion);
			polygonGraphic1 = new Graphic({
			   geometry: data.value.features[0].geometry,
			   symbol: fillSymbolModificacion
			});
			polygonGraphic2 = new Graphic({
			   geometry: data.value.features[1].geometry,
			   symbol: fillSymbolConcurso
			});
			layerGraphicsMax = new GraphicsLayer({
				graphics: [polygonGraphic1,polygonGraphic2]
			});
			map.add(layerGraphicsMax);
			superView.concurso = polygonGraphic2;
		}else{
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
		calculoZonaMaxima = false;
		setPosicionTools();
		showLoader(false, '');

	}

	function setDataReporteOut(data){
		setDataReporte(data);
	}

	function setZoom(value){
		return new Zoom().getZoom(value);
	}

	function imprimirCalculoClick(download){
		var pdfDocGenerator = getPDFFile();
		var pdf_name = getFileName($("#identificadores").val(), form_data.carac_tecnicas.sist_radiante, $("#intensidadCampoM").val());
		pdfDocGenerator.download(pdf_name + '.pdf');
	}

	function getPDFFile() {
		var mapReporte = getParametersReport();
		var form_pdf_data = getFormData(concursoModificacion);
		var pdfDocGenerator;
		if(concursoModificacion == 'Concurso'){
			pdfDocGenerator = getPDFConcurso(mapReporte, form_pdf_data);
		} else {
			pdfDocGenerator = getPDFModificacion(mapReporte, form_pdf_data);
		}
		return pdfDocGenerator;
	}

	function getPDFBase64File(kml_base64) {
		var pdfDocGenerator = getPDFFile();
		var pdf_base64_file;
		pdfDocGenerator.getBase64(function(data){
			pdf_base64_file = data;
			sendBase64Files(kml_base64, data);
		})
	}

	function sendBase64Files(kml_base64, pdf_base64) {
		var files_names = getFileName($("#identificadores").val(), $("#sistRadiante").val(), $("#intensidadCampoM").val());
		var id_tipo_calculo = getIdTipoCalculo($("#intensidadCampoM").val());
		var json_kml = createJSON(files_names+".kml", kml_base64, id_tipo_calculo);
		var json_pdf = createJSON(files_names+".pdf", pdf_base64, id_tipo_calculo);
		data = {"usuario_id": parseInt(internal_token), "codigo_postulacion": codigo, "kml": JSON.stringify(json_kml), "pdf": JSON.stringify(json_pdf)};
		$.ajax({
			data: data,
			url: "/CalculoTVD/calculoTVD/send_file",
			type: 'POST',
			success: function(response) {
				if(response === "OK") {
					alert("Datos Enviados Correctamente");
				} else {
					alert("Error Enviando Datos: "+ response);
				}
			},
			error: function(error) {
				console.log("error");
				console.log(error);
			}
		});
	}

	function getIdTipoCalculo(intensidad_campo) {
		var id_tipo_calculo = 0;
		if(zone_service_intensity == intensidad_campo) {
	        id_tipo_calculo = 1;
	    } else if(zone_hedge_intensity == intensidad_campo) {
	        id_tipo_calculo = 2;
	    } else if(zone_urban_intensity == intensidad_campo) {
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

	function showDocument(data){
		showDocumentPopUp(data);
		setPosicionTools();
		showLoader(false, '');
	}

	function exportKMZClick(download){

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
			outputSize:[800, 1100],
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
				"zonaMaximaServicio":"",
				"zonaMaximaExistente":"",
				"":""
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
		datos.general.nombre = getKMLNameSite(form_data.intensidadCampoM);

		var poligono1="";
		var poligono2="";
		var poligonoM1="";
		var poligonoM2="";
		var poligonoMaxZone="";
		var ubicacion = {x: superView.punto.features[0].geometry.longitude, 
						 y: superView.punto.features[0].geometry.latitude};
		var circleGeometry = new Circulo([superView.puntoNuevo.longitud, superView.puntoNuevo.latitud],{
			"radius": 60000,
			geodesic: true
		  });

		circleGeometry.rings[0].map( x => {
			poligono1 += x[0] + "," + x[1] + ",10 \n";
		});

		var circleMaxZone = new Circulo([superView.punto.features[0].geometry.longitude, superView.punto.features[0].geometry.latitude],{
			"radius": radioMaximo*1000,
			geodesic: true
		  });

		circleMaxZone.rings[0].map( x => {
			poligonoMaxZone += x[0] + "," + x[1] + ",10 \n";
		});

		if ( superView.zonaMaxima1!=null ) {
			superView.zonaMaxima1.rings[0].map( x => {
				//result = toGeographic(x[0], x[1]);
				poligonoM1 += x[0] + "," + x[1] + ",10 \n";
			});
		}
		if ( superView.zonaMaxima2!=null ) {
			superView.zonaMaxima2.rings[0].map( x => {
				//result = toGeographic(x[0], x[1]);
				poligonoM2 += x[0] + "," + x[1] + ",10 \n";
			});
		}

		superView.zonaPropuesta.geometry.rings[0].map( x => {
			result = toGeographic(x[0], x[1]);
			poligono2 += result.x + "," + result.y + ",10 \n";
	    });

		datos.poligonos.zonaServicio = poligono2;
		datos.poligonos.zonaRestriccionServicio = poligono1;
		datos.poligonos.zonaMaxima = poligonoMaxZone;
		datos.poligonos.zonaMaximaExistente = poligonoM1;
		datos.poligonos.zonaMaximaExistenteExtendida = poligonoM2;
		datos.puntos.existente.longitud = ubicacion.x;
		datos.puntos.existente.latitud = ubicacion.y;
		datos.puntos.nuevo.longitud = superView.puntoNuevo.longitud;
		datos.puntos.nuevo.latitud = superView.puntoNuevo.latitud;

		var kml = getTemplateKML(datos);
		var data = new Blob([ kml ]);
		var encodedData = window.btoa(kml);

		if(download == true) {
			var a = URL.createObjectURL( data );
			var name = $("#identificadores").val();
			var name2 = getFileName($("#identificadores").val(), $("#sistRadiante").val(), $("#intensidadCampoM").val())
			var link = document.createElement('a');
			link.style = 'position: fixed; left -10000px;'; // making it invisible
			link.href = a; //'data:application/octet-stream,' + encodeURIComponent(address); // forcing content type
			// link.download = name.indexOf('.kml') < 0 ? name + '.kml' : name;
			link.download = name2 + ".kml";
			/* file extension is very important! */
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
			if(index == 0) {
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

		if(id_calculo == '0') {
			nombre_save = prompt("Ingrese Nombre del Cálculo", "");
		} else {
			nombre_save = prompt("Ingrese Nombre del Cálculo", nombre_select);
		}

		if(nombre_save != nombre_select) {
			id_calculo = '0'
		}

		if(nombre_save != null) {
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

	function getStatus(data){
		showLoader(false, '');
		if(data.value.status == 'saved') {
			alert("Datos Guardados Correctamente");
			updateComboSelectCalculos(data.value);
		} else if(data.value.status == 'updated') {
			alert("Datos Modificados Correctamente");
		} else if(data.value.status == 'usuario no existe') {
			alert("Error: usuario no existe");
		}
	}

	function updateComboSelectCalculos(value) {
		var selectCalculos = $("#selectCalculos");
		selectCalculos.append(new Option(value.nombre, value.mongo_id));
		$('#selectCalculos option[value='+value.mongo_id+']').attr('selected','selected');
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
		$("#"+radiales+"PerdidasLobulos").trigger('click');

		var perdidas_aux = {};
		for(var ix = 0; ix < radiales; ix++){
			var texto = "M"+radiales+"PL"+(ix*grades)
			perdidas_aux[texto] = datos[texto];
		}
		setDataByRadialIndex(radiales, perdidas_aux);
	}

	function setDataByRadialIndex(radiales, perdidas_aux) {
		if(radiales == 8) {
			perdidasLobulos8Map = perdidas_aux;
		} else if (radiales == 18) {
			perdidasLobulos18Map = perdidas_aux;
		} else if(radiales == 72) {
			perdidasLobulos72Map = perdidas_aux;
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
	// on(dom.byId("imprimirCalculo"), "click", imprimirCalculoClick);
	// on(dom.byId("exportarKMZ"), "click", exportKMZClick);

	$("#exportarKMZ").on('click', function(){
		showLoader(true, 'Generando Archivo KML');
		exportKMZClick(true);
	});

	$("#imprimirCalculo").on('click', function(){
		imprimirCalculoClick(true);
	});

	$("#frecuenciaM").on('change', function(){

		var value = this.value;
		if(value == ""){
			this.value = "0";
		} else {
			value = value.replace(",", ".");
			this.value = Math.round(value);
		}
	});

	$("#potenciaM").on('change', function(){

		var value = this.value;
		if(value == ""){
			this.value = "0";
		}
	});

	function getKMLNameSite(intensidad){
		var name = "";
		if(intensidad == "48") {
			name = "CalculoZonaServicio";
		} else if (intensidad == "40") {
			name = "CalculoZonaCobertura";
		} else if(inteisdad = "55") {
			name = "CalculoContornoUrbano";
		}

		return name;
	}

	function resetSelect(select_name, new_value) {
		$("#"+select_name).val(new_value);
	}

	$('input[type="radio"][id="8PerdidasLobulos"]').on('change',function() {
		$("#calculaPoligono").text("Calcular Zona [8 radiales]");
    });

    $('input[type="radio"][id="18PerdidasLobulos"]').on('change',function() {
		$("#calculaPoligono").text("Calcular Zona [18 radiales]");
    });

	$('input[type="radio"][id="72PerdidasLobulos"]').on('change',function() {
		$("#calculaPoligono").text("Calcular Zona [72 radiales]");
    });

	$('#pdfForm').on('click', function() {
		if(is_form_modal_first_openend){
			$("#openModal").load("form_pdf.jsp", function(){
				showDatosGenerales(concursoModificacion);
				setSelectRegiones(regiones, comunas);
			});
			is_form_modal_first_openend = false;
		}

		$('#openModal').show();
	});

	$('#saveMongoData').on('click', function() {
		var mapParametros = getMapParameters();
		var calculos_guardados = $("#selectCalculos").val();
	    preparedDataCalculosTVD();
	});

	$("#selectCalculos").on('change', function() {
		var id = $(this).val();
		if(id != '0') {
			ObtenerDatosCalculos(id);
		}
	});

	$("#frame18PerdidasLobulos input, #frame72PerdidasLobulos input").on('change', function(event) {
		console.log("A");
		var id_target = event.target.id;
		if($("#"+id_target).val() == '' || typeof $("#"+id_target).val() == undefined){
			$("#"+id_target).val(0);
		}
	});

	$(".number_input" ).keypress(function(evt) {
	    var code = evt.which;
	    if((code > 47 && code < 58) || code == 0 || code == 8 || code == 46) {
	        return true
	    } else {
	        evt.preventDefault();
	    }
	});

	$("#enviarCalculosCNTV").on('click', function(){
		var id_calculo = $("#selectCalculos option:selected").val();
		var nombre_select = getCalculoName();
		var idIdentificador = $("#identificadores option:selected").text();
		var mapParametros = getParametersReport();

		mapParametros['form_data'] = form_data;
		mapParametros['form_general_modificacion'] = form_general_modificacion;
		mapParametros['form_general_concurso'] = form_general_concurso;

		$("#longitudI").val($("#longitudGradosM").val() + "° "+ $("#longitudMinutosM").val() + "' " + $("#longitudSegundosM").val() + "''");
		$("#latitudI").val($("#latitudGradosM").val() + "° "+ $("#latitudMinutosM").val() + "' " + $("#latitudSegudosM").val() + "''");
		var longitudGMS = ComponeCoordenadaNumero($("#longitudGradosM").val(),$("#longitudMinutosM").val(),$("#longitudSegundosM").val());
		var latitudGMS = ComponeCoordenadaNumero($("#latitudGradosM").val(),$("#latitudMinutosM").val(),$("#latitudSegudosM").val());
		mapParametros["longitud"] = longitudGMS;
		mapParametros["latitud"] = latitudGMS;
		mapParametros["canal"] = getCanal();
		showLoader(true, 'Guardando Informacion');
		guardarCalculoDefinitivo(nombre_select, mapParametros, id_calculo, idIdentificador, codigo);
	});

	$("#upload18").on('click', function(event){
	    event.preventDefault();
	    $("#file18:hidden").trigger('click');
	});

	$("#upload72").on('click', function(event){
	    event.preventDefault();
	    $("#file72:hidden").trigger('click');
	});

	$("#file18").change(function(event) {
		var file_extension = $("input#file18").val().split(".").pop().toLowerCase();
	    rellenarPerdidasLobulo(event, file_extension, 'I18PL', 'file18');
	});

	$("#file72").change(function(event) {
		var file_extension = $("input#file72").val().split(".").pop().toLowerCase();
	    rellenarPerdidasLobulo(event, file_extension, 'I72PL', 'file72');
	});

	function rellenarPerdidasLobulo(event, file_extension, tabla_perdidas, input_file) {
		if (event.target.files != undefined) {
    		var fileInput = document.getElementById(input_file)
    		var fileReader = new FileReader();
    		var file = fileInput.files[0];

	        if(file_extension == 'xlsx') {
	        	rellenarPerdidasLobuloByXLSX(file, fileReader, tabla_perdidas);
	        } else if(file_extension == 'csv') {
	        	rellenarPerdidasLobuloByCSV(file, fileReader, tabla_perdidas);
	        }
    	} else {
    		console.log("Error obteniendo archivo");
    	}
	}

	function rellenarPerdidasLobuloByXLSX(file, fileReader, tabla_perdidas) {
		fileReader.onload = function (e) {
		    var binary = "";
		    var bytes = new Uint8Array(e.target.result);
		    var length = bytes.byteLength;

		    for (var i = 0; i < length; i++) {
		      binary += String.fromCharCode(bytes[i]);
		    }

		    var woorkbook = XLSX.read(binary, {type: 'binary', cellDates:true, cellStyles:true});

		    woorkbook.SheetNames.forEach(function(sheetName){
	            var xlsx_row_object = XLSX.utils.sheet_to_row_object_array(woorkbook.Sheets[sheetName]);
	            xlsx_row_object.forEach(function(row){
	            	if(!$.isNumeric(row["P Lóbulo"])) {
	            		alert("El valor de P. Lóbulo en el Az°: "+row["Az°"]+ " no es un valor numérico.");
	            		throw BreakException;
	            	} else {
	            		$("#"+tabla_perdidas+row["Az°"]).val(row["P Lóbulo"]);
	            	}
	            });

	            var json_object = JSON.stringify(xlsx_row_object);
	        });
	  	};

	  	fileReader.readAsArrayBuffer(file);
	}

	function rellenarPerdidasLobuloByCSV(file, fileReader, tabla_perdidas) {
		fileReader.onload = function () {
	    	var csv_data = fileReader.result.split("\n");

	    	csv_data.forEach(function(row) {
	    		row_data = row.split(";");
				if(!$.isNumeric(row_data[1])) {
            		alert("El valor de P. Lóbulo en el Az°: "+row_data[0]+ " no es un valor numérico.");
            		throw BreakException;
            	} else {
            		$("#"+tabla_perdidas+row_data[0]).val(row_data[1]);
            	}
	    	});
	    };
	    fileReader.readAsBinaryString(file);
	}

	function getCanal() {
		var tipo_concurso = "";
		if(concursoModificacion == 'Concurso'){
			tipo_concurso = "digital";
		} else if (concursoModificacion == 'Modificacion') {
			tipo_concurso = "analogo";
		}
		var canal = getCanalByFrecuencia(tipo_concurso,$("#frecuenciaM").val());
		return canal;
	}

	function getCalculoName() {
		var d = new Date();
		var n = d.getTime();
		var nombre_select = $("#selectCalculos option:selected").text();
		if(nombre_select == "...") {
			nombre_select = "CalculoDefinitivo" + n;
		}

		return nombre_select;
	}

	function generateBase64Files() {
		var kml_base64 = exportKMZClick(false);
		getPDFBase64File(kml_base64);
	}

	function guardarCalculoDefinitivo(nombre, mapParametros, id_calculo, idIdentificador, codigo) {
		if(validate_data(mapParametros)) {
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

	function validate_data(mapParametros) {
		var sistema_radiante = mapParametros['form_data'].carac_tecnicas.sist_radiante;
		if(mapParametros["canal"] == "[N/A]") {
			alert("Frecuencia del canal incorrecta");
			return false;
		}
		else if(sistema_radiante === "sistRadiantePrinc" && mapParametros['form_data'].estudio_principal.regionName === "") {
			alert("Debe seleccionar la Región de la Planta Principal");
			return false;
		}
		else if(sistema_radiante === "sistRadiantePrinc" && mapParametros['form_data'].estudio_principal.comunaName === "") {
			alert("Debe seleccionar la Comuna de la Planta Principal");
			return false;
		}
		else if((sistema_radiante === "sistRadianteAdic1" || sistema_radiante === "sistRadianteAdic2") && mapParametros['form_data'].estudio_alternativo.regionName === "") {
			alert("Debe seleccionar la Región de la Planta Adicional");
			return false;
		}
		else if((sistema_radiante === "sistRadianteAdic1" || sistema_radiante === "sistRadianteAdic2") && mapParametros['form_data'].estudio_alternativo.comunaName === "") {
			alert("Debe seleccionar la Región de la Planta Adicional");
			return false;
		}
		else if(mapParametros['form_data'].carac_tecnicas.antena_combi == "") {
			alert("Debe seleccionar una opción de 'Antena Combinada'");
			return false;
		}
		else if(mapParametros['form_data'].carac_tecnicas.tipo_antena == "") {
			alert("Debe seleccionar una opción de 'Tipo de Antena'");
			return false;	
		}
		else if(mapParametros['form_data'].carac_tecnicas.num_elem == "" || isNaN(mapParametros['form_data'].carac_tecnicas.num_elem)) {
			alert("El N° de Elementos Debe ser cero o mayor que cero");
			return false;	
		}
		else if(mapParametros['form_data'].carac_tecnicas.perc_horizontal == "" || mapParametros['form_data'].carac_tecnicas.perc_vertical == "") {
			alert("Faltan valores en 'Polarización'");
			return false;	
		}
		else if(mapParametros['form_data'].carac_tecnicas.regionPTx == "") {
			alert("Debe seleccionar una Región en el Sistema Radiante");
			return false;
		}
		else if(mapParametros['form_data'].carac_tecnicas.comunaPTx == "") {
			alert("Debe seleccionar una Comuna en el Sistema Radiante");
			return false;
		}
		else if(mapParametros['form_general_concurso'].plazos.ini_obras == ""){
			alert("Debe ingresar 'Inicio de Obras'");
			return false;
		}
		else if(mapParametros['form_general_concurso'].plazos.tipo_emision == ""){
			alert("Debe ingresar 'Tipo de Emision'");
			return false;
		}
		else if(mapParametros['form_general_concurso'].plazos.fin_obras == ""){
			alert("Debe ingresar 'Término de Obras'");
			return false;
		}
		else if(mapParametros['form_general_concurso'].plazos.ini_serv == ""){
			alert("Debe ingresar 'Inicio de Servicio'");
			return false;
		}
		else {
			return true;
		}
	}
 
    function convertArrayOfObjectsToCSV(args) {
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;
 
        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }
 
        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';
 
        keys = Object.keys(data[0]);
        result = 'sep=' + columnDelimiter;
        result += lineDelimiter;
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;
 
                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }
 
    function downloadCSV(stockData) {
        var data, filename, link;
        var csv = convertArrayOfObjectsToCSV({
            data: stockData
        });

        if (csv == null) return;
 
        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        
        data = encodeURI(csv);
        var encodedUri = encodeURI(csv);
		var downloadLink = document.createElement("a");
		downloadLink.href = encodedUri;

		var date = new Date();
		var hour = date.getHours() + 1;
		var min = date.getMinutes();
		downloadLink.download = "Export_Output_"+hour+""+min+".csv";

		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
    }
});