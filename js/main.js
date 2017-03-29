var superView={};
var ajaxCall1 = {};
var ajaxCall2 = {};
var circleFunction;

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
			changeComboConcurso(data);
			setIndentificadorConcurso();
			if(data.features.length == 0){
				resetSelect('concursos', 'seleccione');
			}
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
		if(concursoC){
			var query3 = new Query();
			query3.returnGeometry = true;
			query3.outFields = ["IDENTIFICADOR"];
			query3.where = "CONCURSO='"+idConcurso+"' AND TIPO_SERVICIO = '"+idTipoServicio+"'";
			query3.orderByFields = ["IDENTIFICADOR"];
			queryTask2.execute(query3).then(function(data){
				changeListaIdentificadores(data.features);
				setIndentificadorConcurso();
				if(data.features.length == 0){
					resetSelect('concursos', 'seleccione');
				}
			});
		}
		if(modificacionM){
			var query3 = new Query();
			query3.returnGeometry = true;
			query3.outFields = ["IDENTIFICADOR"];
			query3.where = "REG='"+idRegion+"' AND TIPO_SERVICIO = '"+idTipoServicio+"'";
			query3.orderByFields = ["IDENTIFICADOR"];

			queryTask3.execute(query3).then(function(data){
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
			}
			if(modificacionM){
				concursoModificacion = "Modificacion";
				setComboRegion(false);
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
	
	function changeCantidadRadialesClick(){
		radiales8 = dom.byId("8radiales").checked;
		radiales18 = dom.byId("18radiales").checked;
		if(radiales8){
			set8Radiales();
		}
		if(radiales18){
			set18Radiales();
		}
	}
	
	function changeCambiaNormaClick(){
		setIndentificadorRegion();
	}
	
	function changeConcursoRegionesClick(){
		idRegion = dom.byId("regiones").value;
		idTipoServicio = getServiceType();
		var query3 = new Query();
		query3.returnGeometry = true;
		query3.outFields = ["IDENTIFICADOR"];
		query3.where = "REG="+idRegion+" AND TIPO_SERVICIO = '"+idTipoServicio+"'";
		query3.orderByFields = ["IDENTIFICADOR"];
		queryTask3.execute(query3).then(function(data){
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
			showLoader(true);
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
					setDataIdentificador(data.features[0].attributes, coords, 1);
					view.zoom = setZoom(data.features[0].attributes);
				});				

				var queryData = new Query();
				queryData.returnGeometry = true;
				queryData.outFields = ["*"];
				queryData.where = queryString;
				queryTask2.execute(queryData).then(function(data){
					superView.circulo = data;
					setDataIdentificador(data.features[0].attributes, coords, 1);
					view.zoom = setZoom(data.features[0].attributes);
				});
			}
			setPosicionTools();
			showLoader(false);
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
		var queryString = "IDENTIFICADOR='"+idIdentificador+"' AND TIPO_SERVICIO = '"+tipoServicio+"'";
		queryCenter.returnGeometry = true;
		queryCenter.outFields = ["*"];
		queryCenter.where = queryString;
		queryTask3.execute(queryCenter).then(function(data){
			showLoader(true);
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
					setDataIdentificador(data.features[0].attributes, coords, 2);
					view.zoom = setZoom(data.features[0].attributes);
				});
			}
			setPosicionTools();
			showLoader(false);
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
		showLoader(true);
		map.remove(capaCalculoPoligonos);
		var mapParametros = getMapParameters();
		geoProcessor = new Geoprocessor(gpCalculoPredictivo);
		var recomendacion = mapParametros.recomendacion;
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
		geoProcessor.submitJob(params).then(sendRequestPolygon, showError);
	}

	function setRadiansString(data){
		var radiales = "";
		if(data.radiales == 72){
			if(data.M72PL0 == undefined){
				return default72;
			}
			radiales += data.M72PL0 + ","
			radiales += data.M72PL5 + ","
			radiales += data.M72PL10 + ","
			radiales += data.M72PL15 + ","
			radiales += data.M72PL20 + ","
			radiales += data.M72PL25 + ","
			radiales += data.M72PL30 + ","
			radiales += data.M72PL35 + ","
			radiales += data.M72PL40 + ","
			radiales += data.M72PL45 + ","
			radiales += data.M72PL50 + ","
			radiales += data.M72PL55 + ","
			radiales += data.M72PL60 + ","
			radiales += data.M72PL65 + ","
			radiales += data.M72PL70 + ","
			radiales += data.M72PL75 + ","
			radiales += data.M72PL80 + ","
			radiales += data.M72PL85 + ","
			radiales += data.M72PL90 + ","
			radiales += data.M72PL95 + ","
			radiales += data.M72PL100 + ","
			radiales += data.M72PL105 + ","
			radiales += data.M72PL110 + ","
			radiales += data.M72PL115 + ","
			radiales += data.M72PL120 + ","
			radiales += data.M72PL125 + ","
			radiales += data.M72PL130 + ","
			radiales += data.M72PL135 + ","
			radiales += data.M72PL140 + ","
			radiales += data.M72PL145 + ","
			radiales += data.M72PL150 + ","
			radiales += data.M72PL155 + ","
			radiales += data.M72PL160 + ","
			radiales += data.M72PL165 + ","
			radiales += data.M72PL170 + ","
			radiales += data.M72PL175 + ","
			radiales += data.M72PL180 + ","
			radiales += data.M72PL185 + ","
			radiales += data.M72PL190 + ","
			radiales += data.M72PL195 + ","
			radiales += data.M72PL200 + ","
			radiales += data.M72PL205 + ","
			radiales += data.M72PL210 + ","
			radiales += data.M72PL215 + ","
			radiales += data.M72PL220 + ","
			radiales += data.M72PL225 + ","
			radiales += data.M72PL230 + ","
			radiales += data.M72PL235 + ","
			radiales += data.M72PL240 + ","
			radiales += data.M72PL245 + ","
			radiales += data.M72PL250 + ","
			radiales += data.M72PL255 + ","
			radiales += data.M72PL260 + ","
			radiales += data.M72PL265 + ","
			radiales += data.M72PL270 + ","
			radiales += data.M72PL275 + ","
			radiales += data.M72PL280 + ","
			radiales += data.M72PL285 + ","
			radiales += data.M72PL290 + ","
			radiales += data.M72PL295 + ","
			radiales += data.M72PL300 + ","
			radiales += data.M72PL305 + ","
			radiales += data.M72PL310 + ","
			radiales += data.M72PL315 + ","
			radiales += data.M72PL320 + ","
			radiales += data.M72PL325 + ","
			radiales += data.M72PL330 + ","
			radiales += data.M72PL335 + ","
			radiales += data.M72PL340 + ","
			radiales += data.M72PL345 + ","
			radiales += data.M72PL350 + ","
			radiales += data.M72PL355;
			return radiales;
		}
		if(data.radiales == 18){
			if(data.M18PL0 == undefined){
				return default18;;
			}
			radiales += data.M18PL0 + ","
			radiales += data.M18PL20 + ","
			radiales += data.M18PL40 + ","
			radiales += data.M18PL60 + ","
			radiales += data.M18PL80 + ","
			radiales += data.M18PL100 + ","
			radiales += data.M18PL120 + ","
			radiales += data.M18PL140 + ","
			radiales += data.M18PL160 + ","
			radiales += data.M18PL180 + ","
			radiales += data.M18PL200 + ","
			radiales += data.M18PL220 + ","
			radiales += data.M18PL240 + ","
			radiales += data.M18PL260 + ","
			radiales += data.M18PL280 + ","
			radiales += data.M18PL300 + ","
			radiales += data.M18PL320 + ","
			radiales += data.M18PL340;
			return radiales;
		}
		if(data.radiales == 8){
			if(data.M8PL0 == undefined){
				return default8;
			}
			radiales += data.M8PL0 + ","
			radiales += data.M8PL45 + ","
			radiales += data.M8PL90 + ","
			radiales += data.M8PL135 + ","
			radiales += data.M8PL180 + ","
			radiales += data.M8PL225 + ","
			radiales += data.M8PL270 + ","
			radiales += data.M8PL315;
			return radiales;
		}
	}

	function setDistanciaString(data){
		var distancias = "";
		distancias += data.DIS0 + ","
		distancias += data.DIS20 + ","
		distancias += data.DIS40 + ","
		distancias += data.DIS60 + ","
		distancias += data.DIS80 + ","
		distancias += data.DIS100 + ","
		distancias += data.DIS120 + ","
		distancias += data.DIS140 + ","
		distancias += data.DIS160 + ","
		distancias += data.DIS180 + ","
		distancias += data.DIS200 + ","
		distancias += data.DIS220 + ","
		distancias += data.DIS240 + ","
		distancias += data.DIS260 + ","
		distancias += data.DIS280 + ","
		distancias += data.DIS300 + ","
		distancias += data.DIS320 + ","
		distancias += data.DIS340;
		return distancias;
	}

	function sendRequestPolygon(data) {
		areaCalculo = 0;
		var jobId = data.jobId;
		var MAX_VALUE = 100000;
		geoProcessor.getResultData(jobId, "area").then(setPolygon, showError);
		geoProcessor.getResultData(jobId, "distancias").then(setDataReporteOut, showError);
	}

	function getStatus(data){

	}

	function showError(data){
		showErrorMessage(data);
		setPosicionTools();
		showLoader(false);
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
		showLoader(false);

	}

	function setDataReporteOut(data){
		setDataReporte(data);
	}

	function setZoom(value){
		return new Zoom().getZoom(value);
	}

	function imprimirCalculoClick(){
		var mapReporte = getParametersReport();
		if(concursoModificacion == 'Concurso'){
			getPDFConcurso(mapReporte);	
		} else {
			getPDFModificacion(mapReporte);
		}
		
	}

	function showDocument(data){
		showDocumentPopUp(data);
		setPosicionTools();
		showLoader(false);
	}

	function exportKMZClick(){
		showLoader(true);

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
		var circleGeometry = new Circulo([superView.punto.features[0].geometry.longitude, superView.punto.features[0].geometry.latitude],{
			"radius": 60000,
			geodesic: true
		  });

		circleGeometry.rings[0].map( x => {
			//result = toGeographic(x[0], x[1]);
			//poligono1 += result.x + "," + result.y + ",10 \n";
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

		var data = new Blob([ getTemplateKML(datos) ]);
		var a = URL.createObjectURL( data );
		var name = $("#identificadores").val();
		var link = document.createElement('a');
		link.style = 'position: fixed; left -10000px;'; // making it invisible
		link.href = a; //'data:application/octet-stream,' + encodeURIComponent(address); // forcing content type
		link.download = name.indexOf('.kml') < 0 ? name + '.kml' : name;
		/* file extension is very important! */
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		showLoader(false);
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
	on(dom.byId("imprimirCalculo"), "click", imprimirCalculoClick);
	on(dom.byId("exportarKMZ"), "click", exportKMZClick);

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

	function resetSelect(select_name) {
		$("#"+select_name).val('seleccione');
	}

	$('input[type="radio"][id="18PerdidasLobulos"]').change(function() {

		$("#calculaPoligono").text("Calcular Zona [18 radiales]");
    });

	$('input[type="radio"][id="72PerdidasLobulos"]').on('change',function() {
		$("#calculaPoligono").text("Calcular Zona [72 radiales]");
    });

	$('#pdfForm').on('click', function() {
		$("#openModal").load("form_pdf.html"); 
		$('#openModal').show();
	});
});