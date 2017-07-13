var botonHerramientasShow = false;
var potenciaM = 0;
var gananciaM = 0;
var frecuenciaM = 0;
var intensidadCampoM = 0;
var alturaAntenaTransmisoraM = 0;
var latitudM = 0;
var longitudM = 0;
var perdidasCablesConectoresM = 0;
var divisorPotenciaM = 0;
var otrasPerdidasM = 0;
var ZS0M = 0; 
var ZS120M = 0;
var ZS240M = 0;
var ZS20M = 0;
var ZS140M = 0;
var ZS260M = 0;
var ZS40M = 0;
var ZS160M = 0;
var ZS280M = 0;
var ZS60M = 0;
var ZS180M = 0;
var ZS300M = 0;
var ZS80M = 0;
var ZS200M = 0;
var ZS320M = 0;
var ZS100M = 0;
var ZS220M = 0;
var ZS340M = 0;
var concurso = true;
var recomendacion = 0;
var interpola = false;
var radiales = 0;
var numeroRadiales = 0;
var radiales72="";
var perdidasLobulos72Map = {};
var perdidasLobulos18Map = {};
var perdidasLobulos8Map = {};
var radiales18Map = {};
var radiales72Map = {};
var distanciaKilometros = {};
var twenty = 20;
var fortyFive = 45;
var five = 5;
var plCheckActual = 0;
var radialesCalculo = 0;
/*Parametros avanzados*/
var alturaAntenaRx = 2;
var obstaculosCircundantesTx = 20;
var obstaculosCircundantesRx = 20;
var toleranciaZonasSombras = 20;
var resolucionCalculo = 500;
var porcentajeTiempo = 50;
var porcentajeUbicacion = 50;

$(document).ready(function() {
	removeDataConcurso();
	$(function(){
		$("#caltool").draggable({ containment: "#viewDiv", scroll: false });
	});
	$(function() {
		$("#tabdatos").tabs({ 
			active: 0 
		});
	});
	$("#botonHerramientas").click(function() {
		if(botonHerramientasShow){
			$("#caltool").hide("drop");
			botonHerramientasShow = false;
		}else{
			$("#caltool").css("top", "15px");
			$("#caltool").css("left", "55px");
			$("#caltool").show("drop", {}, 500, callback);
			botonHerramientasShow = true;
		}
	});

	$("#closeImage8").click(function() {
		$("#frame8PerdidasLobulos").hide();
		$("#curtainCaltool").hide();
	});

	$("#closeImage18").click(function() {
		$("#frame18PerdidasLobulos").hide();
		$("#curtainCaltool").hide();
	});

	$("#closeImage72").click(function() {
		$("#frame72PerdidasLobulos").hide();
		$("#curtainCaltool").hide();
	});

	$("#show72PerdidasLobulos").click(function() {
		$("#72PerdidasLobulos").prop("checked", true);
		$("#calculaPoligono").text("Calcular Zona [72 radiales]");
		var interpola72 = null;
		if(plCheckActual == 8)
			interpola72 = interpola_8_to_72(perdidasLobulos8Map);
		if(plCheckActual ==18)
			interpola72 = interpola_18_to_72(perdidasLobulos18Map);
		set72PerdidasLobulos(interpola72);
		$("#frame72PerdidasLobulos").show();
		$("#curtainCaltool").show();
		plCheckActual = 72;
	});

	$("#show18PerdidasLobulos").click(function() {
		$("#18PerdidasLobulos").prop("checked", true);
		$("#calculaPoligono").text("Calcular Zona [18 radiales]");
		var interpola18 = null;
		if(plCheckActual == 8)
			interpola18 = interpola_8_to_18(perdidasLobulos8Map);
		if(plCheckActual == 72)
			interpola18 = interpola_72_to_18(perdidasLobulos72Map);
		set18PerdidasLobulos(interpola18);
		$("#frame18PerdidasLobulos").show();
		$("#curtainCaltool").show();
		plCheckActual = 18;
	});

	$("#show8PerdidasLobulos").click(function() {
		$("#8PerdidasLobulos").prop("checked", true);
		var interpola8 = null;
		if(plCheckActual == 18)
			interpola8 = interpola_18_to_8(perdidasLobulos18Map);
		if(plCheckActual == 72)
			interpola8 = interpola_72_to_8(perdidasLobulos72Map);
		set8PerdidasLobulos(interpola8);
		$("#frame8PerdidasLobulos").show();
		$("#curtainCaltool").show();
		plCheckActual = 8;
	});

	$("#save72PerdidasLobulosButton").click(function() {
		save72PerdidasLobulos();
		$("#curtainCaltool").hide();
	});

	$("#save18PerdidasLobulosButton").click(function() {
		save18PerdidasLobulos();
		$("#curtainCaltool").hide();
	});

	$("#save8PerdidasLobulosButton").click(function() {
		save8PerdidasLobulos();
		$("#curtainCaltool").hide();
	});

	$("#closeImage1").click(function() {
		$("#caltool").hide("drop");
		botonHerramientasShow = false;
	});
	$("#verRadiales").click(function() {

		$("#curtainCaltool").show();
		setFrameRadiales();
		if(numeroRadiales == 18)
			$("#frame18Radiales").show();
		if(numeroRadiales == 72)
			$("#frame72Radiales").show();
	});
	$("#closeImage18Radiales").click(function() {
		$("#frame18Radiales").hide();
		$("#curtainCaltool").hide();
	});
	$("#closeImage72Radiales").click(function() {
		$("#frame72Radiales").hide();
		$("#curtainCaltool").hide();
	});
	$("#closeImageDK8").click(function() {
		$("#distanciaKilometro8").hide();
		$("#curtainCaltool").hide();
	});
	$("#closeImageDK18").click(function() {
		$("#distanciaKilometro18").hide();
		$("#curtainCaltool").hide();
	});
	$("#closeImageDK72").click(function() {
		$("#distanciaKilometro72").hide();
		$("#curtainCaltool").hide();
	});
	$("#72PerdidasLobulos").prop("checked", true);
	$("#concursoC").prop("checked", true);
	$("#recomendacion option:eq(3)").attr("selected", "selected");
	$("#verDistancia").click(function() {
		setDistanciasKilometros();
		$("#distanciaKilometro"+radialesCalculo).show();
		// $("#curtainCaltool").show();
	});
	$("#verRadiales").prop("disabled", true);
	$("#opcionesAvanzadasButton").click(function(){
		$("#opcionesAvanzadas").show();
		$("#curtainCaltool").show();
		setOpcionesAvanzadas();
	});
	$("#closeImageOA").click(function() {
		$("#opcionesAvanzadas").hide();
		$("#curtainCaltool").hide();
	});
	$("#omni8").click(function(){
		setOmni();
	})
	$("#omni18").click(function(){
		setOmni();
	})
	$("#omni72").click(function(){
		setOmni();
	})
	$("#saveParametrosAvanzadosButton").click(function(){
		saveParametrosAvanzados();
	});

	init();
});

function init(){
	setOmni();
}

function cursorCross(){
	$("#msgbox").show();
	$("#caltool").css("cursor","default");
	$("#viewDiv").css("cursor","crosshair");
}
function cursorDefault(){
	$("#msgbox").hide();
	$("#viewDiv").css("cursor","default");
}

function setOpcionesAvanzadas(){
	$("#obstaculosCircundantesTx").val(obstaculosCircundantesTx);
    $("#obstaculosCircundantesRx").val(obstaculosCircundantesRx);
    $("#toleranciaZonasSombras").val(toleranciaZonasSombras);
    $("#resolucionCalculo").val(resolucionCalculo);
    $("#porcentajeTiempo").val(porcentajeTiempo);
    $("#porcentajeUbicacion").val(porcentajeUbicacion);
	$("#alturaAntenaRx").val(alturaAntenaRx);
}

function saveParametrosAvanzados(){
	obstaculosCircundantesTx = $("#obstaculosCircundantesTx").val();
	obstaculosCircundantesRx = $("#obstaculosCircundantesRx").val();
	toleranciaZonasSombras = $("#toleranciaZonasSombras").val();
	resolucionCalculo = $("#resolucionCalculo").val();
	porcentajeTiempo = $("#porcentajeTiempo").val();
	porcentajeUbicacion = $("#porcentajeUbicacion").val();
	alturaAntenaRx = $("#alturaAntenaRx").val();
	$("#opcionesAvanzadas").hide();
	$("#curtainCaltool").hide();
}

function set8PerdidasLobulos(pLobulos){
	if(pLobulos !=null){
		for(var i=0;i<8;i++){
			perdidasLobulos8Map["M8PL"+(fortyFive*i)] = pLobulos[i];
			$("#I8PL"+(fortyFive*i)).val(pLobulos[i]);
		}
	}else{
		for(var i=0;i<8;i++){
			$("#I8PL"+(fortyFive*i)).val(perdidasLobulos8Map["M8PL"+(fortyFive*i)]);
		}
	}
}

function set18PerdidasLobulos(pLobulos){
	if(pLobulos !=null){
		for(i=0;i<18;i++){
			perdidasLobulos18Map["M18PL"+(twenty*i)] = pLobulos[i];
			$("#I18PL"+(twenty*i)).val(pLobulos[i]);
		}
	}else{
		for(i=0;i<18;i++){
			$("#I18PL"+(twenty*i)).val(perdidasLobulos18Map["M18PL"+(twenty*i)]);
		}
	}
	
}

function set72PerdidasLobulos(pLobulos){
	if(pLobulos !=null){
		for(i=0;i<72;i++){
			perdidasLobulos72Map["M72PL"+(five*i)] = pLobulos[i];
			$("#I72PL"+(five*i)).val(pLobulos[i]);
		}
	}else{
		for(i=0;i<72;i++){
			$("#I72PL"+(five*i)).val(perdidasLobulos72Map["M72PL"+(five*i)]);
		}
	}
}

function setOmni(){
	var r = $("input[name=radialesRadio]:checked").val();
	if(r==72){
		for(i=0;i<72;i++){
			perdidasLobulos72Map["M72PL"+(five*i)] = 0;
			$("#I72PL"+(five*i)).val(0);
		}
	}
	if(r==18){
		for(i=0;i<18;i++){
			perdidasLobulos18Map["M18PL"+(twenty*i)] = 0;
			$("#I18PL"+(twenty*i)).val(0);
		}
	}
	if(r==8){
		for(i=0;i<8;i++){
			perdidasLobulos8Map["M8PL"+(fortyFive*i)] = 0;
			$("#I8PL"+(fortyFive*i)).val(0);
		}
	}	
}

function setFrameRadiales(){
	if(numeroRadiales == 18){
		for(i=0;i<18;i++)
			$("#I18RA"+(twenty*i)).val(radiales18Map["M18PL"+(twenty*i)]);
	}
	if(numeroRadiales == 72){
		for(i=0;i<72;i++)
			$("#I72RA"+(five*i)).val(radiales72Map["M72PL"+(five*i)]);
	}
}

function save72PerdidasLobulos(){
	for(i=0;i<72;i++){
		perdidasLobulos72Map["M72PL"+(five*i)] = $("#I72PL"+(five*i)).val();
	}
	$("#frame72PerdidasLobulos").hide();
}
	
function save18PerdidasLobulos(){
	for(i=0;i<18;i++){
		perdidasLobulos18Map["M18PL"+(twenty*i)] = $("#I18PL"+(twenty*i)).val();
	}
	$("#frame18PerdidasLobulos").hide();
}

function save8PerdidasLobulos(){
	for(i=0;i<8;i++){
		perdidasLobulos8Map["M8PL"+(fortyFive*i)] = $("#I8PL"+(fortyFive*i)).val();
	}
	$("#frame8PerdidasLobulos").hide();
}

function callback(){}

function setComboConcursos(data){
	var concursos = $("#concursos");
	var identificadores = $("#identificadores");
	concursos.empty();
	concursos.append(new Option("Seleccione", "seleccione"));
	$(data.features).each(function(index, value) {
		concursos.append(new Option(value.attributes.NOMBRE, value.attributes.CONCURSO));
	});
}

function setComboIdentificadores(data){
	var identificadores = $("#identificadores");
	identificadores.append(new Option("Seleccione", "seleccione"));
	$(data.features).each(function(index, value) {
		identificadores.append(new Option(value.attributes.IDENTIFICADOR, value.attributes.IDENTIFICADOR));
	});
}

function changeComboConcurso(data){
	$("#identificadores").empty();
	var identificadores = $("#identificadores");
	if(data.features.length == 0){
		var identificadores = $("#identificadores");
		identificadores.append(new Option("Seleccione", "seleccione"));
	}else{
		$(data.features).each(function(index, value) {
			identificadores.append(new Option(value.attributes.IDENTIFICADOR, value.attributes.IDENTIFICADOR));
		});
	}	
}	

function changeListaIdentificadores(data){
	var identificadores = $("#identificadores");
	identificadores.empty();
	if(data.features.length == 0){
		var identificadores = $("#identificadores");
		identificadores.append(new Option("Seleccione", "seleccione"));
	}else{
		$(data.features).each(function(index, value) {
			identificadores.append(new Option(value.attributes.IDENTIFICADOR, value.attributes.IDENTIFICADOR));
		});
	}	
}

function setDataIdentificador(data, coords, decimales){
	interpola = true;
	plCheckActual = $("input[name=radialesRadio]:checked").val();
	$("#tipoServicio option:contains("+data.TIPO_SERVICIO+")").prop("selected",true);
	$("#localidadC").val(data.LOCALIDAD);
	$("#frecuenciaC").val(redondea(data.FRECUENCIA, decimales));
	$("#potenciaMaximaC").val(data.POTENCIA);
	$("#intensidadCampoC").val(data.CAMPO_LIMITE);
	$("#latitudC").val((coords[1].replace("-", "")).replace(".00",""));
	$("#longitudC").val((coords[0].replace("-", "")).replace(".00",""));
	latitudM = coords[1];
	longitudM = coords[0];
	$("#radioCircunferenciaMaxina").val(data.RADIO_MAXIMO);
	$("#72PerdidasLobulos").attr('checked',true);
	if(concurso){
		$("#potenciaM").val(data.POTENCIA);
		$("#frecuenciaM").val(data.FRECUENCIA);
		numeroRadiales = 18;
		// setRadialesConcurso(data);
		setDataRadiales(data, 1);
		porcentajeUbicacion = 90;
	}else{
		$("#potenciaM").val(0);
		$("#frecuenciaM").val(0);
		numeroRadiales = data.RADIALES;
		// setRadialesModificacion(data);
		setDataRadiales(data, 1);
		porcentajeUbicacion = data.PORCENTAJE_UBICACION 
	}

	setDataPLOB(data);
	$("#gananciaM").val(data.G_ANT_DBD);
	$("#intensidadCampoM").val(data.CAMPO_LIMITE);
	$("#alturaAntenaTransmisoraM").val(data.ALTURA_TX);
	$("#latitudGradosM").val((coords[1].split(" ")[0].replace("°", "")).replace("-",""));
	$("#latitudMinutosM").val(coords[1].split(" ")[1].replace("'", ""));
	$("#latitudSegudosM").val((coords[1].split(" ")[2].replace('"', "")).split(".")[0]);
	$("#longitudGradosM").val((coords[0].split(" ")[0].replace("°", "")).replace("-",""));
	$("#longitudMinutosM").val(coords[0].split(" ")[1].replace("'", ""));
	$("#longitudSegundosM").val((coords[0].split(" ")[2].replace('"', "")).split(".")[0]);
	$("#perdidasCablesConectoresM").val(data.PERDIDA_CABLE_CONECTOR);
	$("#divisorPotenciaM").val("0");
	$("#otrasPerdidasM").val("0");
	$("#localidadI").text(data.LOCALIDAD);
	$("#identificadorI").text($("#concursos option:selected").text());
	$("#potenciaI").text(data.POTENCIA);
	$("#frecuenciaI").text(redondea(data.FRECUENCIA, 2));
	$("#intensidadCampoI").text(data.CAMPO_LIMITE);
	$("#alturaAntenaI").text(data.ALTURA_TX);
	$("#gananciaI").text(data.G_ANT_DBD);
	$("#divisorPotenciaI").text("0");
	$("#perdidaCableConectoI").text(data.PERDIDA_CABLE_CONECTOR);
	$("#otrasPerdidasI").text("0");
	$("#calculaPoligono").prop("disabled", false);
	// $("#verRadiales").prop("disabled", false);
	$("#pestanaTab2").show();
	alturaAntenaRx = 10;
	obstaculosCircundantesTx = 10;
	obstaculosCircundantesRx = 10;
	toleranciaZonasSombras = data.TOLERANCIA_SOMBRA;
	resolucionCalculo = data.RESOLUCION_CALCULO;
	porcentajeTiempo = 50;
}

function setDataPLOB(data){
	if(numeroRadiales == 72){
		for(var ix = 0; ix < 72; ix++) {
			var radial = 5*ix;
			perdidasLobulos72Map["M72PL"+radial] = redondea(Number(data["PLOB"+radial]),4);
		}
	}
	if(numeroRadiales == 18){
		for(var ix = 0; ix < 18; ix++) {
			var radial = 20*ix;
			perdidasLobulos18Map["M18PL"+radial] = redondea(Number(data["PLOB"+radial]),4);
		}
	}
}

function setDataRadiales(data, factor) {
	if(numeroRadiales == 72) {
		for(var ix = 0; ix < 72; ix++) {
			var radial = 5*ix;
			radiales72Map["M72PL"+radial] = redondea(Number(data["Zs"+radial]) * factor,1);
		}
	}
	if(numeroRadiales == 18){
		for(var ix = 0; ix < 18; ix++){
			var radial = 20*ix;
			radiales18Map["M18PL"+radial] = redondea(Number(data["Zs"+radial]) * factor,1);
		}
	}
}

function setDataReporte(data){
	var values = data.value.split(",");
	var radial = $("input[name=radialesRadio]:checked").val();
	var grados = 360/radial;
	for(i=0;i<radial;i++){
		distanciaKilometros["MDKPL"+(grados*i)] = values[i];
	}
}

function setCantidadViviendas(cantidad_viviendas) {
	$("#viviendasI").text(cantidad_viviendas);
}

function setDistanciasKilometros(){
	var radial = $("input[name=radialesRadio]:checked").val();
	var grados = 360/radial;
	var size = Object.keys(distanciaKilometros).length;
	for(i=0;i<size;i++){
		var value = distanciaKilometros["MDKPL"+(grados*i)];
		$("#I"+radial+"DK"+(grados*i)).val(redondea(value, 2));
	}
}

function setPuntoCoordenadas(coords){
	$("#latitudGradosM").val((coords[1].split(" ")[0].replace("°", "")).replace("-",""));
	$("#latitudMinutosM").val(coords[1].split(" ")[1].replace("'", ""));
	$("#latitudSegudosM").val((coords[1].split(" ")[2].replace('"', "")).split(".")[0]);
	$("#longitudGradosM").val((coords[0].split(" ")[0].replace("°", "")).replace("-",""));
	$("#longitudMinutosM").val(coords[0].split(" ")[1].replace("'", ""));
	$("#longitudSegundosM").val((coords[0].split(" ")[2].replace('"', "")).split(".")[0]);
}

function removeDataInforme(){
	$("#idomicilio").val("");
	$("#ifono").val("");
	$("#iemail").val("");
	$("#iNombreRazon").val("");
	$("#iRutRazon").val("");
	$("#localidadI").text("");
	$("#identificadorI").text("");
	$("#potenciaI").text("");
	$("#frecuenciaI").text("");
	$("#intensidadCampoI").text("");
	$("#alturaAntenaI").text("");
	$("#gananciaI").text("");
	$("#divisorPotenciaI").text("");
	$("#perdidaCableConectoI").text("");
	$("#otrasPerdidasI").text("");
	$("#latitudI").val("");
	$("#longitudI").val("");
	$("#tabdatos").tabs({active: 0 });
}

function removeDataConcurso(){
	interpola = false;
	$("#normaActualM").prop('checked', true);
	$("#tipoServicio option:contains(...)").prop("selected",true);
	$("#localidadC").val("");
	$("#frecuenciaC").val("");
	$("#potenciaMaximaC").val("");
	$("#intensidadCampoC").val("");
	$("#latitudC").val("");
	$("#longitudC").val("");
	$("#radioCircunferenciaMaxina").val("");
	$("#longitudC").val("");
	$("#identificadores").empty();
	$("#identificadores").append(new Option("Seleccione", "seleccione"));
	$("#identificadores option:contains(seleccione)").prop("selected",true); 
	$("#potenciaM").val("");
	$("#gananciaM").val("");
	$("#frecuenciaM").val("");
	$("#intensidadCampoM").val("");
	$("#alturaAntenaTransmisoraM").val("");
	$("#latitudGradosM").val("");
	$("#latitudMinutosM").val("");
	$("#latitudSegudosM").val("");
	$("#longitudGradosM").val("");
	$("#longitudMinutosM").val("");
	$("#longitudSegundosM").val("");
	$("#perdidasCablesConectoresM").val("");
	$("#divisorPotenciaM").val("");
	$("#otrasPerdidasM").val("");
	$("#72PerdidasLobulos").trigger('click');
	removeDataInforme();
	showInitPestana();
}	

function setComboRegion(value){
	removeDataConcurso();
	if(value){
		concurso = true;

		$("#concursoLabel").show();
		$("#concursoSelect").show();
		$("#regionesLabel").hide();
		$("#regionesSelect").hide();
		$("#labelRadioCircuferencia").show();
		$("#labelInfoRadiales").hide();
		$("#concursos option:contains(Seleccione)").prop("selected",true);
		disabledAll();  
	}else{
		concurso = false;
		$("#concursoLabel").hide();
		$("#concursoSelect").hide();
		$("#regionesLabel").show();
		$("#regionesSelect").show();
		$("#labelRadioCircuferencia").hide();
		$("#labelInfoRadiales").show();
	}
}
	
function setCombosToStart(is_modificacion){
	$("#regiones").val(0);
	$("#tipoServicio").find('option').remove();

	$("#tipoServicio").append($("<option></option>", {'value':''}).text('...'));
	$("#tipoServicio").append($("<option></option>", {'value':'ISDBT'}).text('ISDBT'));
	if(is_modificacion) {
		$("#tipoServicio").append($("<option></option>", {'value':'VHF'}).text('VHF'));
	}
}

function showLoader(value, text){
	var wait_message = ". Espere un momento…";
	$("#loadboxright").text(text+wait_message);
	if(value){
		$("#loader").show();
	}else{
		$("#loader").hide();
	}		
}

function setPosicionTools(){
	$("#caltool").css("top", "15px");
	$("#caltool").css("left", "55px");	
}

function showErrorMessage(value){
	console.log(value);
	alert("Hubo un problema generando el cálculo de zona.");
}

function getMapParameters(){
	potenciaM = $("#potenciaM").val();
	gananciaM = $("#gananciaM").val();
	frecuenciaM = $("#frecuenciaM").val();
	intensidadCampoM = $("#intensidadCampoM").val();
	alturaAntenaTransmisoraM = $("#alturaAntenaTransmisoraM").val();
	perdidasCablesConectoresM = $("#perdidasCablesConectoresM").val();
	divisorPotenciaM = $("#divisorPotenciaM").val();
	otrasPerdidasM = $("#otrasPerdidasM").val();
	recomendacion = $("#recomendacion option:selected").text();
	radiales = $("input[name=radialesRadio]:checked").val();;
	localidad = $("#localidadC").val();
	radioMaximo = $("#radioCircunferenciaMaxina").val();
	radialesCalculo = radiales;
	var mapOut = {};
	mapOut["potenciaM"] = potenciaM;
	mapOut["gananciaM"] = gananciaM;
	mapOut["frecuenciaM"] = frecuenciaM;
	mapOut["intensidadCampoM"] = intensidadCampoM;
	mapOut["alturaAntenaTransmisoraM"] = alturaAntenaTransmisoraM;
	mapOut["perdidasCablesConectoresM"] = perdidasCablesConectoresM;
	mapOut["divisorPotenciaM"] = divisorPotenciaM;
	mapOut["otrasPerdidasM"] = otrasPerdidasM;
	mapOut["alturaAntenaRx"] = alturaAntenaRx;
	mapOut["obstaculosCircundantesTx"] = obstaculosCircundantesTx;
	mapOut["obstaculosCircundantesRx"] = obstaculosCircundantesRx;
	mapOut["toleranciaZonasSombras"] = toleranciaZonasSombras;
	mapOut["resolucionCalculo"] = resolucionCalculo;
	mapOut["porcentajeTiempo"] = porcentajeTiempo;
	mapOut["porcentajeUbicacion"] = porcentajeUbicacion;
	mapOut["recomendacion"] = recomendacion;
	mapOut["radiales"] = radiales;
	mapOut["localidad"] = localidad;
	mapOut["radioMaximo"] = radioMaximo;

	$("#longitudI").val($("#longitudGradosM").val() + "° "+ $("#longitudMinutosM").val() + "' " + $("#longitudSegundosM").val() + "''");
	$("#latitudI").val($("#latitudGradosM").val() + "° "+ $("#latitudMinutosM").val() + "' " + $("#latitudSegudosM").val() + "''");
	var longitudGMS = ComponeCoordenadaNumero($("#longitudGradosM").val(),$("#longitudMinutosM").val(),$("#longitudSegundosM").val());
	var latitudGMS = ComponeCoordenadaNumero($("#latitudGradosM").val(),$("#latitudMinutosM").val(),$("#latitudSegudosM").val());
	mapOut["longitud"] = longitudGMS;
	mapOut["latitud"] = latitudGMS;

	if(radiales == 8){
		for(var ix = 0; ix < 8; ix++){
			var radial = 45*ix;
			mapOut["M8PL"+radial] = perdidasLobulos18Map["M8PL"+radial];	
		}
	}

	if(radiales == 18){
		for(var ix = 0; ix < 18; ix++){
			var radial = 20*ix;
			mapOut["M18PL"+radial] = perdidasLobulos18Map["M18PL"+radial];	
		}
	}


	if(radiales == 72){
		for(var ix = 0; ix < 72; ix++){
			var radial = 5*ix;
			mapOut["M72PL"+radial] = perdidasLobulos72Map["M72PL"+radial];	
		}
	}
	return mapOut;
}

function getParametersReport(){
	var mapOut = {};
	mapOut["pAlturaAntenaTx"] = $("#alturaAntenaTransmisoraM").val();
	mapOut["pDivisorPotencia"] = $("#divisorPotenciaM").val();
	mapOut["pDomicilio"] = $("#idomicilio").val();
	mapOut["pComuna"] = $("#icomuna").val();
	mapOut["pEmail"] = $("#iemail").val();
	mapOut["pFrecuencia"] =  $("#frecuenciaM").val();
	mapOut["pFono"] = $("#ifono").val();
	mapOut["pGanancia"] = $("#gananciaM").val();
	mapOut["pIdentificador"] = $("#identificadores").val();
	mapOut["pIntensidad"] =  $("#intensidadCampoM").val();
	mapOut["pLatitud"]  = $("#latitudI").val();
	mapOut["pLongitud"] = $("#longitudI").val();
	mapOut["pLocalidad"] = $("#localidadI").text();
	mapOut["pOtrasPerdidas"] = $("#otrasPerdidasM").val();
	mapOut["pPerdidaCablesConectores"] = $("#perdidasCablesConectoresM").val();
	mapOut["pPotencia"] = $("#potenciaM").val();
	mapOut["pRazonSocial"] = $("#inombreRazon").val();
	mapOut["pRegion"] = $("#iregion").val();
	mapOut["pRut"] = $("#irutRazon").val();
	mapOut["frecuenciaAnaloga"] = $("#frecuenciaC").val();

	var radial = $("input[name=radialesRadio]:checked").val();
	mapOut["radiales"] = radial;

	var grados = 360/radial;

	for(i=0;i<radial;i++){
		mapOut["DIS"+grados*i] = redondea(distanciaKilometros["MDKPL"+(grados*i)],2);
	}

	var llave ="";
	for(i=0;i<radial;i++){
		llave = "M"+radial+"PL"+grados*i;
		if(radial == 8)
	        mapOut[llave] = perdidasLobulos8Map[llave];
		if(radial == 18)
	        mapOut[llave] = perdidasLobulos18Map[llave];
		if(radial ==72)
	        mapOut[llave] = perdidasLobulos72Map[llave];
	}
	return mapOut;
}


function showDocumentPopUp(value){
	window.open(value);
}

function goHome(){
	history.back();
}

function showPestanaTab3(){
	$("#pestanaTab3").show();
	$("#tabdatos").tabs({active: 2});
}

function hidePestanaTab3(){
	$("#pestanaTab3").hide();
	$("#tabdatos").tabs({active: 0});
}

function showInitPestana(){
	console.log("show init pestaña");
	$("#pestanaTab2").hide();
	$("#pestanaTab3").hide();
	$("#tabdatos").tabs({active: 0});
}

function activeAll(){
	$("#normaAnteriorM").prop("disabled", false);
}

function disabledAll(){
	$("#normaAnteriorM").prop("disabled", true);
}

function setTwoNumberDecimal(){
	this.value = parseFloat(this.value).toFixed(2);
}

function validaCambiosCampos() {
	var validate = true;
	if($('#pestanaTab2').css('display') != 'none')
	{
		validate = confirm("Si cambia esta opción se perderán los datos ingresados");
	}
	return validate;
}