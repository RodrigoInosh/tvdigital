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
	$("#18PerdidasLobulos").prop("checked", true);
	$("#concursoC").prop("checked", true);
	$("#recomendacion option:eq(3)").attr("selected", "selected");
	$("#verDistancia").click(function() {
		setDistanciasKilometros();
		$("#distanciaKilometro"+radialesCalculo).show();
		$("#curtainCaltool").show();
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
	// $("#"+data.RADIALES+"PerdidasLobulos").attr('checked',true);
	$("#18PerdidasLobulos").attr('checked',true);
	if(concurso){
		numeroRadiales = 18;
		setRadialesConcurso(data);
		porcentajeUbicacion = 90;
	}else{
		numeroRadiales = data.RADIALES;
		setRadialesModificacion(data);
		porcentajeUbicacion = data.PORCENTAJE_UBICACION 
	}

	setDataPLOB(data);
	$("#potenciaM").val(0);
	$("#gananciaM").val(data.G_ANT_DBD);
	$("#frecuenciaM").val(0);
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
	$("#verRadiales").prop("disabled", false);
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
		perdidasLobulos72Map["M72PL0"] = redondea(Number(data.PLOB0),2);
		perdidasLobulos72Map["M72PL5"] = redondea(Number(data.PLOB5),2);
		perdidasLobulos72Map["M72PL10"] = redondea(Number(data.PLOB10),2);
		perdidasLobulos72Map["M72PL15"] = redondea(Number(data.PLOB15),2);
		perdidasLobulos72Map["M72PL20"] = redondea(Number(data.PLOB20),2);
		perdidasLobulos72Map["M72PL25"] = redondea(Number(data.PLOB25),2);
		perdidasLobulos72Map["M72PL30"] = redondea(Number(data.PLOB30),2);
		perdidasLobulos72Map["M72PL35"] = redondea(Number(data.PLOB35),2);
		perdidasLobulos72Map["M72PL40"] = redondea(Number(data.PLOB40),2);
		perdidasLobulos72Map["M72PL45"] = redondea(Number(data.PLOB45),2);
		perdidasLobulos72Map["M72PL50"] = redondea(Number(data.PLOB50),2);
		perdidasLobulos72Map["M72PL55"] = redondea(Number(data.PLOB55),2);
		perdidasLobulos72Map["M72PL60"] = redondea(Number(data.PLOB60),2);
		perdidasLobulos72Map["M72PL65"] = redondea(Number(data.PLOB65),2);
		perdidasLobulos72Map["M72PL70"] = redondea(Number(data.PLOB70),2);
		perdidasLobulos72Map["M72PL75"] = redondea(Number(data.PLOB75),2);
		perdidasLobulos72Map["M72PL80"] = redondea(Number(data.PLOB80),2);
		perdidasLobulos72Map["M72PL85"] = redondea(Number(data.PLOB85),2);
		perdidasLobulos72Map["M72PL90"] = redondea(Number(data.PLOB90),2);
		perdidasLobulos72Map["M72PL95"] = redondea(Number(data.PLOB95),2);
		perdidasLobulos72Map["M72PL100"] = redondea(Number(data.PLOB100),2);
		perdidasLobulos72Map["M72PL105"] = redondea(Number(data.PLOB105),2);
		perdidasLobulos72Map["M72PL110"] = redondea(Number(data.PLOB110),2);
		perdidasLobulos72Map["M72PL115"] = redondea(Number(data.PLOB115),2);
		perdidasLobulos72Map["M72PL120"] = redondea(Number(data.PLOB120),2);
		perdidasLobulos72Map["M72PL125"] = redondea(Number(data.PLOB125),2);
		perdidasLobulos72Map["M72PL130"] = redondea(Number(data.PLOB130),2);
		perdidasLobulos72Map["M72PL135"] = redondea(Number(data.PLOB135),2);
		perdidasLobulos72Map["M72PL140"] = redondea(Number(data.PLOB140),2);
		perdidasLobulos72Map["M72PL145"] = redondea(Number(data.PLOB145),2);
		perdidasLobulos72Map["M72PL150"] = redondea(Number(data.PLOB150),2);
		perdidasLobulos72Map["M72PL155"] = redondea(Number(data.PLOB155),2);
		perdidasLobulos72Map["M72PL160"] = redondea(Number(data.PLOB160),2);
		perdidasLobulos72Map["M72PL165"] = redondea(Number(data.PLOB165),2);
		perdidasLobulos72Map["M72PL170"] = redondea(Number(data.PLOB170),2);
		perdidasLobulos72Map["M72PL175"] = redondea(Number(data.PLOB175),2);
		perdidasLobulos72Map["M72PL180"] = redondea(Number(data.PLOB180),2);
		perdidasLobulos72Map["M72PL185"] = redondea(Number(data.PLOB185),2);
		perdidasLobulos72Map["M72PL190"] = redondea(Number(data.PLOB190),2);
		perdidasLobulos72Map["M72PL195"] = redondea(Number(data.PLOB195),2);
		perdidasLobulos72Map["M72PL200"] = redondea(Number(data.PLOB200),2);
		perdidasLobulos72Map["M72PL205"] = redondea(Number(data.PLOB205),2);
		perdidasLobulos72Map["M72PL210"] = redondea(Number(data.PLOB210),2);
		perdidasLobulos72Map["M72PL215"] = redondea(Number(data.PLOB215),2);
		perdidasLobulos72Map["M72PL220"] = redondea(Number(data.PLOB220),2);
		perdidasLobulos72Map["M72PL225"] = redondea(Number(data.PLOB225),2);
		perdidasLobulos72Map["M72PL230"] = redondea(Number(data.PLOB230),2);
		perdidasLobulos72Map["M72PL235"] = redondea(Number(data.PLOB235),2);
		perdidasLobulos72Map["M72PL240"] = redondea(Number(data.PLOB240),2);
		perdidasLobulos72Map["M72PL245"] = redondea(Number(data.PLOB245),2);
		perdidasLobulos72Map["M72PL250"] = redondea(Number(data.PLOB250),2);
		perdidasLobulos72Map["M72PL255"] = redondea(Number(data.PLOB255),2);
		perdidasLobulos72Map["M72PL260"] = redondea(Number(data.PLOB260),2);
		perdidasLobulos72Map["M72PL265"] = redondea(Number(data.PLOB265),2);
		perdidasLobulos72Map["M72PL270"] = redondea(Number(data.PLOB270),2);
		perdidasLobulos72Map["M72PL275"] = redondea(Number(data.PLOB275),2);
		perdidasLobulos72Map["M72PL280"] = redondea(Number(data.PLOB280),2);
		perdidasLobulos72Map["M72PL285"] = redondea(Number(data.PLOB285),2);
		perdidasLobulos72Map["M72PL290"] = redondea(Number(data.PLOB290),2);
		perdidasLobulos72Map["M72PL295"] = redondea(Number(data.PLOB295),2);
		perdidasLobulos72Map["M72PL300"] = redondea(Number(data.PLOB300),2);
		perdidasLobulos72Map["M72PL305"] = redondea(Number(data.PLOB305),2);
		perdidasLobulos72Map["M72PL310"] = redondea(Number(data.PLOB310),2);
		perdidasLobulos72Map["M72PL315"] = redondea(Number(data.PLOB315),2);
		perdidasLobulos72Map["M72PL320"] = redondea(Number(data.PLOB320),2);
		perdidasLobulos72Map["M72PL325"] = redondea(Number(data.PLOB325),2);
		perdidasLobulos72Map["M72PL330"] = redondea(Number(data.PLOB330),2);
		perdidasLobulos72Map["M72PL335"] = redondea(Number(data.PLOB335),2);
		perdidasLobulos72Map["M72PL340"] = redondea(Number(data.PLOB340),2);
		perdidasLobulos72Map["M72PL345"] = redondea(Number(data.PLOB345),2);
		perdidasLobulos72Map["M72PL350"] = redondea(Number(data.PLOB350),2);
		perdidasLobulos72Map["M72PL355"] = redondea(Number(data.PLOB355),2);
	}
	if(numeroRadiales == 18){
		perdidasLobulos18Map["M18PL0"] = redondea(Number(data.PLOB0),2);
		perdidasLobulos18Map["M18PL20"] = redondea(Number(data.PLOB20),2);
		perdidasLobulos18Map["M18PL40"] = redondea(Number(data.PLOB40),2);
		perdidasLobulos18Map["M18PL60"] = redondea(Number(data.PLOB60),2);
		perdidasLobulos18Map["M18PL80"] = redondea(Number(data.PLOB80),2);
		perdidasLobulos18Map["M18PL100"] = redondea(Number(data.PLOB100),2);
		perdidasLobulos18Map["M18PL120"] = redondea(Number(data.PLOB120),2);
		perdidasLobulos18Map["M18PL140"] = redondea(Number(data.PLOB140),2);
		perdidasLobulos18Map["M18PL160"] = redondea(Number(data.PLOB160),2);
		perdidasLobulos18Map["M18PL180"] = redondea(Number(data.PLOB180),2);
		perdidasLobulos18Map["M18PL200"] = redondea(Number(data.PLOB200),2);
		perdidasLobulos18Map["M18PL220"] = redondea(Number(data.PLOB220),2);
		perdidasLobulos18Map["M18PL240"] = redondea(Number(data.PLOB240),2);
		perdidasLobulos18Map["M18PL260"] = redondea(Number(data.PLOB260),2);
		perdidasLobulos18Map["M18PL280"] = redondea(Number(data.PLOB280),2);
		perdidasLobulos18Map["M18PL300"] = redondea(Number(data.PLOB300),2);
		perdidasLobulos18Map["M18PL320"] = redondea(Number(data.PLOB320),2);
		perdidasLobulos18Map["M18PL340"] = redondea(Number(data.PLOB340),2);
	}
}
function setRadialesConcurso(data){
	if( numeroRadiales == 72){
		radiales72Map["M72PL0"] = redondea(parseFloat(data.Zs0),1);
		radiales72Map["M72PL5"] = redondea(parseFloat(data.Zs5),1);
		radiales72Map["M72PL10"] = redondea(parseFloat(data.Zs10),1);
		radiales72Map["M72PL15"] = redondea(parseFloat(data.Zs15),1);
		radiales72Map["M72PL20"] = redondea(parseFloat(data.Zs20),1);
		radiales72Map["M72PL25"] = redondea(parseFloat(data.Zs25),1);
		radiales72Map["M72PL30"] = redondea(parseFloat(data.Zs30),1);
		radiales72Map["M72PL35"] = redondea(parseFloat(data.Zs35),1);
		radiales72Map["M72PL40"] = redondea(parseFloat(data.Zs40),1);
		radiales72Map["M72PL45"] = redondea(parseFloat(data.Zs45),1);
		radiales72Map["M72PL50"] = redondea(parseFloat(data.Zs50),1);
		radiales72Map["M72PL55"] = redondea(parseFloat(data.Zs55),1);
		radiales72Map["M72PL60"] = redondea(parseFloat(data.Zs60),1);
		radiales72Map["M72PL65"] = redondea(parseFloat(data.Zs65),1);
		radiales72Map["M72PL70"] = redondea(parseFloat(data.Zs70),1);
		radiales72Map["M72PL75"] = redondea(parseFloat(data.Zs75),1);
		radiales72Map["M72PL80"] = redondea(parseFloat(data.Zs80),1);
		radiales72Map["M72PL85"] = redondea(parseFloat(data.Zs85),1);
		radiales72Map["M72PL90"] = redondea(parseFloat(data.Zs90),1);
		radiales72Map["M72PL95"] = redondea(parseFloat(data.Zs95),1);
		radiales72Map["M72PL100"] = redondea(parseFloat(data.Zs100),1);
		radiales72Map["M72PL105"] = redondea(parseFloat(data.Zs105),1);
		radiales72Map["M72PL110"] = redondea(parseFloat(data.Zs110),1);
		radiales72Map["M72PL115"] = redondea(parseFloat(data.Zs115),1);
		radiales72Map["M72PL120"] = redondea(parseFloat(data.Zs120),1);
		radiales72Map["M72PL125"] = redondea(parseFloat(data.Zs125),1);
		radiales72Map["M72PL130"] = redondea(parseFloat(data.Zs130),1);
		radiales72Map["M72PL135"] = redondea(parseFloat(data.Zs135),1);
		radiales72Map["M72PL140"] = redondea(parseFloat(data.Zs140),1);
		radiales72Map["M72PL145"] = redondea(parseFloat(data.Zs145),1);
		radiales72Map["M72PL150"] = redondea(parseFloat(data.Zs150),1);
		radiales72Map["M72PL155"] = redondea(parseFloat(data.Zs155),1);
		radiales72Map["M72PL160"] = redondea(parseFloat(data.Zs160),1);
		radiales72Map["M72PL165"] = redondea(parseFloat(data.Zs165),1);
		radiales72Map["M72PL170"] = redondea(parseFloat(data.Zs170),1);
		radiales72Map["M72PL175"] = redondea(parseFloat(data.Zs175),1);
		radiales72Map["M72PL180"] = redondea(parseFloat(data.Zs180),1);
		radiales72Map["M72PL185"] = redondea(parseFloat(data.Zs185),1);
		radiales72Map["M72PL190"] = redondea(parseFloat(data.Zs190),1);
		radiales72Map["M72PL195"] = redondea(parseFloat(data.Zs195),1);
		radiales72Map["M72PL200"] = redondea(parseFloat(data.Zs200),1);
		radiales72Map["M72PL205"] = redondea(parseFloat(data.Zs205),1);
		radiales72Map["M72PL210"] = redondea(parseFloat(data.Zs210),1);
		radiales72Map["M72PL215"] = redondea(parseFloat(data.Zs215),1);
		radiales72Map["M72PL220"] = redondea(parseFloat(data.Zs220),1);
		radiales72Map["M72PL225"] = redondea(parseFloat(data.Zs225),1);
		radiales72Map["M72PL230"] = redondea(parseFloat(data.Zs230),1);
		radiales72Map["M72PL235"] = redondea(parseFloat(data.Zs235),1);
		radiales72Map["M72PL240"] = redondea(parseFloat(data.Zs240),1);
		radiales72Map["M72PL245"] = redondea(parseFloat(data.Zs245),1);
		radiales72Map["M72PL250"] = redondea(parseFloat(data.Zs250),1);
		radiales72Map["M72PL255"] = redondea(parseFloat(data.Zs255),1);
		radiales72Map["M72PL260"] = redondea(parseFloat(data.Zs260),1);
		radiales72Map["M72PL265"] = redondea(parseFloat(data.Zs265),1);
		radiales72Map["M72PL270"] = redondea(parseFloat(data.Zs270),1);
		radiales72Map["M72PL275"] = redondea(parseFloat(data.Zs275),1);
		radiales72Map["M72PL280"] = redondea(parseFloat(data.Zs280),1);
		radiales72Map["M72PL285"] = redondea(parseFloat(data.Zs285),1);
		radiales72Map["M72PL290"] = redondea(parseFloat(data.Zs290),1);
		radiales72Map["M72PL295"] = redondea(parseFloat(data.Zs295),1);
		radiales72Map["M72PL300"] = redondea(parseFloat(data.Zs300),1);
		radiales72Map["M72PL305"] = redondea(parseFloat(data.Zs305),1);
		radiales72Map["M72PL310"] = redondea(parseFloat(data.Zs310),1);
		radiales72Map["M72PL315"] = redondea(parseFloat(data.Zs315),1);
		radiales72Map["M72PL320"] = redondea(parseFloat(data.Zs320),1);
		radiales72Map["M72PL325"] = redondea(parseFloat(data.Zs325),1);
		radiales72Map["M72PL330"] = redondea(parseFloat(data.Zs330),1);
		radiales72Map["M72PL335"] = redondea(parseFloat(data.Zs335),1);
		radiales72Map["M72PL340"] = redondea(parseFloat(data.Zs340),1);
		radiales72Map["M72PL345"] = redondea(parseFloat(data.Zs345),1);
		radiales72Map["M72PL350"] = redondea(parseFloat(data.Zs350),1);
		radiales72Map["M72PL355"] = redondea(parseFloat(data.Zs355),1);
	}
	if(numeroRadiales == 18){
		radiales18Map["M18PL0"] = redondea(parseFloat(data.Zs0),1);
		radiales18Map["M18PL20"] = redondea(parseFloat(data.Zs20),1);
		radiales18Map["M18PL40"] = redondea(parseFloat(data.Zs40),1);
		radiales18Map["M18PL60"] = redondea(parseFloat(data.Zs60),1);
		radiales18Map["M18PL80"] = redondea(parseFloat(data.Zs80),1);
		radiales18Map["M18PL100"] = redondea(parseFloat(data.Zs100),1);
		radiales18Map["M18PL120"] = redondea(parseFloat(data.Zs120),1);
		radiales18Map["M18PL140"] = redondea(parseFloat(data.Zs140),1);
		radiales18Map["M18PL160"] = redondea(parseFloat(data.Zs160),1);
		radiales18Map["M18PL180"] = redondea(parseFloat(data.Zs180),1);
		radiales18Map["M18PL200"] = redondea(parseFloat(data.Zs200),1);
		radiales18Map["M18PL220"] = redondea(parseFloat(data.Zs220),1);
		radiales18Map["M18PL240"] = redondea(parseFloat(data.Zs240),1);
		radiales18Map["M18PL260"] = redondea(parseFloat(data.Zs260),1);
		radiales18Map["M18PL280"] = redondea(parseFloat(data.Zs280),1);
		radiales18Map["M18PL300"] = redondea(parseFloat(data.Zs300),1);
		radiales18Map["M18PL320"] = redondea(parseFloat(data.Zs320),1);
		radiales18Map["M18PL340"] = redondea(parseFloat(data.Zs340),1);
	}
}
function setRadialesModificacion(data){
	if(numeroRadiales == 72){
		radiales72Map["M72PL0"] = redondea(Number(data.Zs0)*1.3,1);
		radiales72Map["M72PL5"] = redondea(Number(data.Zs5)*1.3,1);
		radiales72Map["M72PL10"] = redondea(Number(data.Zs10)*1.3,1);
		radiales72Map["M72PL15"] = redondea(Number(data.Zs15)*1.3,1);
		radiales72Map["M72PL20"] = redondea(Number(data.Zs20)*1.3,1);
		radiales72Map["M72PL25"] = redondea(Number(data.Zs25)*1.3,1);
		radiales72Map["M72PL30"] = redondea(Number(data.Zs30)*1.3,1);
		radiales72Map["M72PL35"] = redondea(Number(data.Zs35)*1.3,1);
		radiales72Map["M72PL40"] = redondea(Number(data.Zs40)*1.3,1);
		radiales72Map["M72PL45"] = redondea(Number(data.Zs45)*1.3,1);
		radiales72Map["M72PL50"] = redondea(Number(data.Zs50)*1.3,1);
		radiales72Map["M72PL55"] = redondea(Number(data.Zs55)*1.3,1);
		radiales72Map["M72PL60"] = redondea(Number(data.Zs60)*1.3,1);
		radiales72Map["M72PL65"] = redondea(Number(data.Zs65)*1.3,1);
		radiales72Map["M72PL70"] = redondea(Number(data.Zs70)*1.3,1);
		radiales72Map["M72PL75"] = redondea(Number(data.Zs75)*1.3,1);
		radiales72Map["M72PL80"] = redondea(Number(data.Zs80)*1.3,1);
		radiales72Map["M72PL85"] = redondea(Number(data.Zs85)*1.3,1);
		radiales72Map["M72PL90"] = redondea(Number(data.Zs90)*1.3,1);
		radiales72Map["M72PL95"] = redondea(Number(data.Zs95)*1.3,1);
		radiales72Map["M72PL100"] = redondea(Number(data.Zs100)*1.3,1);
		radiales72Map["M72PL105"] = redondea(Number(data.Zs105)*1.3,1);
		radiales72Map["M72PL110"] = redondea(Number(data.Zs110)*1.3,1);
		radiales72Map["M72PL115"] = redondea(Number(data.Zs115)*1.3,1);
		radiales72Map["M72PL120"] = redondea(Number(data.Zs120)*1.3,1);
		radiales72Map["M72PL125"] = redondea(Number(data.Zs125)*1.3,1);
		radiales72Map["M72PL130"] = redondea(Number(data.Zs130)*1.3,1);
		radiales72Map["M72PL135"] = redondea(Number(data.Zs135)*1.3,1);
		radiales72Map["M72PL140"] = redondea(Number(data.Zs140)*1.3,1);
		radiales72Map["M72PL145"] = redondea(Number(data.Zs145)*1.3,1);
		radiales72Map["M72PL150"] = redondea(Number(data.Zs150)*1.3,1);
		radiales72Map["M72PL155"] = redondea(Number(data.Zs155)*1.3,1);
		radiales72Map["M72PL160"] = redondea(Number(data.Zs160)*1.3,1);
		radiales72Map["M72PL165"] = redondea(Number(data.Zs165)*1.3,1);
		radiales72Map["M72PL170"] = redondea(Number(data.Zs170)*1.3,1);
		radiales72Map["M72PL175"] = redondea(Number(data.Zs175)*1.3,1);
		radiales72Map["M72PL180"] = redondea(Number(data.Zs180)*1.3,1);
		radiales72Map["M72PL185"] = redondea(Number(data.Zs185)*1.3,1);
		radiales72Map["M72PL190"] = redondea(Number(data.Zs190)*1.3,1);
		radiales72Map["M72PL195"] = redondea(Number(data.Zs195)*1.3,1);
		radiales72Map["M72PL200"] = redondea(Number(data.Zs200)*1.3,1);
		radiales72Map["M72PL205"] = redondea(Number(data.Zs205)*1.3,1);
		radiales72Map["M72PL210"] = redondea(Number(data.Zs210)*1.3,1);
		radiales72Map["M72PL215"] = redondea(Number(data.Zs215)*1.3,1);
		radiales72Map["M72PL220"] = redondea(Number(data.Zs220)*1.3,1);
		radiales72Map["M72PL225"] = redondea(Number(data.Zs225)*1.3,1);
		radiales72Map["M72PL230"] = redondea(Number(data.Zs230)*1.3,1);
		radiales72Map["M72PL235"] = redondea(Number(data.Zs235)*1.3,1);
		radiales72Map["M72PL240"] = redondea(Number(data.Zs240)*1.3,1);
		radiales72Map["M72PL245"] = redondea(Number(data.Zs245)*1.3,1);
		radiales72Map["M72PL250"] = redondea(Number(data.Zs250)*1.3,1);
		radiales72Map["M72PL255"] = redondea(Number(data.Zs255)*1.3,1);
		radiales72Map["M72PL260"] = redondea(Number(data.Zs260)*1.3,1);
		radiales72Map["M72PL265"] = redondea(Number(data.Zs265)*1.3,1);
		radiales72Map["M72PL270"] = redondea(Number(data.Zs270)*1.3,1);
		radiales72Map["M72PL275"] = redondea(Number(data.Zs275)*1.3,1);
		radiales72Map["M72PL280"] = redondea(Number(data.Zs280)*1.3,1);
		radiales72Map["M72PL285"] = redondea(Number(data.Zs285)*1.3,1);
		radiales72Map["M72PL290"] = redondea(Number(data.Zs290)*1.3,1);
		radiales72Map["M72PL295"] = redondea(Number(data.Zs295)*1.3,1);
		radiales72Map["M72PL300"] = redondea(Number(data.Zs300)*1.3,1);
		radiales72Map["M72PL305"] = redondea(Number(data.Zs305)*1.3,1);
		radiales72Map["M72PL310"] = redondea(Number(data.Zs310)*1.3,1);
		radiales72Map["M72PL315"] = redondea(Number(data.Zs315)*1.3,1);
		radiales72Map["M72PL320"] = redondea(Number(data.Zs320)*1.3,1);
		radiales72Map["M72PL325"] = redondea(Number(data.Zs325)*1.3,1);
		radiales72Map["M72PL330"] = redondea(Number(data.Zs330)*1.3,1);
		radiales72Map["M72PL335"] = redondea(Number(data.Zs335)*1.3,1);
		radiales72Map["M72PL340"] = redondea(Number(data.Zs340)*1.3,1);
		radiales72Map["M72PL345"] = redondea(Number(data.Zs345)*1.3,1);
		radiales72Map["M72PL350"] = redondea(Number(data.Zs350)*1.3,1);
		radiales72Map["M72PL355"] = redondea(Number(data.Zs355)*1.3,1);
	}
	if(numeroRadiales == 18){
		radiales18Map["M18PL0"] = redondea(Number(data.Zs0)*1.3,1);
		radiales18Map["M18PL20"] = redondea(Number(data.Zs20)*1.3,1);
		radiales18Map["M18PL40"] = redondea(Number(data.Zs40)*1.3,1);
		radiales18Map["M18PL60"] = redondea(Number(data.Zs60)*1.3,1);
		radiales18Map["M18PL80"] = redondea(Number(data.Zs80)*1.3,1);
		radiales18Map["M18PL100"] = redondea(Number(data.Zs100)*1.3,1);
		radiales18Map["M18PL120"] = redondea(Number(data.Zs120)*1.3,1);
		radiales18Map["M18PL140"] = redondea(Number(data.Zs140)*1.3,1);
		radiales18Map["M18PL160"] = redondea(Number(data.Zs160)*1.3,1);
		radiales18Map["M18PL180"] = redondea(Number(data.Zs180)*1.3,1);
		radiales18Map["M18PL200"] = redondea(Number(data.Zs200)*1.3,1);
		radiales18Map["M18PL220"] = redondea(Number(data.Zs220)*1.3,1);
		radiales18Map["M18PL240"] = redondea(Number(data.Zs240)*1.3,1);
		radiales18Map["M18PL260"] = redondea(Number(data.Zs260)*1.3,1);
		radiales18Map["M18PL280"] = redondea(Number(data.Zs280)*1.3,1);
		radiales18Map["M18PL300"] = redondea(Number(data.Zs300)*1.3,1);
		radiales18Map["M18PL320"] = redondea(Number(data.Zs320)*1.3,1);
		radiales18Map["M18PL340"] = redondea(Number(data.Zs340)*1.3,1);
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
	$("#tipoServicio").find('option')
		.remove();

	$("#tipoServicio").append($("<option></option>", {'value':''}).text('...'));
	$("#tipoServicio").append($("<option></option>", {'value':'ISDBT'}).text('ISDBT'));
	if(is_modificacion) {
		$("#tipoServicio").append($("<option></option>", {'value':'VHF'}).text('VHF'));
	}
}

function showLoader(value){
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
	radiales = $("input[name=radialesRadio]:checked").val();
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
		mapOut["M8PL0"] = perdidasLobulos8Map["M8PL0"];
		mapOut["M8PL45"] = perdidasLobulos8Map["M8PL45"];
		mapOut["M8PL90"] = perdidasLobulos8Map["M8PL90"];
		mapOut["M8PL135"] = perdidasLobulos8Map["M8PL135"];
		mapOut["M8PL180"] = perdidasLobulos8Map["M8PL180"];
		mapOut["M8PL225"] = perdidasLobulos8Map["M8PL225"];
		mapOut["M8PL270"] = perdidasLobulos8Map["M8PL270"];
		mapOut["M8PL315"] = perdidasLobulos8Map["M8PL315"];
	}

	if(radiales == 18){
		mapOut["M18PL0"] = perdidasLobulos18Map["M18PL0"];
		mapOut["M18PL20"] = perdidasLobulos18Map["M18PL20"];
		mapOut["M18PL40"] = perdidasLobulos18Map["M18PL40"];
		mapOut["M18PL60"] = perdidasLobulos18Map["M18PL60"];
		mapOut["M18PL80"] = perdidasLobulos18Map["M18PL80"];
		mapOut["M18PL100"] = perdidasLobulos18Map["M18PL100"];
		mapOut["M18PL120"] = perdidasLobulos18Map["M18PL120"];
		mapOut["M18PL140"] = perdidasLobulos18Map["M18PL140"];
		mapOut["M18PL160"] = perdidasLobulos18Map["M18PL160"];
		mapOut["M18PL180"] = perdidasLobulos18Map["M18PL180"];
		mapOut["M18PL200"] = perdidasLobulos18Map["M18PL200"];
		mapOut["M18PL220"] = perdidasLobulos18Map["M18PL220"];
		mapOut["M18PL240"] = perdidasLobulos18Map["M18PL240"];
		mapOut["M18PL260"] = perdidasLobulos18Map["M18PL260"];
		mapOut["M18PL280"] = perdidasLobulos18Map["M18PL280"];
		mapOut["M18PL300"] = perdidasLobulos18Map["M18PL300"];
		mapOut["M18PL320"] = perdidasLobulos18Map["M18PL320"];
		mapOut["M18PL340"] = perdidasLobulos18Map["M18PL340"];
	}


	if(radiales == 72){
		mapOut["M72PL0"] = perdidasLobulos72Map["M72PL0"];
		mapOut["M72PL5"] = perdidasLobulos72Map["M72PL5"];
		mapOut["M72PL10"] = perdidasLobulos72Map["M72PL10"];
		mapOut["M72PL15"] = perdidasLobulos72Map["M72PL15"];
		mapOut["M72PL20"] = perdidasLobulos72Map["M72PL20"];
		mapOut["M72PL25"] = perdidasLobulos72Map["M72PL25"];
		mapOut["M72PL30"] = perdidasLobulos72Map["M72PL30"];
		mapOut["M72PL35"] = perdidasLobulos72Map["M72PL35"];
		mapOut["M72PL40"] = perdidasLobulos72Map["M72PL40"];
		mapOut["M72PL45"] = perdidasLobulos72Map["M72PL45"];
		mapOut["M72PL50"] = perdidasLobulos72Map["M72PL50"];
		mapOut["M72PL55"] = perdidasLobulos72Map["M72PL55"];
		mapOut["M72PL60"] = perdidasLobulos72Map["M72PL60"];
		mapOut["M72PL65"] = perdidasLobulos72Map["M72PL65"];
		mapOut["M72PL70"] = perdidasLobulos72Map["M72PL70"];
		mapOut["M72PL75"] = perdidasLobulos72Map["M72PL75"];
		mapOut["M72PL80"] = perdidasLobulos72Map["M72PL80"];
		mapOut["M72PL85"] = perdidasLobulos72Map["M72PL85"];
		mapOut["M72PL90"] = perdidasLobulos72Map["M72PL90"];
		mapOut["M72PL95"] = perdidasLobulos72Map["M72PL95"];
		mapOut["M72PL100"] = perdidasLobulos72Map["M72PL100"];
		mapOut["M72PL105"] = perdidasLobulos72Map["M72PL105"];
		mapOut["M72PL110"] = perdidasLobulos72Map["M72PL110"];
		mapOut["M72PL115"] = perdidasLobulos72Map["M72PL115"];
		mapOut["M72PL120"] = perdidasLobulos72Map["M72PL120"];
		mapOut["M72PL125"] = perdidasLobulos72Map["M72PL125"];
		mapOut["M72PL130"] = perdidasLobulos72Map["M72PL130"];
		mapOut["M72PL135"] = perdidasLobulos72Map["M72PL135"];
		mapOut["M72PL140"] = perdidasLobulos72Map["M72PL140"];
		mapOut["M72PL145"] = perdidasLobulos72Map["M72PL145"];
		mapOut["M72PL150"] = perdidasLobulos72Map["M72PL150"];
		mapOut["M72PL155"] = perdidasLobulos72Map["M72PL155"];
		mapOut["M72PL160"] = perdidasLobulos72Map["M72PL160"];
		mapOut["M72PL165"] = perdidasLobulos72Map["M72PL165"];
		mapOut["M72PL170"] = perdidasLobulos72Map["M72PL170"];
		mapOut["M72PL175"] = perdidasLobulos72Map["M72PL175"];
		mapOut["M72PL180"] = perdidasLobulos72Map["M72PL180"];
		mapOut["M72PL185"] = perdidasLobulos72Map["M72PL185"];
		mapOut["M72PL190"] = perdidasLobulos72Map["M72PL190"];
		mapOut["M72PL195"] = perdidasLobulos72Map["M72PL195"];
		mapOut["M72PL200"] = perdidasLobulos72Map["M72PL200"];
		mapOut["M72PL205"] = perdidasLobulos72Map["M72PL205"];
		mapOut["M72PL210"] = perdidasLobulos72Map["M72PL210"];
		mapOut["M72PL215"] = perdidasLobulos72Map["M72PL215"];
		mapOut["M72PL220"] = perdidasLobulos72Map["M72PL220"];
		mapOut["M72PL225"] = perdidasLobulos72Map["M72PL225"];
		mapOut["M72PL230"] = perdidasLobulos72Map["M72PL230"];
		mapOut["M72PL235"] = perdidasLobulos72Map["M72PL235"];
		mapOut["M72PL240"] = perdidasLobulos72Map["M72PL240"];
		mapOut["M72PL245"] = perdidasLobulos72Map["M72PL245"];
		mapOut["M72PL250"] = perdidasLobulos72Map["M72PL250"];
		mapOut["M72PL255"] = perdidasLobulos72Map["M72PL255"];
		mapOut["M72PL260"] = perdidasLobulos72Map["M72PL260"];
		mapOut["M72PL265"] = perdidasLobulos72Map["M72PL265"];
		mapOut["M72PL270"] = perdidasLobulos72Map["M72PL270"];
		mapOut["M72PL275"] = perdidasLobulos72Map["M72PL275"];
		mapOut["M72PL280"] = perdidasLobulos72Map["M72PL280"];
		mapOut["M72PL285"] = perdidasLobulos72Map["M72PL285"];
		mapOut["M72PL290"] = perdidasLobulos72Map["M72PL290"];
		mapOut["M72PL295"] = perdidasLobulos72Map["M72PL295"];
		mapOut["M72PL300"] = perdidasLobulos72Map["M72PL300"];
		mapOut["M72PL305"] = perdidasLobulos72Map["M72PL305"];
		mapOut["M72PL310"] = perdidasLobulos72Map["M72PL310"];
		mapOut["M72PL315"] = perdidasLobulos72Map["M72PL315"];
		mapOut["M72PL320"] = perdidasLobulos72Map["M72PL320"];
		mapOut["M72PL325"] = perdidasLobulos72Map["M72PL325"];
		mapOut["M72PL330"] = perdidasLobulos72Map["M72PL330"];
		mapOut["M72PL335"] = perdidasLobulos72Map["M72PL335"];
		mapOut["M72PL340"] = perdidasLobulos72Map["M72PL340"];
		mapOut["M72PL345"] = perdidasLobulos72Map["M72PL345"];
		mapOut["M72PL350"] = perdidasLobulos72Map["M72PL350"];
		mapOut["M72PL355"] = perdidasLobulos72Map["M72PL355"];
	}
	return mapOut;
}

function getParametersReport(){
	var mapOut = {};
	mapOut["pPerdidaCablesConectores"] = $("#perdidaCableConectoI").text();
	mapOut["pOtrasPerdidas"] = $("#otrasPerdidasI").text();
	mapOut["pFrecuencia"] =  $("#frecuenciaI").text();
	mapOut["pGanancia"] = $("#gananciaM").val();
	mapOut["pPotencia"] = $("#potenciaI").text();
	mapOut["pAlturaAntenaTx"] = $("#alturaAntenaI").text();
	mapOut["pRut"] = $("#iRutRazon").val();
	mapOut["pDivisorPotencia"] = $("#divisorPotenciaI").text();
	mapOut["pLocalidad"] = $("#localidadI").text();
	mapOut["pRazonSocial"] = $("#iNombreRazon").val();
	mapOut["pEmail"] = $("#iemail").val();
	mapOut["pFono"] = $("#ifono").val();
	mapOut["pDomicilio"] = $("#idomicilio").val();
	mapOut["pRut"] = $("#iRutRazon").val();
	mapOut["pLatitud"]  = $("#latitudI").val();
	mapOut["pLongitud"] = $("#longitudI").val();
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

function showInitPestana(){
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